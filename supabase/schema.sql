```sql
-- ============================================================
-- TABLE CREATION
-- ============================================================
CREATE TABLE fire_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  latitude FLOAT8 NOT NULL,
  longitude FLOAT8 NOT NULL,
  wilaya TEXT,
  gravity TEXT CHECK (gravity IN ('faible','moyen','critique')),
  description TEXT,
  upvotes INTEGER DEFAULT 1 CHECK (upvotes >= 0),
  status TEXT DEFAULT 'en_attente' CHECK (status IN ('en_attente','confirme','maitrise')),
  device_fingerprint TEXT
);

-- ============================================================
-- INDEX
-- ============================================================
CREATE INDEX idx_fire_reports_location ON fire_reports (latitude, longitude);

-- ============================================================
-- REALTIME
-- ============================================================
ALTER PUBLICATION supabase_realtime ADD TABLE fire_reports;

-- ============================================================
-- RLS ACTIVATION
-- ============================================================
ALTER TABLE fire_reports ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- POLICIES SELECT
-- ============================================================
CREATE POLICY allow_select_all
  ON fire_reports
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- ============================================================
-- POLICIES INSERT
-- ============================================================
CREATE POLICY allow_insert_algeria_bounds
  ON fire_reports
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    latitude BETWEEN 18.9 AND 37.5
    AND longitude BETWEEN -8.8 AND 12.1
  );

-- ============================================================
-- REVOKE/GRANT UPDATE
-- ============================================================
REVOKE UPDATE ON fire_reports FROM anon, authenticated;
GRANT UPDATE (upvotes, status) ON fire_reports TO anon, authenticated;

-- ============================================================
-- POLICIES UPDATE
-- ============================================================
CREATE POLICY allow_update_upvotes_status
  ON fire_reports
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);
```
-- Migration : ajout du support photo + verification IA
ALTER TABLE fire_reports ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE fire_reports ADD COLUMN IF NOT EXISTS ai_verified BOOLEAN DEFAULT NULL;
ALTER TABLE fire_reports ADD COLUMN IF NOT EXISTS ai_confidence INTEGER DEFAULT NULL;
