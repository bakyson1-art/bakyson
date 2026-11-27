# Bakyson — Testing Strategy

> **Status:** Draft. Items marked **[TBD]** require tooling or client decision.
> This document defines what is tested, how tests are run, and where they live.
> It is the quality gate for `main-site/`.

---

## 1. Current state

| Test type | Tooling | Status |
|-----------|---------|--------|
| Type checking | `tsc` via `next build` | ✅ runs in CI |
| Linting | ESLint v9 | ✅ runs in CI |
| Unit tests | None configured | ❌ missing |
| Integration tests | None configured | ❌ missing |
| E2E tests | Playwright (`.playwright-mcp/` at root) | ⚠️ directory exists; test files not confirmed |
| Accessibility | None automated | ❌ missing |
| Performance | None automated | ❌ missing |

> `.playwright-mcp/` exists at the repo root but no Playwright test files (`*.spec.ts`, `playwright.config.*`) were found in the audit. E2E testing is not currently operational.

---

## 2. Test pyramid

```
        /\
       /  \   E2E (critical user journeys only)
      /____\
     /      \ Integration (API + DB)
    /________\
   /          \ Unit (pure functions, validators)
  /____________\
     Static (TypeScript, ESLint, build)
```

**Static checks are the largest layer** because they run on every commit and catch type errors and lint violations before deployment.

---

## 3. Static checks (mandatory on every commit)

| Check | Command | Fails build? |
|-------|---------|--------------|
| TypeScript | `npm run build` (includes `tsc`) | ✅ Yes (CI gate) |
| Lint | `npm run lint` | ✅ Yes (CI gate) |
| Build | `npm run build` | ✅ Yes (CI gate) |

Run locally before pushing:

```powershell
npm run lint
npm run build
```

---

## 4. Unit tests (to be added)

**Target:** Pure functions, validators, mask path computations, utility helpers.

**Suggested tool:** Vitest or Jest (not yet installed)

**Files to test first:**

| Module | What to test |
|--------|-------------|
| `@/lib/validators` | `contactSchema`, `careersSchema`, `newsletterSchema` — valid/invalid inputs |
| `BakysonHero` helpers | `computeMainMaskPath`, `computeCornerCardPath` — SVG path output for known dimensions |
| `date utilities` | Date formatting, progress calculation |

**Example test structure (to be created):**

```
src/
├─ __tests__/
│  ├─ validators.test.ts
│  └─ hero-masks.test.ts
```

---

## 5. Integration tests (to be added)

**Target:** API route handlers with database (or mocked `query()`).

**Suggested tool:** Vitest + supertest, or Playwright API testing

**Scenarios:**

| Endpoint | Test case | Expected |
|----------|-----------|----------|
| `POST /api/contact` | Valid payload | `201 Created`, row inserted in `submissions` |
| `POST /api/contact` | Missing name | `400 Bad Request`, Zod `details` |
| `POST /api/contact` | Invalid email | `400 Bad Request`, Zod `details` |
| `POST /api/newsletter` | Duplicate email | `201 Created`, upsert to active |
| `GET /api/health` | No auth | `200 OK`, `{ status: "ok" }` |
| `POST /api/auth/callback/credentials` | Valid credentials | Session cookie set |
| `POST /api/auth/callback/credentials` | Invalid password | `401 Unauthorized` |

**Database:** Use a test database or mock `query()` from `@/lib/db`. Do not run integration tests against production Railway Postgres.

---

## 6. E2E tests (Playwright)

**Target:** Critical user journeys across real browsers.

**Suggested location:** `tests/e2e/` or `playwright/` directory (to be created)

**Critical journeys:**

| Journey | Steps | Assertion |
|---------|-------|-----------|
| Homepage loads | Navigate to `/` | Hero renders, 6 slides present, no console errors |
| Contact form | Fill form, submit | Success toast appears, `201` from `/api/contact` |
| Portal sign-in | Navigate to `/portal`, sign in | Redirect to `/portal`, "Signed In" card shows |
| Portal access control | Navigate to `/portal/projects` unsigned in | Redirect to `/portal` |
| Anchor navigation | Click `#systems` in hero nav | Page scrolls to `#systems` section |
| PWA offline | Load page, go offline, reload | `/offline` or cached page renders |

**Browsers:** Chrome, Firefox, Safari (via Playwright)

**Devices:** 375px (mobile), 768px (tablet), 1024px (desktop), 1440px (wide)

**Command (to be defined):**

```powershell
npm run test:e2e
```

---

## 7. Accessibility testing (to be added)

**Target:** WCAG AA conformance.

**Suggested tool:** axe-core (via Playwright or Lighthouse)

**Checks:**

| Check | Method |
|-------|--------|
| Color contrast (4.5:1 normal, 3:1 large) | Automated + manual |
| Keyboard navigation | Tab through all interactive elements |
| Visible focus states | Focus rings visible on all focusable elements |
| ARIA labels | `aria-label`, `aria-current`, `role="alert"` present where needed |
| Skip to content link | Visible on focus, jumps to `#main-content` |
| `prefers-reduced-motion` | Animations disabled when set |

---

## 8. Performance testing (to be added)

**Target:** Core Web Vitals.

| Metric | Target | Tool |
|--------|--------|------|
| Largest Contentful Paint (LCP) | < 2.5s | Lighthouse / Web Vitals |
| Cumulative Layout Shift (CLS) | < 0.1 | Lighthouse |
| Total Blocking Time (TBT) | < 300ms | Lighthouse |

**Hero video:** 1080p, ≤6–8s, H.264 MP4, optimised for web (see PROJECT.md §11)

---

## 9. Test environments

| Environment | Purpose | Data |
|-------------|---------|------|
| Local | Developer testing | Local DB or mocked |
| CI (GitHub Actions) | Lint + build on every push | No DB (build only) |
| Staging (Vercel preview) | E2E against preview deploy | Test DB |
| Production | Synthetic monitoring only | Real DB (read-only checks) |

---

## 10. CI test pipeline (current)

`.github/workflows/ci.yml` runs:

1. **lint** — `npm ci`, `npm run lint`
2. **build** — `npm ci`, `npm run build`
3. **deploy** — `npx vercel deploy --prod` (on `master` push)

**No test job exists yet.** Add a `test` job between `lint` and `build` when unit/E2E tests are added:

```yaml
test:
  needs: lint
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with: { node-version: '20', cache: 'npm' }
    - run: npm ci
    - run: npm run test   # to be added
```

---

## 11. Definition of done (testing)

- [ ] `npm run lint` passes
- [ ] `npm run build` passes (TypeScript clean)
- [ ] New features have unit tests where applicable
- [ ] New API endpoints have integration tests
- [ ] Critical user journeys have E2E tests
- [ ] Accessibility spot-check passed (keyboard + contrast)
- [ ] No regressions in existing E2E journeys

---

## 12. Known gaps

| ID | Gap | Priority |
|----|-----|----------|
| TG-01 | No unit test framework installed | High |
| TG-02 | No E2E test files found (`.playwright-mcp/` exists but tests unconfirmed) | High |
| TG-03 | No accessibility automation | Medium |
| TG-04 | No performance budget or monitoring | Medium |
| TG-05 | No test database for integration tests | Medium |
