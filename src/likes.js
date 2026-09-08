// ---------------------------------------------------------------------------
// Top-page catalog "like" counters — one row per game in game_likes. There is
// no account system, so a visitor can only be stopped from re-liking by the
// client (localStorage flag in index.html); this endpoint's rate limit is
// just an anti-spam net against scripted requests, not a dedup mechanism.
// ---------------------------------------------------------------------------

import { checkRateLimit } from './rate-limit.js';

const VALID_GAME_IDS = new Set(['fuwao', 'line4', 'ikku-gozaru', 'snake']);

function jsonResponse(data, status) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  });
}

function errorResponse(error, status) {
  return jsonResponse({ ok: false, error }, status);
}

async function handleGetLikes(env) {
  const { results } = await env.DB.prepare('SELECT game_id, count FROM game_likes').all();
  const counts = {};
  for (const id of VALID_GAME_IDS) counts[id] = 0;
  for (const row of results) counts[row.game_id] = row.count;
  return jsonResponse({ ok: true, counts });
}

async function handleLike(gameId, env) {
  await env.DB.prepare(
    `INSERT INTO game_likes (game_id, count) VALUES (?1, 1)
     ON CONFLICT(game_id) DO UPDATE SET count = count + 1`
  ).bind(gameId).run();
  const row = await env.DB.prepare('SELECT count FROM game_likes WHERE game_id = ?1').bind(gameId).first();
  return jsonResponse({ ok: true, count: row ? row.count : 1 });
}

export async function routeLikes(request, env, path) {
  if (path === '/api/likes') {
    if (request.method !== 'GET') return errorResponse('method_not_allowed', 405);
    try {
      return await handleGetLikes(env);
    } catch (e) {
      return errorResponse('server_error', 500);
    }
  }

  const match = path.match(/^\/api\/likes\/([^/]+)$/);
  if (match) {
    const gameId = match[1];
    if (!VALID_GAME_IDS.has(gameId)) return errorResponse('invalid_game', 400);
    if (request.method !== 'POST') return errorResponse('method_not_allowed', 405);
    if (!(await checkRateLimit(env, 'like', request, 20, 600))) {
      return errorResponse('rate_limited', 429);
    }
    try {
      return await handleLike(gameId, env);
    } catch (e) {
      return errorResponse('server_error', 500);
    }
  }

  return null;
}
