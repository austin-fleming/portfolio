CREATE TABLE IF NOT EXISTS case_study (
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  _created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  _updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  date_published timestamp with time zone,
  CONSTRAINT date_published_set_if_published CHECK ((is_published = TRUE AND date_published IS NOT NULL) OR is_published = FALSE),
  date_modified timestamp with time zone,
  is_published boolean DEFAULT FALSE NOT NULL,
  slug text NOT NULL,
  author uuid REFERENCES author (id),
  title text NOT NULL,
  subtitle text NOT NULL,
  summary text NOT NULL,
  details jsonb,
  note jsonb,
  feature_image jsonb NOT NULL,
  feature_video uuid REFERENCES video (id),
  body jsonb NOT NULL
);

CREATE EXTENSION IF NOT EXISTS moddatetime SCHEMA extensions;

CREATE TRIGGER handle_updated_at
  BEFORE UPDATE ON case_study
  FOR EACH ROW
  EXECUTE PROCEDURE moddatetime (_updated_at);

