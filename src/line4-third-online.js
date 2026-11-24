// ---------------------------------------------------------------------------
// line4-third (黄昏のフォー・イン・ア・ロウ 3D) online multiplayer — room API.
//
// A 2-player 4x4x4 version of the line4 room lifecycle (create / join / state /
// move / rematch / emote / leave). Self-contained: everything lives in this
// file and its own D1 database (line4-third-rooms-db / env.LINE4_THIRD_DB), so
// it never touches line4's, line4-second's or ikku-gozaru's tables.
//
// The board is a flat array of 64 cells, idx = z*16 + y*4 + x (z = 0 is the
// bottom layer), 0 = empty, 1 / 2 = player — the same layout the client's
// pure-rules block uses. A ball may go in ANY empty cell (no gravity), so a
// move is just a cell index. The server owns the grid, the turn order and the
// win / draw detection; the client only sends "I place at cell N".
// (Cards are not part of this first version of online play.)
//
// Storage: D1 (SQLite) rather than KV — KV is an eventually-consistent edge
// cache, unusable for live turn-by-turn state; D1 has one authoritative copy.
// ---------------------------------------------------------------------------

import { checkRateLimit } from './rate-limit.js';

const N3 = 4;
const CELL_COUNT = N3 * N3 * N3;
const ROOM_MAX_AGE_MS = 6 * 60 * 60 * 1000; // 6 hours — rooms older than this are swept on create
const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no 0/O/1/I to avoid confusion
const CODE_LENGTH = 6;
const MAX_NAME_LENGTH = 10;
const DEFAULT_NAME = 'プレイヤー';
const TURN_TIMEOUT_MS = 60 * 1000; // no move within this long forfeits the turn
// How long a finished match's room code stays reserved before it's freed up
// for anyone else to join — gives both players a window to send emotes and
// gives the winner a chance to click "wait for next challenger" (handleRematch).
// Kept a bit longer than the client's own 30s post-game countdown so a
// rematch request that lands right at the deadline doesn't lose the race.
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

// Server-side whitelist so a client can't send arbitrary/oversized text through
// the emote channel — must match the buttons offered in the client UI.
// Icon ids, not raw emoji — each maps to game/line4-third/emotes/<id>.webp on the client.
const ALLOWED_EMOTES = [
  'icon21_bubble_sweat', 'icon22_bubble_girl', 'icon23_bubble_thanks', 'icon24_bubble_end',
  'icon01_wave', 'icon02_thumbsup', 'icon04_crying',
  'icon06_cat_surprised', 'icon07_owl_question', 'icon08_rose_heart', 'icon09_sparkle', 'icon10_skull_ghost',
  'icon11_char_striker', 'icon12_char_dealer', 'icon13_char_mask', 'icon14_char_idol', 'icon15_char_puppeteer',
  'icon16_pet_owl', 'icon17_pet_fox', 'icon18_pet_badger', 'icon19_pet_mouse', 'icon20_hand_wave',
  // the current set (the sheet of 15); the icon ids above are only kept for clients that still have the old page open
  'em01_striker', 'em02_dealer', 'em03_mask', 'em04_idol', 'em05_puppeteer',
  'em06_owl', 'em07_fox', 'em08_badger', 'em09_mouse', 'em10_hand',
  'em11_wave', 'em12_girl_happy', 'em13_thanks', 'em14_end', 'em15_skull',
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
  return new Array(CELL_COUNT).fill(0);
}

function isBoardFull(grid) {
  return grid.every((cell) => cell !== 0);
}

// All 76 winning lines of a 4x4x4 cube: every straight run of 4 cells along the
// 13 distinct directions (3 axes, 6 face diagonals, 4 space diagonals).
const LINES = (() => {
  const lines = [];
  for (let dz = -1; dz <= 1; dz++) for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
    if (dx === 0 && dy === 0 && dz === 0) continue;
    const first = dx !== 0 ? dx : dy !== 0 ? dy : dz;
    if (first < 0) continue; // one of each +/- pair
    for (let z = 0; z < N3; z++) for (let y = 0; y < N3; y++) for (let x = 0; x < N3; x++) {
      const ex = x + 3 * dx, ey = y + 3 * dy, ez = z + 3 * dz;
      if (ex < 0 || ex >= N3 || ey < 0 || ey >= N3 || ez < 0 || ez >= N3) continue;
      const cells = [];
      for (let k = 0; k < 4; k++) cells.push((z + k * dz) * 16 + (y + k * dy) * 4 + (x + k * dx));
      lines.push(cells);
    }
  }
  return lines;
})();
const LINES_THROUGH = Array.from({ length: CELL_COUNT }, () => []);
LINES.forEach((cells, li) => cells.forEach((c) => LINES_THROUGH[c].push(li)));

// The 4 cells of a completed line through `cell` (the ball just placed), or null.
function checkWin(grid, cell, player) {
  for (const li of LINES_THROUGH[cell]) {
    const cells = LINES[li];
    if (cells.every((c) => grid[c] === player)) return cells.slice();
  }
  return null;
}

