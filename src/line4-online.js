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

const ROWS = 6;
const COLS = 7;
const ROOM_MAX_AGE_MS = 6 * 60 * 60 * 1000; // 6 hours — rooms older than this are swept on create
const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no 0/O/1/I to avoid confusion
const CODE_LENGTH = 6;

// Server-side whitelist so a client can't send arbitrary/oversized text through
// the emote channel — must match the buttons offered in the client UI.
const ALLOWED_EMOTES = ['👍', '😂', '😮', '😢', '🔥', '🤔'];

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
    hasP2: !!room.p2Token,
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

async function handleCreate(env) {
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
        `INSERT INTO rooms (code, status, p1_token, p2_token, starting_player, grid, current_player, game_over, winner, win_line, rev, created_at, updated_at)
         VALUES (?1, 'waiting', ?2, NULL, NULL, ?3, 1, 0, NULL, NULL, 0, ?4, ?4)`
      ).bind(code, token, JSON.stringify(grid), now).run();
      inserted = true;
    } catch (e) {
      // Extremely unlikely PRIMARY KEY collision — retry with a new code.
    }
  }
  if (!inserted) return errorResponse('server_error', 500);

  const room = await loadRoom(env, code);
  return jsonResponse({ ok: true, code, token, player: 1, state: publicState(room) });
}

async function handleJoin(env, code) {
  const room = await loadRoom(env, code);
  if (!room) return errorResponse('room_not_found', 404);
  if (room.p2Token) return errorResponse('room_full', 409);

  const token = randomToken();
  const startingPlayer = Math.random() < 0.5 ? 1 : 2;
  const now = Date.now();

  const result = await env.LINE4_DB.prepare(
    `UPDATE rooms SET p2_token = ?1, status = 'playing', starting_player = ?2, current_player = ?2, rev = rev + 1, updated_at = ?3
     WHERE code = ?4 AND p2_token IS NULL`
  ).bind(token, startingPlayer, now, code).run();

  if (!result.meta || result.meta.changes === 0) return errorResponse('room_full', 409);

  const updated = await loadRoom(env, code);
  return jsonResponse({ ok: true, token, player: 2, state: publicState(updated) });
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
  if (winLine) {
    gameOver = true;
    winner = String(player);
  } else if (isBoardFull(room.grid)) {
    gameOver = true;
    winner = 'draw';
  }

  const now = Date.now();
  // Guard on rev to make sure we're writing on top of the exact room state we
  // just validated the move against (protects against a rare double-submit race).
  const result = await env.LINE4_DB.prepare(
    `UPDATE rooms SET grid = ?1, current_player = ?2, game_over = ?3, winner = ?4, win_line = ?5, rev = rev + 1, updated_at = ?6, status = ?7
     WHERE code = ?8 AND rev = ?9`
  ).bind(
    JSON.stringify(room.grid),
    gameOver ? room.currentPlayer : nextPlayer,
    gameOver ? 1 : 0,
    winner,
    winLine ? JSON.stringify(winLine) : null,
    now,
    gameOver ? 'finished' : 'playing',
    code,
    room.rev
  ).run();

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
    return handleCreate(env);
  }

  const joinMatch = path.match(/^\/api\/line4\/room\/([A-Z0-9]{4,10})\/join$/);
  if (joinMatch) {
    if (request.method !== 'POST') return errorResponse('method_not_allowed', 405);
    return handleJoin(env, joinMatch[1]);
  }

  const stateMatch = path.match(/^\/api\/line4\/room\/([A-Z0-9]{4,10})\/state$/);
  if (stateMatch) {
    if (request.method !== 'GET') return errorResponse('method_not_allowed', 405);
    return handleState(env, stateMatch[1]);
  }

  const moveMatch = path.match(/^\/api\/line4\/room\/([A-Z0-9]{4,10})\/move$/);
  if (moveMatch) {
    if (request.method !== 'POST') return errorResponse('method_not_allowed', 405);
    return handleMove(request, env, moveMatch[1]);
  }

  const emoteMatch = path.match(/^\/api\/line4\/room\/([A-Z0-9]{4,10})\/emote$/);
  if (emoteMatch) {
    if (request.method !== 'POST') return errorResponse('method_not_allowed', 405);
    return handleEmote(request, env, emoteMatch[1]);
  }

  return null;
}
