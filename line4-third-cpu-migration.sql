-- Adds the "skip waiting" CPU columns to an existing line4-third rooms table. Run once.
ALTER TABLE rooms ADD COLUMN cpu_player INTEGER NOT NULL DEFAULT 0;
ALTER TABLE rooms ADD COLUMN cpu_difficulty TEXT;