// ---- Trump cards (server-authoritative port of the client's pure rules) ----
// Each player is dealt one different card (a "level" 1..5) when a match starts. It stays
// hidden from the other player until it is played; one use per match, on your own turn.
//   gear    a random opponent ball is removed          (free)
//   copy    use the effect of the opponent's unplayed card (free; the copied card decides the rest)
//   raven   two balls of yours land on random free cells (free)
//   seal    a permanent neutral wall on a free cell of your choice (free)
//   usurp   one of 3 random opponent balls turns your colour (costs the turn)
const CARD_IDS = { 1: 'gear', 2: 'copy', 3: 'raven', 4: 'seal', 5: 'usurp' };
const CARD_COST = { gear: false, copy: false, raven: false, seal: false, usurp: true };
const RAVEN_COUNT = 2;
const USURP_PICKS = 3;

function randomOf(list) { return list[Math.floor(Math.random() * list.length)]; }
function shuffled(list) {
  const a = list.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
function dealCards() {
  const a = shuffled([1, 2, 3, 4, 5]);
  return { 1: a[0], 2: a[1] };
}
function newCardState() {
  return { used: { 1: false, 2: false }, sealed: [] };   // sealed: cell indexes of the walls
}
// the cells a ball may still go to (empty and not walled)
function playableCells(grid, sealed) {
  const out = [];
  for (let i = 0; i < CELL_COUNT; i++) if (grid[i] === 0 && !sealed.includes(i)) out.push(i);
  return out;
}

// Plays card `id` for `user`: mutates grid / cs. Returns { ok, cell?, cells?, win?, endsTurn? }.
// opts.target: the chosen cell (seal / usurp); opts.cands: the lit balls usurp may take.
function applyCard(id, user, grid, cs, opts) {
  const opp = 3 - user;
  const endsTurn = !!CARD_COST[id];
  const theirs = [];
  grid.forEach((v, i) => { if (v === opp) theirs.push(i); });
  const done = (cell, win, cells) => { cs.used[user] = true; return { ok: true, cell, cells: cells || [cell], win: win || null, endsTurn }; };
  if (id === 'gear') {
    if (!theirs.length) return { ok: false };
    const cell = randomOf(theirs);
    grid[cell] = 0;
    return done(cell);
  }
  if (id === 'usurp') {
    const cands = (opts && opts.cands) || [];
    const cell = opts && opts.target;
    if (!Number.isInteger(cell) || !cands.includes(cell) || grid[cell] !== opp) return { ok: false };
    grid[cell] = user;
    return done(cell, checkWin(grid, cell, user));
  }
  if (id === 'raven') {
    let cell = null, win = null;
    const placed = [];
    for (let k = 0; k < RAVEN_COUNT; k++) {
      const free = playableCells(grid, cs.sealed);
      if (!free.length) break;
      const c = randomOf(free);
      grid[c] = user;
      cell = c;
      placed.push(c);
      win = win || checkWin(grid, c, user);
    }
    if (cell === null) return { ok: false };
    return done(cell, win, placed);
  }
  if (id === 'seal') {
    const free = playableCells(grid, cs.sealed);
    if (free.length < 2) return { ok: false };   // never wall in the last free cell
    const cell = opts && opts.target;
    if (!Number.isInteger(cell) || !free.includes(cell)) return { ok: false };
    cs.sealed.push(cell);
    return done(cell);
  }
  return { ok: false };
}

// ---- The "skip waiting" CPU ----
// A room's creator who doesn't want to wait can seat a CPU in the empty slot (handleFillCpu). The CPU has no
// process of its own — like the turn timeout it acts lazily: the first read (every /state poll counts) of a
// room whose turn belongs to the CPU, once it has "thought" for CPU_THINK_MS, plays its turn (resolveCpuTurn):
// maybe its trump card, then a ball. The play is a cheap heuristic (no deep search: a Worker's CPU budget is small).
const CPU_THINK_MS = 1600;
const CPU_NAMES = { easy: 'CPU・かんたん', normal: 'CPU・ふつう', hard: 'CPU・つよい' };
const CPU_LEVELS = {
  //          slip: chance of a random ball, win/block: chance it sees an immediate win / threat, threats: reads double threats, card: card chance per turn
  easy:   { slip: 0.35, win: 0.7, block: 0.55, threats: false, card: 0.10 },
  normal: { slip: 0.08, win: 1, block: 0.95, threats: true, card: 0.20 },
  hard:   { slip: 0, win: 1, block: 1, threats: true, card: 0.30 },
};

function wallView(grid, sealed) {
  const w = grid.slice();
  sealed.forEach((c) => { w[c] = 3; });
  return w;
}
// the free cells where `p` would complete a line right now
function winningCells(w, p) {
  const out = new Set();
  for (const cells of LINES) {
    let mine = 0, free = -1, bad = false;
    for (const c of cells) {
      if (w[c] === p) mine++;
      else if (w[c] === 0) free = c;
      else { bad = true; break; }
    }
    if (!bad && mine === 3 && free >= 0) out.add(free);
  }
  return [...out];
}
// how useful a ball of `me` on `cell` is: open lines of its own grow, the opponent's open lines are cut
function cellValue(w, cell, me) {
  const opp = 3 - me;
  const mineW = [1, 3, 9, 0], oppW = [0.5, 2, 7, 0];
  let v = 0;
  for (const li of LINES_THROUGH[cell]) {
    let mine = 0, theirs = 0, dead = false;
    for (const c of LINES[li]) { if (w[c] === me) mine++; else if (w[c] === opp) theirs++; else if (w[c] === 3) dead = true; }
    if (dead) continue;
    if (theirs === 0) v += mineW[mine];
    if (mine === 0) v += oppW[theirs];
  }
  return v;
}
function cpuChooseCell(grid, sealed, me, level) {
  const cfg = CPU_LEVELS[level] || CPU_LEVELS.normal;
  const opp = 3 - me;
  const w = wallView(grid, sealed);
  const free = playableCells(grid, sealed);
  if (!free.length) return null;
  const wins = winningCells(w, me);
  if (wins.length && Math.random() < cfg.win) return randomOf(wins);
  const threats = winningCells(w, opp);
  if (threats.length && Math.random() < cfg.block) return randomOf(threats);
  if (cfg.slip && Math.random() < cfg.slip) return randomOf(free);
  let best = free[0], bestV = -Infinity;
  for (const c of free) {
    let v = cellValue(w, c, me) + Math.random() * 0.8;
    if (cfg.threats) {
      w[c] = me;
      const mine = winningCells(w, me).length;   // threats I would own after this ball (two = cannot all be blocked)
      const theirs = winningCells(w, opp).length;
      w[c] = 0;
      v += mine >= 2 ? 200 : mine === 1 ? 12 : 0;
      v -= theirs > 0 ? 60 : 0;
    }
    if (v > bestV) { bestV = v; best = c; }
  }
  return best;
}
// would the CPU play its card now? (mirrors the single-player rule: at once against a threat, else by chance)
function cpuWantsCard(effId, grid, sealed, me, level) {
  const cfg = CPU_LEVELS[level] || CPU_LEVELS.normal;
  const w = wallView(grid, sealed);
  if (winningCells(w, me).length) return false;   // it can just win
  if (effId !== 'raven' && winningCells(w, 3 - me).length) return true;
  if (grid.filter((v) => v !== 0).length < 8) return false;
  return Math.random() < cfg.card;
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
    cards: row.cards ? JSON.parse(row.cards) : null,                       // { 1: lv, 2: lv } | null (a room from before cards)
    cs: row.cs ? JSON.parse(row.cs) : newCardState(),
    pending: row.pending ? JSON.parse(row.pending) : null,                 // { player, effLv, cands } while a usurp waits for its pick
    lastCard: row.last_card ? JSON.parse(row.last_card) : null,
    cardSeq: row.card_seq || 0,
    cpuPlayer: row.cpu_player || 0,                                        // 0 | 1 | 2: the seat the "skip waiting" CPU holds
    cpuDifficulty: row.cpu_difficulty || null,
  };
}

