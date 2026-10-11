DROP INDEX IF EXISTS idx_kuma_scores_ranking;
CREATE INDEX IF NOT EXISTS idx_kuma_scores_total ON kuma_scores (score DESC, created_at ASC);
