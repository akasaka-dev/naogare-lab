CREATE TABLE IF NOT EXISTS haiku_scores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  score INTEGER NOT NULL,
  haiku TEXT NOT NULL,
  created_at TEXT NOT NULL,
  game_id TEXT NOT NULL DEFAULT 'ikku-gozaru',
  stage INTEGER NOT NULL DEFAULT 1,
  quality_score INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_haiku_scores_ranking ON haiku_scores (game_id, quality_score DESC, created_at ASC);
CREATE INDEX IF NOT EXISTS idx_haiku_scores_recent ON haiku_scores (game_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_haiku_scores_stage_ranking ON haiku_scores (game_id, stage, score DESC, created_at ASC);

-- One-time-use tokens proving a score submission followed an actual stage
-- attempt (issued by POST /api/ikku-gozaru/session, consumed by POST
-- .../score). Doesn't stop a determined attacker who reverse-engineers the
-- client, but blocks trivial "curl the score endpoint directly" spam.
CREATE TABLE IF NOT EXISTS game_sessions (
  token TEXT PRIMARY KEY,
  game_id TEXT NOT NULL,
  stage INTEGER NOT NULL,
  used INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_game_sessions_created_at ON game_sessions (created_at);

-- Fixed-window per-IP request counters for src/rate-limit.js. bucket_key is
-- `${bucket}:${ip}:${windowStart}`, so each window gets its own row and old
-- ones are swept opportunistically by checkRateLimit().
CREATE TABLE IF NOT EXISTS rate_limits (
  bucket_key TEXT PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 0,
  window_start INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_rate_limits_window ON rate_limits (window_start);
