-- line4 (黄昏のフォー・イン・ア・ロウ) online multiplayer rooms.
-- Lives in its own database (line4-rooms-db), isolated from naogare-lab-db.
CREATE TABLE IF NOT EXISTS rooms (
  code TEXT PRIMARY KEY,
  status TEXT NOT NULL DEFAULT 'waiting',   -- 'waiting' | 'playing' | 'finished'
  p1_token TEXT NOT NULL,
  p2_token TEXT,
  starting_player INTEGER,                  -- 1 | 2 | NULL
  grid TEXT NOT NULL,                       -- JSON-encoded 6x7 grid
  current_player INTEGER NOT NULL DEFAULT 1,
  game_over INTEGER NOT NULL DEFAULT 0,     -- 0/1
  winner TEXT,                              -- '1' | '2' | 'draw' | NULL
  win_line TEXT,                            -- JSON-encoded [[r,c],...] | NULL
  rev INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_rooms_created_at ON rooms (created_at);
