// ---------------------------------------------------------------------------
// kuma (Boy meets Kuma) score ranking — isolated in this file, same pattern
// as fuwao-ranking.js (one-time session token + rate limiting via the shared
// `game_sessions` / `rate_limits` tables), but with its own `kuma_scores`
// table and one board per start LEVEL (1-4; stored in game_sessions.stage and
// kuma_scores.level), since each level starts at a different BPM and scores
// scale with BPM. The nickname is required — no default name.
// ---------------------------------------------------------------------------

import { checkRateLimit } from './rate-limit.js';

const GAME_ID = 'kuma';
const LEVELS = [1, 2, 3, 4];
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

async function handleRanking(env, url) {
  const level = parseInt(url.searchParams.get('level'), 10);
  if (!LEVELS.includes(level)) return errorResponse('invalid_level', 400);
  const { results } = await env.DB.prepare(
    'SELECT name, score, created_at FROM kuma_scores WHERE level = ?1 ORDER BY score DESC, created_at ASC LIMIT ?2'
  ).bind(level, RANKING_LIMIT).all();
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

  const elapsedSec = (Date.now() - session.created_at) / 1000;
  if (score > SCORE_GRACE + elapsedSec * MAX_POINTS_PER_SECOND) return errorResponse('implausible_score', 400);

  const consumed = await env.DB.prepare(
    'UPDATE game_sessions SET used = 1 WHERE token = ?1 AND used = 0'
  ).bind(token).run();
  if (!consumed.meta || consumed.meta.changes === 0) return errorResponse('invalid_session', 403);

  await env.DB.prepare(
    'INSERT INTO kuma_scores (name, score, level, created_at) VALUES (?1, ?2, ?3, ?4)'
  ).bind(name, score, level, new Date().toISOString()).run();
  return jsonResponse({ ok: true });
}

export async function routeKuma(request, env, path) {
  const url = new URL(request.url);
  try {
    if (path === '/api/kuma/ranking') {
      if (request.method !== 'GET') return errorResponse('method_not_allowed', 405);
      return await handleRanking(env, url);
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
