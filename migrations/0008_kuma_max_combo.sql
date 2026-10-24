-- Longest unbroken run of on-beat hits in the run, shown under the name in the
-- ranking. Rows written before this column existed hold 0 (nothing is shown).
ALTER TABLE kuma_scores ADD COLUMN max_combo INTEGER NOT NULL DEFAULT 0;
