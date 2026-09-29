CREATE TABLE IF NOT EXISTS affiliate_users (
  id uuid PRIMARY KEY,
  email text NOT NULL UNIQUE CHECK (email = lower(email)),
  name text NOT NULL,
  company text NOT NULL DEFAULT '',
  role text NOT NULL CHECK (role IN ('admin', 'partner')),
  code text NOT NULL UNIQUE,
  active boolean NOT NULL DEFAULT true,
  password_hash text,
  mfa_secret text,
  last_totp_step bigint NOT NULL DEFAULT -1,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS affiliate_links (
  id uuid PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES affiliate_users(id),
  slug text NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9][a-z0-9_-]{1,46}[a-z0-9]$' AND slug !~ '[_-]{2}'),
  label text NOT NULL,
  active boolean NOT NULL DEFAULT true,
  is_primary boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS affiliate_links_owner ON affiliate_links(user_id);
CREATE UNIQUE INDEX IF NOT EXISTS affiliate_links_primary_owner ON affiliate_links(user_id) WHERE is_primary=true;
CREATE TABLE IF NOT EXISTS affiliate_sessions (
  hash text PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES affiliate_users(id),
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS affiliate_sessions_owner ON affiliate_sessions(user_id);
CREATE TABLE IF NOT EXISTS affiliate_invites (
  hash text PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES affiliate_users(id),
  expires_at timestamptz NOT NULL,
  used_at timestamptz,
  enrollment_secret text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS affiliate_invites_owner ON affiliate_invites(user_id);
CREATE TABLE IF NOT EXISTS affiliate_recovery_codes (
  hash text PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES affiliate_users(id)
);
CREATE TABLE IF NOT EXISTS affiliate_rate_limits (
  key text PRIMARY KEY,
  window_start timestamptz NOT NULL DEFAULT now(),
  hits integer NOT NULL DEFAULT 1
);
CREATE TABLE IF NOT EXISTS affiliate_audit (
  id uuid PRIMARY KEY,
  actor_id uuid REFERENCES affiliate_users(id),
  action text NOT NULL,
  target_id uuid,
  details jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);
