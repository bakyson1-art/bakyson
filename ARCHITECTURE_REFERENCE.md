# Bakyson Project Architecture Reference

This is the **single source of truth** for project infrastructure, layout, integrations, and connections design. It describes how everything fits together, what services are used, how data flows, and the intended target state for the Bakyson application.

## Rules (Mandatory — same as WORK_REFERENCE.md)

1. **Always refer to this file** before starting, during, and after any infrastructure, layout, integration, or connection work.
2. **Always check this file** for:
   - Design already established (mark as `[x]`)
   - New design decisions discovered or required (add as `[ ]`)
   - Duplicate or conflicting designs (merge, remove duplicates, note consolidation)
3. **Always update this file** when architecture changes, new integrations are added, connections are modified, or layout decisions are finalized.

---

## 1. Rules & Principles

| # | Principle | Status | Notes |
|---|-----------|--------|-------|
| 1 | Railway is the hosting platform (replacing Vercel) | [ ] | All services run in containers on Railway |
| 2 | Next.js 16 App Router with Webpack (Windows-compatible) | [ ] | `next dev --webpack`, `next build --webpack` |
| 3 | TypeScript strict mode — no `ignoreBuildErrors` | [ ] | Remove `typescript.ignoreBuildErrors: true` |
| 4 | Tailwind CSS v4 with CSS variables (shadcn/ui compatible) | [ ] | Token layer must match shadcn expectations |
| 5 | Mobile-first responsive design | [ ] | Per DESIGN_TOKENS.md and PAGE_SPECS.md |
| 6 | WCAG 2.2 AA accessibility mandatory | [ ] | All interactive elements keyboard accessible |
| 7 | No paid services invoked unless user explicitly asks | [ ] | Free tier initially, upgrade in 1–2 months |
| 8 | No emojis in code unless explicitly requested | [ ] | Per AGENTS.md rules |
| 9 | No assumptions without user direction | [ ] | Per AGENTS.md rules |
| 10 | Design stack must be loaded before any UI/UX work | [ ] | Per PROJECT_BRIEF.md |

---

## 2. Infrastructure Architecture (Target State)

### 2.1 Hosting Platform: Railway

| Component | Service | Purpose | Status |
|-----------|---------|---------|--------|
| Web application | Railway Service (Next.js container) | Frontend + API routes | [ ] |
| Primary database | Railway PostgreSQL | Users, projects, tickets, documents, submissions, chat | [ ] |
| Cache / sessions | Railway Redis | Session storage, rate limiting, chat presence | [ ] |
| Object storage | Cloudflare R2 (S3-compatible) | Resume uploads, portal documents, brand assets | [ ] |
| Email | Resend (free tier) | Transactional email: contact, careers, support, 2FA, newsletter | [ ] |
| Auth | NextAuth.js / Auth.js | User authentication, sessions, protected routes | [ ] |
| Error tracking | Sentry (free tier) | Frontend + backend error monitoring | [ ] |
| Analytics | Plausible or Umami (self-hosted or free tier) | Privacy-friendly analytics | [ ] |
| Uptime monitoring | Railway health checks + external monitor | `/api/health` endpoint | [ ] |

### 2.2 Directory Layout (Target)

