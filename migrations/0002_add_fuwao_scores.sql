CREATE TABLE IF NOT EXISTS fuwao_scores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  score INTEGER NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_fuwao_scores_ranking ON fuwao_scores (score DESC, created_at ASC);
