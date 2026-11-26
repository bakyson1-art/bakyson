# Bakyson — Project Handbook for AI Agents

> **Read this file before making changes.** It is the single source of truth for
> context, constraints, history, and known traps in this repository. If you are
> an AI coding agent picking this project up cold, start here, then read
> `AGENTS.md` (Next.js version warnings) and `design-system/bakyson/MASTER.md`
> (base design tokens).
>
> **Last verified:** 2026-11-26 · **Branch:** `master` · **Commit at writing:** `ebca078` (plus the header-dedup commit made alongside this doc)

---

## 1. What this project is

**Bakyson** is a marketing + client-portal website for an **Extra Low Voltage
(ELV) ICT solutions** provider operating across Sub-Saharan Africa.

The company designs, installs, and supports low-voltage infrastructure
(structured cabling, networks, CCTV, access control, fire/PAVA, IPTV, room
automation, BMS, boardroom AV) for many verticals.

### Verticals served (authoritative list used by the homepage hero)

1. Hospitality (hotels & resorts)
2. Healthcare (hospitals & clinics)
3. Corporate & Commercial Real Estate
4. Learning Institutions (schools & campuses)
5. Aviation (airports & terminals)
6. Remote & Mining Camps

### Audience

- Facilities / IT managers and operations directors (primary B2B buyers)
- Architects, developers, and contractors specifying ELV systems
- Occasional consumer / SME enquiries

### Primary conversion goals

1. **Book a demo / property walkthrough / site assessment** (main CTA)
2. Request a quote
3. Call / email back
4. Browse systems by vertical, then contact

---

## 2. Product surfaces

| Surface | Location | Status |
|---|---|---|
| Public marketing site | `main-site/` (this Next.js app) | Active |
| Client portal (auth) | `src/app/portal/*` | Active, sign-in + project/ticket lists |
| Admin/staff dashboard | `../admin-dashboard/` (separate app, separate repo) | Out of scope here |
| Legacy static HTML pages | `../about.html`, `../contact.html`, `../industries.html`, `../our-work.html`, `../quote.html`, `../services.html`, `../support.html`, `../client-portal.html` | **Legacy / unused** — do not treat as source of truth |

> The repo root (`D:\Joe wa Mwangi\Bakyson`) contains the older static site and
> the `main-site` Next.js app. **All current work happens inside `main-site/`.**

---

## 3. Tech stack (verified from `package.json`, `tsconfig.json`)

| Layer | Technology |
|---|---|
| Framework | **Next.js 16.4.6** (App Router, **Turbopack**) |
| React | 19.3.0 |
| Language | TypeScript 5 (`strict: true`) |
| Styling | **Tailwind CSS v4** (`@import "tailwindcss"`, `@theme` tokens — no `tailwind.config.*`) |
| Icons | `lucide-react` |
| Auth | `next-auth` v4 (credentials) |
| DB | PostgreSQL (`pg`), shared with admin dashboard |
| Validation | `zod` |
| Email | `resend` |
| Errors/observability | `@sentry/nextjs` |
| UI primitives | Radix Dialog + Toast, `class-variance-authority`, `clsx`, `tailwind-merge` |
| Deploy | Vercel (auto-deploy from GitHub `master`) + Railway Postgres |
| Path alias | `@/*` → `src/*` |

### Environment / build facts

- `metadataBase` = `https://bakyson.vercel.app` (see `src/app/layout.tsx`).
- `.env.local` exists locally (not committed). Do not print secrets.
- Node on CI is `node:20-alpine` (Docker) and Vercel's 2-core/8GB runner.

> ⚠️ **Next.js 16 differs from older training data.** `AGENTS.md` says read
> `node_modules/next/dist/docs/` before writing code. Known deprecation:
> the `middleware` file convention is deprecated in favour of **`proxy`**
> (build prints a warning; migration command:
> `npx @next/codemod@canary middleware-to-proxy .`). Do not migrate casually —
> it is a behaviour-sensitive change; schedule it explicitly.

