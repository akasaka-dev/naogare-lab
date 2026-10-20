-- Highest LEVEL reached during the run (1-4, 5 = the sage / SuperHard phase),
-- shown next to the start level. Rows written before this column existed hold
-- 0; kuma-ranking.js shows the start level for them.
ALTER TABLE kuma_scores ADD COLUMN reached INTEGER NOT NULL DEFAULT 0;
