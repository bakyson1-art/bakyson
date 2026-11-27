# Bakyson — Product Requirements Document (PRD)

> **Status:** Draft. Items marked **[TBD]** require client decision before finalisation.
> This document defines what the Bakyson public site and client portal must do,
> who it serves, and how success is measured. It is the source of truth for
> feature scope; DESIGN.md, ARCHITECTURE.md, and ROADMAP.md derive from it.

---

## 1. Product overview

**Product:** Bakyson — public marketing website + auth-gated client portal  
**Company:** Bakyson, an Extra Low Voltage (ELV) ICT solutions provider  
**Region:** Sub-Saharan Africa (Kenya, Nigeria, South Africa hubs)  
**Audience:** Facilities / IT managers, operations directors, architects, developers, contractors, and occasional SME enquiries  
**Platform:** Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS v4, PostgreSQL  
**Deployment:** Vercel (primary), Railway Postgres (shared with admin dashboard)

---

## 2. Vision & goals

**Vision:** Be the trusted digital front door for ELV infrastructure projects across Sub-Saharan Africa — enabling buyers to discover systems, request quotes, and track project progress online.

### Primary conversion goals (in priority order)

1. **Book a demo / property walkthrough / site assessment** (main CTA)
2. **Request a quote**
3. **Call / email back**
4. **Browse systems by vertical, then contact**

### Success metrics

| Metric | Target | Source |
|--------|--------|--------|
| Quote request submissions | [TBD] per month | `/api/contact` |
| Portal sign-ups (active clients) | [TBD] | `users` table |
| Demo / walkthrough bookings | [TBD] per month | `submissions` + CRM |
| Page load (LCP) | < 2.5s on 4G | Web Vitals |
| Portal uptime | 99.5% | `/api/health` + uptime monitor |

---

## 3. User personas

| Persona | Role | Goals | Pain points |
|---------|------|-------|-------------|
| Facilities / IT manager | B2B buyer | Find reliable ELV partner, compare systems, track existing projects | Vendors disappear after install; no project visibility |
| Operations director | B2B buyer | Approve budgets, review security/safety compliance | Hard to get status updates on site works |
| Architect / developer | Specifier | Specify ELV systems in building designs | Needs technical detail and past case studies |
| Contractor | Partner | Coordinate installation, raise support tickets | No central ticket portal |
| SME enquirer | Occasional buyer | Get quick quote for small install | Long sales cycles, no transparent pricing |

---

## 4. Functional requirements

### 4.1 Public marketing site

| ID | Requirement | Priority | Acceptance criteria |
|----|-------------|----------|---------------------|
| FR-01 | Homepage displays Wacaco-style cycling hero with 6 verticals | P0 | Hero cycles every 7s; play button resets timer; masks correct at ≥1024px; mobile fallback renders |
| FR-02 | Navigation links to about, services, industries, contact | P0 | All links resolve; no 404s |
| FR-03 | Services catalogue with per-service detail anchors | P0 | Each service has features, industries, and "Request a Quote" CTA |
| FR-04 | Contact form submits to `/api/contact` | P0 | Zod validation; success toast; error handling |
| FR-05 | Careers application form submits to `/api/careers` | P0 | File upload not required initially (resume_url text only) |
| FR-06 | Newsletter subscription submits to `/api/newsletter` | P0 | Email uniqueness enforced; double opt-in not required initially |
| FR-07 | Quote request form | P1 | Service dropdown pre-filled from `/contact?service=...` |
| FR-08 | PWA: installable, offline fallback, update banners | P1 | Service worker registers in production; `/offline` works without network |
| FR-09 | Health endpoint `/api/health` returns `{ status: "ok" }` | P0 | Used for uptime monitoring |

### 4.2 Client portal (auth-gated)

| ID | Requirement | Priority | Acceptance criteria |
|----|-------------|----------|---------------------|
| FR-10 | Public sign-in page at `/portal` | P0 | Email + password; credentials validated via next-auth |
| FR-11 | Protected routes `/portal/projects`, `/portal/tickets` | P0 | Middleware redirects unauthenticated users to `/portal` |
| FR-12 | View project list with status and progress | P1 | Data from `projects` table; user-scoped |
| FR-13 | View ticket list with priority and status | P1 | Data from `tickets` table; user-scoped |
| FR-14 | Sign out | P0 | Clears session; redirects to `/portal` |
| FR-15 | Password reset with token hashing | P1 | SHA-256 hash stored; rate-limited; expiry enforced |

### 4.3 Admin dashboard (out of scope — separate app)

The admin dashboard (`admin-dashboard/`) is a separate application sharing the same PostgreSQL database. It handles full CRUD for users, projects, tickets, and activity logging. It is **not** part of this PRD.

---

## 5. Non-functional requirements

| Category | Requirement | Measurement |
|----------|-------------|-------------|
| Performance | LCP < 2.5s, CLS < 0.1, TBT < 300ms | Chrome UX Report / Lighthouse |
| Accessibility | WCAG AA contrast (4.5:1 normal, 3:1 large), keyboard navigable, visible focus | Manual + axe audit |
| Security | Passwords bcrypt-hashed; JWT sessions; CSRF on portal; rate limiting on public POST endpoints | OWASP ASVS Level 1 |
| Reliability | 99.5% uptime; database backups configured | Uptime monitor + backup restore test |
| Maintainability | TypeScript strict; ESLint clean; build passes before deploy | CI gate |
| Responsive | No horizontal scroll at 375 / 768 / 1024 / 1440 | Manual QA |
| i18n | English only (v1). Sub-Saharan Africa expansion (French, Arabic, Swahili) is post-MVP. | N/A |

---

## 6. Out of scope (v1)

- E-commerce / online payments
- User self-registration (clients are onboarded by staff via admin dashboard)
- File attachments on contact form (resume_url is text only)
- Multi-language support
- Dark mode (explicitly forbidden by design system)
- Real-time chat or WebSocket notifications
- Mobile native apps (PWA is the mobile strategy)
- Third-party integrations beyond Resend (email) and Sentry (observability)

---

## 7. Assumptions & dependencies

| # | Assumption | Owner | Risk if wrong |
|---|-----------|-------|---------------|
| A1 | Client approves final palette (`#f3694f` vs `#FF6B00`) before repaint | Client | Repaint work wasted |
| A2 | Real contact email and phone provided | Client | Placeholder emails published |
| A3 | Production domain confirmed (not `bakyson.com`) | Client | Cannot configure NextAuth callback URLs correctly |
| A4 | Real brand media provided (6 thumbs, 6 details, 6 clips) | Client | Placeholder picsum/W3Schools assets remain |
| A5 | Railway Postgres provisioned and accessible | Engineering / client | Cannot run schema or auth |
| A6 | Admin dashboard team coordinates schema changes | Admin team | Breaking DB changes affect public site |
| A7 | Vercel + GitHub auto-deploy is configured | Engineering | Manual deploys required |

---

## 8. Open questions for client (blocking)

1. Final brand palette and Wacaco shell neutrals
2. Real contact email and phone
3. Production domain
4. Real media per vertical
5. Verified claims ("150+ installations nationwide", etc.)
6. About link target: `/about` page or `#about` anchor?
7. Services page palette: keep orange or align to red?

---

## 9. Change control

Changes to this PRD require:
- Client sign-off for scope, audience, or conversion goal changes
- Engineering agreement for technical assumption changes
- Update to `ROADMAP.md` milestones if priorities shift
- Update to `DESIGN.md` or `ARCHITECTURE.md` if functional behavior changes
