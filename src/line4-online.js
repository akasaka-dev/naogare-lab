// ---------------------------------------------------------------------------
// line4 (黄昏のフォー・イン・ア・ロウ) online multiplayer — room API.
//
// Self-contained module: everything for this feature lives in this one file
// and its own D1 database (line4-rooms-db / env.LINE4_DB), so it never
// touches ikku-gozaru's D1 tables or any other route in src/index.js.
//
// Storage: D1 (SQLite) rather than KV — KV is an eventually-consistent edge
// cache (measured: a write can take 30s+ to become visible to a different
// read), which is unusable for live turn-by-turn game state. D1 has a single
// authoritative copy per database, so reads always see the latest write.
// ---------------------------------------------------------------------------

import { checkRateLimit } from './rate-limit.js';

const ROWS = 6;
const COLS = 7;
const ROOM_MAX_AGE_MS = 6 * 60 * 60 * 1000; // 6 hours — rooms older than this are swept on create
const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no 0/O/1/I to avoid confusion
const CODE_LENGTH = 6;
const MAX_NAME_LENGTH = 10;
const DEFAULT_NAME = 'プレイヤー';

// Free text (unlike the emote whitelist), so it's capped and defaulted —
// the client's own default is "ノア" but this is the backstop for anything
// that skips the normal client flow. Displayed via .textContent on the
// client (or HTML-escaped where it's spliced into an innerHTML string), so
// no markup sanitization is needed here — length is the only real concern.
function sanitizeName(raw) {
  if (typeof raw !== 'string') return DEFAULT_NAME;
  const trimmed = raw.trim().slice(0, MAX_NAME_LENGTH);
  return trimmed || DEFAULT_NAME;
}

// Server-side whitelist so a client can't send arbitrary/oversized text through
// the emote channel — must match the buttons offered in the client UI.
// Icon ids, not raw emoji — each maps to game/line4/emotes/<id>.webp on the client.
const ALLOWED_EMOTES = [
  'icon01_wave', 'icon02_thumbsup', 'icon03_girl_wink', 'icon04_crying', 'icon05_angry',
  'icon06_cat_surprised', 'icon07_owl_question', 'icon08_rose_heart', 'icon09_sparkle', 'icon10_skull_ghost',
  'icon11_char_striker', 'icon12_char_dealer', 'icon13_char_mask', 'icon14_char_idol', 'icon15_char_puppeteer',
  'icon16_pet_owl', 'icon17_pet_fox', 'icon18_pet_badger', 'icon19_pet_mouse', 'icon20_hand_wave',
  'icon21_bubble_sweat', 'icon22_bubble_girl', 'icon23_bubble_thanks', 'icon24_bubble_end', 'icon25_bubble_ghost',
];

function jsonResponse(data, status) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

function errorResponse(error, status) {
  return jsonResponse({ ok: false, error }, status || 400);
}

function randomToken() {
  return crypto.randomUUID();
}

function randomRoomCode() {
  let code = '';
  const bytes = crypto.getRandomValues(new Uint8Array(CODE_LENGTH));
  for (let i = 0; i < CODE_LENGTH; i++) {
    code += CODE_CHARS[bytes[i] % CODE_CHARS.length];
  }
  return code;
}

function emptyGrid() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
}

function getNextOpenRow(grid, col) {
  for (let r = ROWS - 1; r >= 0; r--) {
    if (grid[r][col] === 0) return r;
  }
  return -1;
}

function isBoardFull(grid) {
  return grid[0].every((cell) => cell !== 0);
}

function checkWin(grid, row, col, player) {
  const directions = [
    [[0, 1], [0, -1]],
    [[1, 0], [-1, 0]],
    [[1, 1], [-1, -1]],
    [[1, -1], [-1, 1]],
  ];
  for (const pair of directions) {
    let line = [[row, col]];
    for (const [dr, dc] of pair) {
      let r = row + dr;
      let c = col + dc;
      while (r >= 0 && r < ROWS && c >= 0 && c < COLS && grid[r][c] === player) {
        line.push([r, c]);
        r += dr;
        c += dc;
      }
    }
    if (line.length >= 4) return line;
  }
  return null;
}

// ---- row <-> room object mapping ----