```
bakyson/
├── railway.toml                 # Railway project config
├── Dockerfile                   # Container build for Next.js
├── .env.example                 # Documented required secrets
├── .github/
│   └── workflows/
│       └── deploy.yml           # Railway CLI deploy (replaces Vercel action)
├── next.config.ts               # Updated CSP (no Vercel domains), headers, images
├── package.json                 # Removed --webpack flag if using Turbopack, or keep if Webpack
├── prisma/                      # ORM schema and migrations
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout with Providers, metadata, PWA tags
│   │   ├── page.tsx             # Home
│   │   ├── about/page.tsx
│   │   ├── services/page.tsx
│   │   ├── portfolio/page.tsx
│   │   ├── case-studies/page.tsx
│   │   ├── case-studies/[slug]/page.tsx   # NEW dynamic route
│   │   ├── blog/page.tsx
│   │   ├── blog/[slug]/page.tsx           # NEW dynamic route
│   │   ├── careers/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── portal/
│   │   │   ├── layout.tsx         # Portal layout (auth required, sidebar)
│   │   │   ├── login/page.tsx
│   │   │   ├── 2fa/page.tsx
│   │   │   └── dashboard/page.tsx
│   │   ├── api/
│   │   │   ├── contact/route.ts
│   │   │   ├── careers/route.ts
│   │   │   ├── support-ticket/route.ts
│   │   │   ├── auth/[...nextauth]/route.ts  # NEW
│   │   │   ├── health/route.ts            # NEW Railway health check
│   │   │   ├── projects/route.ts          # NEW GET/POST
│   │   │   ├── tickets/route.ts           # NEW GET/POST
│   │   │   ├── documents/route.ts         # NEW GET/POST/DELETE
│   │   │   └── chat/route.ts              # NEW GET/POST (live chat backend)
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components (Button, Card, etc.)
│   │   ├── ClientShell.tsx        # Navbar + mobile menu + LiveChatWidget
│   │   ├── Footer.tsx
│   │   ├── LiveChatWidget.tsx     # Connected to backend chat API
│   │   ├── PageTransition/
│   │   ├── home-content/
│   │   ├── about-content/
│   │   ├── services-content/
│   │   ├── portfolio-content/
│   │   ├── case-studies-content/
│   │   ├── blog-content/
│   │   ├── careers-content/
│   │   ├── contact-content/
│   │   ├── dashboard-content/
│   │   ├── login-content/
│   │   └── two-fa-content/
│   ├── lib/
│   │   ├── utils.ts               # cn() helper
│   │   ├── db.ts                  # Prisma client singleton
│   │   ├── auth.ts                # NextAuth config
│   │   ├── validators.ts          # Zod schemas
│   │   ├── email.ts               # Resend client + templates
│   │   └── storage.ts             # R2/S3 client + presigned URLs
│   ├── hooks/
│   │   ├── useAuth.ts             # Session hook
│   │   └── useReducedMotion.ts    # Accessibility hook
│   └── types/
│       └── index.ts               # Shared TypeScript interfaces
├── public/
│   ├── icons/
│   │   ├── icon-512x512.svg
│   │   ├── icon-192x192.png     # NEW required
│   │   ├── icon-72x72.png       # NEW required
│   │   └── apple-touch-icon.png # NEW required
│   ├── manifest.json
│   ├── sw.js                    # Updated service worker
│   └── robots.txt
└── WORK_REFERENCE.md            # Task tracking (this project's to-do list)
```

### 2.3 Environment Variables (Required)

| Variable | Purpose | Example | Status |
|----------|---------|---------|--------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` | [ ] |
| `REDIS_URL` | Redis connection string | `redis://host:6379` | [ ] |
| `NEXTAUTH_SECRET` | Auth session signing | Random 32+ char string | [ ] |
| `NEXTAUTH_URL` | Auth callback URL | `https://bakyson-production.up.railway.app` | [x] |
| `RESEND_API_KEY` | Email provider API key | `re_xxx` | [ ] |
| `R2_ACCOUNT_ID` | Cloudflare R2 account ID | `xxx` | [ ] |
| `R2_ACCESS_KEY_ID` | R2 S3 access key | `xxx` | [ ] |
| `R2_SECRET_ACCESS_KEY` | R2 S3 secret key | `xxx` | [ ] |
| `R2_BUCKET_NAME` | R2 bucket name | `bakyson-assets` | [ ] |
| `SENTRY_DSN` | Error tracking DSN | `https://xxx@sentry.io/xxx` | [ ] |
| `NEXT_PUBLIC_ANALYTICS_ID` | Analytics ID | `xxx` | [ ] |
| `ADMIN_EMAIL` | Bakyson support email | `support@bakyson.com` | [ ] |
| `SMTP_FROM` | Email from address | `noreply@bakyson.com` | [ ] |

---

## 3. Data Model (Prisma Schema — Target)

