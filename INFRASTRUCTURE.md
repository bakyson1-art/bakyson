# Bakyson — Infrastructure & Operations

> **Status:** Draft. Items marked **[TBD]** require client or infra decision before finalisation.
> Covers environments, deployment, DNS, monitoring, backups, and operational procedures.

---

## 1. Environments

| Environment | Purpose | URL | Status |
|-------------|---------|-----|--------|
| Local development | Developer machine | `http://localhost:3000` | ✅ |
| Preview (Vercel) | Pre-production builds | `*.vercel.app` | **[TBD]** configured? |
| Production | Live public site | `https://bakyson.vercel.app` | **[TBD]** domain TBD |
| Database | Shared PostgreSQL | Railway Postgres | **[TBD]** provisioned? |

### Domain rule (client, repeated multiple times)

**`bakyson.com` is NOT the client's domain. Never use it anywhere** (code, copy, comments, docs).
The production domain has not been confirmed. Use `bakyson.vercel.app` for technical references only until the client confirms a real domain.

---

## 2. Deployment pipeline

### Primary path: GitHub → Vercel (auto-deploy on push to `master`)

**.github/workflows/ci.yml:**

1. **lint** — `npm ci`, `npm run lint` (ESLint v9)
2. **build** — `npm ci`, `npm run build` (Next.js 16 Turbopack, includes TypeScript type-check)
3. **deploy** — `npx vercel pull --yes --environment=production`, `npx vercel deploy --prod` (only on push to `master`/`main`)

**Secrets required in GitHub:**
- `VERCEL_TOKEN` — Vercel CLI authentication

### Alternative path: Docker + Railway

- `Dockerfile` — `node:20-alpine`, copies package files, runs `npm ci`, `npm run build`, exposes 3000, runs `npm start`.
- `railway.toml` — Dockerfile builder, startCommand `npm run start`, healthcheckPath `/api/health`.

---

## 3. Environment variables

| Variable | Purpose | Local (`.env.local`) | Production (Vercel) |
|----------|---------|---------------------|---------------------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ set | **[TBD]** |
| `NEXTAUTH_URL` | NextAuth callback base URL | ✅ set | **[TBD]** must match production domain |
| `NEXTAUTH_SECRET` | NextAuth signing secret | ✅ set | **[TBD]** |
| `RESEND_API_KEY` | Resend email API key | ✅ set | **[TBD]** |
| `SENTRY_DSN` | Sentry data source name | ✅ set | **[TBD]** |
| `NEXT_PUBLIC_ADMIN_URL` | Public URL of separate admin app | ✅ set | **[TBD]** |

**`.env.local` exists locally and is gitignored. Never print or commit secrets.**

---

## 4. Database (Railway PostgreSQL)

- Shared with admin dashboard application.
- Provisioned via Railway Postgres service.
- Connection: public network URL (Postgres → Connect → Public Network).
- Schema applied via `node scripts/db-setup.mjs` (idempotent `CREATE TABLE IF NOT EXISTS`).
- Admin account created/reset via `scripts/db-setup.mjs` or `scripts/admin-account.mjs`.

**Not verified:** Whether Railway Postgres is provisioned, whether `db-setup.mjs` has been run against it, and whether backups are configured.

---

## 5. Monitoring & observability

| Tool | Purpose | Status |
|------|---------|--------|
| Sentry (@sentry/nextjs) | Error tracking, performance tracing | Configured, DSN from env |
| Vercel analytics | Web vitals, deployment health | **[TBD]** enabled? |
| Uptime monitoring | `/api/health` endpoint available | **[TBD]** external monitor TBD |
| Alerting | Error rate, downtime alerts | **[TBD]** not configured |

---

## 6. Backups & disaster recovery

| Asset | Backup strategy | Status |
|-------|----------------|--------|
| PostgreSQL database | Railway managed backups | **[TBD]** verify retention |
| Application code | GitHub `master` branch | ✅ |
| Environment variables | `.env.local` (local only, not committed) | **[TBD]** production secrets in Vercel |
| PWA assets | Versioned via `CACHE_VERSION` in `sw.js` | ✅ |

**No documented disaster recovery procedure.** Need: restore steps, RTO/RPO targets, backup verification schedule.

---

## 7. Security considerations

| Area | Specification | Status |
|------|---------------|--------|
| Auth | next-auth v4, JWT, bcrypt (cost 10) | ✅ |
| Password reset | SHA-256 hash of token (never raw), `attempts`, `used`, `expires_at`, rate-limited | ✅ |
| CSRF | Custom `/api/csrf` endpoint + next-auth built-in CSRF | **[TBD]** evaluate redundancy |
| Headers | `X-Content-Type-Options: nosniff` on `/sw.js` and manifest | ✅ |
| CSP | Not configured | **[TBD]** |
| HTTPS | Vercel provides managed TLS | ✅ production |
| Secrets | `.env.local` gitignored, never committed | ✅ |
| Domain | `bakyson.com` forbidden | ✅ documented |

---

## 8. PWA / offline strategy

- Service worker registered in production only.
- Precaches public pages and build assets.
- Network-first navigation with cache fallback to `/offline`.
- `CACHE_VERSION` in `public/sw.js` must be bumped when precache list changes.
- Test offline behaviour: `npm run build && npm start`, then DevTools → Network → Offline.

---

## 9. Operational procedures

### Before every push (from `main-site/`)
```powershell
npm run lint
npm run build
```
Then manually confirm:
- Homepage shows exactly two logo instances
- No text "BAKYSON" used as logo
- Hero cycles all 6 verticals; play button resets 7s timer
- Hero masks correct at ≥1024px; mobile uses rounded fallbacks
- `#systems`, `#industries`, `#contact` anchors scroll correctly
- Contact form posts to `/api/contact` and shows success toast
- No `bakyson.com` references (`git grep -i "bakyson\.com"`)
- No horizontal scroll at 375/768/1024/1440
- Build passes TypeScript

### Deployment
1. Push to `master` on GitHub.
2. GitHub Actions runs lint → build → deploy.
3. Vercel auto-deploys to production.
4. Verify live site at production URL.

**Note:** GitHub push ≠ deployment. Deployment is confirmed only after Vercel deploy step succeeds.

---

## 10. Infrastructure gaps / TBD

| Item | Description | Status |
|------|-------------|--------|
| Production domain | Unconfirmed. `bakyson.com` forbidden. | **[TBD]** client decision |
| Real contact email | `hello@bakyson.io` is placeholder. | **[TBD]** client decision |
| Database provisioning | Railway Postgres status unverified. | **[TBD]** verify |
| Database backups | Retention and restore procedure not documented. | **[TBD]** |
| Uptime monitoring | No external monitor configured on `/api/health`. | **[TBD]** |
| CSP headers | Not configured. | **[TBD]** |
| Disaster recovery | No documented restore procedure. | **[TBD]** |
| Preview environment | Vercel preview deployments not confirmed. | **[TBD]** |