function rowToRoom(row) {
  return {
    code: row.code,
    status: row.status,
    p1Token: row.p1_token,
    p2Token: row.p2_token,
    p1Name: row.p1_name,
    p2Name: row.p2_name,
    p1Streak: row.p1_streak,
    p2Streak: row.p2_streak,
    startingPlayer: row.starting_player,
    grid: JSON.parse(row.grid),
    currentPlayer: row.current_player,
    gameOver: !!row.game_over,
    winner: row.winner,
    winLine: row.win_line ? JSON.parse(row.win_line) : null,
    rev: row.rev,
    emote: row.emote,
    emoteBy: row.emote_by,
    emoteRev: row.emote_rev,
    updatedAt: row.updated_at,
  };
}

function publicState(room) {
  return {
    code: room.code,
    status: room.status,
    hasP1: !!room.p1Token,
    hasP2: !!room.p2Token,
    p1Name: room.p1Name,
    p2Name: room.p2Name,
    p1Streak: room.p1Streak,
    p2Streak: room.p2Streak,
    startingPlayer: room.startingPlayer,
    grid: room.grid,
    currentPlayer: room.currentPlayer,
    gameOver: room.gameOver,
    winner: room.winner,
    winLine: room.winLine,
    rev: room.rev,
    emote: room.emote,
    emoteBy: room.emoteBy,
    emoteRev: room.emoteRev,
    updatedAt: room.updatedAt,
  };
}

async function loadRoom(env, code) {
  const row = await env.LINE4_DB.prepare('SELECT * FROM rooms WHERE code = ?1').bind(code).first();
  return row ? rowToRoom(row) : null;
}

// ---- Route handlers ----

async function handleCreate(request, env) {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    body = null;
  }
  const p1Name = sanitizeName(body && body.name);

  // Opportunistic cleanup of old rooms so the table never grows unbounded.
  const cutoff = Date.now() - ROOM_MAX_AGE_MS;
  await env.LINE4_DB.prepare('DELETE FROM rooms WHERE created_at < ?1').bind(cutoff).run();

  const token = randomToken();
  const now = Date.now();
  const grid = emptyGrid();

  let code;
  let inserted = false;
  for (let attempt = 0; attempt < 5 && !inserted; attempt++) {
    code = randomRoomCode();
    try {
      await env.LINE4_DB.prepare(
        `INSERT INTO rooms (code, status, p1_token, p2_token, p1_name, p2_name, starting_player, grid, current_player, game_over, winner, win_line, rev, created_at, updated_at)
         VALUES (?1, 'waiting', ?2, NULL, ?3, NULL, NULL, ?4, 1, 0, NULL, NULL, 0, ?5, ?5)`
      ).bind(code, token, p1Name, JSON.stringify(grid), now).run();
      inserted = true;
    } catch (e) {
      // Extremely unlikely PRIMARY KEY collision — retry with a new code.
    }
  }
  if (!inserted) return errorResponse('server_error', 500);

  const room = await loadRoom(env, code);
  return jsonResponse({ ok: true, code, token, player: 1, state: publicState(room) });
}

async function handleJoin(request, env, code) {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    body = null;
  }
  const name = sanitizeName(body && body.name);

  const room = await loadRoom(env, code);
  if (!room) return errorResponse('room_not_found', 404);
  if (room.p1Token && room.p2Token) return errorResponse('room_full', 409);

  // Fills whichever slot is empty — normally p2 (the room's original
  // creator is always p1), but after a handleRematch() the *winner's*
  // slot is the one still occupied, so a new challenger may be filling p1.
  const fillingP1 = !room.p1Token;
  const token = randomToken();
  const startingPlayer = Math.random() < 0.5 ? 1 : 2;
  const now = Date.now();

  const result = await env.LINE4_DB.prepare(
    fillingP1
      ? `UPDATE rooms SET p1_token = ?1, p1_name = ?2, status = 'playing', starting_player = ?3, current_player = ?3, rev = rev + 1, updated_at = ?4
         WHERE code = ?5 AND p1_token IS NULL`
      : `UPDATE rooms SET p2_token = ?1, p2_name = ?2, status = 'playing', starting_player = ?3, current_player = ?3, rev = rev + 1, updated_at = ?4
         WHERE code = ?5 AND p2_token IS NULL`
  ).bind(token, name, startingPlayer, now, code).run();

  if (!result.meta || result.meta.changes === 0) return errorResponse('room_full', 409);

  const updated = await loadRoom(env, code);
  return jsonResponse({ ok: true, token, player: fillingP1 ? 1 : 2, state: publicState(updated) });
}

