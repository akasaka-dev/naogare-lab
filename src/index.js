import { routeLine4 } from './line4-online.js';

const MAX_HAIKU_LENGTH = 300;
const MIN_SCORE = 0;
const MAX_SCORE = 1000;
const MIN_STAGE = 1;
const MAX_STAGE = 10;
const MIN_QUALITY_SCORE = 0;
const MAX_QUALITY_SCORE = 100;
const GAME_ID = 'ikku-gozaru';
const RANKING_LIMIT = 20;
const RECENT_LIMIT = 20;

function jsonResponse(data, status) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  });
}

async function handleRanking(request, env) {
  const url = new URL(request.url);
  const stageParam = url.searchParams.get('stage');

  if (stageParam !== null) {
    const stage = Number(stageParam);
    if (!Number.isInteger(stage) || stage < MIN_STAGE || stage > MAX_STAGE) {
      return jsonResponse({ ok: false, error: 'invalid_stage' }, 400);
    }
    const { results } = await env.DB.prepare(
      'SELECT id, score, quality_score, haiku, stage, created_at FROM haiku_scores WHERE game_id = ?1 AND stage = ?2 ORDER BY score DESC, created_at ASC LIMIT ?3'
    ).bind(GAME_ID, stage, RANKING_LIMIT).all();
    return jsonResponse({ ok: true, results });
  }

  const { results } = await env.DB.prepare(
    'SELECT id, score, quality_score, haiku, stage, created_at FROM haiku_scores WHERE game_id = ?1 ORDER BY quality_score DESC, created_at ASC LIMIT ?2'
  ).bind(GAME_ID, RANKING_LIMIT).all();
  return jsonResponse({ ok: true, results });
}

async function handleRecent(env) {
  const { results } = await env.DB.prepare(
    'SELECT id, score, quality_score, haiku, stage, created_at FROM haiku_scores WHERE game_id = ?1 ORDER BY created_at DESC LIMIT ?2'
  ).bind(GAME_ID, RECENT_LIMIT).all();
  return jsonResponse({ ok: true, results });
}

async function handleScoreSubmit(request, env) {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return jsonResponse({ ok: false, error: 'invalid_json' }, 400);
  }
  if (!body || typeof body !== 'object') {
    return jsonResponse({ ok: false, error: 'invalid_body' }, 400);
  }

  const { score, haiku, stage, qualityScore } = body;

  if (!Number.isInteger(score) || score < MIN_SCORE || score > MAX_SCORE) {
    return jsonResponse({ ok: false, error: 'invalid_score' }, 400);
  }
  if (typeof haiku !== 'string' || haiku.trim().length === 0) {
    return jsonResponse({ ok: false, error: 'invalid_haiku' }, 400);
  }
  if (haiku.length > MAX_HAIKU_LENGTH) {
    return jsonResponse({ ok: false, error: 'haiku_too_long' }, 400);
  }
  if (!Number.isInteger(stage) || stage < MIN_STAGE || stage > MAX_STAGE) {
    return jsonResponse({ ok: false, error: 'invalid_stage' }, 400);
  }
  if (!Number.isInteger(qualityScore) || qualityScore < MIN_QUALITY_SCORE || qualityScore > MAX_QUALITY_SCORE) {
    return jsonResponse({ ok: false, error: 'invalid_quality_score' }, 400);
  }

  const createdAt = new Date().toISOString();
  await env.DB.prepare(
    'INSERT INTO haiku_scores (score, haiku, created_at, game_id, stage, quality_score) VALUES (?1, ?2, ?3, ?4, ?5, ?6)'
  ).bind(score, haiku, createdAt, GAME_ID, stage, qualityScore).run();

  return jsonResponse({ ok: true });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === '/api/ikku-gozaru/ranking') {
      if (request.method !== 'GET') return jsonResponse({ ok: false, error: 'method_not_allowed' }, 405);
      try {
        return await handleRanking(request, env);
      } catch (e) {
        return jsonResponse({ ok: false, error: 'server_error' }, 500);
      }
    }

    if (path === '/api/ikku-gozaru/recent') {
      if (request.method !== 'GET') return jsonResponse({ ok: false, error: 'method_not_allowed' }, 405);
      try {
        return await handleRecent(env);
      } catch (e) {
        return jsonResponse({ ok: false, error: 'server_error' }, 500);
      }
    }

    if (path === '/api/ikku-gozaru/score') {
      if (request.method !== 'POST') return jsonResponse({ ok: false, error: 'method_not_allowed' }, 405);
      try {
        return await handleScoreSubmit(request, env);
      } catch (e) {
        return jsonResponse({ ok: false, error: 'server_error' }, 500);
      }
    }

    // line4 (黄昏のフォー・イン・ア・ロウ) online multiplayer — isolated in
    // line4-online.js / the LINE4_ROOMS KV namespace, untouched by anything above.
    if (path.startsWith('/api/line4/')) {
      try {
        const res = await routeLine4(request, env, path);
        if (res) return res;
      } catch (e) {
        return jsonResponse({ ok: false, error: 'server_error' }, 500);
      }
    }

    return env.ASSETS.fetch(request);
  }
};