---

## 4. Repository structure (`main-site/`)

```
main-site/
├─ AGENTS.md                     # Next.js 16 agent rules (auto-managed)
├─ README.md                     # short ops notes (PWA, deploy)
├─ PROJECT.md                    # ← this file
├─ next.config.ts                # headers for /sw.js and manifest
├─ tsconfig.json                 # @/* -> src/*
├─ database/schema.sql           # PostgreSQL DDL (idempotent)
├─ design-system/bakyson/MASTER.md  # base design tokens/patterns
├─ hero-design-notes.md          # historical note (OLD glassmorphism hero)
├─ scripts/
│  ├─ db-setup.mjs               # apply schema
│  ├─ admin-account.mjs          # inspect/reset admin user
│  └─ generate-pwa-icons.mjs     # regenerate icons from vector
├─ public/
│  ├─ images/
│  │  ├─ logo/bakyson-logo.svg   # ⭐ THE ONLY LOGO
│  │  ├─ *-thumb.jpg             # 6 vertical thumbnails (PLACEHOLDERS)
│  │  ├─ *-detail.jpg            # 6 vertical detail images (PLACEHOLDERS)
│  │  └─ *.mp4                   # 6 vertical hero clips (PLACEHOLDERS)
│  ├─ icons/ (PWA icons), sw.js, hero.mp4, placeholder-hero.jpg
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx              # root layout: font, metadata, <SiteHeader/>, footer, PWA
│  │  ├─ page.tsx                # HOMEPAGE composition (see §7)
│  │  ├─ globals.css             # Tailwind v4 theme tokens
│  │  ├─ about|services|portfolio|case-studies|blog|careers|contact|quote|support/page.tsx
│  │  ├─ portal/…                # auth-gated client portal
│  │  ├─ offline/page.tsx        # PWA offline fallback
│  │  ├─ manifest.ts             # PWA manifest
│  │  └─ api/…                   # route handlers (see §8)
│  ├─ components/
│  │  ├─ BakysonHero.tsx         # ⭐ homepage hero (Wacaco layout) — see §9
│  │  ├─ AboutSection.tsx        # #about
│  │  ├─ SystemsSection.tsx      # #systems
│  │  ├─ IndustriesSection.tsx   # #industries
│  │  ├─ ContactSection.tsx      # #contact
│  │  ├─ site-header.tsx         # global header, hidden on "/" (dedup fix)
│  │  ├─ site-nav.tsx            # nav (mega menu, mobile dialog)
│  │  ├─ pwa-status.tsx          # SW registration, offline/update banners
│  │  └─ ui/…                    # button, card, input, dialog, toast, etc.
│  ├─ data/heroData.ts           # ⭐ hero content model (6 slides)
│  ├─ lib/                       # db.ts, validators.ts, rate-limit.ts, analytics.ts, utils.ts
│  ├─ middleware.ts              # protects /portal/* (next-auth)
│  └─ types/next-auth.d.ts
```

---

## 5. Routing map

| Route | File | Notes |
|---|---|---|
| `/` | `app/page.tsx` | Hero → About → Systems → Industries → Contact |
| `/about` | `app/about/page.tsx` | Mission/Vision/Values (short) |
| `/services` | `app/services/page.tsx` | Service catalogue, `id` anchors per service |
| `/portfolio`, `/case-studies`, `/blog`, `/careers` | … | Marketing pages |
| `/contact` | `app/contact/page.tsx` | Full contact page + form → `/api/contact` |
| `/quote` | `app/quote/page.tsx` | Quote request |
| `/support` | `app/support/page.tsx` | Support |
| `/portal` | `app/portal/page.tsx` | Public sign-in page |
| `/portal/projects`, `/portal/tickets` | … | Auth-protected (`middleware.ts`) |
| `/offline` | `app/offline/page.tsx` | PWA fallback |
| `/api/*` | `app/api/*/route.ts` | See §8 |