async function handleState(env, code) {
  const room = await loadRoom(env, code);
  if (!room) return errorResponse('room_not_found', 404);
  return jsonResponse({ ok: true, state: publicState(room) });
}

async function handleMove(request, env, code) {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return errorResponse('invalid_json');
  }
  const { token, col } = body || {};
  if (typeof token !== 'string' || !Number.isInteger(col) || col < 0 || col >= COLS) {
    return errorResponse('invalid_body');
  }

  const room = await loadRoom(env, code);
  if (!room) return errorResponse('room_not_found', 404);
  if (room.status !== 'playing' || room.gameOver) return errorResponse('game_not_active', 409);

  const isP1 = room.p1Token === token;
  const isP2 = room.p2Token === token;
  if (!isP1 && !isP2) return errorResponse('invalid_token', 403);
  const player = isP1 ? 1 : 2;
  if (room.currentPlayer !== player) return errorResponse('not_your_turn', 409);

  const row = getNextOpenRow(room.grid, col);
  if (row === -1) return errorResponse('column_full', 409);

  room.grid[row][col] = player;
  const winLine = checkWin(room.grid, row, col, player);
  let gameOver = false;
  let winner = null;
  let nextPlayer = player === 1 ? 2 : 1;
  let p1Streak = room.p1Streak || 0;
  let p2Streak = room.p2Streak || 0;
  if (winLine) {
    gameOver = true;
    winner = String(player);
    if (player === 1) p1Streak += 1; else p2Streak += 1;
  } else if (isBoardFull(room.grid)) {
    gameOver = true;
    winner = 'draw';
    p1Streak = 0;
    p2Streak = 0;
  }

  const now = Date.now();
  // Guard on rev to make sure we're writing on top of the exact room state we
  // just validated the move against (protects against a rare double-submit race).
  const result = await env.LINE4_DB.prepare(
    `UPDATE rooms SET grid = ?1, current_player = ?2, game_over = ?3, winner = ?4, win_line = ?5, rev = rev + 1, updated_at = ?6, status = ?7, p1_streak = ?8, p2_streak = ?9
     WHERE code = ?10 AND rev = ?11`
  ).bind(
    JSON.stringify(room.grid),
    gameOver ? room.currentPlayer : nextPlayer,
    gameOver ? 1 : 0,
    winner,
    winLine ? JSON.stringify(winLine) : null,
    now,
    gameOver ? 'finished' : 'playing',
    p1Streak,
    p2Streak,
    code,
    room.rev
  ).run();

  if (!result.meta || result.meta.changes === 0) return errorResponse('conflict_retry', 409);

  const updated = await loadRoom(env, code);
  return jsonResponse({ ok: true, state: publicState(updated) });
}

// "Winner stays on": called by the winning player after a decisive (non-draw)
// finish. Clears the LOSER's slot (token/name/streak) so a new challenger can
// join it via the same room code, keeps the winner's slot/streak untouched,
// and resets the board for the next match. Only the winner may call this —
// the loser's client just shows the defeat overlay and leaves.
async function handleRematch(request, env, code) {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return errorResponse('invalid_json');
  }
  const { token } = body || {};
  if (typeof token !== 'string') return errorResponse('invalid_body');

  const room = await loadRoom(env, code);
  if (!room) return errorResponse('room_not_found', 404);
  if (room.status !== 'finished' || room.winner !== '1' && room.winner !== '2') {
    return errorResponse('not_finished', 409); // also covers draws — no one "stays" on a draw
  }

  const isP1 = room.p1Token === token;
  const isP2 = room.p2Token === token;
  if (!isP1 && !isP2) return errorResponse('invalid_token', 403);
  const myPlayer = isP1 ? 1 : 2;
  if (room.winner !== String(myPlayer)) return errorResponse('not_winner', 403);

  const now = Date.now();
  const grid = emptyGrid();
  const loserIsP1 = myPlayer === 2;

  const result = await env.LINE4_DB.prepare(
    loserIsP1
      ? `UPDATE rooms SET p1_token = NULL, p1_name = NULL, p1_streak = 0, grid = ?1, current_player = 1, game_over = 0, winner = NULL, win_line = NULL, status = 'waiting', starting_player = NULL, rev = rev + 1, updated_at = ?2
         WHERE code = ?3 AND rev = ?4`
      : `UPDATE rooms SET p2_token = NULL, p2_name = NULL, p2_streak = 0, grid = ?1, current_player = 1, game_over = 0, winner = NULL, win_line = NULL, status = 'waiting', starting_player = NULL, rev = rev + 1, updated_at = ?2
         WHERE code = ?3 AND rev = ?4`
  ).bind(JSON.stringify(grid), now, code, room.rev).run();

  if (!result.meta || result.meta.changes === 0) return errorResponse('conflict_retry', 409);

  const updated = await loadRoom(env, code);
  return jsonResponse({ ok: true, state: publicState(updated) });
}

