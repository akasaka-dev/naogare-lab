-- line4 (黄昏のフォー・イン・ア・ロウ) online multiplayer rooms.
-- Lives in its own database (line4-rooms-db), isolated from naogare-lab-db.
CREATE TABLE IF NOT EXISTS rooms (
  code TEXT PRIMARY KEY,
  status TEXT NOT NULL DEFAULT 'waiting',   -- 'waiting' | 'playing' | 'finished'
  p1_token TEXT,                             -- nullable: "winner stays" (handleRematch) can
  p2_token TEXT,                             -- vacate either slot, not just p2, between matches
  p1_name TEXT,                             -- display name, sanitizeName()-capped
  p2_name TEXT,
  p1_streak INTEGER NOT NULL DEFAULT 0,     -- consecutive wins by this slot's current occupant
  p2_streak INTEGER NOT NULL DEFAULT 0,
  starting_player INTEGER,                  -- 1 | 2 | NULL
  grid TEXT NOT NULL,                       -- JSON-encoded 6x7 grid
  current_player INTEGER NOT NULL DEFAULT 1,
  game_over INTEGER NOT NULL DEFAULT 0,     -- 0/1
  winner TEXT,                              -- '1' | '2' | 'draw' | NULL
  win_line TEXT,                            -- JSON-encoded [[r,c],...] | NULL
  rev INTEGER NOT NULL DEFAULT 0,
  emote TEXT,                               -- last emote icon sent, e.g. '👍' | NULL
  emote_by INTEGER,                         -- 1 | 2 | NULL — who sent the last emote
  emote_rev INTEGER NOT NULL DEFAULT 0,     -- bumped on every emote, independent of `rev`
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_rooms_created_at ON rooms (created_at);
