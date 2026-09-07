CREATE TABLE IF NOT EXISTS snake_scores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  score INTEGER NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_snake_scores_ranking ON snake_scores (score DESC, created_at ASC);
