# Bakyson — Technical Architecture

> **Status:** Draft. Items marked **[TBD]** require client or infra decision before finalisation.
> Describes system structure, data flow, API contracts, and service boundaries for `main-site/`.

---

## 1. System overview

**Bakyson** is a public marketing website with an auth-gated client portal, deployed as a single Next.js 16 application. A separate admin dashboard application (`admin-dashboard/`) shares the same PostgreSQL database but is out of scope for this document.

### Actors

| Actor | Capabilities |
|-------|-------------|
| Public visitor | Browse services, request quotes, subscribe to newsletter, apply for careers |
| Client | Sign in to portal, view projects and tickets |
| Staff (admin / employee) | Manage users, projects, tickets via separate admin dashboard app |

---

## 2. Tech stack

| Layer | Technology | Version | Notes |
|-------|-----------|---------|-------|
| Framework | Next.js | 16.4.6 | App Router, Turbopack |
| UI | React | 19.3.0 | |
| Language | TypeScript | 5.x | `strict: true` |
| Styling | Tailwind CSS | 4.3.3 | `@import "tailwindcss"`, `@theme` tokens |
| Icons | lucide-react | ^1.76.0 | |
| Auth | next-auth | 4.24.15 | Credentials provider, JWT session |
| Database | PostgreSQL | — | `pg` client, shared with admin dashboard |
| Validation | zod | — | Schema validation on all API inputs |
| Email | resend | ^6.39.0 | Transactional email |
| Observability | @sentry/nextjs | ^11.15.0 | Client + edge + server |
| UI primitives | Radix Dialog + Toast | — | Dialog, Toast |
| Utilities | clsx, tailwind-merge, class-variance-authority | — | |
| PWA | Service Worker + Web App Manifest | — | Offline fallback, installable |
| Path alias | `@/*` → `src/*` | — | |

---

## 3. Application structure

```
src/
├─ app/
│  ├─ layout.tsx              # Root layout: font, metadata, SiteHeader, footer, PWA
│  ├─ page.tsx                # Homepage composition (Hero → About → Systems → Industries → Contact)
│  ├─ globals.css             # Tailwind v4 theme tokens
│  ├─ about|services|portfolio|case-studies|blog|careers|contact|quote|support/page.tsx
│  ├─ portal/…                # Auth-gated client portal
│  ├─ offline/page.tsx        # PWA offline fallback
│  ├─ manifest.ts             # PWA manifest
│  └─ api/…                   # Route handlers
├─ components/
│  ├─ BakysonHero.tsx         # Homepage hero (Wacaco layout)
│  ├─ AboutSection.tsx
│  ├─ SystemsSection.tsx
│  ├─ IndustriesSection.tsx
│  ├─ ContactSection.tsx
│  ├─ site-header.tsx         # Global header, hidden on "/"
│  ├─ site-nav.tsx            # Nav (mega menu, mobile dialog)
│  ├─ pwa-status.tsx          # SW registration, offline/update banners
│  └─ ui/…                    # button, card, input, dialog, toast, etc.
├─ data/heroData.ts           # Hero content model (6 slides)
├─ lib/                       # db.ts, validators.ts, rate-limit.ts, analytics.ts, utils.ts
├─ middleware.ts              # Protects /portal/* (next-auth)
└─ types/next-auth.d.ts
```

---

## 4. Data model (`database/schema.sql`)

Idempotent DDL (`CREATE TABLE IF NOT EXISTS`). Apply with `node scripts/db-setup.mjs`.

| Table | Key columns | Purpose |
|-------|-------------|---------|
| `users` | id, email (unique), password_hash, role (user/employee/admin), created_at | Auth accounts |
| `projects` | id, user_id, name, status, progress, location, start_date, end_date, manager, created_at | Client projects |
| `tickets` | id, user_id, project_id, subject, description, priority, status, created_at | Support tickets |
| `submissions` | id, name, email, phone, company, service, message, created_at | Public contact form |
| `job_applications` | id, name, email, phone, position, resume_url, cover_letter, created_at | Careers applications |
| `newsletter_subscriptions` | id, email (unique), status, created_at | Newsletter signups |
| `activity_logs` | id, user_id, action, target_type, target_id, metadata (JSONB), created_at | Audit trail |
| `password_reset_tokens` | id, user_id, token (SHA-256 hash), expires_at, used, attempts, created_at | Password reset |

Relationships:
- `projects.user_id` → `users.id`
- `tickets.user_id` → `users.id`
- `tickets.project_id` → `projects.id`
- `activity_logs.user_id` → `users.id`
- `password_reset_tokens.user_id` → `users.id` (ON DELETE CASCADE)

---

## 5. Authentication & session model

