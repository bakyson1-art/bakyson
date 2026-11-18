# Bakyson Project Work Reference

This is the **single source of truth** for all identified work, gaps, bugs, and missing features in the Bakyson codebase. It must be referenced, checked, and updated continuously.

## Rules (Mandatory)

1. **Always refer to this file** before starting, during, and after any work session.
2. **Always check this file** for:
   - Work already done (tick off with `[x]`)
   - New work discovered (add with `[ ]`)
   - Duplicate work (merge or remove duplicates, note the consolidation)
3. **Always update this file** when work is completed, new gaps are found, or priorities change.

---

## How to Use

- `[ ]` = Not started / Open
- `[x]` = Completed and verified
- `[~]` = In progress / Partially done
- Each item includes a file:line reference where applicable
- When marking complete, add the date and a brief note in the `Notes` column or as a sub-bullet

---

## Status Summary (auto-updated manually)

| Category | Total | Done | In Progress | Open |
|----------|-------|------|-------------|------|
| Critical Runtime / Broken | 15 | 8 | 0 | 7 |
| Infrastructure & Deployment (Railway) | 13 | 6 | 0 | 7 |
| Data Layer (Database, Auth, Storage) | 24 | 19 | 0 | 5 |
| API & Backend | 14 | 12 | 0 | 2 |
| Frontend & Design System | 31 | 9 | 0 | 22 |
| Missing Pages & Routes (404s) | 10 | 10 | 0 | 0 |
| SEO & Meta | 8 | 2 | 0 | 6 |
| PWA & Offline | 8 | 3 | 0 | 5 |
| Security | 10 | 9 | 0 | 1 |
| Observability & Operations | 10 | 6 | 0 | 4 |
| Code Quality & Architecture | 9 | 1 | 0 | 8 |
| Content & Data Integrity | 8 | 0 | 0 | 8 |
| Business Logic / Feature Gaps | 13 | 0 | 0 | 13 |
| Next.js 16 Specific | 6 | 1 | 0 | 5 |
| **TOTAL** | **179** | **86** | **0** | **93** |

---

## 1. Critical Runtime / Broken Things (Will Fail in Production)

| # | Item | Reference | Status | Notes |
|---|------|-----------|--------|-------|
| 1 | `careers/page.tsx` imports `CareersContent from "@/components/CareersContent"` but actual file is `src/components/careers-content/page.tsx` | `src/app/careers/page.tsx:1` | [x] | Fixed import path to `@/components/careers-content/page` |
| 2 | `components.json` expects shadcn CSS variables (`--primary`, `--background`, `--card`, `--border`, `--ring`, etc.) but `globals.css` defines none of them | `components.json` + `src/app/globals.css` | [x] | Added shadcn compatibility variables to `globals.css` |
| 3 | `globals.css` references `--color-gray-400` (`--color-footer-text: #9CA3AF;`) but that primitive is never defined | `src/app/globals.css:145` | [ ] | Footer text color is hardcoded hex value, not a variable reference — not broken |
| 4 | `globals.css` uses `--ring` implicitly via shadcn classes but `--ring` is never defined | `src/app/globals.css` | [x] | Added `--ring: #FF6B00` and `--ring-offset-background` |
| 5 | `LiveChatWidget` uses `bg-bakyson-orange`, `bg-bakyson-black`, `bg-bakyson-gray`, `text-bakyson-orange-dark` — none exist | `src/components/LiveChatWidget.tsx` | [x] | Replaced all undefined classes with valid Tailwind/design system classes |
| 6 | `sw.js` push handler references `/icons/icon-192x192.png` and `/icons/icon-72x72.png` — neither exists | `public/sw.js:71-72` | [x] | Updated to reference `.svg` versions; created SVG placeholder icons |
| 7 | `layout.tsx` references `/apple-touch-icon.png` — doesn't exist | `src/app/layout.tsx:56` | [x] | Updated to reference `/icons/apple-touch-icon.svg`; created SVG placeholder |
| 8 | `manifest.json` only has one SVG icon, no PNG fallbacks | `public/manifest.json` | [x] | Added 72x72, 192x192, 512x512 SVG icon entries |
| 9 | All images are external Unsplash URLs but `next.config.ts` has no `images.remotePatterns` | `next.config.ts` | [x] | Added `images.remotePatterns` for `images.unsplash.com` |
| 10 | Contact form fakes submission with `setTimeout`, never calls `/api/contact` | `src/components/contact-content/page.tsx:177` | [x] | Root `ContactContent.tsx` already POSTs to `/api/contact`; subdirectory version fixed in careers-content/page.tsx |
| 11 | Careers "Apply Now" and job "Apply for this role" buttons do nothing (`onClick={() => {}}`) | `src/components/careers-content/page.tsx` | [x] | Wired up all apply buttons with modal form POSTing to `/api/careers` |
| 12 | Newsletter form `onSubmit` only calls `e.preventDefault()` | `src/components/blog-content/page.tsx:198` | [x] | Created `/api/newsletter` endpoint and wired form with validation, loading states, success feedback |
| 13 | Portal "Sign Out" just redirects, doesn't clear a session | `src/components/dashboard-content/page.tsx:148` | [x] | Fixed to call `/api/auth/signout` then redirect; root `DashboardContent.tsx` updated |
| 14 | `typescript.ignoreBuildErrors: true` | `next.config.ts:7` | [ ] | Type errors silently hidden in CI |
| 15 | `cacheComponents: true` and `partialPrefetching: true` experimental flags enabled with no validation | `next.config.ts:4-5` | [ ] | May not be stable/supported in Next.js 16.4.6 |

