// ---------------------------------------------------------------------------
// line4-second (黄昏のフォー・イン・ア・ロウ 地平の行方) online multiplayer —
// room API.
//
// Self-contained module: everything for this feature lives in this one file
// and its own D1 database (line4-second-rooms-db / env.LINE4_SECOND_DB) —
// deliberately NOT line4's LINE4_DB. The two games have incompatible room
// shapes (3 players/8x7 board here vs. 2 players/7x6 there), and keeping
// them fully separate means bugs or schema changes made while building this
// out can never affect line4's already-live, real-player-facing rooms. This
// file otherwise mirrors line4-online.js's structure closely — same D1-over-KV
// reasoning (read-your-writes consistency; KV's eventual consistency proved
// unusable for turn-by-turn state), same lazy-resolution patterns.
// ---------------------------------------------------------------------------

import { checkRateLimit } from './rate-limit.js';

const ROWS = 7;
const COLS = 8;
const ROOM_MAX_AGE_MS = 6 * 60 * 60 * 1000; // 6 hours — rooms older than this are swept on create
const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no 0/O/1/I to avoid confusion
const CODE_LENGTH = 6;
const MAX_NAME_LENGTH = 10;
const DEFAULT_NAME = 'プレイヤー';
// No move within this long: the AFK player's turn is skipped (advance to the
// next player, reset the clock) rather than ending the match — with 3 seats
// there's no single unambiguous "the other player wins" the way line4's
// 2-player forfeit has, so the simplest safe rule is "sit out this turn, the
// other two keep playing normally around you." See resolveTimeout().
const TURN_TIMEOUT_MS = 60 * 1000;
// How long a finished match's room code stays reserved before it's freed up
// for anyone else to join — gives all three players a window to send emotes
// and gives the winner a chance to click "wait for next challengers" before
// the code opens back up. Kept a bit longer than the client's own 30s
// post-game countdown so a rematch request that lands right at the deadline
// doesn't lose the race.
const FINISHED_ROOM_GRACE_MS = 35 * 1000;

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

// Same whitelist as line4-online.js — the emote picker/assets are identical
// between the two games (see game/line4-second/index.html's emoteScroller).
const ALLOWED_EMOTES = [
  'icon21_bubble_sweat', 'icon22_bubble_girl', 'icon23_bubble_thanks', 'icon24_bubble_end',
  'icon01_wave', 'icon02_thumbsup', 'icon04_crying',
  'icon06_cat_surprised', 'icon07_owl_question', 'icon08_rose_heart', 'icon09_sparkle', 'icon10_skull_ghost',
  'icon11_char_striker', 'icon12_char_dealer', 'icon13_char_mask', 'icon14_char_idol', 'icon15_char_puppeteer',
  'icon16_pet_owl', 'icon17_pet_fox', 'icon18_pet_badger', 'icon19_pet_mouse', 'icon20_hand_wave',
];

function jsonResponse(data, status) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

function errorResponse(error, status, extra) {
  return jsonResponse(Object.assign({ ok: false, error }, extra), status || 400);
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

// Player-agnostic (checks grid[r][c] === player) — works unchanged for 1/2/3.
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
    p3Token: row.p3_token,
    p1Name: row.p1_name,
    p2Name: row.p2_name,
    p3Name: row.p3_name,
    p1Streak: row.p1_streak,
    p2Streak: row.p2_streak,
    p3Streak: row.p3_streak,
    turnStartedAt: row.turn_started_at,
    matchStartedAt: row.match_started_at,
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
    hasP3: !!room.p3Token,
    p1Name: room.p1Name,
    p2Name: room.p2Name,
    p3Name: room.p3Name,
    p1Streak: room.p1Streak,
    p2Streak: room.p2Streak,
    p3Streak: room.p3Streak,
    turnStartedAt: room.turnStartedAt,
    matchStartedAt: room.matchStartedAt,
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
  const row = await env.LINE4_SECOND_DB.prepare('SELECT * FROM rooms WHERE code = ?1').bind(code).first();
  if (!row) return null;
  const room = rowToRoom(row);
  if (room.status === 'playing' && !room.gameOver && room.turnStartedAt
      && Date.now() - room.turnStartedAt > TURN_TIMEOUT_MS) {
    return resolveTimeout(env, room);
  }
  if (room.status === 'finished' && Date.now() - room.updatedAt > FINISHED_ROOM_GRACE_MS) {
    return resolveFinishedExpiry(env, room);
  }
  return room;
}

