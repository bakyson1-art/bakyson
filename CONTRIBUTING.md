# Bakyson — Contributing Guide

> **Status:** Draft.
> This document describes how to contribute code to the Bakyson `main-site/`
> Next.js application. It covers setup, conventions, pull requests, and the
> documentation impact checklist.

---

## 1. Getting started

### Prerequisites

- Node.js 20 (Docker uses `node:20-alpine`)
- npm (bundled with Node)
- PostgreSQL access (for local DB work) — `DATABASE_URL` from `.env.local`

### Local setup

From `main-site/`:

```powershell
# Install dependencies
npm ci

# Copy environment example (do not commit .env.local)
Copy-Item .env.example .env.local

# Edit .env.local with your local values
# DATABASE_URL, NEXTAUTH_URL, NEXTAUTH_SECRET, RESEND_API_KEY, SENTRY_DSN

# Run dev server (Turbopack)
npm run dev
```

Open `http://localhost:3000`.

### Database setup (optional, for local portal/testing)

```powershell
$env:DATABASE_URL="postgresql://postgres:PASSWORD@HOST.proxy.rlwy.net:PORT/railway"
node scripts/db-setup.mjs
```

> Safe to re-run: schema uses `CREATE TABLE IF NOT EXISTS`.

---

## 2. Branch & commit conventions

### Branching

- Single long-lived branch: `master`
- Commits are pushed directly (no PR flow per current project convention)
- Do not create long-lived feature branches unless coordinating with the admin dashboard team

### Commit style

Use conventional-ish prefixes:

| Prefix | Use for | Example |
|--------|---------|---------|
| `feat:` | New feature | `feat: add contact form validation` |
| `fix:` | Bug fix | `fix: portal login redirect to /portal` |
| `chore:` | Tooling, config, maintenance | `chore: add Dependabot config` |
| `fix(lint):` | ESLint-only fixes | `fix(lint): resolve unused variable` |
| `feat(pwa):` | PWA changes | `feat(pwa): bump CACHE_VERSION` |

**Do not** commit:
- `.env.local`
- `.next/`
- `node_modules/`
- Secrets or API keys

**Do not** delete `AGENTS.md`'s managed Next.js block; `next dev` recreates it.

---

## 3. Before every commit

Run the full verification checklist from `PROJECT.md` §19:

```powershell
npm run lint
npm run build
```

Then manually confirm:
- [ ] Homepage shows exactly **two** logo instances (hero header + hero lockup)
- [ ] No text "BAKYSON" used as logo anywhere
- [ ] Hero cycles all 6 verticals; play button resets the 7s timer
- [ ] Hero masks correct at ≥1024px; mobile uses rounded fallbacks
- [ ] `#systems`, `#industries`, `#contact` anchors scroll correctly
- [ ] Contact form posts to `/api/contact` and shows success toast
- [ ] No `bakyson.com` references (`git grep -i "bakyson\.com"`)
- [ ] No horizontal scroll at 375/768/1024/1440
- [ ] Build passes TypeScript

---

## 4. Documentation impact checklist (required)

Before committing, ask: **"Does this change make anything in DESIGN.md, ARCHITECTURE.md, INFRASTRUCTURE.md, ROADMAP.md, PRD.md, API.md, or SECURITY.md wrong?"**

| If your change touches... | Then update... |
|---------------------------|----------------|
| Colours, typography, components, hero spec | `DESIGN.md` |
| Tech stack, API routes, data model, auth, DB schema | `ARCHITECTURE.md` |
| API request/response contracts | `API.md` |
| Env vars, deployment, CI/CD, domain, monitoring | `INFRASTRUCTURE.md` |
| Product scope, user stories, acceptance criteria | `PRD.md` |
| Security controls, threat model, compliance | `SECURITY.md` |
| Milestones, bugs, client decisions, placeholders | `ROADMAP.md` |

**Rule:** Update the doc in the **same commit** as the code. If nothing in the definition docs is now inaccurate, commit the code only — do not touch the docs.

Stale docs are worse than none.

---

## 5. Pull request process (if adopted in future)

Currently the project pushes directly to `master`. If a PR flow is adopted:

1. Create a feature branch from `master`
2. Open a draft PR early for visibility
3. Ensure `npm run lint` and `npm run build` pass
4. Request review from at least one other engineer
5. Resolve review comments
6. Squash merge into `master` (Vercel auto-deploys on push)

---

## 6. Code style

- TypeScript `strict: true` — no `any` without justification
- Prefer `clsx` + `tailwind-merge` for conditional classes
- Use `@/*` path alias → `src/*`
- Use `lucide-react` for icons (no emojis as icons)
- Use `class-variance-authority` for component variants
- No `bakyson.com` anywhere
- No text "BAKYSON" as logo or decorative monogram
- `cursor-pointer` on all clickable elements
- Visible focus states for keyboard navigation

---

## 7. Testing

See `TESTING.md` for the full test strategy. Minimum: no committed code should break `npm run build` or `npm run lint`.

---

## 8. Questions & help

- Open a GitHub issue for bugs or feature requests
- For security vulnerabilities, see `SECURITY.md` (do not create public issues)
- For client decisions (palette, domain, email, media), route through the product owner
