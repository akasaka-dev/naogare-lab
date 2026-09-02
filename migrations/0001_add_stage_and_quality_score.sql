ALTER TABLE haiku_scores ADD COLUMN stage INTEGER NOT NULL DEFAULT 1;
ALTER TABLE haiku_scores ADD COLUMN quality_score INTEGER NOT NULL DEFAULT 0;

DROP INDEX IF EXISTS idx_haiku_scores_ranking;
CREATE INDEX IF NOT EXISTS idx_haiku_scores_ranking ON haiku_scores (game_id, quality_score DESC, created_at ASC);
CREATE INDEX IF NOT EXISTS idx_haiku_scores_stage_ranking ON haiku_scores (game_id, stage, score DESC, created_at ASC);