// No cron/Durable Object on this plan, so a timed-out turn isn't caught by a
// background job — it's resolved lazily, the next time *anyone* reads the
// room. Unlike line4's 2-player version, this does NOT end the match or
// award a streak: it just skips the AFK player's turn and resets the clock
// for whoever's up next, so the other two can keep playing normally.
async function resolveTimeout(env, room) {
  const now = Date.now();
  const nextPlayer = (room.currentPlayer % 3) + 1;

  const result = await env.LINE4_SECOND_DB.prepare(
    `UPDATE rooms SET current_player = ?1, turn_started_at = ?2, updated_at = ?2, rev = rev + 1
     WHERE code = ?3 AND rev = ?4`
  ).bind(nextPlayer, now, room.code, room.rev).run();

  const row = await env.LINE4_SECOND_DB.prepare('SELECT * FROM rooms WHERE code = ?1').bind(room.code).first();
  // If the UPDATE above lost a race (someone's move beat it to this rev),
  // just return whatever the room actually is now.
  return rowToRoom(row);
}

// A finished match whose winner never requested a rematch (handleRematch)
// within FINISHED_ROOM_GRACE_MS would otherwise keep the room code occupied
// forever — handleJoin refuses to fill a room where all three slots are
// still taken, and nothing else ever clears them. Same lazy pattern as
// resolveTimeout: checked on the next read, no cron needed. Unlike
// handleRematch (which vacates only the two losers' slots so the winner can
// keep their streak), this clears ALL THREE — nobody asked to stay, so the
// code goes back to being a plain empty room.
async function resolveFinishedExpiry(env, room) {
  const now = Date.now();
  const grid = emptyGrid();
  await env.LINE4_SECOND_DB.prepare(
    `UPDATE rooms SET p1_token = NULL, p1_name = NULL, p1_streak = 0,
     p2_token = NULL, p2_name = NULL, p2_streak = 0,
     p3_token = NULL, p3_name = NULL, p3_streak = 0,
     grid = ?1, current_player = 1, game_over = 0, winner = NULL, win_line = NULL, status = 'waiting',
     starting_player = NULL, turn_started_at = NULL, match_started_at = NULL, emote = NULL, emote_by = NULL,
     rev = rev + 1, updated_at = ?2
     WHERE code = ?3 AND rev = ?4`
  ).bind(JSON.stringify(grid), now, room.code, room.rev).run();

  const row = await env.LINE4_SECOND_DB.prepare('SELECT * FROM rooms WHERE code = ?1').bind(room.code).first();
  return rowToRoom(row);
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
  await env.LINE4_SECOND_DB.prepare('DELETE FROM rooms WHERE created_at < ?1').bind(cutoff).run();

  const token = randomToken();
  const now = Date.now();
  const grid = emptyGrid();

  let code;
  let inserted = false;
  for (let attempt = 0; attempt < 5 && !inserted; attempt++) {
    code = randomRoomCode();
    try {
      await env.LINE4_SECOND_DB.prepare(
        `INSERT INTO rooms (code, status, p1_token, p2_token, p3_token, p1_name, p2_name, p3_name, starting_player, grid, current_player, game_over, winner, win_line, rev, created_at, updated_at)
         VALUES (?1, 'waiting', ?2, NULL, NULL, ?3, NULL, NULL, NULL, ?4, 1, 0, NULL, NULL, 0, ?5, ?5)`
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
  if (room.p1Token && room.p2Token && room.p3Token) return errorResponse('room_full', 409, { state: publicState(room) });

  // Fills whichever slot is empty — normally in p1→p2→p3 order as the room
  // fills up for the first time, but after a handleRematch() it's the TWO
  // losers' slots that are open, so a new challenger may land in any of them.
  const fillingSlot = !room.p1Token ? 1 : !room.p2Token ? 2 : 3;
  const token = randomToken();
  const startingPlayer = Math.floor(Math.random() * 3) + 1;
  const now = Date.now();

  const columns = { 1: ['p1_token', 'p1_name'], 2: ['p2_token', 'p2_name'], 3: ['p3_token', 'p3_name'] };
  const [tokenCol, nameCol] = columns[fillingSlot];
  // Only actually starts the match once all three seats are filled — filling
  // the 2nd seat just leaves it 'waiting' for a 3rd.
  const willBeFull = [room.p1Token, room.p2Token, room.p3Token].filter(Boolean).length === 2;

  const result = await env.LINE4_SECOND_DB.prepare(
    willBeFull
      ? `UPDATE rooms SET ${tokenCol} = ?1, ${nameCol} = ?2, status = 'playing', starting_player = ?3, current_player = ?3, turn_started_at = ?4, match_started_at = ?4, rev = rev + 1, updated_at = ?4
         WHERE code = ?5 AND ${tokenCol} IS NULL`
      : `UPDATE rooms SET ${tokenCol} = ?1, ${nameCol} = ?2, rev = rev + 1, updated_at = ?4
         WHERE code = ?5 AND ${tokenCol} IS NULL`
  ).bind(token, name, startingPlayer, now, code).run();

  if (!result.meta || result.meta.changes === 0) {
    const current = await loadRoom(env, code);
    return errorResponse('room_full', 409, current ? { state: publicState(current) } : undefined);
  }

  const updated = await loadRoom(env, code);
  return jsonResponse({ ok: true, token, player: fillingSlot, state: publicState(updated) });
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
  const isP3 = room.p3Token === token;
  if (!isP1 && !isP2 && !isP3) return errorResponse('invalid_token', 403);
  const player = isP1 ? 1 : isP2 ? 2 : 3;
  if (room.currentPlayer !== player) return errorResponse('not_your_turn', 409);

  const row = getNextOpenRow(room.grid, col);
  if (row === -1) return errorResponse('column_full', 409);

  room.grid[row][col] = player;
  const winLine = checkWin(room.grid, row, col, player);
  let gameOver = false;
  let winner = null;
  const nextPlayer = (player % 3) + 1;
  let p1Streak = room.p1Streak || 0;
  let p2Streak = room.p2Streak || 0;
  let p3Streak = room.p3Streak || 0;
  if (winLine) {
    gameOver = true;
    winner = String(player);
    if (player === 1) p1Streak += 1; else if (player === 2) p2Streak += 1; else p3Streak += 1;
  } else if (isBoardFull(room.grid)) {
    gameOver = true;
    winner = 'draw';
    p1Streak = 0;
    p2Streak = 0;
    p3Streak = 0;
  }

  const now = Date.now();
  // Guard on rev to make sure we're writing on top of the exact room state we
  // just validated the move against (protects against a rare double-submit race).
  // turn_started_at resets on every non-final move — it marks when the *next*
  // player's clock (TURN_TIMEOUT_MS, checked lazily in loadRoom) starts.
  const result = await env.LINE4_SECOND_DB.prepare(
    `UPDATE rooms SET grid = ?1, current_player = ?2, game_over = ?3, winner = ?4, win_line = ?5, rev = rev + 1, updated_at = ?6, status = ?7, p1_streak = ?8, p2_streak = ?9, p3_streak = ?10, turn_started_at = ?11
     WHERE code = ?12 AND rev = ?13`
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
    p3Streak,
    gameOver ? room.turnStartedAt : now,
    code,
    room.rev
  ).run();

  if (!result.meta || result.meta.changes === 0) return errorResponse('conflict_retry', 409);

  const updated = await loadRoom(env, code);
  return jsonResponse({ ok: true, state: publicState(updated) });
}

// "Winner stays on": called by the winning player after a decisive (non-draw)
// finish. Clears the TWO LOSERS' slots (token/name/streak) so two new
// challengers can join via the same room code, keeps the winner's
// slot/streak untouched, and resets the board for the next match. Only the
// winner may call this — the losers' clients just show the defeat overlay
// and leave.
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
  if (room.status !== 'finished' || (room.winner !== '1' && room.winner !== '2' && room.winner !== '3')) {
    return errorResponse('not_finished', 409); // also covers draws — no one "stays" on a draw
  }

  const isP1 = room.p1Token === token;
  const isP2 = room.p2Token === token;
  const isP3 = room.p3Token === token;
  if (!isP1 && !isP2 && !isP3) return errorResponse('invalid_token', 403);
  const myPlayer = isP1 ? 1 : isP2 ? 2 : 3;
  if (room.winner !== String(myPlayer)) return errorResponse('not_winner', 403);

  const now = Date.now();
  const grid = emptyGrid();
  const clearP1 = myPlayer !== 1;
  const clearP2 = myPlayer !== 2;
  const clearP3 = myPlayer !== 3;

  const result = await env.LINE4_SECOND_DB.prepare(
    `UPDATE rooms SET
       p1_token = CASE WHEN ?1 THEN NULL ELSE p1_token END,
       p1_name = CASE WHEN ?1 THEN NULL ELSE p1_name END,
       p1_streak = CASE WHEN ?1 THEN 0 ELSE p1_streak END,
       p2_token = CASE WHEN ?2 THEN NULL ELSE p2_token END,
       p2_name = CASE WHEN ?2 THEN NULL ELSE p2_name END,
       p2_streak = CASE WHEN ?2 THEN 0 ELSE p2_streak END,
       p3_token = CASE WHEN ?3 THEN NULL ELSE p3_token END,
       p3_name = CASE WHEN ?3 THEN NULL ELSE p3_name END,
       p3_streak = CASE WHEN ?3 THEN 0 ELSE p3_streak END,
       grid = ?4, current_player = 1, game_over = 0, winner = NULL, win_line = NULL, status = 'waiting',
       starting_player = NULL, turn_started_at = NULL, match_started_at = NULL, rev = rev + 1, updated_at = ?5
     WHERE code = ?6 AND rev = ?7`
  ).bind(clearP1 ? 1 : 0, clearP2 ? 1 : 0, clearP3 ? 1 : 0, JSON.stringify(grid), now, code, room.rev).run();

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
  // Allowed while 'finished' too (not just 'playing') so all three players
  // can send a quick thanks/gg during the post-game grace window (see
  // FINISHED_ROOM_GRACE_MS) — loadRoom() has already reset a room that's
  // been sitting finished past that window back to 'waiting', so a token
  // check below naturally rejects anyone trying to sneak an emote in late.
  if (room.status !== 'playing' && room.status !== 'finished') return errorResponse('game_not_active', 409);

  const isP1 = room.p1Token === token;
  const isP2 = room.p2Token === token;
  const isP3 = room.p3Token === token;
  if (!isP1 && !isP2 && !isP3) return errorResponse('invalid_token', 403);
  const player = isP1 ? 1 : isP2 ? 2 : 3;

  await env.LINE4_SECOND_DB.prepare(
    `UPDATE rooms SET emote = ?1, emote_by = ?2, emote_rev = emote_rev + 1, updated_at = ?3 WHERE code = ?4`
  ).bind(emote, player, Date.now(), code).run();

  const updated = await loadRoom(env, code);
  return jsonResponse({ ok: true, state: publicState(updated) });
}

// Called when a player explicitly clicks "退室する" after a finished match,
// so the room doesn't have to sit around for FINISHED_ROOM_GRACE_MS before
// becoming available again. Only meaningful for the WINNER of a finished
// match — they're the only one who could otherwise request a rematch
// (handleRematch), so a loser leaving must NOT reset the room: the winner
// might still be deciding. Anyone leaving a 'playing' room is a no-op —
// the existing turn-timeout skip handles an AFK player instead.
async function handleLeave(request, env, code) {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return errorResponse('invalid_json');
  }
  const { token } = body || {};
  if (typeof token !== 'string') return errorResponse('invalid_body');

  const room = await loadRoom(env, code);
  if (!room) return jsonResponse({ ok: true }); // already gone — nothing to do

  const isP1 = room.p1Token === token;
  const isP2 = room.p2Token === token;
  const isP3 = room.p3Token === token;
  const myPlayer = isP1 ? '1' : isP2 ? '2' : isP3 ? '3' : null;
  const isWinner = room.status === 'finished' && myPlayer !== null && room.winner === myPlayer;
  if (isWinner) {
    await resolveFinishedExpiry(env, room);
  }
  return jsonResponse({ ok: true });
}

// Returns a Response for any /api/line4-second/* route it recognizes, or
// null if the path isn't one of ours (caller should fall through to other
// routes). Rate-limit buckets are prefixed 'line4-second-' (distinct from
// line4's own 'line4-*' buckets) even though they'd never collide anyway —
// checkRateLimit's key already includes caller IP, this is just for clarity
// when inspecting the shared rate_limits table.
export async function routeLine4Second(request, env, path) {
  if (path === '/api/line4-second/room') {
    if (request.method !== 'POST') return errorResponse('method_not_allowed', 405);
    if (!(await checkRateLimit(env, 'line4-second-create', request, 10, 600))) return errorResponse('rate_limited', 429);
    return handleCreate(request, env);
  }

  const joinMatch = path.match(/^\/api\/line4-second\/room\/([A-Z0-9]{4,10})\/join$/);
  if (joinMatch) {
    if (request.method !== 'POST') return errorResponse('method_not_allowed', 405);
    if (!(await checkRateLimit(env, 'line4-second-join', request, 20, 600))) return errorResponse('rate_limited', 429);
    return handleJoin(request, env, joinMatch[1]);
  }

  const stateMatch = path.match(/^\/api\/line4-second\/room\/([A-Z0-9]{4,10})\/state$/);
  if (stateMatch) {
    if (request.method !== 'GET') return errorResponse('method_not_allowed', 405);
    return handleState(env, stateMatch[1]);
  }

  const moveMatch = path.match(/^\/api\/line4-second\/room\/([A-Z0-9]{4,10})\/move$/);
  if (moveMatch) {
    if (request.method !== 'POST') return errorResponse('method_not_allowed', 405);
    if (!(await checkRateLimit(env, 'line4-second-move', request, 120, 60))) return errorResponse('rate_limited', 429);
    return handleMove(request, env, moveMatch[1]);
  }

  const rematchMatch = path.match(/^\/api\/line4-second\/room\/([A-Z0-9]{4,10})\/rematch$/);
  if (rematchMatch) {
    if (request.method !== 'POST') return errorResponse('method_not_allowed', 405);
    if (!(await checkRateLimit(env, 'line4-second-rematch', request, 20, 600))) return errorResponse('rate_limited', 429);
    return handleRematch(request, env, rematchMatch[1]);
  }

  const emoteMatch = path.match(/^\/api\/line4-second\/room\/([A-Z0-9]{4,10})\/emote$/);
  if (emoteMatch) {
    if (request.method !== 'POST') return errorResponse('method_not_allowed', 405);
    if (!(await checkRateLimit(env, 'line4-second-emote', request, 30, 60))) return errorResponse('rate_limited', 429);
    return handleEmote(request, env, emoteMatch[1]);
  }

  const leaveMatch = path.match(/^\/api\/line4-second\/room\/([A-Z0-9]{4,10})\/leave$/);
  if (leaveMatch) {
    if (request.method !== 'POST') return errorResponse('method_not_allowed', 405);
    if (!(await checkRateLimit(env, 'line4-second-leave', request, 20, 600))) return errorResponse('rate_limited', 429);
    return handleLeave(request, env, leaveMatch[1]);
  }

  return null;
}