### Homepage in-page anchors

- `#systems` → `SystemsSection`
- `#industries` → `IndustriesSection`
- `#contact` → `ContactSection`

Hero nav **intentionally mixes** page links and anchors:
`About → /about`, `Systems → #systems`, `Industries → /services`, `Contact → #contact`.
This is deliberate (dedicated pages exist *and* in-page scroll targets exist).
Do not "fix" this without client approval.

---

## 6. Data model (`database/schema.sql`)

Idempotent DDL (`CREATE TABLE IF NOT EXISTS`). Apply with `node scripts/db-setup.mjs`.

| Table | Purpose / key columns |
|---|---|
| `users` | `email` unique, `password_hash`, `role` (`user`/`employee`/`admin`) |
| `projects` | client project: `user_id`, `name`, `status`, `progress`, dates, `manager` |
| `tickets` | support tickets: `user_id`, `project_id`, `subject`, `priority`, `status` |
| `submissions` | public contact form rows |
| `job_applications` | careers form |
| `newsletter_subscriptions` | `email` unique, `status` |
| `activity_logs` | audit trail (`action`, `target_type`, `target_id`, `metadata` JSONB) |
| `password_reset_tokens` | SHA-256 token hash (never raw), `expires_at`, `used`, `attempts` + indexes |

---

## 7. Homepage composition (`src/app/page.tsx`)

```tsx
<BakysonHero />        // full-bleed Wacaco-style hero, own logo + nav
<AboutSection />       // #about
<SystemsSection />     // #systems — 6 vertical cards + "150+ installations"
<IndustriesSection />  // #industries — 6 vertical cards → /services
<ContactSection />     // #contact — form → /api/contact
```

Order was chosen: identity → proof/context → what we build → who we serve → convert.

> **History:** the previous homepage (glassmorphism hero + Solutions by
> Industry/Role + stats + client logos) was replaced by the composition above.
> The old design exists only in git history and `hero-design-notes.md`.

> **`#about` vs `/about`:** `AboutSection` provides an in-page `#about` target,
> but the hero's "About" link currently points to `/about`. If the client wants
> a pure one-page scroll experience, change the link to `#about`. Confirm first.

---

## 8. API endpoints

| Endpoint | Method | Validated by | Writes to |
|---|---|---|---|
| `/api/contact` | POST | `contactSchema` | `submissions` |
| `/api/careers` | POST | `careersSchema` | `job_applications` |
| `/api/newsletter` | POST | `newsletterSchema` | `newsletter_subscriptions` |
| `/api/csrf` | GET | — | CSRF token |
| `/api/health` | GET | — | `{ status: "ok" }` |
| `/api/projects`, `/api/tickets` | GET/POST | auth | portal data |
| `/api/auth/[...nextauth]` | * | next-auth | sessions |

Pattern: parse with Zod → `query()` from `@/lib/db` → return typed JSON.
Errors: `ZodError` → 400 with `details`; otherwise 500.

---

## 9. Hero specification — **BINDING**

The client **explicitly rejected** a simplified split hero and demanded the
**Wacaco / Minipresso reference layout** (screenshots + reference code the
client supplied). **Do not redesign it. Do not "simplify" it. Preserve it.**

### 9.1 Required structure

1. **Outer device shell** — rounded rectangle (~26–32px radius), thick black
   border (5–6px), large soft shadow, centred on a page padding.
2. **Top header row** — logo (left) · pill navigation (centre) · dark pill CTA
   with circular arrow badge (right); mobile: compact CTA + hamburger drawer.
3. **Hero stage** — two overlapping layers:
   - **Top-left editorial block:** logo + vertical divider + vertical name,
     then a row: rounded thumbnail + subhead + two pill buttons + arrow button.
   - **Main media layer:** full-stage image/video masked by an SVG `clipPath`
     with a **notch** (top-left cut) and a **diagonal cut** (bottom-right).