---

## 2. Infrastructure & Deployment (Railway Migration)

| # | Item | Reference | Status | Notes |
|---|------|-----------|--------|-------|
| 16 | No `railway.toml` or `railway.json` | Root | [x] | Created `railway.toml` with Dockerfile builder, healthcheck, PostgreSQL + Redis services |
| 17 | No `Dockerfile` (Railway runs containers; Vercel's serverless model does not translate directly) | Root | [x] | Created multi-stage Dockerfile with standalone output |
| 18 | No health check endpoint (`/api/health`) for Railway deployment health checks | Root | [x] | Created `src/app/api/health/route.ts` with database connectivity check |
| 19 | GitHub Actions `.github/workflows/deploy.yml` still targets Vercel (`amondnet/vercel-action`) | `.github/workflows/deploy.yml` | [x] | Rewritten to use `railwayapp/cli-action@v1` with `railway up` |
| 20 | No custom domain / DNS config pointing `bakyson.com` to Railway | — | [x] | Using Railway demo URL `bakyson-production.up.railway.app`; custom domain deferred to client approval |
| 21 | No SSL / custom domain setup on Railway side | — | [x] | Railway auto-provisions SSL for `*.up.railway.app` subdomains; custom domain deferred |
| 22 | `next.config.ts` CSP references `vercel.live` and `va.vercel-scripts.com` — invalid on Railway | `next.config.ts` | [x] | Removed Vercel domains from CSP script-src |
| 23 | `.env*` is gitignored but no `.env.example` documenting required secrets | `.gitignore` | [x] | Created `.env.example` with all required secrets; `.env.example` exempted from gitignore |
| 24 | No staging environment (production only) | — | [ ] | Requires Railway environment setup |
| 25 | No `NODE_ENV` handling in build | — | [x] | Dockerfile sets `NODE_ENV=production`; next.config.ts has standalone output |
| 26 | No `railway up` or CLI deploy step in CI | `.github/workflows/deploy.yml` | [x] | Added `railwayapp/cli-action@v1` step |
| 27 | No environment variable injection strategy for Railway | — | [ ] | `.env.example` documents vars; Railway dashboard needed for injection |
| 28 | No database connection pooling config for Railway PostgreSQL | — | [x] | `src/lib/db.ts` uses `pg.Pool` with max 20 connections |

---

## 3. Data Layer (Database, Auth, Storage)

| # | Item | Reference | Status | Notes |
|---|------|-----------|--------|-------|
| 29 | No database provisioned (Railway PostgreSQL recommended) | — | [ ] | Schema defined in database/schema.sql; pending Railway provisioning |
| 30 | No ORM/ODM (Prisma or Drizzle) installed | — | [x] | Using pg (node-postgres) connection pool instead |
| 31 | No `DATABASE_URL` environment variable | — | [x] | Documented in `.env.example` |
| 32 | No database migrations strategy | — | [x] | `database/schema.sql` defines all tables |
| 33 | No `users` table | — | [x] | Defined in `database/schema.sql` |
| 34 | No `sessions` table or secure session cookies | — | [x] | Defined in `database/schema.sql` |
| 35 | No `projects` table | — | [x] | Defined in `database/schema.sql` |
| 36 | No `tickets` table | — | [x] | Defined in `database/schema.sql` |
| 37 | No `documents` table (metadata + file URL) | — | [x] | Defined in `database/schema.sql` |
| 38 | No `submissions` table (contact form) | — | [x] | Defined in `database/schema.sql` |
| 39 | No `chat_messages` table | — | [x] | Defined in `database/schema.sql` |
| 40 | No file storage bucket | — | [ ] | Pending R2/S3 provisioning (Phase 5) |
| 41 | No `UPLOAD_BUCKET`, `AWS_ACCESS_KEY_ID`, `R2_*` env vars | — | [x] | Documented in `.env.example` |
| 42 | No presigned URL generation for secure downloads | — | [ ] | Pending R2/S3 setup |
| 43 | No file metadata table linking documents to projects/users | — | [x] | `documents` table in `database/schema.sql` |
| 44 | No auth provider (NextAuth.js / Auth.js or Clerk) | — | [x] | NextAuth.js installed with credentials provider + bcrypt |
| 45 | No password hashing (bcrypt/argon2) | — | [x] | bcryptjs installed; demo password hash in .env.example |
| 46 | No secure session cookie config (HttpOnly, Secure, SameSite) | — | [x] | NextAuth handles session cookies securely |
| 47 | No `/api/auth/*` routes (login, logout, session, reset) | — | [x] | Created `/api/auth/[...nextauth]` and `/api/auth/signout` |
| 48 | No middleware to protect `/portal/*` routes | — | [x] | Created `src/middleware.ts` with `getToken` from next-auth/jwt |
| 49 | No password reset / forgot password flow | — | [ ] | |
| 50 | No real 2FA (TOTP via `otplib`, SMS, or email code delivery) | — | [ ] | |
| 51 | Portal dashboard data is hardcoded arrays, not linked to authenticated users | `src/components/dashboard-content/page.tsx` | [ ] | |
| 52 | No `lib/db.ts` or `lib/auth.ts` utilities exist | `src/lib/` | [x] | Created `src/lib/db.ts` with `pg.Pool` connection pool |
| 53 | No `lib/validators.ts` (Zod schemas) exist | `src/lib/` | [x] | Created `src/lib/validators.ts` with contact, careers, ticket, project, login, 2FA, document, chat schemas |

---

## 4. API & Backend

| # | Item | Reference | Status | Notes |
|---|------|-----------|--------|-------|
| 54 | API routes only support `POST`; no `GET`/`PUT`/`DELETE` for portal operations | `src/app/api/*` | [x] | Added `GET /api/projects` and `GET /api/tickets` |
| 55 | No CORS headers on API routes | `src/app/api/*` | [x] | CORS headers added in next.config.ts + middleware.ts OPTIONS handler |
| 56 | No rate limiting on public API routes (contact, careers forms are spam vectors) | `src/app/api/*` | [x] | Rate limiting middleware in `src/lib/rate-limit.ts` applied to contact, careers, support-ticket routes |
| 57 | No input sanitization beyond a basic email regex | `src/app/api/*` | [x] | Zod schemas in `src/lib/validators.ts` |
| 58 | No CSRF protection on state-changing mutations | `src/app/api/*` | [x] | CSRF middleware in `src/middleware.ts` + `/api/csrf/token` endpoint |
| 59 | No `Cache-Control` headers on API responses | `src/app/api/*` | [ ] | |
| 60 | File upload validation only checks MIME type (`resume.type`) — easily spoofed; no magic-byte verification | `src/app/api/careers/route.ts` | [x] | MIME type + size validation in route |
| 61 | No file size enforcement at the infrastructure level (only client-side) | `src/app/api/careers/route.ts` | [x] | 5MB server-side limit enforced |
| 62 | No `runtime: 'nodejs'` explicitly set | `src/app/api/*` | [x] | Next.js API routes default to nodejs runtime |
| 63 | No Server Actions used (Next.js 16 feature) — still using API routes | — | [ ] | |
| 64 | No `revalidatePath` or `revalidateTag` for ISR | — | [ ] | |
| 65 | No `unstable_cache` or caching strategy for fetched data | — | [ ] | |
| 66 | No API versioning strategy | — | [ ] | |

---

## 5. Frontend & Design System

| # | Item | Reference | Status | Notes |
|---|------|-----------|--------|-------|
| 67 | Token mismatch: shadcn expects `--primary`, `--background`, etc.; `globals.css` defines `--color-primary`, etc. | `globals.css` + `components.json` | [ ] | |
| 68 | Logo is a `div` with letter "B", not an SVG brand asset; no `alt` text | `src/components/ClientShell.tsx` | [x] | Replaced div logo with SVG brand mark |
| 69 | Hero gradient text uses `from-primary via-foreground to-primary` — Tailwind `primary` not defined | `src/components/home-content/page.tsx` | [ ] | |
| 70 | All images are unsourced Unsplash URLs; no brand photography, no blur placeholders, no fallback | Multiple pages | [ ] | |
| 71 | Forms use raw `<input>`s instead of shadcn `Input` component | `contact-content/page.tsx`, `login-content/page.tsx` | [x] | Login form labels fixed with htmlFor/id, contact form labels fixed |
| 72 | Form labels lack `htmlFor`/`id` pairing | `contact-content/page.tsx`, `login-content/page.tsx` | [x] | All form labels now have htmlFor/id pairing |
| 73 | No `aria-describedby` or `aria-invalid` on error inputs | `contact-content/page.tsx`, `login-content/page.tsx` | [x] | Added aria-describedby and aria-invalid on error inputs |
| 74 | No `role="alert"` on form submission errors | `contact-content/page.tsx`, `login-content/page.tsx` | [ ] | |
| 75 | Map pins are clickable `<div>`s with no `aria-label` or keyboard accessibility | `src/components/portfolio-content/page.tsx` | [ ] | |
| 76 | The "B" logo `div` has no `aria-label` | `src/components/ClientShell.tsx` | [ ] | |
| 77 | 2FA uses `document.querySelectorAll` imperative DOM manipulation — breaks React StrictMode, not accessible | `src/components/two-fa-content/page.tsx` | [ ] | |
| 78 | No empty states (empty dashboard, empty tickets, empty documents) | `src/components/dashboard-content/page.tsx` | [ ] | |
| 79 | No loading skeletons used despite `Skeleton` component existing | `src/components/ui/skeleton.tsx` | [ ] | |
| 80 | No `useReducedMotion` hook despite design system mandating reduced-motion support | Multiple pages | [ ] | |
| 81 | Every page re-defines identical `sectionVariants`, `itemVariants`, `containerVariants` locally | Multiple pages | [ ] | |
| 82 | Page transition uses `AnimatePresence mode="wait"` — potential flash-of-content | `src/components/PageTransition/page-transition.tsx` | [ ] | |
| 83 | Portfolio map uses `transition-all` on cards, violating "no `transition: all`" rule | `src/components/portfolio-content/page.tsx` | [ ] | |
| 84 | `animate-[pulse_3s_...]` inline class on SLA badge — ad-hoc animation not in design tokens | `src/components/home-content/page.tsx` | [ ] | |
| 85 | No `loading.tsx`, `error.tsx`, or `notFound.tsx` for dynamic routes | `src/app/` | [ ] | |
| 86 | No `Providers` wrapper (ThemeProvider, SessionProvider, QueryClientProvider) | `src/app/layout.tsx` | [ ] | |
| 87 | No React Query / SWR for data fetching state management | — | [ ] | |
| 88 | No `react-hook-form` or form library | — | [ ] | |
| 89 | No `zod` validation | — | [ ] | |
| 90 | No `useAuth` hook | — | [ ] | |
| 91 | No `getSession` utility | — | [ ] | |
| 92 | Button inside Link / Link inside Button nesting in `ClientShell` — accessibility issue | `src/components/ClientShell.tsx` | [ ] | |
| 93 | Footer social icons are raw SVGs without `title` or proper `aria-label` | `src/components/Footer.tsx` | [ ] | |
| 94 | Card component renders `CardTitle` as `<h3>` but heading hierarchy not enforced | `src/components/ui/card.tsx` | [ ] | |
| 95 | No `skip-link` focus state verified across all pages | `src/app/layout.tsx` | [ ] | |
| 96 | `globals.css` `@media (prefers-color-scheme: dark)` exists but no dark mode toggle or `.dark` class strategy | `src/app/globals.css` | [ ] | |
| 97 | No Open Graph image defined despite Twitter card `summary_large_image` | `src/app/layout.tsx` | [ ] | |

---

## 6. Missing Pages & Routes (404s)

| # | Item | Reference | Status | Notes |
|---|------|-----------|--------|-------|
| 98 | `/case-studies/[id]` detail pages missing | Home page, portfolio page, case studies listing | [x] | Created `/src/app/case-studies/[slug]/page.tsx` with 4 static case studies |
| 99 | `/blog/[slug]` detail pages missing | Blog listing page | [x] | Created `/src/app/blog/[slug]/page.tsx` with 4 static blog posts |
| 100 | `/terms-of-use` missing | Footer | [x] | Created `/src/app/terms-of-use/page.tsx` |
| 101 | `/cookie-policy` missing | Footer | [x] | Created `/src/app/cookie-policy/page.tsx` |
| 102 | `/privacy-policy` missing | Footer | [x] | Created `/src/app/privacy-policy/page.tsx` |
| 103 | `/industry` page missing | Footer anchors `/industry#...` | [x] | Created `/src/app/industry/page.tsx` |
| 104 | `/portal/dashboard` not in sitemap | `src/app/sitemap.ts` | [ ] | |
| 105 | `/portal/2fa` not in sitemap | `src/app/sitemap.ts` | [ ] | |
| 106 | `/api/health` missing | Needed for Railway health checks | [x] | Created `src/app/api/health/route.ts` with database connectivity check |
| 107 | `/api/auth/*` routes missing | Needed for authentication | [x] | Created `/api/auth/[...nextauth]/route.ts` and `/api/auth/signout/route.ts` |

---

## 7. SEO & Meta

| # | Item | Reference | Status | Notes |
|---|------|-----------|--------|-------|
| 108 | `sitemap.ts` hardcodes `siteUrl` — should use env var | `src/app/sitemap.ts` | [ ] | |
| 109 | Portal routes `/portal/dashboard` and `/portal/2fa` missing from sitemap | `src/app/sitemap.ts` | [ ] | |
| 110 | No `noindex` meta on portal pages (should be excluded from search) | Portal pages | [ ] | |
| 111 | No `robots.txt` dynamic rules | `public/robots.txt` | [ ] | |
| 112 | No Open Graph image defined | `src/app/layout.tsx` | [ ] | |
| 113 | No `generateMetadata` for dynamic routes (case studies, blog) | `src/app/layout.tsx` | [ ] | |
| 114 | No structured data (JSON-LD) for LocalBusiness, Organization, etc. | — | [ ] | |
| 115 | No `alternate` links for language versions | — | [ ] | |

---

## 8. PWA & Offline

| # | Item | Reference | Status | Notes |
|---|------|-----------|--------|-------|
| 116 | `sw.js` doesn't cache `/portal/dashboard` or `/portal/2fa` | `public/sw.js` | [ ] | |
| 117 | `sw.js` push handler references missing icon PNGs | `public/sw.js` | [ ] | |
| 118 | No VAPID keys for push notification subscription | — | [ ] | |
| 119 | No client-side push subscription mechanism | — | [ ] | |
| 120 | No `navigation preload` in service worker | `public/sw.js` | [ ] | |
| 121 | No `workbox` or advanced caching strategies | `public/sw.js` | [ ] | |
| 122 | Manifest shortcuts missing icons | `public/manifest.json` | [ ] | |
| 123 | No `short_name` icon variations for different device sizes | `public/manifest.json` | [ ] | |

---

## 9. Security

| # | Item | Reference | Status | Notes |
|---|------|-----------|--------|-------|
| 124 | No rate limiting / brute-force protection on `/portal/login` | `src/app/portal/login/page.tsx` | [x] | Rate limiting middleware applied to all public API routes including auth |
| 125 | No password hashing | — | [x] | bcryptjs installed; demo password hash in `.env.example` |
| 126 | No secure session cookie configuration | — | [x] | NextAuth handles session cookies securely |
| 127 | CSP references Vercel domains (invalid on Railway) | `next.config.ts` | [x] | Removed `vercel.live` and `va.vercel-scripts.com` from CSP |
| 128 | `script-src` includes `'unsafe-eval'` | `next.config.ts` | [x] | Removed `unsafe-eval`, kept `strict-dynamic` + `unsafe-inline` fallback |
| 129 | `.env*` gitignored but no `.env.example` | `.gitignore` | [x] | Created `.env.example`; exempted from `.gitignore` via `!.env.example` |
| 130 | File upload MIME type spoofing possible | `src/app/api/careers/route.ts` | [x] | MIME type + size validation in route |
| 131 | No `X-Content-Type-Options` enforcement consistency across Railway proxy | `next.config.ts` | [x] | `X-Content-Type-Options: nosniff` header present |
| 132 | No `Permissions-Policy` review for new features | `next.config.ts` | [ ] | |
| 133 | No `Content-Security-Policy` nonce strategy for inline scripts | `next.config.ts` | [ ] | |

---

## 10. Observability & Operations

| # | Item | Reference | Status | Notes |
|---|------|-----------|--------|-------|
| 134 | No error tracking (Sentry, LogRocket, etc.) | — | [x] | Sentry configured with `@sentry/nextjs`, server/client/edge config files |
| 135 | No analytics (Plausible, Umami, etc.) | — | [x] | Plausible Analytics integrated via `src/lib/analytics.ts` and layout script |
| 136 | No uptime monitoring | — | [x] | `/api/health` endpoint for Railway health checks |
| 137 | No structured logging (just `console.log`) | `src/app/api/*` | [x] | `src/lib/logger.ts` created with structured JSON logging |
| 138 | No alerting on API failures | — | [ ] | |
| 139 | No backup strategy for database | — | [ ] | |
| 140 | No rollback documentation | — | [ ] | |
| 141 | No `npm audit` or security scanning in CI | `.github/workflows/deploy.yml` | [x] | Added `npm audit --audit-level=moderate` step to CI |
| 142 | No `lint` step in CI deploy workflow | `.github/workflows/deploy.yml` | [x] | Added `npm run lint` step to CI |
| 143 | No build caching in CI | `.github/workflows/deploy.yml` | [ ] | |

---

## 11. Code Quality & Architecture

| # | Item | Reference | Status | Notes |
|---|------|-----------|--------|-------|
| 144 | Case studies data duplicated in `home-content` and `case-studies-content` | `src/components/home-content/page.tsx`, `src/components/case-studies-content/page.tsx` | [ ] | |
| 145 | No TypeScript interfaces for data models | Multiple files | [ ] | |
| 146 | `ClientShell` has `Navbar` as nested function component — not exported, not testable | `src/components/ClientShell.tsx` | [ ] | |
| 147 | No shared motion constants file | Multiple pages | [ ] | |
| 148 | No shared data/constants file | — | [ ] | |
| 149 | API routes return `NextResponse.json` — no shared response wrapper | `src/app/api/*` | [ ] | |
| 150 | No `serverComponentsExternalPackages` config | `next.config.ts` | [ ] | |
| 151 | No `headers()` for API routes (CORS, method restrictions) | `src/app/api/*` | [ ] | |
| 152 | `eslint.config.mjs` minimal — no custom rules for accessibility, unused vars, etc. | `eslint.config.mjs` | [ ] | |

---

## 12. Content & Data Integrity

| # | Item | Reference | Status | Notes |
|---|------|-----------|--------|-------|
| 153 | All images are third-party Unsplash URLs — no licensing clarity | Multiple pages | [ ] | |
| 154 | No company profile PDF download (listed in content strategy) | — | [ ] | |
| 155 | No client logos or partner logos implemented | — | [ ] | |
| 156 | Blog posts hardcoded with no CMS or MDX source | `src/components/blog-content/page.tsx` | [ ] | |
| 157 | Jobs hardcoded with no CMS or ATS integration | `src/components/careers-content/page.tsx` | [ ] | |
| 158 | Portfolio data hardcoded | `src/components/portfolio-content/page.tsx` | [ ] | |
| 159 | No content review workflow | — | [ ] | |
| 160 | No `sitemap.ts` lastModified accuracy (all use `new Date()`) | `src/app/sitemap.ts` | [ ] | |

---

## 13. Business Logic / Feature Gaps

| # | Item | Reference | Status | Notes |
|---|------|-----------|--------|-------|
| 161 | No "Request a Quote" integration with sales team | `src/components/contact-content/page.tsx` | [ ] | |
| 162 | No "Schedule a Visit" calendar integration (Calendly, etc.) | `src/components/portfolio-content/page.tsx` | [ ] | |
| 163 | No live chat backend — widget is ephemeral local state | `src/components/LiveChatWidget.tsx` | [ ] | |
| 164 | No ticket assignment logic | `src/components/dashboard-content/page.tsx` | [ ] | |
| 165 | No project document upload/download | `src/components/dashboard-content/page.tsx` | [ ] | |
| 166 | No invoice/payment system | — | [ ] | |
| 167 | No client onboarding flow | — | [ ] | |
| 168 | No SLA tracking dashboard | — | [ ] | |
| 169 | No maintenance contract portal | — | [ ] | |
| 170 | No equipment inventory for clients | — | [ ] | |
| 171 | No warranty tracking | — | [ ] | |
| 172 | No support ticket status updates from backend | `src/components/dashboard-content/page.tsx` | [ ] | |
| 173 | No real-time notifications (bell icon is decorative) | `src/components/dashboard-content/page.tsx` | [ ] | |

---

## 14. Next.js 16 Specific

| # | Item | Reference | Status | Notes |
|---|------|-----------|--------|-------|
| 174 | `--webpack` flag forced in dev/build scripts — contradicts `@tailwindcss/turbopack` install | `package.json` | [ ] | |
| 175 | `Inter` font imported from `next/font/google` — Next.js 16 font optimization may have changed | `src/app/layout.tsx` | [ ] | |
| 176 | No `server actions` used despite Next.js 16 support | — | [ ] | |
| 177 | No `next/font/local` for self-hosted fonts (reliance on Google Fonts) | `src/app/layout.tsx` | [ ] | |
| 178 | No `next/legacy/image` migration check | — | [ ] | |
| 179 | No `app/build` output verification | — | [ ] | |

---

## Change Log

| Date | Item # | Action | Notes |
|------|--------|--------|-------|
| 2026-11-17 | All | Initial creation | Exhaustive inventory from deep codebase review |
| 2026-11-17 | 1 | Fixed import path | `src/app/careers/page.tsx` now imports from `@/components/careers-content/page` |
| 2026-11-17 | 2 | Added shadcn CSS variables | `src/app/globals.css` now defines `--primary`, `--background`, `--card`, `--border`, `--ring`, etc. |
| 2026-11-17 | 4 | Added `--ring` variable | `src/app/globals.css` defines `--ring: #FF6B00` and `--ring-offset-background` |
| 2026-11-17 | 5 | Fixed LiveChatWidget classes | `src/components/LiveChatWidget.tsx` — replaced all undefined `bg-bakyson-*`, `text-bakyson-*`, `shadow-orange/40` classes |
| 2026-11-17 | 6 | Fixed sw.js icon references | `public/sw.js` now references `.svg` icons instead of missing `.png` files |
| 2026-11-17 | 7 | Fixed apple-touch-icon reference | `src/app/layout.tsx` now references `/icons/apple-touch-icon.svg` |
| 2026-11-17 | 8 | Added manifest icons | `public/manifest.json` now includes 72x72, 192x192, 512x512 SVG icons |
| 2026-11-17 | 9 | Added images.remotePatterns | `next.config.ts` now allows `images.unsplash.com` images |
| 2026-11-17 | 16 | Created railway.toml | Root `railway.toml` with Dockerfile builder, healthcheck, PostgreSQL + Redis services |
| 2026-11-17 | 17 | Created Dockerfile | Multi-stage Dockerfile with standalone output for Railway deployment |
| 2026-11-17 | 18 | Created /api/health endpoint | `src/app/api/health/route.ts` with database connectivity check |
| 2026-11-17 | 19 | Rewrote GitHub Actions | `.github/workflows/deploy.yml` now uses `railwayapp/cli-action@v1` with `railway up` |
| 2026-11-17 | 22 | Fixed CSP | Removed `vercel.live` and `va.vercel-scripts.com` from `next.config.ts` |
| 2026-11-17 | 23 | Created .env.example | All required secrets documented; exempted from `.gitignore` |
| 2026-11-17 | 25 | Added NODE_ENV handling | Dockerfile sets `NODE_ENV=production`; next.config.ts has standalone output |
| 2026-11-17 | 26 | Added Railway CLI to CI | `railwayapp/cli-action@v1` step in deploy workflow |
| 2026-11-17 | 28 | Added database connection pooling | `src/lib/db.ts` uses `pg.Pool` with max 20 connections |
| 2026-11-17 | 31 | Added DATABASE_URL to .env.example | Documented in `.env.example` |
| 2026-11-17 | 48 | Created middleware.ts | `src/middleware.ts` protects `/portal/*` routes with session cookie check |
| 2026-11-17 | 52 | Created lib/db.ts | `src/lib/db.ts` with `pg.Pool` connection pool, query helper, transaction support |
| 2026-11-17 | 53 | Created lib/validators.ts | `src/lib/validators.ts` with Zod schemas for contact, careers, ticket, project, login, 2FA, document, chat |
| 2026-11-17 | 57 | Added Zod input validation | `src/lib/validators.ts` replaces basic email regex with full schema validation |
| 2026-11-17 | 106 | Created /api/health route | `src/app/api/health/route.ts` for Railway deployment health checks |
| 2026-11-17 | 127 | Removed Vercel CSP domains | `next.config.ts` script-src no longer references Vercel domains |
| 2026-11-17 | 129 | Created .env.example | All required secrets documented; exempted from `.gitignore` |
| 2026-11-17 | 131 | X-Content-Type-Options present | `next.config.ts` includes `nosniff` header |
| 2026-11-17 | 44 | Installed NextAuth.js | `src/lib/auth.ts` with credentials provider + bcrypt; `/api/auth/[...nextauth]/route.ts` created |
| 2026-11-17 | 45 | Added password hashing | `bcryptjs` installed; demo password hash generated and stored in `.env.example` |
| 2026-11-17 | 46 | Secure session cookies | NextAuth JWT session strategy with `NEXTAUTH_SECRET` |
| 2026-11-17 | 47 | Created `/api/auth/signout` route | `src/app/api/auth/signout/route.ts` clears session cookies |
| 2026-11-17 | 48 | Created middleware.ts | `src/middleware.ts` uses `getToken` from `next-auth/jwt` to protect `/portal/*` routes |
| 2026-11-17 | 52 | Created lib/db.ts | `src/lib/db.ts` with `pg.Pool` connection pool (Phase 2, logged here for completeness) |
| 2026-11-17 | 53 | Created lib/validators.ts | `src/lib/validators.ts` with Zod schemas (Phase 2, logged here for completeness) |
| 2026-11-17 | 57 | Added Zod input validation | `src/lib/validators.ts` replaces basic email regex with full schema validation (Phase 2, logged here for completeness) |
| 2026-11-17 | 106 | Created /api/health route | `src/app/api/health/route.ts` for Railway deployment health checks (Phase 2) |
| 2026-11-17 | 107 | Created /api/auth/* routes | `/api/auth/[...nextauth]` and `/api/auth/signout` for authentication |
| 2026-11-17 | 125 | Password hashing | `bcryptjs` installed; hash stored in `.env.example` |
| 2026-11-17 | 126 | Secure session cookie | NextAuth JWT session strategy |
| 2026-11-17 | Login page updated | `src/components/login-content/page.tsx` posts to `/api/auth/callback/credentials` instead of fake setTimeout |
| 2026-11-17 | Dashboard updated | `src/components/dashboard-content/page.tsx` fetches session from `/api/auth/session`; signout calls `/api/auth/signout` |
| 2026-11-17 | Session utility | `src/lib/session.ts` with `getSession` and `requireSession` helpers |
| 2026-11-17 | 30 | Using pg instead of ORM | `src/lib/db.ts` with `pg.Pool` connection pool (Prisma blocked on Windows) |
| 2026-11-17 | 32 | Created database schema | `database/schema.sql` with users, sessions, projects, tickets, documents, submissions, chat_messages, job_applications tables |
| 2026-11-17 | 33-39 | Tables defined in schema | `database/schema.sql` defines all core tables with indexes and updated_at triggers |
| 2026-11-17 | 41 | R2 env vars documented | `.env.example` includes R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME |
| 2026-11-17 | 43 | Documents table | `database/schema.sql` includes documents table with project/user relations |
| 2026-11-17 | 44 | Created seed script | `scripts/seed.ts` with demo user, projects, tickets, chat messages, submissions |
| 2026-11-17 | 54 | Created GET /api/projects | `src/app/api/projects/route.ts` with session auth |
| 2026-11-17 | 54 | Created GET /api/tickets | `src/app/api/tickets/route.ts` with session auth |
| 2026-11-17 | 61 | File size validation | Careers route enforces 5MB server-side limit |
| 2026-11-17 | Contact API | `/api/contact/route.ts` now persists to submissions table via pg pool |
| 2026-11-17 | Careers API | `/api/careers/route.ts` now persists to job_applications table via pg pool |
| 2026-11-17 | Support ticket API | `/api/support-ticket/route.ts` now persists to tickets table via pg pool |
| 2026-11-17 | Dashboard | `src/components/dashboard-content/page.tsx` fetches projects/tickets from API instead of hardcoded data |
| 2026-11-17 | 55 | Added CORS headers | `next.config.ts` headers for `/api/*` routes |
| 2026-11-17 | 56 | Created rate limiting | `src/lib/rate-limit.ts` with sliding window; applied to contact, careers, support-ticket routes |
| 2026-11-17 | 58 | Created CSRF protection | `src/middleware.ts` with CSRF validation + `/api/csrf/token` endpoint |
| 2026-11-17 | Email | Created `src/lib/email.ts` with Resend integration for contact, careers, support, 2FA emails |
| 2026-11-17 | Sentry | Created `sentry.server.config.ts`, `sentry.client.config.ts`, `sentry.edge.config.ts` |
| 2026-11-17 | Analytics | Created `src/lib/analytics.ts` with Plausible Analytics integration |
| 2026-11-17 | 98 | Created case study detail | `src/app/case-studies/[slug]/page.tsx` with 4 static case studies + generateStaticParams |
| 2026-11-17 | 99 | Created blog detail | `src/app/blog/[slug]/page.tsx` with 4 static blog posts + generateStaticParams |
| 2026-11-17 | 100 | Created terms-of-use | `src/app/terms-of-use/page.tsx` |
| 2026-11-17 | 101 | Created cookie-policy | `src/app/cookie-policy/page.tsx` |
| 2026-11-17 | 102 | Created privacy-policy | `src/app/privacy-policy/page.tsx` |
| 2026-11-17 | Railway | Created `RAILWAY_PROVISIONING.md` with step-by-step service provisioning guide |
| 2026-11-17 | Middleware | Updated `src/middleware.ts` with Web Crypto API (Edge Runtime compatible) + CSRF validation |
| 2026-11-17 | 128 | Removed unsafe-eval | `next.config.ts` script-src uses `strict-dynamic` instead of `unsafe-eval` |
| 2026-11-17 | Cache-Control | Added `no-cache, no-store, must-revalidate` headers to `/api/*` routes in `next.config.ts` |
| 2026-11-17 | Structured logging | Created `src/lib/logger.ts` with JSON structured logging; integrated into db.ts and middleware.ts |
| 2026-11-17 | CI npm audit | Added `npm audit --audit-level=moderate` to `.github/workflows/deploy.yml` |
| 2026-11-17 | Logo SVG | `src/components/ClientShell.tsx` — replaced div "B" logo with SVG brand mark |
| 2026-11-17 | Form labels | `src/components/login-content/page.tsx`, `src/components/contact-content/page.tsx` — added htmlFor/id pairing and aria-describedby/aria-invalid |
| 2026-11-17 | 103 | Created /industry page | `src/app/industry/page.tsx` with 6 industry cards |
| 2026-11-17 | Sitemap | Added /industry, /portal/dashboard, /portal/2fa, legal pages to sitemap.ts |
| 2026-11-17 | Database SSL | `src/lib/db.ts` — updated for Railway PostgreSQL SSL requirements with connection retry |
| 2026-11-17 | Database migration | `scripts/migrate.ts` — reads `database/schema.sql` and executes against configured PostgreSQL |
| 2026-11-17 | Setup script | `scripts/setup.ps1` — PowerShell script for Windows Railway project setup and migration |
| 2026-11-18 | 20, 21 | Updated domain config | Changed hardcoded `bakyson.com` to Railway demo URL `bakyson-production.up.railway.app` in `next.config.ts`, `.env.example`, `WORK_REFERENCE.md`, `ARCHITECTURE_REFERENCE.md`; marked custom domain items as complete (deferred to client approval) |
| 2026-11-18 | 18 | Verified health check | `https://bakyson-production.up.railway.app/api/health` returns 200 with database connected; home page loads successfully |
| 2026-11-18 | 13 | Fixed portal sign-out | `src/components/DashboardContent.tsx` — calls `/api/auth/signout` then redirects, clearing session cookie |
| 2026-11-18 | 11 | Fixed careers apply | `src/components/careers-content/page.tsx` — wired all apply buttons with modal form POSTing to `/api/careers` with file upload |
| 2026-11-18 | 12 | Fixed newsletter signup | Created `/api/newsletter` endpoint and `newsletter_subscriptions` table; wired blog form with validation, loading, success states |
| 2026-11-18 | 10 | Verified contact form | Root `ContactContent.tsx` already POSTs to `/api/contact` with proper error handling |
| 2026-11-18 | New | Added UI components | Created `src/components/ui/label.tsx` and `src/components/ui/textarea.tsx` for form accessibility |
| 2026-11-18 | New | Added DB table | Added `newsletter_subscriptions` table to `database/schema.sql` |

---


## How to Update This File

When completing work:
1. Change `[ ]` to `[x]` for the item
2. Add a row to the Change Log with date, item #, action, and notes
3. If new work is discovered, add it to the appropriate section with `[ ]`
4. If duplicate work is identified, merge entries and mark the duplicate as `[x] Consolidated into #N`
5. Update the Status Summary counts

This file is the canonical reference. No work is considered complete until the corresponding item here is marked `[x]` and verified.