```prisma
// src/prisma/schema.prisma (target outline — not yet implemented)

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma client"
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  passwordHash  String
  role          String    @default("client") // client, admin, staff
  company       String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  sessions      Session[]
  projects      Project[]
  tickets       Ticket[]
  submissions   Submission[]
  chatMessages  ChatMessage[]
}

model Session {
  id           String   @id @default(cuid())
  userId       String
  token        String   @unique
  expiresAt    DateTime
  createdAt    DateTime @default(now())
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Project {
  id          String   @id @default(cuid())
  userId      String
  name        String
  status      String   @default("Planning") // Planning, In Progress, Completed, On Hold
  progress    Int      @default(0)
  location    String?
  startDate   DateTime?
  endDate     DateTime?
  manager     String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  user        User     @relation(fields: [userId], references: [id])
  tickets     Ticket[]
  documents   Document[]
}

model Ticket {
  id          String   @id @default(cuid())
  userId      String
  projectId   String?
  subject     String
  description String
  priority    String   @default("Medium") // Low, Medium, High, Critical
  status      String   @default("Open") // Open, In Progress, Resolved, Closed
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  user        User     @relation(fields: [userId], references: [id])
  project     Project? @relation(fields: [projectId], references: [id])
}

model Document {
  id          String   @id @default(cuid())
  projectId   String?
  userId      String?
  fileName    String
  fileUrl     String
  fileType    String
  uploadedAt  DateTime @default(now())
  project     Project? @relation(fields: [projectId], references: [id])
  user        User?    @relation(fields: [userId], references: [id])
}

model Submission {
  id          String   @id @default(cuid())
  name        String
  email       String
  phone       String?
  company     String?
  service     String?
  message     String
  status      String   @default("new") // new, contacted, resolved
  createdAt   DateTime @default(now())
}

model ChatMessage {
  id          String   @id @default(cuid())
  userId      String?
  sender      String   // user, agent
  text        String
  createdAt   DateTime @default(now())
  user        User?    @relation(fields: [userId], references: [id])
}
```

---

## 4. Connections & Data Flows

### 4.1 Authentication Flow

```
User visits /portal/login
  → Submits email/password
  → NextAuth validates credentials against User table
  → Session created in Session table + secure cookie (HttpOnly, Secure, SameSite=Lax)
  → Redirect to /portal/2fa (if 2FA enabled) or /portal/dashboard
  → 2FA: User submits TOTP code → verified → session marked verified → /portal/dashboard
  → Middleware checks session on all /portal/* routes → redirects to /portal/login if invalid
  → Sign out: clears session cookie + invalidates Session record
```

### 4.2 Contact Form Flow

```
User submits /contact form
  → POST /api/contact (Zod validation)
  → Insert into Submission table
  → Resend email: notification to ADMIN_EMAIL + auto-reply to user
  → Return success + toast to user
  → (Optional) Create Ticket record if service-related
```

### 4.3 Careers Application Flow

```
User submits /careers application (multipart/form-data)
  → POST /api/careers
  → Validate resume file (MIME + magic bytes + size <5MB)
  → Upload resume to R2 bucket → get presigned URL
  → Insert record into Submissions (or dedicated Application table)
  → Resend email: notification to HR + auto-reply to applicant
  → Return success + toast
```

### 4.4 Support Ticket Flow

```
Authenticated user submits ticket from /portal/dashboard
  → POST /api/tickets
  → Insert into Ticket table linked to User
  → Resend email: notification to support team
  → Return ticket ID + toast
  → User can view tickets in dashboard (GET /api/tickets?userId=...)
```

### 4.5 Live Chat Flow

```
User sends message in LiveChatWidget
  → POST /api/chat (or Server Action)
  → Insert into ChatMessage table (sender: user)
  → Agent responds via admin dashboard (or email notification)
  → Agent message inserted (sender: agent)
  → GET /api/chat polls or SSE/WebSocket for new messages
  → Messages persist across refreshes
```

### 4.6 File Upload Flow (Resumes / Documents)

```
File selected in form
  → Client requests presigned URL from /api/documents/upload (POST)
  → R2 returns presigned PUT URL
  → Client PUTs file directly to R2
  → Client POSTs file metadata to /api/documents
  → Insert into Document table with fileUrl pointing to R2
  → Download: GET /api/documents/:id → generates presigned GET URL → redirect to R2
```

---

## 5. API Route Inventory (Target State)

