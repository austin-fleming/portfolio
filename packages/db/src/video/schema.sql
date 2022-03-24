CREATE TABLE IF NOT EXISTS video (
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  _created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  _updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  title varchar(150) UNIQUE NOT NULL,
  description text NOT NULL,
  caption text,
  attribution text,
  status text NOT NULL CHECK (status IN ('pending', 'ready', 'cancelled')),
  provider text DEFAULT 'mux' NOT NULL CHECK (provider IN ('mux')),
  asset_data jsonb,
  CONSTRAINT has_asset_data_if_status_is_ready CHECK ((status = 'ready' AND asset_data IS NOT NULL) OR status != 'ready')
);

CREATE EXTENSION IF NOT EXISTS moddatetime SCHEMA extensions;

CREATE TRIGGER handle_updated_at
  BEFORE UPDATE ON video
  FOR EACH ROW
  EXECUTE PROCEDURE moddatetime (_updated_at);