### Provider
- `next-auth` v4 Credentials provider only.
- Email + password validated against `users` table.
- Passwords hashed with `bcryptjs` (cost 10).

### Session strategy
- JWT. Token carries `role`. Session callback injects `role` into `session.user`.

### Routes
| Route | Method | Purpose |
|-------|--------|---------|
| `/api/auth/[...nextauth]` | GET/POST | NextAuth handlers (signin, callback, signout, session, csrf) |
| `/api/csrf` | GET | Standalone CSRF token endpoint (used by portal login) |
| `/portal` | — | Public sign-in page |
| `/portal/projects`, `/portal/tickets` | — | Auth-protected (middleware) |

### Middleware (`middleware.ts`)
- Uses `withAuth` from `next-auth/middleware`.
- Protects paths starting with `/portal/`.
- `/portal` itself is public (sign-in page).
- **Known bug:** `pages.signIn` points to `/portal/login` which does not exist. Actual sign-in page is `/portal`.

---

## 6. API contracts

All route handlers follow the pattern: parse with Zod → `query()` from `@/lib/db` → return typed JSON. Errors: `ZodError` → 400 with `details`; otherwise 500.

| Endpoint | Method | Validated by | Writes to | Auth |
|----------|--------|--------------|-----------|------|
| `/api/contact` | POST | `contactSchema` | `submissions` | No |
| `/api/careers` | POST | `careersSchema` | `job_applications` | No |
| `/api/newsletter` | POST | `newsletterSchema` | `newsletter_subscriptions` | No |
| `/api/csrf` | GET | — | — | No |
| `/api/health` | GET | — | — | No |
| `/api/projects` | GET/POST | — | `projects` | Yes (portal) |
| `/api/tickets` | GET/POST | — | `tickets` | Yes (portal) |
| `/api/auth/[...nextauth]` | * | next-auth | sessions | — |

### Database access (`@/lib/db.ts`)
- Single `pg.Pool` instance using `DATABASE_URL`.
- `query(text, params)` helper.
- No connection pooling tuning beyond defaults.
- No migrations — only idempotent DDL via `schema.sql`.

---

## 7. Data flow

### Public contact form
1. User submits form on `/contact` or homepage `ContactSection`.
2. Client-side `fetch POST /api/contact` with JSON body.
3. API validates with `contactSchema`, inserts into `submissions`.
4. Returns 201 on success; client shows toast.

### Portal sign-in
1. User submits email/password on `/portal`.
2. Client fetches `/api/csrf` for token.
3. Client posts to `/api/auth/callback/credentials` with `email`, `password`, `csrfToken`, `callbackUrl`, `json=true`.
4. NextAuth validates credentials, issues JWT session cookie.
5. Client fetches `/api/auth/session` to confirm sign-in.
6. Redirects to `/portal`.

### Password reset
1. Token generated, SHA-256 hashed, stored in `password_reset_tokens`.
2. Raw token emailed to user (never stored).
3. Reset validates hash, checks `expires_at`, `used`, `attempts`.
4. Rate-limited via `lib/rate-limit.ts`.

---

## 8. PWA architecture

- `src/app/manifest.ts` → `/manifest.webmanifest` (name, icons, shortcuts).
- `public/sw.js` precaches public pages/assets, network-first navigations, falls back to `/offline`.
- Registered in production only by `src/components/pwa-status.tsx` (also shows offline/update banners).
- `CACHE_VERSION` in `public/sw.js` must be bumped when precache list changes.
- Icons regenerated with `npm run icons` after logo change.

---

## 9. Observability

- `@sentry/nextjs` with three configs: `sentry.server.config.ts`, `sentry.client.config.ts`, `sentry.edge.config.ts`.
- `tracesSampleRate: 0.1`.
- DSN from `SENTRY_DSN` env var.
- Error boundaries and route handler error handling per Next.js 16 conventions.

---

## 10. Known architectural gaps / TBD

| Item | Description | Status |
|------|-------------|--------|
| Migrations | No migration system; only idempotent DDL. Schema changes require manual SQL. | **[TBD]** |
| Connection pooling | Default `pg.Pool` settings; no tuning for production load. | **[TBD]** |
| CSRF redundancy | Custom `/api/csrf` alongside next-auth built-in CSRF. | **[TBD]** evaluate consolidation |
| Rate limiting | `lib/rate-limit.ts` exists; verify it covers all public POST endpoints. | **[TBD]** |
| File uploads | No S3/storage configured; `resume_url` stored as text only. | **[TBD]** |
| Email sending | Resend configured but API key not verified in production. | **[TBD]** |
| Real domain | `NEXTAUTH_URL` must match production domain (unconfirmed). | **[TBD]** |
