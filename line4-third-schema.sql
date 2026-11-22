-- line4-third (黄昏のフォー・イン・ア・ロウ 3D) online multiplayer rooms (2 players, 4x4x4 board).
-- Lives in its own database (line4-third-rooms-db), isolated from naogare-lab-db.
CREATE TABLE IF NOT EXISTS rooms (
  code TEXT PRIMARY KEY,
  status TEXT NOT NULL DEFAULT 'waiting',   -- 'waiting' | 'playing' | 'finished'
  p1_token TEXT,                             -- nullable: "winner stays" (handleRematch) can
  p2_token TEXT,                             -- vacate either slot, not just p2, between matches
  p1_name TEXT,                             -- display name, sanitizeName()-capped
  p2_name TEXT,
  p1_streak INTEGER NOT NULL DEFAULT 0,     -- consecutive wins by this slot's current occupant
  p2_streak INTEGER NOT NULL DEFAULT 0,
  turn_started_at INTEGER,                  -- epoch ms; a turn open longer than TURN_TIMEOUT_MS forfeits (checked lazily in loadRoom)
  match_started_at INTEGER,                 -- epoch ms when the current match began; NULL while waiting. Unlike turn_started_at this doesn't reset per move — shown as "elapsed time" to a would-be joiner who hits room_full
  starting_player INTEGER,                  -- 1 | 2 | NULL
  grid TEXT NOT NULL,                       -- JSON-encoded 64-cell grid (idx = z*16 + y*4 + x)
  current_player INTEGER NOT NULL DEFAULT 1,
  game_over INTEGER NOT NULL DEFAULT 0,     -- 0/1
  winner TEXT,                              -- '1' | '2' | 'draw' | NULL
  win_line TEXT,                            -- JSON-encoded [idx,idx,idx,idx] | NULL
  rev INTEGER NOT NULL DEFAULT 0,
  emote TEXT,                               -- last emote icon sent, e.g. '👍' | NULL
  emote_by INTEGER,                         -- 1 | 2 | NULL — who sent the last emote
  emote_rev INTEGER NOT NULL DEFAULT 0,     -- bumped on every emote, independent of `rev`
  cards TEXT,                               -- JSON {"1": lv, "2": lv}: the trump card dealt to each player (1..5); NULL before a match starts
  cs TEXT,                                  -- JSON {"used": {"1": bool, "2": bool}, "sealed": [cell,...]}: spent cards and walls
  pending TEXT,                             -- JSON {player, effLv, cands} while a usurp waits for the player's pick
  last_card TEXT,                           -- JSON of the last card played (what the other client replays): {seq, by, lv, effLv, cells, endsTurn, grid, sealed}
  card_seq INTEGER NOT NULL DEFAULT 0,      -- bumped on every card played
  cpu_player INTEGER NOT NULL DEFAULT 0,     -- 0 | 1 | 2: the seat held by the "skip waiting" CPU (see handleFillCpu)
  cpu_difficulty TEXT,                      -- 'easy' | 'normal' | 'hard' | NULL
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_rooms_created_at ON rooms (created_at);
