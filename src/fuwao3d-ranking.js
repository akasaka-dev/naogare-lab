// ---------------------------------------------------------------------------
// fuwao-3D (たすけあいヒーロー ふわお 3D) time-attack ranking — isolated in this
// file so it never touches the original 2D fuwao's routes/table
// (fuwao-ranking.js / fuwao_scores) or ikku-gozaru's. Reuses the shared
// `game_sessions` and `rate_limits` tables in env.DB (same anti-cheat token +
// rate limiting pattern as every other game here), but has its own dedicated
// `fuwao3d_scores` table. Ranked fastest-first (ascending seconds).
// ---------------------------------------------------------------------------

import { checkRateLimit } from './rate-limit.js';

const GAME_ID = 'fuwao3d';
const STAGE = 1; // game_sessions.stage has no meaning here — fixed constant so the column stays NOT NULL
const MIN_SECONDS = 30;        // nobody clears the game in under 30 seconds
const MAX_SECONDS = 3 * 60 * 60; // matches SESSION_MAX_AGE_MS below — a session can't outlive its own token anyway
const MIN_HEARTS = 1;          // the revive counter (🤍) starts at 1 and only goes up
const MAX_HEARTS = 999;
const MIN_EQUIP = 0;
const MAX_EQUIP = 3;           // choco tank / jet wings / yeast cannon — see docs/scene-notes.md
const MAX_NAME_LENGTH = 20;
const DEFAULT_NAME = 'ふわお';
const RANKING_LIMIT = 10;
const SESSION_MAX_AGE_MS = 3 * 60 * 60 * 1000; // 3 hours — generous for a single continuous clear attempt

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
    'SELECT name, seconds, hearts, equip, created_at FROM fuwao3d_scores ORDER BY seconds ASC, created_at ASC LIMIT ?1'
  ).bind(RANKING_LIMIT).all();
  return jsonResponse({ ok: true, results });
}

// Called once when a time-attack run starts (client: right when the opening
// ends and the player gains control). Issues a one-time-use token that
// /score must present, so a score can't be posted without a matching
// "a run actually started" record first.
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

  const { seconds, hearts, equip, name, token } = body;

  if (!Number.isInteger(seconds) || seconds < MIN_SECONDS || seconds > MAX_SECONDS) {
    return errorResponse('invalid_seconds', 400);
  }
  if (!Number.isInteger(hearts) || hearts < MIN_HEARTS || hearts > MAX_HEARTS) {
    return errorResponse('invalid_hearts', 400);
  }
  if (!Number.isInteger(equip) || equip < MIN_EQUIP || equip > MAX_EQUIP) {
    return errorResponse('invalid_equip', 400);
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
    'INSERT INTO fuwao3d_scores (name, seconds, hearts, equip, created_at) VALUES (?1, ?2, ?3, ?4, ?5)'
  ).bind(sanitizeName(name), seconds, hearts, equip, createdAt).run();

  return jsonResponse({ ok: true });
}

export async function routeFuwao3d(request, env, path) {
  if (path === '/api/fuwao3d/ranking') {
    if (request.method !== 'GET') return errorResponse('method_not_allowed', 405);
    try {
      return await handleRanking(env);
    } catch (e) {
      return errorResponse('server_error', 500);
    }
  }

  if (path === '/api/fuwao3d/session') {
    if (request.method !== 'POST') return errorResponse('method_not_allowed', 405);
    if (!(await checkRateLimit(env, 'fuwao3d-session', request, 20, 600))) {
      return errorResponse('rate_limited', 429);
    }
    try {
      return await handleSessionStart(env);
    } catch (e) {
      return errorResponse('server_error', 500);
    }
  }

  if (path === '/api/fuwao3d/score') {
    if (request.method !== 'POST') return errorResponse('method_not_allowed', 405);
    if (!(await checkRateLimit(env, 'fuwao3d-score', request, 20, 600))) {
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
