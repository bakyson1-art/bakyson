-- Bakyson admin dashboard seed
-- Run this against the production database to create an admin account.
-- Example: psql "$DATABASE_URL" -f database/seed.sql

-- Create an admin user (change the email/password before running in production)
INSERT INTO users (email, password_hash, role, created_at)
SELECT 'admin@bakyson.com', crypt('Admin@bakyson2026', gen_salt('bf')), 'admin', NOW()
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@bakyson.com');

-- Note: the `crypt()` function requires the pgcrypto extension:
-- CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Alternatively, if pgcrypto is unavailable, generate the bcrypt hash with Node:
--   const bcrypt = require('bcryptjs');
--   bcrypt.hash('Admin@bakyson2026', 10)
-- and insert the hash directly:
--
-- INSERT INTO users (email, password_hash, role)
-- VALUES ('admin@bakyson.com', '<bcrypt hash>', 'admin')
-- ON CONFLICT (email) DO NOTHING;