// 1 | 2 when `token` is a seated player of the room, else 0 (a spectator / the waiting creator's poll)
function viewerOf(room, token) {
  if (typeof token !== 'string' || !token) return 0;
  if (room.p1Token === token) return 1;
  if (room.p2Token === token) return 2;
  return 0;
}

// What one viewer may see. The opponent's card stays hidden until it has been played.
function publicState(room, viewer) {
  const v = viewer === 1 || viewer === 2 ? viewer : 0;
  const cards = room.cards && v ? {
    mine: room.cards[v],
    opp: room.cs.used[3 - v] ? room.cards[3 - v] : null,
  } : null;
  return {
    code: room.code,
    status: room.status,
    hasP1: !!room.p1Token,
    hasP2: !!room.p2Token,
    p1Name: room.p1Name,
    p2Name: room.p2Name,
    p1Streak: room.p1Streak,
    p2Streak: room.p2Streak,
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
    hasCards: !!room.cards,
    cards,
    cs: { used: room.cs.used, sealed: room.cs.sealed },
    pending: v && room.pending && room.pending.player === v ? { effLv: room.pending.effLv, cands: room.pending.cands } : null,
    lastCard: room.lastCard,
    cardSeq: room.cardSeq,
    cpuPlayer: room.cpuPlayer,
  };
}

async function loadRoom(env, code) {
  const row = await env.LINE4_THIRD_DB.prepare('SELECT * FROM rooms WHERE code = ?1').bind(code).first();
  if (!row) return null;
  const room = rowToRoom(row);
  if (room.status === 'playing' && !room.gameOver && room.turnStartedAt
      && Date.now() - room.turnStartedAt > TURN_TIMEOUT_MS) {
    return resolveTimeout(env, room);
  }
  if (room.status === 'playing' && !room.gameOver && room.cpuPlayer && room.currentPlayer === room.cpuPlayer
      && room.turnStartedAt && Date.now() - room.turnStartedAt >= CPU_THINK_MS) {
    return resolveCpuTurn(env, room);
  }
  if (room.status === 'finished' && Date.now() - room.updatedAt > FINISHED_ROOM_GRACE_MS) {
    return resolveFinishedExpiry(env, room);
  }
  return room;
}

