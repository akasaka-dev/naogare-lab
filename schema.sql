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
