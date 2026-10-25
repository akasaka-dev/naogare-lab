-- The EXTRA stage has its own ranking in the same table: board 0 = the normal
-- ranking (all rows so far), board 1 = EXTRA (written with level 9).
ALTER TABLE kuma_scores ADD COLUMN board INTEGER NOT NULL DEFAULT 0;
