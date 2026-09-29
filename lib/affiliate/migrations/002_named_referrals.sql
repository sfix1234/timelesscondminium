ALTER TABLE affiliate_links ADD COLUMN IF NOT EXISTS is_primary boolean NOT NULL DEFAULT false;
ALTER TABLE affiliate_links DROP CONSTRAINT IF EXISTS affiliate_links_slug_check;
ALTER TABLE affiliate_links ADD CONSTRAINT affiliate_links_slug_check CHECK (
  slug ~ '^[a-z0-9][a-z0-9_-]{1,46}[a-z0-9]$'
  AND slug !~ '[_-]{2}'
);
CREATE UNIQUE INDEX IF NOT EXISTS affiliate_links_primary_owner ON affiliate_links(user_id) WHERE is_primary=true;