// The CPU plays its turn: its card first (when it wants to), then a ball unless the card used up the turn.
async function resolveCpuTurn(env, room) {
  const me = room.cpuPlayer, opp = 3 - me;
  const level = room.cpuDifficulty || 'normal';
  const grid = room.grid.slice();
  const cs = { used: { 1: room.cs.used[1], 2: room.cs.used[2] }, sealed: room.cs.sealed.slice() };
  let lastCard = room.lastCard, cardSeq = room.cardSeq;
  let gameOver = false, winner = null, winLine = null, turnDone = false;

  if (room.cards && !cs.used[me] && playableCells(grid, cs.sealed).length > 2) {
    const lv = room.cards[me];
    let effLv = lv;
    if (CARD_IDS[lv] === 'copy') {   // the opponent's unplayed card, never another copy
      const oppLv = room.cards[opp];
      effLv = cs.used[opp] || CARD_IDS[oppLv] === 'copy' ? null : oppLv;
    }
    const id = effLv ? CARD_IDS[effLv] : null;
    if (id && cpuWantsCard(id, grid, cs.sealed, me, level)) {
      const trial = grid.slice();
      const trialCs = { used: { 1: cs.used[1], 2: cs.used[2] }, sealed: cs.sealed.slice() };
      let opts = {};
      if (id === 'usurp') {
        const theirs = [];
        grid.forEach((v, i) => { if (v === opp) theirs.push(i); });
        const cands = shuffled(theirs).slice(0, USURP_PICKS);
        const w = wallView(grid, cs.sealed);
        const target = cands.length ? cands.reduce((a, b) => (cellValue(w, b, me) > cellValue(w, a, me) ? b : a)) : null;
        opts = { cands, target };
      } else if (id === 'seal') {   // wall the cell the opponent would like best
        const w = wallView(grid, cs.sealed);
        const free = playableCells(grid, cs.sealed);
        opts = { target: free.length ? free.reduce((a, b) => (cellValue(w, b, opp) > cellValue(w, a, opp) ? b : a)) : null };
      }
      const r = applyCard(id, me, trial, trialCs, opts);
      if (r.ok) {
        trialCs.used[me] = true;
        grid.splice(0, CELL_COUNT, ...trial);
        cs.used = trialCs.used; cs.sealed = trialCs.sealed;
        cardSeq += 1;
        lastCard = { seq: cardSeq, by: me, lv, effLv, cells: r.cells, endsTurn: r.endsTurn, grid: grid.slice(), sealed: cs.sealed.slice() };
        if (r.win) { gameOver = true; winner = String(me); winLine = r.win; }
        else if (playableCells(grid, cs.sealed).length === 0) { gameOver = true; winner = 'draw'; }
        else if (r.endsTurn) turnDone = true;
      }
    }
  }
  if (!gameOver && !turnDone) {
    const cell = cpuChooseCell(grid, cs.sealed, me, level);
    if (cell === null) { gameOver = true; winner = 'draw'; }
    else {
      grid[cell] = me;
      const win = checkWin(grid, cell, me);
      if (win) { gameOver = true; winner = String(me); winLine = win; }
      else if (playableCells(grid, cs.sealed).length === 0) { gameOver = true; winner = 'draw'; }
    }
  }

  let p1Streak = room.p1Streak || 0, p2Streak = room.p2Streak || 0;
  if (winner === 'draw') { p1Streak = 0; p2Streak = 0; }
  else if (winner) { if (winner === '1') p1Streak += 1; else p2Streak += 1; }
  const now = Date.now();
  await env.LINE4_THIRD_DB.prepare(
    `UPDATE rooms SET grid = ?1, cs = ?2, pending = NULL, last_card = ?3, card_seq = ?4, current_player = ?5, game_over = ?6, winner = ?7, win_line = ?8,
       status = ?9, p1_streak = ?10, p2_streak = ?11, turn_started_at = ?12, rev = rev + 1, updated_at = ?12
     WHERE code = ?13 AND rev = ?14`
  ).bind(
    JSON.stringify(grid), JSON.stringify(cs), lastCard ? JSON.stringify(lastCard) : null, cardSeq,
    gameOver ? me : opp, gameOver ? 1 : 0, winner, winLine ? JSON.stringify(winLine) : null,
    gameOver ? 'finished' : 'playing', p1Streak, p2Streak, gameOver ? room.turnStartedAt : now,
    room.code, room.rev
  ).run();
  // (if that lost a race — a poll from the other side did the same — the room is simply read again)
  const row = await env.LINE4_THIRD_DB.prepare('SELECT * FROM rooms WHERE code = ?1').bind(room.code).first();
  return rowToRoom(row);
}

