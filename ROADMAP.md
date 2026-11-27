# Bakyson — Product Roadmap

> **Status:** Draft. Items marked **[TBD]** require client decision before work can begin.
> Prioritised milestones with dependencies, owners, and definition-of-done.
> This is the single source of truth for what gets built and in what order.

---

## 0. Current state (baseline)

All milestones M1–M8 from `PROJECT.md` §16 are complete and the build is green. Open client decisions and bugs from the code audit block forward progress.

### Completed
| Milestone | Description |
|-----------|-------------|
| M1 | Public site scaffold (Next 16 + Tailwind v4 + design tokens) |
| M2 | Marketing pages (about/services/portfolio/case-studies/blog/careers/contact/quote/support) |
| M3 | PostgreSQL schema + API routes (contact/careers/newsletter/projects/tickets) |
| M4 | Auth + client portal + password-reset hardening |
| M5 | PWA (manifest, service worker, offline, icons) |
| M6 | Admin dashboard split into separate app/repo |
| M7 | Design-system alignment pass (Lucide icons, cards, glassmorphism) |
| M8 | Homepage rebrand: Wacaco-style cycling hero + 4 sections |

---

## Phase 1 — Stabilise & lock foundations (immediate)

**Goal:** Fix known bugs, lock design decisions, remove placeholders. No new features.

### 1.1 Fix critical bugs

| ID | Issue | File(s) | Fix | Depends on | DoD |
|----|-------|---------|-----|------------|-----|
| B1 | NextAuth sign-in redirect to non-existent `/portal/login` | `src/app/api/auth/[...nextauth]/route.ts:36` | Change `pages.signIn` to `/portal` | None | Sign-in redirect works; unauthenticated users reach `/portal` |
| B2 | Text "Bakyson" logo on non-homepage pages | `src/components/site-header.tsx:23` | Replace text link with SVG logo image | None | No text "BAKYSON" as logo on any page |
| B3 | Emoji used as close icon | `src/components/ContactSection.tsx:234` | Replace `✕` with SVG (lucide X) | None | No emojis as icons anywhere |
| B4 | Mega menu anchor mismatches | `src/components/site-nav.tsx` | Fix `megaIndustries` and `megaServices` hrefs to match existing section IDs | None | All mega menu links scroll to valid anchors |
| B5 | `.env.example` has wrong `NEXTAUTH_URL` (Railway URL) | `.env.example` | Update to production domain placeholder | **[TBD]** domain | `NEXTAUTH_URL` reflects actual production domain |

### 1.2 Lock client decisions (blocking)

| Decision | Question | Owner | Needed by |
|----------|----------|-------|-----------|
| D1 | Final brand palette: `#f3694f` red vs `#FF6B00` orange? Are Wacaco neutrals approved? | Client | Before any repaint |
| D2 | Real contact email and phone (current `hello@bakyson.io` is placeholder) | Client | Before public launch |
| D3 | Production domain (`bakyson.com` forbidden) | Client | Before Vercel production config |
| D4 | Real media per vertical (6 thumbs, 6 detail images, 6 clips; currently picsum/W3Schools placeholders) | Client | Before public launch |
| D5 | Verified claims ("150+ installations nationwide", etc.) | Client | Before public launch |
| D6 | About link target: `/about` page or `#about` in-page anchor? | Client | Before navigation changes |
| D7 | Services page palette: keep orange or align to red? | Client | Before services page updates |

### 1.3 Remove placeholders

| Item | Location | Replacement source |
|------|----------|-------------------|
| Contact email | `contact/page.tsx`, `ContactSection.tsx` | Real email (D2) |
| Contact phone | `contact/page.tsx`, `ContactSection.tsx` | Real phone (D2) |
| Hero media | `public/images/*` (picsum/W3Schools) | Real brand media (D4) |
| Unverified claim | `SystemsSection.tsx:100` "150+ installations" | Verified stat (D5) |
| `temp_files.txt` | Repo root | Review and remove if clutter |

**DoD for Phase 1:** Build green, no console errors, all client decisions documented, no placeholder email/phone/media visible, bugs B1–B5 fixed.

---

## Phase 2 — Design system alignment

**Goal:** Apply locked palette (D1) consistently across the entire site. One colour system, no conflicts.

| Task | Description | Depends on | DoD |
|------|-------------|------------|-----|
| P1 | Repaint globals.css tokens to approved palette | D1 | `--color-primary` matches decision |
| P2 | Repaint homepage sections (About, Systems, Industries, Contact) | D1, P1 | Consistent colours |
| P3 | Repaint services page (remove 8 accent colours, use approved palette) | D1, P1, D7 | Services page matches brand |
| P4 | Update site-nav and site-header colours | D1, P1 | Nav matches brand |
| P5 | Update design-system `MASTER.md` tokens | D1, P1 | MASTER.md matches globals.css |
| P6 | Audit all pages for stray colours (blue, indigo, purple, emerald, gray accents) | D1 | Only approved colours remain |