| Route | Method | Purpose | Auth Required | Status |
|-------|--------|---------|---------------|--------|
| `/api/contact` | POST | Contact form submission | No | [x] Persists to submissions table |
| `/api/careers` | POST | Job application + resume upload | No | [x] Persists to job_applications table |
| `/api/support-ticket` | POST | Public support ticket | No | [x] Persists to tickets table |
| `/api/auth/[...nextauth]` | GET/POST | NextAuth handlers (login, logout, session, callback) | No | [x] Implemented |
| `/api/health` | GET | Railway health check | No | [x] Implemented |
| `/api/auth/signout` | POST | Sign out and clear session | No | [x] Implemented |
| `/api/csrf/token` | GET | CSRF token endpoint | No | [x] Implemented |
| `/api/projects` | GET | List user projects | Yes | [x] Implemented |
| `/api/projects/[id]` | GET/PUT/DELETE | Project detail | Yes | [ ] |
| `/api/tickets` | GET | List user tickets | Yes | [x] Implemented |
| `/api/tickets/[id]` | GET/PUT | Ticket detail/update | Yes | [ ] |
| `/api/documents` | GET/POST | List/upload documents | Yes | [ ] |
| `/api/documents/[id]` | GET/DELETE | Download/delete document | Yes | [ ] |
| `/api/chat` | GET/POST | Chat messages | Yes | [ ] |

---

## 6. Layout & Component Architecture

### 6.1 Layout Hierarchy

```
RootLayout (src/app/layout.tsx)
├── Providers (SessionProvider, ThemeProvider, QueryClientProvider, ToastProvider)
├── SkipNavigation link
├── ClientShell (Navbar + LiveChatWidget)
│   ├── Navbar (links, mobile menu, Client Portal button)
│   └── LiveChatWidget (connected to /api/chat)
├── main > PageTransition (AnimatePresence mode="wait")
│   └── Page content (Home, About, Services, etc.)
├── Footer
└── Service worker registration script

PortalLayout (src/app/portal/layout.tsx)
├── Providers (if not inherited)
├── PortalSidebar (My Projects, Support Tickets, Documents, Sign Out)
├── PortalHeader (breadcrumbs, notifications, user profile)
└── main > Page content (Login, 2FA, Dashboard)
```

### 6.2 Component Categories

| Category | Components | Status |
|----------|-----------|--------|
| UI primitives (shadcn) | Button, Card, Badge, Input, Dialog, Alert, Skeleton, Toast | [ ] (need token fix) |
| Layout | ClientShell, Footer, Navbar, PortalSidebar, PortalHeader | [ ] |
| Page content | HomeContent, AboutContent, ServicesContent, PortfolioContent, CaseStudiesContent, BlogContent, CareersContent, ContactContent | [ ] |
| Portal | LoginContent, TwoFAContent, DashboardContent | [ ] |
| Widgets | LiveChatWidget | [ ] (needs backend) |
| Motion | PageTransition, shared motion constants | [ ] (need shared constants) |

### 6.3 Design Token Mapping (Required Fix)

Shadcn expects these CSS variables. `globals.css` must define them:

```
--background          → #ffffff
--foreground          → #0a0a0a
--primary             → #FF6B00
--primary-foreground  → #FFFFFF
--secondary           → #F5F5F5
--secondary-foreground→ #0a0a0a
--muted               → #F3F4F6
--muted-foreground    → #6B7280
--accent              → #FF6B00
--accent-foreground   → #FFFFFF
--destructive         → #DC2626
--destructive-foreground → #FFFFFF
--border              → #D1D5DB
--input               → #D1D5DB
--ring                → #FF6B00
--card                → #ffffff
--card-foreground     → #0a0a0a
--popover             → #ffffff
--popover-foreground  → #0a0a0a
```

---

## 7. Deployment Pipeline (Target)

### 7.1 GitHub Actions → Railway

```yaml
# .github/workflows/deploy.yml (target)
name: Deploy to Railway

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      - run: npm ci
      - run: npm run lint
      - run: npx tsc --noEmit
      - run: npm run build
        env:
          NODE_OPTIONS: "--max-old-space-size=4096"
      - name: Deploy to Railway
        if: github.ref == 'refs/heads/main' || github.ref == 'refs/heads/master'
        uses: railwayapp/cli-action@v1
        with:
          command: up
          service: bakyson-web
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
```

### 7.2 Railway Service Configuration

```
# railway.toml (target)
[build]
  builder = "nixpacks"
  buildCommand = "npm run build"
  startCommand = "npm start"

[deploy]
  healthcheckPath = "/api/health"
  healthcheckTimeout = 100
  restartPolicyType = "on_failure"
  maxRestarts = 10

[services]
  web = { source = "." }
  db = { source = "railway/postgresql" }
  redis = { source = "railway/redis" }
```

---

## 8. Security Architecture

