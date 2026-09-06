// ---------------------------------------------------------------------------
// fuwao (たすけあいヒーロー ふわお) score ranking — isolated in this file so
// it never touches ikku-gozaru's routes/tables in src/index.js. Reuses the
// shared `game_sessions` and `rate_limits` tables in env.DB (same pattern as
// ikku-gozaru's anti-cheat token + rate limiting), but has its own dedicated
// `fuwao_scores` table.
// ---------------------------------------------------------------------------

import { checkRateLimit } from './rate-limit.js';

const GAME_ID = 'fuwao';
const STAGE = 1; // game_sessions.stage has no meaning for fuwao — fixed constant so the column stays NOT NULL
const MIN_SCORE = 0;
const MAX_SCORE = 1000000;
const MAX_NAME_LENGTH = 20;
const DEFAULT_NAME = 'ふわお';
const RANKING_LIMIT = 10;
const SESSION_MAX_AGE_MS = 3 * 60 * 60 * 1000; // 3 hours — generous for a single play session

function jsonResponse(data, status) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  });
}

function errorResponse(error, status) {
  return jsonResponse({ ok: false, error }, status);
}

function sanitizeName(raw) {
  if (typeof raw !== 'string') return DEFAULT_NAME;
  const trimmed = raw.trim().slice(0, MAX_NAME_LENGTH);
  return trimmed || DEFAULT_NAME;
}

async function handleRanking(env) {
  const { results } = await env.DB.prepare(
    'SELECT name, score, created_at FROM fuwao_scores ORDER BY score DESC, created_at ASC LIMIT ?1'
  ).bind(RANKING_LIMIT).all();
  return jsonResponse({ ok: true, results });
}

// Called once when a play session starts. Issues a one-time-use token that
// /score must present, so a score can't be posted without a matching
// "a game actually started" record first.
async function handleSessionStart(env) {
  const cutoff = Date.now() - SESSION_MAX_AGE_MS;
  await env.DB.prepare('DELETE FROM game_sessions WHERE created_at < ?1').bind(cutoff).run();

  const token = crypto.randomUUID();
  await env.DB.prepare(
    'INSERT INTO game_sessions (token, game_id, stage, used, created_at) VALUES (?1, ?2, ?3, 0, ?4)'
  ).bind(token, GAME_ID, STAGE, Date.now()).run();

  return jsonResponse({ ok: true, token });
}

async function handleScoreSubmit(request, env) {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return errorResponse('invalid_json', 400);
  }
  if (!body || typeof body !== 'object') {
    return errorResponse('invalid_body', 400);
  }

  const { score, name, token } = body;

  if (!Number.isInteger(score) || score < MIN_SCORE || score > MAX_SCORE) {
    return errorResponse('invalid_score', 400);
  }
  if (typeof token !== 'string' || !token) {
    return errorResponse('invalid_token', 400);
  }

  const cutoff = Date.now() - SESSION_MAX_AGE_MS;
  const consumed = await env.DB.prepare(
    'UPDATE game_sessions SET used = 1 WHERE token = ?1 AND game_id = ?2 AND stage = ?3 AND used = 0 AND created_at >= ?4'
  ).bind(token, GAME_ID, STAGE, cutoff).run();
  if (!consumed.meta || consumed.meta.changes === 0) {
    return errorResponse('invalid_session', 403);
  }

  const createdAt = new Date().toISOString();
  await env.DB.prepare(
    'INSERT INTO fuwao_scores (name, score, created_at) VALUES (?1, ?2, ?3)'
  ).bind(sanitizeName(name), score, createdAt).run();

  return jsonResponse({ ok: true });
}

export async function routeFuwao(request, env, path) {
  if (path === '/api/fuwao/ranking') {
    if (request.method !== 'GET') return errorResponse('method_not_allowed', 405);
    try {
      return await handleRanking(env);
    } catch (e) {
      return errorResponse('server_error', 500);
    }
  }

  if (path === '/api/fuwao/session') {
    if (request.method !== 'POST') return errorResponse('method_not_allowed', 405);
    if (!(await checkRateLimit(env, 'fuwao-session', request, 20, 600))) {
      return errorResponse('rate_limited', 429);
    }
    try {
      return await handleSessionStart(env);
    } catch (e) {
      return errorResponse('server_error', 500);
    }
  }

  if (path === '/api/fuwao/score') {
    if (request.method !== 'POST') return errorResponse('method_not_allowed', 405);
    if (!(await checkRateLimit(env, 'fuwao-score', request, 20, 600))) {
      return errorResponse('rate_limited', 429);
    }
    try {
      return await handleScoreSubmit(request, env);
    } catch (e) {
      return errorResponse('server_error', 500);
    }
  }

  return null;
}
