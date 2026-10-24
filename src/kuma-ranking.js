// ---------------------------------------------------------------------------
// kuma (Boy meets Kuma) score ranking — isolated in this file, same pattern
// as fuwao-ranking.js (one-time session token + rate limiting via the shared
// `game_sessions` / `rate_limits` tables), but with its own `kuma_scores`
// table and ONE total board across all start LEVELs. The start level (1-4;
// stored in game_sessions.stage and kuma_scores.level) is recorded with each
// entry and shown next to it, so the board doubles as a balance check on how
// the levels score against each other. The nickname is required.
// ---------------------------------------------------------------------------

import { checkRateLimit } from './rate-limit.js';

const GAME_ID = 'kuma';
const LEVELS = [1, 2, 3, 4];
const MAX_REACHED = 5; // 5 = the sage / SuperHard phase
const MAX_SCORE = 5000000;
const MAX_NAME_LENGTH = 12;
const RANKING_LIMIT = 10;
const SESSION_MAX_AGE_MS = 3 * 60 * 60 * 1000;
// Plausibility check: the client is trusted for the score itself, so reject
// anything that couldn't have been earned in the time since the session
// started (best realistic pace is ~1500 pts/s at max combo and high BPM).
const MAX_POINTS_PER_SECOND = 2500;
const SCORE_GRACE = 2000;

function jsonResponse(data, status) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  });
}

function errorResponse(error, status) {
  return jsonResponse({ ok: false, error }, status);
}

async function readBody(request) {
  try {
    const body = await request.json();
    return body && typeof body === 'object' ? body : null;
  } catch (e) {
    return null;
  }
}

async function handleRanking(env) {
  const { results } = await env.DB.prepare(
    'SELECT name, score, level, reached, max_combo, created_at FROM kuma_scores ORDER BY score DESC, created_at ASC LIMIT ?1'
  ).bind(RANKING_LIMIT).all();
  // rows written before the reached column existed hold 0: show the start level
  results.forEach((r) => { if (!(r.reached >= r.level)) r.reached = r.level; });
  return jsonResponse({ ok: true, results });
}

async function handleSessionStart(request, env) {
  const body = await readBody(request);
  const level = body ? body.level : null;
  if (!LEVELS.includes(level)) return errorResponse('invalid_level', 400);

  await env.DB.prepare('DELETE FROM game_sessions WHERE created_at < ?1')
    .bind(Date.now() - SESSION_MAX_AGE_MS).run();

  const token = crypto.randomUUID();
  await env.DB.prepare(
    'INSERT INTO game_sessions (token, game_id, stage, used, created_at) VALUES (?1, ?2, ?3, 0, ?4)'
  ).bind(token, GAME_ID, level, Date.now()).run();
  return jsonResponse({ ok: true, token });
}

async function handleScoreSubmit(request, env) {
  const body = await readBody(request);
  if (!body) return errorResponse('invalid_body', 400);
  const { score, token, level } = body;
  // The reached LEVEL is optional (older clients omit it); it can never be
  // below the start level.
  let reached = Number.isInteger(body.reached) ? body.reached : level;
  if (!(reached >= level && reached <= MAX_REACHED)) reached = level;
  const name = typeof body.name === 'string' ? body.name.trim().slice(0, MAX_NAME_LENGTH) : '';

  if (!name) return errorResponse('invalid_name', 400);
  if (!Number.isInteger(score) || score < 1 || score > MAX_SCORE) return errorResponse('invalid_score', 400);
  if (!LEVELS.includes(level)) return errorResponse('invalid_level', 400);
  if (typeof token !== 'string' || !token) return errorResponse('invalid_token', 400);

  const cutoff = Date.now() - SESSION_MAX_AGE_MS;
  const session = await env.DB.prepare(
    'SELECT created_at FROM game_sessions WHERE token = ?1 AND game_id = ?2 AND stage = ?3 AND used = 0 AND created_at >= ?4'
  ).bind(token, GAME_ID, level, cutoff).first();
  if (!session) return errorResponse('invalid_session', 403);

  // Only a top-RANKING_LIMIT score is stored (the client checks this too before
  // offering to register) so the table never grows past RANKING_LIMIT rows.
  // Ties lose to the earlier entry, matching the ranking's sort order.
  const board = await env.DB.prepare(
    'SELECT score FROM kuma_scores ORDER BY score DESC, created_at ASC LIMIT ?1'
  ).bind(RANKING_LIMIT).all();
  if (board.results.length >= RANKING_LIMIT && score <= board.results[RANKING_LIMIT - 1].score) {
    return errorResponse('not_qualified', 400);
  }

  const elapsedSec = (Date.now() - session.created_at) / 1000;
  // Max combo (optional; older clients omit it): at most one hit per beat at the
  // game's fastest tempo (210 BPM) over the time since the session started.
  const comboCap = Math.floor(elapsedSec * 210 / 60) + 5;
  const maxCombo = Number.isInteger(body.maxCombo) && body.maxCombo > 0 ? Math.min(body.maxCombo, comboCap) : 0;
  if (score > SCORE_GRACE + elapsedSec * MAX_POINTS_PER_SECOND) return errorResponse('implausible_score', 400);

  const consumed = await env.DB.prepare(
    'UPDATE game_sessions SET used = 1 WHERE token = ?1 AND used = 0'
  ).bind(token).run();
  if (!consumed.meta || consumed.meta.changes === 0) return errorResponse('invalid_session', 403);

  await env.DB.prepare(
    'INSERT INTO kuma_scores (name, score, level, reached, max_combo, created_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6)'
  ).bind(name, score, level, reached, maxCombo, new Date().toISOString()).run();
  await env.DB.prepare(
    'DELETE FROM kuma_scores WHERE id NOT IN (SELECT id FROM kuma_scores ORDER BY score DESC, created_at ASC LIMIT ?1)'
  ).bind(RANKING_LIMIT).run();
  return jsonResponse({ ok: true });
}

export async function routeKuma(request, env, path) {
  try {
    if (path === '/api/kuma/ranking') {
      if (request.method !== 'GET') return errorResponse('method_not_allowed', 405);
      return await handleRanking(env);
    }
    if (path === '/api/kuma/session') {
      if (request.method !== 'POST') return errorResponse('method_not_allowed', 405);
      if (!(await checkRateLimit(env, 'kuma-session', request, 30, 600))) return errorResponse('rate_limited', 429);
      return await handleSessionStart(request, env);
    }
    if (path === '/api/kuma/score') {
      if (request.method !== 'POST') return errorResponse('method_not_allowed', 405);
      if (!(await checkRateLimit(env, 'kuma-score', request, 20, 600))) return errorResponse('rate_limited', 429);
      return await handleScoreSubmit(request, env);
    }
  } catch (e) {
    return errorResponse('server_error', 500);
  }
  return null;
}