| Layer | Control | Status |
|-------|---------|--------|
| Transport | TLS 1.2+ (Railway-managed SSL) | [ ] |
| Auth | Password hashing (bcrypt/argon2) + secure cookies | [ ] |
| Session | HttpOnly, Secure, SameSite=Lax, short expiry + refresh | [ ] |
| API | Rate limiting on public routes, CSRF on mutations | [ ] |
| CSP | Updated for Railway (no vercel.live domains), no unsafe-eval ideally | [ ] |
| File upload | MIME + magic byte validation, size limits, virus scan optional | [ ] |
| Database | Parameterized queries via Prisma (SQL injection prevention) | [ ] |
| Secrets | Environment variables only, no .env committed, .env.example documented | [ ] |

---

## 9. Observability Architecture

| Layer | Tool | Purpose | Status |
|-------|------|---------|--------|
| Error tracking | Sentry | Frontend + backend errors | [ ] |
| Analytics | Plausible / Umami | Privacy-friendly page views | [ ] |
| Uptime | Railway health check + external | `/api/health` every 60s | [ ] |
| Logging | Structured JSON logs (replace console.log) | Production debugging | [ ] |
| Alerting | Email/Slack on API failure | Production incidents | [ ] |
| Backups | Railway PostgreSQL automated backups | Daily + point-in-time | [ ] |

---

## 10. Change Log

