CREATE TABLE IF NOT EXISTS video (
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  is_published boolean DEFAULT FALSE,
  _created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  _updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  title varchar(150) UNIQUE,
  description text,
  caption text,
  attribution text,
  status text CHECK (status IN ('pending', 'ready', 'cancelled')),
  provider text DEFAULT 'mux' CHECK (provider IN ('mux')),
  asset_data jsonb,
  CONSTRAINT is_ready_if_is_published CHECK (
    (
      is_published IS TRUE
      AND status = 'ready'
    )
    OR is_published IS NOT TRUE
  ),
  CONSTRAINT has_required_fields_if_published CHECK (
      (
        is_published IS TRUE
        AND _created_at IS NOT NULL
        AND _updated_at IS NOT NULL
        AND title IS NOT NULL
        AND description IS NOT NULL
        AND status IS NOT NULL
        AND provider IS NOT NULL
        AND asset_data IS NOT NULL
      )
      OR is_published IS NOT TRUE
  ),
  CONSTRAINT has_asset_data_if_status_is_ready CHECK (
    (
      status = 'ready'
      AND asset_data IS NOT NULL
    ) 
    OR status != 'ready'
  )
);

CREATE EXTENSION IF NOT EXISTS moddatetime SCHEMA extensions;

CREATE TRIGGER handle_updated_at
  BEFORE UPDATE ON video
  FOR EACH ROW
  EXECUTE PROCEDURE moddatetime (_updated_at);

