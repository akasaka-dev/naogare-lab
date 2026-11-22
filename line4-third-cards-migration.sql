-- Adds the trump-card columns to an existing line4-third rooms table (databases created from the
-- first version of line4-third-schema.sql). Fresh databases already have them. Run once.
ALTER TABLE rooms ADD COLUMN cards TEXT;
ALTER TABLE rooms ADD COLUMN cs TEXT;
ALTER TABLE rooms ADD COLUMN pending TEXT;
ALTER TABLE rooms ADD COLUMN last_card TEXT;
ALTER TABLE rooms ADD COLUMN card_seq INTEGER NOT NULL DEFAULT 0;