// No cron/Durable Object on this plan, so a timed-out turn isn't caught by a
// background job — it's resolved lazily, the next time *anyone* reads the
// room (every /state poll from either player qualifies), same pattern as the
// opportunistic old-room sweep in handleCreate. Counts as an ordinary win for
// streak purposes: whoever didn't move forfeits, the other player's streak
// advances exactly like a real 4-in-a-row.
async function resolveTimeout(env, room) {
  const winner = room.currentPlayer === 1 ? '2' : '1';
  const now = Date.now();
  let p1Streak = room.p1Streak || 0;
  let p2Streak = room.p2Streak || 0;
  if (winner === '1') p1Streak += 1; else p2Streak += 1;

  const result = await env.LINE4_THIRD_DB.prepare(
    `UPDATE rooms SET game_over = 1, winner = ?1, status = 'finished', updated_at = ?2, p1_streak = ?3, p2_streak = ?4, rev = rev + 1
     WHERE code = ?5 AND rev = ?6`
  ).bind(winner, now, p1Streak, p2Streak, room.code, room.rev).run();

  const row = await env.LINE4_THIRD_DB.prepare('SELECT * FROM rooms WHERE code = ?1').bind(room.code).first();
  // If the UPDATE above lost a race (someone's move or another timeout check
  // beat it to this rev), just return whatever the room actually is now —
  // no need to error, the caller just wants the current true state.
  return rowToRoom(row);
}