4. **Bottom-right diagonal feature card** — a separate clipped card showing a
   close-up detail image, visually separated from the main media by a small gap.
5. **Overlays** — centred play button; two decorative loading spinners.
6. **Mobile fallback strip** — dark gradient card with vertical name, headline,
   subhead, and the detail image.

### 9.2 Implementation rules

- The two masks are computed in `computeMainMaskPath(w,h)` and
  `computeCornerCardPath(w,h)` from the **measured stage size** via
  `ResizeObserver`. Keep this responsive, pixel-exact approach.
- `clipPath` is applied only at `window.innerWidth >= 1024`; mobile uses plain
  rounded containers.
- Stage heights: `lg:h-[660px] xl:h-[700px]`.
- Media: silent autoplay loop (`autoPlay loop muted playsInline`) with
  `poster={thumbnail}`.
- Auto-advance slides every **7000 ms**; clicking the play button resets the
  timer (`jumpTo`).

### 9.3 Content model (`src/data/heroData.ts`)

```ts
type HeroSlide = {
  id: string            // 'hospitality' | 'healthcare' | 'corporate' |
                        // 'learning' | 'aviation' | 'mining'
  model: string         // display vertical, e.g. 'Corporate & Commercial'
  headline: string      // 4–7 words
  subhead: string       // 13–17 words
  primaryCta: string    // → #contact
  secondaryCta: string  // → #systems
  secondaryHref: string // '#systems'
  thumbnail: string     // small square-ish image
  media: string         // wide hero video/image
  mediaType: 'video' | 'image'
  detailMedia: string   // close-up for diagonal card
}
```

**Copy lengths are intentional** (fit 1–2 lines desktop / 2–3 mobile). Keep them.

### 9.4 Logo rule — **HARD CONSTRAINT**

- **`public/images/logo/bakyson-logo.svg` is the ONLY logo.**
- It appears **exactly twice on the homepage**: the hero header, and the hero
  brand lockup. That is correct — do not add more.
- Never render the word "BAKYSON" as text in place of the logo.
- The global `SiteHeader` is intentionally **hidden on `/`** (`site-header.tsx`)
  so it does not duplicate the hero's own header/logo. Do not re-enable it on
  `/` without removing the hero header first.
- The old diagonal "WACACO"-style monogram text pattern was **removed** because
  it repeated the brand word. Do not re-add text monograms.

---

## 10. Colour system — **UNRESOLVED CONFLICT (read carefully)**

Two palettes currently coexist. This is the single biggest source of design
confusion; get an explicit decision before a global palette change.

| Source | Primary | Neutrals | Status |
|---|---|---|---|
| `src/app/globals.css` (Tailwind v4 `@theme`) + `design-system/bakyson/MASTER.md` | **`#FF6B00`** orange | grays, `#0A0A0A` ink | Used by legacy pages, UI primitives, site nav |
| New hero + homepage sections (client instruction in chat) | **`#f3694f`** "Vivid Red" | black / white | Used by `BakysonHero`, `About/Systems/Industries/ContactSection` |
| Wacaco reference shell (visual) | copper `#c87d4b` | canvas `#d6dad8`, surface `#f4f5f4`, ink `#373a39`, frame `#161717` | Currently used for the hero *shell* styling |

**What the client said:**
1. "Primary colour is Vivid Red `#f3694f`, then Black and White. I do not want to
   see any other colour except these three."
2. Later, when supplying the Wacaco code: "I need you to maintain this layout
   that I had even given you codes for… Just replace the logo accordingly."

**Current compromise (verified in code):** the hero keeps the Wacaco *shell*
neutrals and uses `#f3694f` as the accent; the rest of the site still uses the
orange tokens. **Do not unilaterally repaint the whole site.** Ask whether the
final brand primary is `#f3694f` or `#FF6B00`, and whether the Wacaco neutrals
are approved.

---

## 11. Media assets — PLACEHOLDERS ONLY