| Date | Section | Item | Change | Notes |
|------|---------|------|--------|-------|
| 2026-11-17 | All | All | Initial creation | Target architecture defined from codebase review |
| 2026-11-17 | 2.2 | Directory Layout | PWA icons created (72x72, 192x192, apple-touch-icon as SVG placeholders) | `public/icons/` updated; `sw.js`, `manifest.json`, `layout.tsx` references fixed |
| 2026-11-17 | 2.3 | Environment Variables | No changes — pending Railway provisioning | |
| 2026-11-17 | 5 | API Route Inventory | `/api/health` still pending | Health check endpoint not yet implemented |
| 2026-11-17 | 5 | Frontend | `globals.css` shadcn token mapping fixed | Shadcn components will now render correctly |
| 2026-11-17 | 5 | Frontend | `careers/page.tsx` import path fixed | Careers page no longer 404s |
| 2026-11-17 | 5 | Frontend | `next.config.ts` images.remotePatterns added | Unsplash images now load correctly |
| 2026-11-17 | 5 | Frontend | `LiveChatWidget.tsx` CSS classes fixed | Widget uses valid design system classes |
| 2026-11-17 | 2.1 | Hosting Platform | Railway PostgreSQL + Redis services declared in `railway.toml` | Requires Railway account provisioning |
| 2026-11-17 | 2.2 | Directory Layout | Dockerfile added; `.env.example` created; `prisma/schema.prisma` data model documented | Multi-stage Dockerfile with standalone output |
| 2026-11-17 | 2.3 | Environment Variables | `.env.example` created with DATABASE_URL, REDIS_URL, NEXTAUTH_SECRET, RESEND_API_KEY, R2_* | `.env.example` exempted from `.gitignore` |
| 2026-11-17 | 3 | Data Model | `prisma/schema.prisma` documents User, Session, Project, Ticket, Document, Submission, ChatMessage | Prisma client generation blocked on Windows; using `pg` instead |
| 2026-11-17 | 4 | API Routes | `/api/health` GET endpoint created | Database connectivity check for Railway health checks |
| 2026-11-17 | 4 | API Routes | `src/lib/db.ts` created with `pg.Pool` | Connection pool, query helper, transaction support |
| 2026-11-17 | 4 | API Routes | `src/lib/validators.ts` created with Zod schemas | Contact, careers, ticket, project, login, 2FA, document, chat validation |
| 2026-11-17 | 5 | Layout | `src/middleware.ts` created | Protects `/portal/*` routes with session cookie check |
| 2026-11-17 | 7 | Deployment | `.github/workflows/deploy.yml` rewritten for Railway CLI | Uses `railwayapp/cli-action@v1` with `railway up`; lint + type check + build gates |
| 2026-11-17 | 8 | Security | CSP updated for Railway | Removed `vercel.live` and `va.vercel-scripts.com` domains |
| 2026-11-17 | 8 | Security | `.env.example` created | All required secrets documented |
| 2026-11-17 | 4 | API Routes | `/api/auth/[...nextauth]/route.ts` created | NextAuth credentials provider with bcrypt |
| 2026-11-17 | 4 | API Routes | `/api/auth/signout/route.ts` created | Clears session cookies on POST |
| 2026-11-17 | 4 | API Routes | `src/lib/auth.ts` created | NextAuth config with JWT session strategy, credentials provider |
| 2026-11-17 | 4 | API Routes | `src/lib/session.ts` created | `getSession` and `requireSession` server utilities |
| 2026-11-17 | 5 | Layout | `src/middleware.ts` updated | Uses `getToken` from `next-auth/jwt` instead of cookie name check |
| 2026-11-17 | 5 | Frontend | Login page updated | Posts to `/api/auth/callback/credentials` instead of fake setTimeout |
| 2026-11-17 | 5 | Frontend | Dashboard updated | Fetches session from `/api/auth/session`; signout calls `/api/auth/signout` |
| 2026-11-17 | 2.3 | Environment Variables | Added BAKYSON_DEMO_EMAIL and BAKYSON_DEMO_PASSWORD_HASH | Demo credentials for auth until database is provisioned |
| 2026-11-17 | 3 | Data Model | `database/schema.sql` created | Replaces Prisma schema; defines users, sessions, projects, tickets, documents, submissions, chat_messages, job_applications tables with indexes and updated_at triggers |
| 2026-11-17 | 3 | Data Layer | `src/lib/db.ts` updated | Added DATABASE_URL validation, testConnection(), DATABASE_URL warning in production |
| 2026-11-17 | 4 | API Routes | `/api/projects/route.ts` created | GET endpoint with NextAuth session filtering |
| 2026-11-17 | 4 | API Routes | `/api/tickets/route.ts` created | GET endpoint with NextAuth session filtering |
| 2026-11-17 | 4 | API Routes | `/api/contact/route.ts` updated | Persists to submissions table via pg pool; Zod validation |
| 2026-11-17 | 4 | API Routes | `/api/careers/route.ts` updated | Persists to job_applications table via pg pool; server-side 5MB file size limit |
| 2026-11-17 | 4 | API Routes | `/api/support-ticket/route.ts` updated | Persists to tickets table via pg pool; Zod validation |
| 2026-11-17 | 4 | Scripts | `scripts/seed.ts` created | Seeds demo user, projects, tickets, chat messages, submissions |
| 2026-11-17 | 5 | Frontend | Dashboard updated | Fetches projects/tickets from `/api/projects` and `/api/tickets` instead of hardcoded data; welcome message uses session user name |
| 2026-11-17 | 4 | API Routes | `/api/csrf/token/route.ts` created | Returns CSRF token and sets cookie for double-submit protection |
| 2026-11-17 | 5 | Middleware | Updated `src/middleware.ts` | Web Crypto API (Edge Runtime compatible) + CSRF validation for state-changing methods + CORS preflight handling |
| 2026-11-17 | 4 | Email | `src/lib/email.ts` created | Resend integration for contact, careers, support ticket, and 2FA email notifications |
| 2026-11-17 | 7 | Observability | `sentry.server.config.ts`, `sentry.client.config.ts`, `sentry.edge.config.ts` created | Sentry error tracking configuration |
| 2026-11-17 | 7 | Observability | `src/lib/analytics.ts` created | Plausible Analytics utility + layout integration |
| 2026-11-17 | 5 | Frontend | `/api/csrf/token` route added | CSRF token endpoint for client-side token retrieval |
| 2026-11-17 | 6 | Dynamic Routes | `/case-studies/[slug]/page.tsx` created | 4 static case studies with generateStaticParams |
| 2026-11-17 | 6 | Dynamic Routes | `/blog/[slug]/page.tsx` created | 4 static blog posts with generateStaticParams |
| 2026-11-17 | 6 | Legal Pages | `/terms-of-use/page.tsx` created | Terms of Use page |
| 2026-11-17 | 6 | Legal Pages | `/cookie-policy/page.tsx` created | Cookie Policy page |
| 2026-11-17 | 6 | Legal Pages | `/privacy-policy/page.tsx` created | Privacy Policy page |
| 2026-11-17 | 2 | Documentation | `RAILWAY_PROVISIONING.md` created | Step-by-step Railway service provisioning guide |
| 2026-11-17 | 4 | API Routes | `/api/csrf/token/route.ts` created | Returns CSRF token and sets cookie for double-submit protection |
| 2026-11-17 | 5 | Middleware | Updated `src/middleware.ts` | Web Crypto API (Edge Runtime compatible) + CSRF validation + CORS preflight + structured logging |
| 2026-11-17 | 3 | Data Layer | `src/lib/db.ts` updated | Integrated structured logging via `src/lib/logger.ts` |
| 2026-11-17 | 3 | Data Layer | `src/lib/logger.ts` created | Structured JSON logging with levels (debug/info/warn/error), request IDs |
| 2026-11-17 | 4 | Email | `src/lib/email.ts` created | Resend integration for contact, careers, support ticket, and 2FA email notifications |
| 2026-11-17 | 4 | Email | Contact/careers/support-ticket API routes updated | Send notification and confirmation emails via Resend (non-blocking) |
| 2026-11-17 | 7 | Observability | `src/lib/logger.ts` created | Structured logging utility with createLogger factory |
| 2026-11-17 | 7 | Observability | CI updated | Added `npm audit --audit-level=moderate` to GitHub Actions |
| 2026-11-17 | 4 | API Routes | CORS headers added | `next.config.ts` headers for `/api/*` routes |
| 2026-11-17 | 4 | API Routes | Cache-Control headers added | `no-cache, no-store, must-revalidate` for `/api/*` |
| 2026-11-17 | 8 | Security | CSP unsafe-eval removed | `next.config.ts` script-src uses `strict-dynamic` instead of `unsafe-eval` |
| 2026-11-17 | 5 | Frontend | Logo SVG | `src/components/ClientShell.tsx` — replaced div "B" logo with SVG brand mark |
| 2026-11-17 | 5 | Frontend | Form labels | `login-content/page.tsx`, `contact-content/page.tsx` — htmlFor/id pairing + aria-describedby/aria-invalid |
| 2026-11-17 | 6 | Legal Pages | `/industry/page.tsx` created | 6 industry cards with descriptions |
| 2026-11-17 | 2 | Directory Layout | Sitemap updated | Added /industry, /portal/dashboard, /portal/2fa, legal pages |
| 2026-11-17 | 3 | Data Layer | `scripts/migrate.ts` created | Reads `database/schema.sql` and executes against configured PostgreSQL via pg pool |
| 2026-11-17 | 3 | Data Layer | `scripts/setup.ps1` created | PowerShell script for Windows Railway project setup, migration, and seeding |
| 2026-11-17 | 2.3 | Environment Variables | `.env.example` updated | Added SSL notes, UPSTASH_REDIS_REST_URL/TOKEN as Redis alternative |
| 2026-11-18 | 2.1 | Hosting Platform | Railway demo URL configured | Updated all hardcoded `bakyson.com` references to `bakyson-production.up.railway.app` in `next.config.ts`, `.env.example`, reference files; health check verified on Railway URL |
| 2026-11-18 | 2.2 | Directory Layout | Health check verified | `https://bakyson-production.up.railway.app/api/health` returns 200, database connected; home page loads |
| 2026-11-18 | 4 | API Routes | `/api/newsletter` created | POST endpoint for newsletter subscriptions with rate limiting, validation, and DB persistence |
| 2026-11-18 | 4 | API Routes | Portal sign-out fixed | `DashboardContent.tsx` now calls `/api/auth/signout` to clear session cookies |
| 2026-11-18 | 5 | Frontend | Careers apply wired | `careers-content/page.tsx` modal form POSTs to `/api/careers` with multipart FormData |
| 2026-11-18 | 5 | Frontend | Newsletter form wired | `blog-content/page.tsx` form submits to `/api/newsletter` with validation and success feedback |
| 2026-11-18 | 5 | Frontend | UI components added | `label.tsx`, `textarea.tsx` for accessible form composition |
| 2026-11-18 | 3 | Data Layer | Newsletter table added | `newsletter_subscriptions` table in `database/schema.sql` with email uniqueness and status |

---

## How to Update This File

When making architecture decisions:
1. Change `[ ]` to `[x]` for items that are implemented and verified
2. Add new infrastructure/integration/connection decisions as `[ ]` items in the appropriate section
3. If a design decision conflicts with an existing entry, merge them and mark the duplicate as `[x] Superseded by #N`
4. Update the Directory Layout, Environment Variables, Data Model, API Route Inventory, and Deployment sections as they evolve
5. Add entries to the Change Log with date, section, item, change, and notes

This file is the canonical architecture reference. No infrastructure, layout, integration, or connection work is considered complete until the corresponding item here is updated and verified.