// A finished match whose winner never requested a rematch (handleRematch)
// within FINISHED_ROOM_GRACE_MS would otherwise keep the room code occupied
// forever — handleJoin refuses to fill a room where both slots are still
// taken, and nothing else ever clears them. Same lazy pattern as
// resolveTimeout: checked on the next read, no cron needed. Unlike
// handleRematch (which vacates only the loser's slot so the winner can keep
// their streak), this clears BOTH slots — nobody asked to stay, so the code
// goes back to being a plain empty room.
async function resolveFinishedExpiry(env, room) {
  const now = Date.now();
  const grid = emptyGrid();
  await env.LINE4_THIRD_DB.prepare(
    `UPDATE rooms SET p1_token = NULL, p1_name = NULL, p1_streak = 0, p2_token = NULL, p2_name = NULL, p2_streak = 0,
     grid = ?1, current_player = 1, game_over = 0, winner = NULL, win_line = NULL, status = 'waiting',
     starting_player = NULL, turn_started_at = NULL, match_started_at = NULL, emote = NULL, emote_by = NULL,
     cards = NULL, cs = NULL, pending = NULL, last_card = NULL, card_seq = 0, cpu_player = 0, cpu_difficulty = NULL,
     rev = rev + 1, updated_at = ?2
     WHERE code = ?3 AND rev = ?4`
  ).bind(JSON.stringify(grid), now, room.code, room.rev).run();

  const row = await env.LINE4_THIRD_DB.prepare('SELECT * FROM rooms WHERE code = ?1').bind(room.code).first();
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
  await env.LINE4_THIRD_DB.prepare('DELETE FROM rooms WHERE created_at < ?1').bind(cutoff).run();

  const token = randomToken();
  const now = Date.now();
  const grid = emptyGrid();

  let code;
  let inserted = false;
  for (let attempt = 0; attempt < 5 && !inserted; attempt++) {
    code = randomRoomCode();
    try {
      await env.LINE4_THIRD_DB.prepare(
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
  return jsonResponse({ ok: true, code, token, player: 1, state: publicState(room, 1) });
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
  if (room.p1Token && room.p2Token) return errorResponse('room_full', 409, { state: publicState(room) });

  // Fills whichever slot is empty — normally p2 (the room's original
  // creator is always p1), but after a handleRematch() the *winner's*
  // slot is the one still occupied, so a new challenger may be filling p1.
  const fillingP1 = !room.p1Token;
  const token = randomToken();
  const startingPlayer = Math.random() < 0.5 ? 1 : 2;
  const now = Date.now();

  const result = await env.LINE4_THIRD_DB.prepare(
    fillingP1
      ? `UPDATE rooms SET p1_token = ?1, p1_name = ?2, status = 'playing', starting_player = ?3, current_player = ?3, turn_started_at = ?4, match_started_at = ?4, cards = ?6, cs = ?7, pending = NULL, last_card = NULL, card_seq = 0, rev = rev + 1, updated_at = ?4
         WHERE code = ?5 AND p1_token IS NULL`
      : `UPDATE rooms SET p2_token = ?1, p2_name = ?2, status = 'playing', starting_player = ?3, current_player = ?3, turn_started_at = ?4, match_started_at = ?4, cards = ?6, cs = ?7, pending = NULL, last_card = NULL, card_seq = 0, rev = rev + 1, updated_at = ?4
         WHERE code = ?5 AND p2_token IS NULL`
  ).bind(token, name, startingPlayer, now, code, JSON.stringify(dealCards()), JSON.stringify(newCardState())).run();

  if (!result.meta || result.meta.changes === 0) {
    const current = await loadRoom(env, code);
    return errorResponse('room_full', 409, current ? { state: publicState(current) } : undefined);
  }

  const updated = await loadRoom(env, code);
  return jsonResponse({ ok: true, token, player: fillingP1 ? 1 : 2, state: publicState(updated, fillingP1 ? 1 : 2) });
}

async function handleState(request, env, code) {
  const room = await loadRoom(env, code);
  if (!room) return errorResponse('room_not_found', 404);
  return jsonResponse({ ok: true, state: publicState(room, viewerOf(room, request.headers.get('X-Room-Token'))) });
}

async function handleMove(request, env, code) {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return errorResponse('invalid_json');
  }
  const { token, cell } = body || {};
  if (typeof token !== 'string' || !Number.isInteger(cell) || cell < 0 || cell >= CELL_COUNT) {
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

  if (room.grid[cell] !== 0) return errorResponse('cell_taken', 409);
  if (room.cs.sealed.includes(cell)) return errorResponse('cell_sealed', 409);

  room.grid[cell] = player;
  const winLine = checkWin(room.grid, cell, player);
  let gameOver = false;
  let winner = null;
  let nextPlayer = player === 1 ? 2 : 1;
  let p1Streak = room.p1Streak || 0;
  let p2Streak = room.p2Streak || 0;
  if (winLine) {
    gameOver = true;
    winner = String(player);
    if (player === 1) p1Streak += 1; else p2Streak += 1;
  } else if (playableCells(room.grid, room.cs.sealed).length === 0) {   // full (walls count as full)
    gameOver = true;
    winner = 'draw';
    p1Streak = 0;
    p2Streak = 0;
  }

  const now = Date.now();
  // Guard on rev to make sure we're writing on top of the exact room state we
  // just validated the move against (protects against a rare double-submit race).
  // turn_started_at resets on every non-final move — it marks when the *next*
  // player's clock (TURN_TIMEOUT_MS, checked lazily in loadRoom) starts.
  const result = await env.LINE4_THIRD_DB.prepare(
    `UPDATE rooms SET grid = ?1, current_player = ?2, game_over = ?3, winner = ?4, win_line = ?5, pending = NULL, rev = rev + 1, updated_at = ?6, status = ?7, p1_streak = ?8, p2_streak = ?9, turn_started_at = ?10
     WHERE code = ?11 AND rev = ?12`
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
    gameOver ? room.turnStartedAt : now,
    code,
    room.rev
  ).run();

  if (!result.meta || result.meta.changes === 0) return errorResponse('conflict_retry', 409);

  const updated = await loadRoom(env, code);
  return jsonResponse({ ok: true, state: publicState(updated, player) });
}

// Plays the caller's trump card. Own turn only, once per match. Cards that need a target take it
// in two steps: the first call (no `target`) answers { need: 'cell' } (seal: any free cell) or
// { need: 'pick', cands } (usurp: the server draws the lit balls and remembers them); the second
// call carries `target`. Everything else is played at once.
async function handleCard(request, env, code) {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return errorResponse('invalid_json');
  }
  const { token, target } = body || {};
  if (typeof token !== 'string') return errorResponse('invalid_body');
  if (target != null && !Number.isInteger(target)) return errorResponse('invalid_body');

  const room = await loadRoom(env, code);
  if (!room) return errorResponse('room_not_found', 404);
  if (room.status !== 'playing' || room.gameOver) return errorResponse('game_not_active', 409);
  if (!room.cards) return errorResponse('no_cards', 409);
  const player = viewerOf(room, token);
  if (!player) return errorResponse('invalid_token', 403);
  if (room.currentPlayer !== player) return errorResponse('not_your_turn', 409);
  if (room.cs.used[player]) return errorResponse('card_used', 409);
  if (playableCells(room.grid, room.cs.sealed).length <= 2) return errorResponse('board_too_full', 409);

  const lv = room.cards[player];
  let effLv = lv;
  if (CARD_IDS[lv] === 'copy') {   // the opponent's unplayed card (never another copy)
    const oppLv = room.cards[3 - player];
    if (room.cs.used[3 - player] || CARD_IDS[oppLv] === 'copy') return errorResponse('cannot_copy', 409);
    effLv = oppLv;
  }
  const id = CARD_IDS[effLv];
  const opp = 3 - player;
  let cands;

  if (id === 'usurp') {
    const theirs = [];
    room.grid.forEach((v, i) => { if (v === opp) theirs.push(i); });
    if (!theirs.length) return errorResponse('no_target', 409);
    if (target == null) {
      const picks = shuffled(theirs).slice(0, USURP_PICKS);
      await env.LINE4_THIRD_DB.prepare('UPDATE rooms SET pending = ?1 WHERE code = ?2 AND rev = ?3')
        .bind(JSON.stringify({ player, effLv, cands: picks }), code, room.rev).run();
      return jsonResponse({ ok: true, need: 'pick', effLv, cands: picks });
    }
    if (!room.pending || room.pending.player !== player || room.pending.effLv !== effLv) return errorResponse('no_pending', 409);
    cands = room.pending.cands;
  } else if (id === 'seal' && target == null) {
    return jsonResponse({ ok: true, need: 'cell', effLv });
  }

  const grid = room.grid.slice();
  const cs = { used: { 1: room.cs.used[1], 2: room.cs.used[2] }, sealed: room.cs.sealed.slice() };
  const r = applyCard(id, player, grid, cs, { target, cands });
  if (!r.ok) return errorResponse('card_failed', 409);

  const now = Date.now();
  let gameOver = false, winner = null, winLine = null;
  const nextPlayer = r.endsTurn ? opp : player;
  let p1Streak = room.p1Streak || 0, p2Streak = room.p2Streak || 0;
  if (r.win) {
    gameOver = true; winner = String(player); winLine = r.win;
    if (player === 1) p1Streak += 1; else p2Streak += 1;
  } else if (playableCells(grid, cs.sealed).length === 0) {
    gameOver = true; winner = 'draw'; p1Streak = 0; p2Streak = 0;
  }
  const seq = room.cardSeq + 1;
  const lastCard = { seq, by: player, lv, effLv, cells: r.cells, endsTurn: r.endsTurn, grid: grid.slice(), sealed: cs.sealed.slice() };

  const result = await env.LINE4_THIRD_DB.prepare(
    `UPDATE rooms SET grid = ?1, cs = ?2, pending = NULL, last_card = ?3, card_seq = ?4, current_player = ?5, game_over = ?6, winner = ?7, win_line = ?8,
       status = ?9, p1_streak = ?10, p2_streak = ?11, turn_started_at = ?12, rev = rev + 1, updated_at = ?12
     WHERE code = ?13 AND rev = ?14`
  ).bind(
    JSON.stringify(grid), JSON.stringify(cs), JSON.stringify(lastCard), seq,
    gameOver ? room.currentPlayer : nextPlayer, gameOver ? 1 : 0, winner, winLine ? JSON.stringify(winLine) : null,
    gameOver ? 'finished' : 'playing', p1Streak, p2Streak, gameOver ? room.turnStartedAt : now,
    code, room.rev
  ).run();
  if (!result.meta || result.meta.changes === 0) return errorResponse('conflict_retry', 409);

  const updated = await loadRoom(env, code);
  return jsonResponse({ ok: true, state: publicState(updated, player) });
}

// "Skip waiting": a seated player of a still-waiting room seats a CPU in the empty slot and the match starts
// at once (cards dealt, first mover drawn, exactly like handleJoin).
async function handleFillCpu(request, env, code) {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return errorResponse('invalid_json');
  }
  const { token } = body || {};
  const level = body && CPU_LEVELS[body.difficulty] ? body.difficulty : 'normal';
  if (typeof token !== 'string') return errorResponse('invalid_body');

  const room = await loadRoom(env, code);
  if (!room) return errorResponse('room_not_found', 404);
  if (room.status !== 'waiting') return errorResponse('not_waiting', 409);
  const me = viewerOf(room, token);
  if (!me) return errorResponse('invalid_token', 403);
  const slot = me === 1 ? 2 : 1;
  if ((slot === 1 ? room.p1Token : room.p2Token)) return errorResponse('room_full', 409);

  const now = Date.now();
  const starting = Math.random() < 0.5 ? 1 : 2;
  const col = slot === 1 ? 'p1' : 'p2';
  const result = await env.LINE4_THIRD_DB.prepare(
    `UPDATE rooms SET ${col}_token = ?1, ${col}_name = ?2, cpu_player = ?3, cpu_difficulty = ?4, status = 'playing', starting_player = ?5, current_player = ?5,
       turn_started_at = ?6, match_started_at = ?6, cards = ?7, cs = ?8, pending = NULL, last_card = NULL, card_seq = 0, rev = rev + 1, updated_at = ?6
     WHERE code = ?9 AND ${col}_token IS NULL AND status = 'waiting'`
  ).bind('cpu:' + randomToken(), CPU_NAMES[level], slot, level, starting, now, JSON.stringify(dealCards()), JSON.stringify(newCardState()), code).run();
  if (!result.meta || result.meta.changes === 0) return errorResponse('conflict_retry', 409);

  const updated = await loadRoom(env, code);
  return jsonResponse({ ok: true, state: publicState(updated, me) });
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

  const result = await env.LINE4_THIRD_DB.prepare(
    loserIsP1
      ? `UPDATE rooms SET p1_token = NULL, p1_name = NULL, p1_streak = 0, grid = ?1, current_player = 1, game_over = 0, winner = NULL, win_line = NULL, status = 'waiting', starting_player = NULL, turn_started_at = NULL, match_started_at = NULL, cards = NULL, cs = NULL, pending = NULL, last_card = NULL, card_seq = 0, cpu_player = 0, cpu_difficulty = NULL, rev = rev + 1, updated_at = ?2
         WHERE code = ?3 AND rev = ?4`
      : `UPDATE rooms SET p2_token = NULL, p2_name = NULL, p2_streak = 0, grid = ?1, current_player = 1, game_over = 0, winner = NULL, win_line = NULL, status = 'waiting', starting_player = NULL, turn_started_at = NULL, match_started_at = NULL, cards = NULL, cs = NULL, pending = NULL, last_card = NULL, card_seq = 0, cpu_player = 0, cpu_difficulty = NULL, rev = rev + 1, updated_at = ?2
         WHERE code = ?3 AND rev = ?4`
  ).bind(JSON.stringify(grid), now, code, room.rev).run();

  if (!result.meta || result.meta.changes === 0) return errorResponse('conflict_retry', 409);

  const updated = await loadRoom(env, code);
  return jsonResponse({ ok: true, state: publicState(updated, myPlayer) });
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
  // Allowed while 'finished' too (not just 'playing') so both players can
  // send a quick thanks/gg during the post-game grace window (see
  // FINISHED_ROOM_GRACE_MS) — loadRoom() has already reset a room that's
  // been sitting finished past that window back to 'waiting', so a token
  // check below naturally rejects anyone trying to sneak an emote in late.
  if (room.status !== 'playing' && room.status !== 'finished') return errorResponse('game_not_active', 409);

  const isP1 = room.p1Token === token;
  const isP2 = room.p2Token === token;
  if (!isP1 && !isP2) return errorResponse('invalid_token', 403);
  const player = isP1 ? 1 : 2;

  await env.LINE4_THIRD_DB.prepare(
    `UPDATE rooms SET emote = ?1, emote_by = ?2, emote_rev = emote_rev + 1, updated_at = ?3 WHERE code = ?4`
  ).bind(emote, player, Date.now(), code).run();

  const updated = await loadRoom(env, code);
  return jsonResponse({ ok: true, state: publicState(updated, player) });
}

// Called when a player explicitly clicks "退室する" after a finished match,
// so the room doesn't have to sit around for FINISHED_ROOM_GRACE_MS before
// becoming available again. Only meaningful for the WINNER of a finished
// match — they're the only one who could otherwise request a rematch
// (handleRematch), so a loser leaving must NOT reset the room: the winner
// might still be deciding. Anyone leaving a 'playing' room is a no-op —
// their opponent will pick that up via the existing turn-timeout forfeit.
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
  const isWinner = room.status === 'finished' && ((isP1 && room.winner === '1') || (isP2 && room.winner === '2'));
  if (isWinner) {
    await resolveFinishedExpiry(env, room);
  }
  return jsonResponse({ ok: true });
}

