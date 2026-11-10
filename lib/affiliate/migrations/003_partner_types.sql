ALTER TABLE affiliate_users ADD COLUMN IF NOT EXISTS partner_type text
  CONSTRAINT affiliate_users_partner_type_check CHECK (partner_type IN ('101', '201'));
