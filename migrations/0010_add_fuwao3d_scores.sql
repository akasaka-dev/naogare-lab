-- fuwao-3D (たすけあいヒーロー ふわお 3D) time-attack ranking. A separate
-- table/game_id from the original 2D fuwao's fuwao_scores — same naming
-- convention as line4 vs line4-second so the two games can never collide.
CREATE TABLE IF NOT EXISTS fuwao3d_scores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  seconds INTEGER NOT NULL,
  hearts INTEGER NOT NULL,
  equip INTEGER NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_fuwao3d_scores_ranking ON fuwao3d_scores (seconds ASC, created_at ASC);