**DoD for Phase 2:** Single palette across all pages; no multi-colour service cards; `globals.css` and `MASTER.md` in sync.

---

## Phase 3 — Content & media

**Goal:** Replace all placeholder assets with real brand content.

| Task | Description | Depends on | DoD |
|------|-------------|------------|-----|
| C1 | Replace 6 hero thumbnails, 6 detail images, 6 video clips | D4 | Real media in `public/images/`, `mediaType: 'image'` set where applicable |
| C2 | Verify and update all copy claims | D5 | No unverified statistics published |
| C3 | Replace placeholder client logos on other pages | D4 | Real logos or removed |
| C4 | Update hero copy if needed | Client | Headlines/subheads match brand voice |

**DoD for Phase 3:** No picsum/W3Schools assets remain; all claims verified; hero uses real media.

---

## Phase 4 — Infrastructure hardening

**Goal:** Production readiness beyond the MVP.

| Task | Description | Depends on | DoD |
|------|-------------|------------|-----|
| I1 | Confirm production domain and configure Vercel | D3 | Site live at confirmed domain |
| I2 | Set real contact email in Resend; verify domain | D2 | Emails deliver successfully |
| I3 | Verify Railway Postgres provisioning and run `db-setup.mjs` | None | Database schema applied, admin account exists |
| I4 | Configure database backups and document restore procedure | I3 | Backup schedule defined, restore tested |
| I5 | Configure uptime monitoring on `/api/health` | I1 | Alerts on downtime |
| I6 | Add Content Security Policy headers | I1 | CSP header present, no console violations |
| I7 | Evaluate middleware → proxy migration (Next 16 deprecation) | None | Migration planned or deferred with rationale |
| I8 | Document disaster recovery procedure | I3, I4 | DR doc exists, team can execute |

**DoD for Phase 4:** Site on confirmed domain, database backed up, monitoring active, CSP in place, DR documented.

---

## Phase 5 — Backlog (future, not prioritised)

| Item | Description | Status |
|------|-------------|--------|
| Migrations | Add migration system (currently only idempotent DDL) | Backlog |
| File uploads | S3/storage for resumes, documents | Backlog |
| i18n / localisation | French, Arabic, Swahili for Sub-Saharan Africa | Backlog |
| Advanced analytics | Conversion tracking, funnel analysis | Backlog |
| A/B testing | Hero variant testing | Backlog |
| Dark mode | Explicitly forbidden by design system | Not planned |

---

## Milestone summary

| Phase | Focus | Blocking on | Target |
|-------|-------|-------------|--------|
| Phase 1 | Bug fixes + client decisions + placeholder removal | D1–D7 | Immediate |
| Phase 2 | Palette alignment across site | D1 | After Phase 1 |
| Phase 3 | Real media + verified content | D4, D5 | After Phase 2 |
| Phase 4 | Infrastructure hardening | D2, D3 | After Phase 3 |
| Phase 5 | Future enhancements | — | Backlog |


---

## Commit & documentation impact checklist (run before every commit)

Before committing, ask: **"Does this change make anything in DESIGN.md, ARCHITECTURE.md, INFRASTRUCTURE.md, or ROADMAP.md wrong?"**

| If your change touches... | Then update... |
|---------------------------|----------------|
| Colours, typography, components, hero spec | `DESIGN.md` |
| Tech stack, API routes, data model, auth, DB schema | `ARCHITECTURE.md` |
| Env vars, deployment, CI/CD, domain, monitoring | `INFRASTRUCTURE.md` |
| Milestones, bugs, client decisions, placeholders | `ROADMAP.md` |

**Rule:** Update the doc in the **same commit** as the code. If nothing in the four docs is now inaccurate, commit the code only — do not touch the docs.

---

## Definition of done (per milestone)

- [ ] `npm run lint` passes
- [ ] `npm run build` passes (TypeScript clean)
- [ ] No `bakyson.com` references (`git grep -i "bakyson\.com"`)
- [ ] No text "BAKYSON" as logo
- [ ] No emojis as icons
- [ ] Homepage shows exactly two logo instances
- [ ] No horizontal scroll at 375/768/1024/1440
- [ ] Placeholder items resolved or marked TBD with owner
- [ ] `PROJECT.md` issue log and milestones updated
- [ ] Client sign-off on any design/copy change
- [ ] Any doc impacted by this commit was updated in the same commit