All 18 hero assets are **temporary internet placeholders**, not brand media:

- 12 JPGs (thumbnails + detail) downloaded from `picsum.photos` (random photos).
- 6 MP4s downloaded from `w3schools.com` sample clips (generic).

**Files required (exact names):**

```
public/images/
  hospitality-thumb.jpg   hospitality-detail.jpg   hospitality.mp4
  healthcare-thumb.jpg    healthcare-detail.jpg    healthcare.mp4
  corporate-thumb.jpg     corporate-detail.jpg     corporate.mp4
  learning-thumb.jpg      learning-detail.jpg      learning.mp4
  aviation-thumb.jpg      aviation-detail.jpg      aviation.mp4
  mining-thumb.jpg        mining-detail.jpg        mining.mp4
```

When real photos exist, set `mediaType: 'image'` in `heroData.ts` for that slide.
Recommended: thumbnails ~400×300 (or square), detail ~1200×800, video 1080p,
≤6–8 s, muted, H.264 MP4, optimised for web.

---

## 12. PWA behaviour

- `src/app/manifest.ts` → `/manifest.webmanifest` (name, icons, shortcuts).
- `public/sw.js` precaches public pages/assets, network-first navigations,
  falls back to `/offline`.
- Registered **in production only** by `pwa-status.tsx` (also shows banners).
- **Bump `CACHE_VERSION` in `public/sw.js`** whenever the precache list or
  caching logic changes.
- Regenerate icons with `npm run icons` after any logo change.
- Test: `npm run build && npm start`, then DevTools → Network → Offline.

---

## 13. Auth & portal

- `middleware.ts` uses `withAuth` from `next-auth/middleware`.
- `/portal` is the **public** sign-in page; `/portal/:path+` is protected.
- Staff dashboard is a **separate app** (`NEXT_PUBLIC_ADMIN_URL`), not here.
- Password reset stores only a SHA-256 **hash** of the token, with `attempts`,
  `used`, and `expires_at`; respects rate limiting (`lib/rate-limit.ts`).

---

## 14. Deployment

| Item | Value |
|---|---|
| Repo | `https://github.com/bakyson1-art/bakyson` |
| Branch | `master` (auto-deploys) |
| Host | **Vercel** (build in iad1; Next 16 Turbopack) |
| DB | Railway PostgreSQL via `DATABASE_URL` |
| Live URL (metadata) | `https://bakyson.vercel.app` |
| Docker alternative | `Dockerfile` + `railway.toml` present |

**Domain rule (client, repeated multiple times):**
> **`bakyson.com` is NOT the client's domain. Never use it anywhere (code, copy,
> comments, docs).** The production domain has not been confirmed; use
> `bakyson.vercel.app` for technical references and ask before hard-coding any
> other domain.

### CI/build gates that have bitten us

- `npm run build` runs **TypeScript type-check**. Any invalid DOM prop fails the
  deploy (see ISSUE-001).
- ESLint must pass (`npm run lint`); `next/no-html-link-for-pages` is disabled
  inline where full-page `<a>` is intentional (PWA cacheability).
- Build also emits the Next 16 **middleware → proxy** deprecation warning
  (non-fatal).

---

## 15. Git & workflow conventions

- Single long-lived branch: `master`; commits are pushed directly (no PR flow).
- Commit style: Conventional-ish prefixes — `feat:`, `fix:`, `chore:`,
  `fix(lint):`, `feat(pwa):`.
- PowerShell is the shell on this machine: **`&&` does not work**; run commands
  separately or use `;`.
- Do not commit `.env.local`, `.next/`, `node_modules/`.
- Do not delete `AGENTS.md`'s managed block; `next dev` recreates it.

---

## 16. Progress & milestones