// Lightweight "in-game chat" — a whitelisted emote icon, piggybacked onto the
// same room row the /state poll already fetches every ~1.3s. No new polling
// loop, no free-text storage: just one more field the existing poll picks up.
async function handleEmote(request, env, code) {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return errorResponse('invalid_json');
  }
  const { token, emote } = body || {};
  if (typeof token !== 'string' || !ALLOWED_EMOTES.includes(emote)) {
    return errorResponse('invalid_body');
  }

  const room = await loadRoom(env, code);
  if (!room) return errorResponse('room_not_found', 404);
  if (room.status !== 'playing') return errorResponse('game_not_active', 409);

  const isP1 = room.p1Token === token;
  const isP2 = room.p2Token === token;
  if (!isP1 && !isP2) return errorResponse('invalid_token', 403);
  const player = isP1 ? 1 : 2;

  await env.LINE4_DB.prepare(
    `UPDATE rooms SET emote = ?1, emote_by = ?2, emote_rev = emote_rev + 1, updated_at = ?3 WHERE code = ?4`
  ).bind(emote, player, Date.now(), code).run();

  const updated = await loadRoom(env, code);
  return jsonResponse({ ok: true, state: publicState(updated) });
}

// Returns a Response for any /api/line4/* route it recognizes, or null if
// the path isn't one of ours (caller should fall through to other routes).
export async function routeLine4(request, env, path) {
  if (path === '/api/line4/room') {
    if (request.method !== 'POST') return errorResponse('method_not_allowed', 405);
    if (!(await checkRateLimit(env, 'line4-create', request, 10, 600))) return errorResponse('rate_limited', 429);
    return handleCreate(request, env);
  }

  const joinMatch = path.match(/^\/api\/line4\/room\/([A-Z0-9]{4,10})\/join$/);
  if (joinMatch) {
    if (request.method !== 'POST') return errorResponse('method_not_allowed', 405);
    if (!(await checkRateLimit(env, 'line4-join', request, 20, 600))) return errorResponse('rate_limited', 429);
    return handleJoin(request, env, joinMatch[1]);
  }

  const stateMatch = path.match(/^\/api\/line4\/room\/([A-Z0-9]{4,10})\/state$/);
  if (stateMatch) {
    if (request.method !== 'GET') return errorResponse('method_not_allowed', 405);
    return handleState(env, stateMatch[1]);
  }

  const moveMatch = path.match(/^\/api\/line4\/room\/([A-Z0-9]{4,10})\/move$/);
  if (moveMatch) {
    if (request.method !== 'POST') return errorResponse('method_not_allowed', 405);
    if (!(await checkRateLimit(env, 'line4-move', request, 120, 60))) return errorResponse('rate_limited', 429);
    return handleMove(request, env, moveMatch[1]);
  }

  const rematchMatch = path.match(/^\/api\/line4\/room\/([A-Z0-9]{4,10})\/rematch$/);
  if (rematchMatch) {
    if (request.method !== 'POST') return errorResponse('method_not_allowed', 405);
    if (!(await checkRateLimit(env, 'line4-rematch', request, 20, 600))) return errorResponse('rate_limited', 429);
    return handleRematch(request, env, rematchMatch[1]);
  }

  const emoteMatch = path.match(/^\/api\/line4\/room\/([A-Z0-9]{4,10})\/emote$/);
  if (emoteMatch) {
    if (request.method !== 'POST') return errorResponse('method_not_allowed', 405);
    if (!(await checkRateLimit(env, 'line4-emote', request, 30, 60))) return errorResponse('rate_limited', 429);
    return handleEmote(request, env, emoteMatch[1]);
  }

  return null;
}
