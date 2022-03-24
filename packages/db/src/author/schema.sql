CREATE TABLE IF NOT EXISTS author (
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  _created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  _updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  name text NOT NULL,
  slug text NOT NULL,
  is_active boolean NOT NULL DEFAULT FALSE,
  blurb text NOT NULL,
  avatar jsonb NOT NULL,
  personal_site text,
  social_sites text[]
);

CREATE EXTENSION IF NOT EXISTS moddatetime SCHEMA extensions;

CREATE TRIGGER handle_updated_at
  BEFORE UPDATE ON author
  FOR EACH ROW
  EXECUTE PROCEDURE moddatetime (_updated_at);