| # | Milestone | State |
|---|---|---|
| M1 | Public site scaffold (Next 16 + Tailwind v4 + design tokens) | ✅ done |
| M2 | Marketing pages (about/services/portfolio/case-studies/blog/careers/contact/quote/support) | ✅ done |
| M3 | PostgreSQL schema + API routes (contact/careers/newsletter/projects/tickets) | ✅ done |
| M4 | Auth + client portal + password-reset hardening | ✅ done |
| M5 | PWA (manifest, service worker, offline, icons) | ✅ done |
| M6 | Admin dashboard split into separate app/repo | ✅ done |
| M7 | Design-system alignment pass (Lucide icons, cards, glassmorphism) | ✅ done |
| M8 | **Homepage rebrand: Wacaco-style cycling hero + 4 sections** | ✅ shipped |
| M9 | Real brand media (replace picsum/W3Schools placeholders) | ⛔ pending client |
| M10 | Final palette decision (`#f3694f` vs `#FF6B00`; shell neutrals) | ⛔ pending client |
| M11 | Real contact email + verified marketing claims | ⛔ pending client |
| M12 | Next 16 `middleware` → `proxy` migration | ⏳ backlog |
| M13 | Replace placeholder client logos on other pages | ⏳ backlog |

---

## 17. Issue log (found → fixed)

| ID | Issue | Root cause | Fix | Commit |
|---|---|---|---|---|
| ISSUE-001 | Vercel/Docker build failed: `Property 'ariaLabel' does not exist` | Invalid DOM prop on `<a>`; TS type-check gate | `ariaLabel` → `aria-label` | `ebca078` |
| ISSUE-002 | Client angry: hero redesigned/simplified against instructions | Agent replaced the Wacaco layout with a generic split hero | Restored exact Wacaco shell + masks + diagonal card; kept logo only | `12d837d` |
| ISSUE-003 | Logo repeated many times on the page | Text "BAKYSON" in header/lockups + diagonal monogram + global header duplicating hero header | Single SVG logo in exactly 2 hero spots; removed monograms; hid `SiteHeader` on `/` | `2e5679d`, `12d837d` + header-dedup |
| ISSUE-004 | `bakyson.com` used in email links (client does not own it) | Assumed domain | Removed all `bakyson.com`; replaced with placeholder `hello@bakyson.io` (**still a placeholder — needs real address**) | `6939c26` |
| ISSUE-005 | Hero used fake/blank media | No assets supplied; needed a running build | Generated placeholders, then downloaded internet stand-ins | `7bf98b7`, `bfd1bb9` |
| ISSUE-006 | Client said "is everything live?" confusion | Agent pushed to GitHub but never deployed | Clarified: GitHub push ≠ deployment; Vercel auto-deploy confirmed by client | n/a |
| ISSUE-007 | Design confusion: hero styling vs site palette | Two palettes in one codebase | Documented conflict here; awaiting client decision | open |

---

## 18. Open issues / risks (act deliberately)

1. **Palette conflict** — see §10. Needs one decision, then a single sweep.
2. **Placeholder email** — `hello@bakyson.io` in `contact/page.tsx` and
   `ContactSection.tsx` is invented. Get the real address; never use
   `bakyson.com`.
3. **Unverified claims** — "150+ installations nationwide" (SystemsSection) and
   historical "500+ projects / 15+ clients / 3+ years" are unverified. Confirm
   before publishing.
4. **Placeholder media** — picsum/W3Schools assets are not brand-safe.
5. **Duplicate contact UI** — full `/contact` page and `ContactSection` share
   fields/info; keep them in sync or extract shared data.
6. **`#about` vs `/about`** inconsistency (see §7).
7. **Middleware deprecation** in Next 16 — non-fatal today.
8. **Global header hidden on `/`** — if the hero header is ever removed, restore
   `SiteHeader` on `/` in the same change.
9. **`next/image` with the SVG logo** — currently used with explicit
   width/height; if you switch to `dangerouslyAllowSVG` or `<img>`, verify
   Next image config first.

---

## 19. Verification checklist (run before every push)

```powershell
# from main-site/
npm run lint
npm run build
```

