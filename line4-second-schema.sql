-- line4-second (黄昏のフォー・イン・ア・ロウ 地平の行方) online multiplayer
-- rooms. Lives in its own database (line4-second-rooms-db), isolated from
-- both naogare-lab-db and line4's own line4-rooms-db — see wrangler.toml's
-- comment on LINE4_SECOND_DB for why. 3 players (not 2) on an 8x7 board
-- (not 7x6), otherwise the same room lifecycle as line4's own rooms table.
CREATE TABLE IF NOT EXISTS rooms (
  code TEXT PRIMARY KEY,
  status TEXT NOT NULL DEFAULT 'waiting',   -- 'waiting' | 'playing' | 'finished'
  p1_token TEXT,                            -- nullable: "winner stays" (handleRematch) can
  p2_token TEXT,                            -- vacate any slot, not just the losers', between matches
  p3_token TEXT,
  p1_name TEXT,                             -- display name, sanitizeName()-capped
  p2_name TEXT,
  p3_name TEXT,
  p1_streak INTEGER NOT NULL DEFAULT 0,     -- consecutive wins by this slot's current occupant
  p2_streak INTEGER NOT NULL DEFAULT 0,
  p3_streak INTEGER NOT NULL DEFAULT 0,
  turn_started_at INTEGER,                  -- epoch ms; a turn open longer than TURN_TIMEOUT_MS is skipped (checked lazily in loadRoom)
  match_started_at INTEGER,                 -- epoch ms when the current match began; NULL while waiting — shown as "elapsed time" to a would-be joiner who hits room_full
  starting_player INTEGER,                  -- 1 | 2 | 3 | NULL
  grid TEXT NOT NULL,                       -- JSON-encoded 7x8 grid
  current_player INTEGER NOT NULL DEFAULT 1,
  game_over INTEGER NOT NULL DEFAULT 0,     -- 0/1
  winner TEXT,                              -- '1' | '2' | '3' | 'draw' | NULL
  win_line TEXT,                            -- JSON-encoded [[r,c],...] | NULL
  rev INTEGER NOT NULL DEFAULT 0,
  emote TEXT,                               -- last emote icon sent, e.g. '👍' | NULL
  emote_by INTEGER,                         -- 1 | 2 | 3 | NULL — who sent the last emote
  emote_rev INTEGER NOT NULL DEFAULT 0,     -- bumped on every emote, independent of `rev`
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_rooms_created_at ON rooms (created_at);