// Returns a Response for any /api/line4-third/* route it recognizes, or null if
// the path isn't one of ours (caller should fall through to other routes).
export async function routeLine4Third(request, env, path) {
  if (path === '/api/line4-third/room') {
    if (request.method !== 'POST') return errorResponse('method_not_allowed', 405);
    if (!(await checkRateLimit(env, 'line4-third-create', request, 10, 600))) return errorResponse('rate_limited', 429);
    return handleCreate(request, env);
  }

  const joinMatch = path.match(/^\/api\/line4-third\/room\/([A-Z0-9]{4,10})\/join$/);
  if (joinMatch) {
    if (request.method !== 'POST') return errorResponse('method_not_allowed', 405);
    if (!(await checkRateLimit(env, 'line4-third-join', request, 20, 600))) return errorResponse('rate_limited', 429);
    return handleJoin(request, env, joinMatch[1]);
  }

  const stateMatch = path.match(/^\/api\/line4-third\/room\/([A-Z0-9]{4,10})\/state$/);
  if (stateMatch) {
    if (request.method !== 'GET') return errorResponse('method_not_allowed', 405);
    return handleState(request, env, stateMatch[1]);
  }

  const moveMatch = path.match(/^\/api\/line4-third\/room\/([A-Z0-9]{4,10})\/move$/);
  if (moveMatch) {
    if (request.method !== 'POST') return errorResponse('method_not_allowed', 405);
    if (!(await checkRateLimit(env, 'line4-third-move', request, 120, 60))) return errorResponse('rate_limited', 429);
    return handleMove(request, env, moveMatch[1]);
  }

  const cardMatch = path.match(/^\/api\/line4-third\/room\/([A-Z0-9]{4,10})\/card$/);
  if (cardMatch) {
    if (request.method !== 'POST') return errorResponse('method_not_allowed', 405);
    if (!(await checkRateLimit(env, 'line4-third-card', request, 60, 60))) return errorResponse('rate_limited', 429);
    return handleCard(request, env, cardMatch[1]);
  }

  const fillMatch = path.match(/^\/api\/line4-third\/room\/([A-Z0-9]{4,10})\/fill-cpu$/);
  if (fillMatch) {
    if (request.method !== 'POST') return errorResponse('method_not_allowed', 405);
    if (!(await checkRateLimit(env, 'line4-third-fill', request, 20, 600))) return errorResponse('rate_limited', 429);
    return handleFillCpu(request, env, fillMatch[1]);
  }

  const rematchMatch = path.match(/^\/api\/line4-third\/room\/([A-Z0-9]{4,10})\/rematch$/);
  if (rematchMatch) {
    if (request.method !== 'POST') return errorResponse('method_not_allowed', 405);
    if (!(await checkRateLimit(env, 'line4-third-rematch', request, 20, 600))) return errorResponse('rate_limited', 429);
    return handleRematch(request, env, rematchMatch[1]);
  }

  const emoteMatch = path.match(/^\/api\/line4-third\/room\/([A-Z0-9]{4,10})\/emote$/);
  if (emoteMatch) {
    if (request.method !== 'POST') return errorResponse('method_not_allowed', 405);
    if (!(await checkRateLimit(env, 'line4-third-emote', request, 30, 60))) return errorResponse('rate_limited', 429);
    return handleEmote(request, env, emoteMatch[1]);
  }

  const leaveMatch = path.match(/^\/api\/line4-third\/room\/([A-Z0-9]{4,10})\/leave$/);
  if (leaveMatch) {
    if (request.method !== 'POST') return errorResponse('method_not_allowed', 405);
    if (!(await checkRateLimit(env, 'line4-third-leave', request, 20, 600))) return errorResponse('rate_limited', 429);
    return handleLeave(request, env, leaveMatch[1]);
  }

  return null;
}