Then manually confirm:

- [ ] Homepage shows exactly **two** logo instances (hero header + hero lockup).
- [ ] No text "BAKYSON" used as a logo anywhere.
- [ ] Hero cycles all 6 verticals; play button resets the 7 s timer.
- [ ] Hero masks look correct at ≥1024 px; mobile uses rounded fallbacks.
- [ ] `#systems`, `#industries`, `#contact` anchors scroll correctly.
- [ ] Contact form posts to `/api/contact` and shows the success toast.
- [ ] No `bakyson.com` references (`git grep -i "bakyson\.com"`).
- [ ] No horizontal scroll at 375/768/1024/1440.
- [ ] Build passes TypeScript (invalid DOM props will fail deploy).
- [ ] Dates updated in this doc if architecture changed.

---

## 20. Lessons & techniques (learned the hard way)

1. **Follow the reference exactly.** When a non-technical stakeholder supplies
   screenshots + code, treat the layout as a spec, not a suggestion. Only swap
   the brand-specific parts (logo, copy, colours) they asked for.
2. **One logo, one source.** A single SVG asset referenced in 1–2 intentional
   places beats text logos and decorative wordmarks. Duplicated headers cause
   duplicated logos.
3. **GitHub ≠ live.** Pushing to `master` only matters because Vercel is
   connected. Always state which step actually made it live.
4. **Never invent domains, emails, or stats.** Replace unknowns with clearly
   marked placeholders and list them in an open-issues table.
5. **Respect the build gate.** Next runs `tsc` during `next build`; one wrong
   prop name breaks production. Run `npm run build` locally before pushing.
6. **Don't "clean up" a spec you were told to preserve.** Simplifying SVG clip
   paths/ResizeObserver is a redesign, not a refactor.
7. **Keep content in data files.** `heroData.ts` makes vertical copy/media
   editable without touching layout code — extend this pattern.
8. **Two design systems = chaos.** Decide the palette before adding sections.
9. **PowerShell quirks.** No `&&`; use `;` or separate calls. `Remove-Item -Force`
   instead of `rm -f`.
10. **Anchor + page duality is fine** (e.g. `#systems` and `/services`) as long
    as it is intentional and documented.

---

## 21. Hard rules for future agents

- ✅ Keep the Wacaco/Minipresso hero layout intact.
- ✅ Use `public/images/logo/bakyson-logo.svg` as the only logo.
- ✅ Keep exactly two logo instances on the homepage.
- ✅ Keep `#systems`, `#industries`, `#contact` working.
- ✅ Keep the 6-vertical content model in `heroData.ts`.
- ✅ Run `npm run build` before pushing.
- ✅ Update this file when you change architecture, add issues, or resolve one.
- ❌ Never use `bakyson.com`.
- ❌ Never invent brand colours, emails, statistics, or domains.
- ❌ Never re-add text "BAKYSON" as a logo or decorative monogram.
- ❌ Never run `next build`-breaking experiments without type-checking.
- ❌ Never delete legacy assets/pages without explicit approval.

---

## 22. Open questions for the client (blockers, in priority order)

1. **Final brand palette:** is the primary `#f3694f` (and should the whole site
   switch from `#FF6B00`), and are the Wacaco neutrals
   (`#d6dad8`/`#f4f5f4`/`#373a39`/`#161717`) approved?
2. **Real contact email and phone** (current email is a placeholder).
3. **Production domain** (never assume `bakyson.com`).
4. **Real media per vertical** (6 thumbs, 6 detail images, 6 clips).
5. **Verified claims** for "installations", "projects", "clients", "years".
6. **`About` link target:** page (`/about`) or in-page (`#about`)?
7. **Services page palette:** keep orange there or align to red?

---

*Maintainer note: this document is intentionally verbose because its purpose is
to let a fresh agent resume with zero prior chat context. Keep the issue log and
milestones current — stale docs are worse than none.*
