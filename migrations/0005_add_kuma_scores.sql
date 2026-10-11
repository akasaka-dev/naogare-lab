CREATE TABLE IF NOT EXISTS kuma_scores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  score INTEGER NOT NULL,
  level INTEGER NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_kuma_scores_ranking ON kuma_scores (level, score DESC, created_at ASC);
