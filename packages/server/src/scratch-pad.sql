-- EXAMPLES:
-- REF: https://github.com/morenoh149/postgresDBSamples/blob/master/adventureworks/install.sql
-- REF: https://www.youtube.com/watch?v=C29kMuMTmKQ



-- ###################################
-- ###### EXTENSIONS
-- ###################################

CREATE extension IF NOT EXISTS 'uuid-ossp';



-- ###################################
-- ###### SCHEMAS
-- ###################################
CREATE TABLE person (
    id  uuid PRIMARY KEY DEFAULT uuid_generate_v4(),

)



-- Needs event for save vs publish changes. "Save" should create a draft.uuid which becomes the main one when published.
-- Draft should have looser requirements so it isn't kicked out for missing a field. Constraints should be the same,
-- but "NOT NULL" should be removed.
CREATE TABLE post (
    id          uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug        TEXT UNIQUE NOT NULL CHECK (char_length(slug) > 15 AND char_length(slug) < 72),
    title       TEXT UNIQUE NOT NULL CHECK (char_length(title) < 150),
    summary     TEXT NOT NULL CHECK (char_length(summary) < 150),
    body        TEXT NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    viewCount   INT NOT NULL,
);


-- REF: https://dba.stackexchange.com/questions/67852/how-to-create-table-like-without-the-not-null-constraints
-- Don't directly modify "post" when editing. Edit "post_draft" then overwrite on publish. Delete draft on publish, then only recreate on change.
-- Have a "drop changes" that deletes the "post_draft".
-- CREATE TABLE portfolio_site.post_draft {};
/* 
    -- internal. automatic.
    created_at
    revised_at
    -- public. Editor set.
    date_published
    date_updated

 */

CREATE OR REPLACE FUNCTION all_posts