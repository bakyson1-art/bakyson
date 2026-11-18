# Bakyson — Phase 1 Handover: Foundation Stabilization

## Purpose

This document is the complete handover package for **Phase 1: Foundation Stabilization**. It contains everything needed to execute Phase 1 in a new session without relying on prior context.

**Phase 1 Goal:** Make the application render correctly, fix broken imports, enable image loading, add missing PWA assets, and fix the live chat widget styling. No database, Railway deployment, or authentication work is in Phase 1.

## Rules (Mandatory — Carried Over)

1. **Always refer to `WORK_REFERENCE.md`** before starting, during, and after any work session.
2. **Always check `WORK_REFERENCE.md`** for work already done (`[x]`), new work (`[ ]`), and duplicates.
3. **Always update `WORK_REFERENCE.md`** when an item is completed or a new gap is found.
4. **Always refer to `ARCHITECTURE_REFERENCE.md`** to confirm layout, design, and connection decisions.
5. Update both reference files when work is completed.

---

## Phase 1 Scope (WORK_REFERENCE.md Item Numbers)

| Item # | WORK_REFERENCE.md Ref | Task | File(s) | Status |
|--------|----------------------|------|---------|--------|
| 2 | #2 | Fix `globals.css` token mapping — add shadcn CSS variables | `src/app/globals.css` | [ ] |
| 1 | #1 | Fix `careers/page.tsx` import path | `src/app/careers/page.tsx` | [ ] |
| 9 | #9 | Add `images.remotePatterns` to `next.config.ts` | `next.config.ts` | [ ] |
| 6,7,8 | #6, #7, #8 | Add missing PWA icons | `public/icons/` | [ ] |
| 5 | #5 | Fix `LiveChatWidget` broken CSS classes | `src/components/LiveChatWidget.tsx` | [ ] |

---

## Task 1: Fix `globals.css` Token Mapping (Item #2)

### Problem
`components.json` declares `cssVariables: true` with `baseColor: "black"`, so shadcn/ui components expect CSS variables like `--primary`, `--background`, `--card`, `--border`, `--ring`, `--muted`, `--destructive`, `--accent`, `--popover`, `--secondary`, etc.

`globals.css` currently defines `--color-primary`, `--color-background`, etc. — a completely different naming layer. Shadcn components (Button, Card, Badge, Input, Dialog, Alert, Skeleton, Toast) render broken/unstyled because they reference undefined variables.

### Required Changes to `src/app/globals.css`

Add the following CSS variables inside the `@theme` block (alongside existing `--color-*` variables):

```css
--background: #ffffff;
--foreground: #0a0a0a;
--primary: #FF6B00;
--primary-foreground: #FFFFFF;
--secondary: #F5F5F5;
--secondary-foreground: #0a0a0a;
--muted: #F3F4F6;
--muted-foreground: #6B7280;
--accent: #FF6B00;
--accent-foreground: #FFFFFF;
--destructive: #DC2626;
--destructive-foreground: #FFFFFF;
--border: #D1D5DB;
--input: #D1D5DB;
--ring: #FF6B00;
--card: #ffffff;
--card-foreground: #0a0a0a;
--popover: #ffffff;
--popover-foreground: #0a0a0a;
```

Also fix:
- `--color-footer-text` references `--color-gray-400` which is undefined. Either define `--color-gray-400` or change to an existing value (e.g., `#9CA3AF`).
- `--ring` is used by shadcn focus rings but is not defined anywhere.

### Verification
- Button renders with orange background (`--primary`) and white text (`--primary-foreground`).
- Card renders with white background and `--border` border.
- Input focus ring uses `--ring` (orange).
- No console errors about undefined CSS variables.

---

## Task 2: Fix `careers/page.tsx` Import Path (Item #1)

### Problem
`src/app/careers/page.tsx` line 1 imports:
```ts
import CareersContent from "@/components/CareersContent";
```
But the actual file is at:
```
src/components/careers-content/page.tsx
```
This causes a 404 / module not found error on the Careers page.

### Required Change
Change the import to:
```ts
import CareersContent from "@/components/careers-content/page";
```

### Verification
- Navigate to `/careers` — page loads without error.
- Job listings display correctly.
- No TypeScript or build errors related to this import.

---

## Task 3: Add `images.remotePatterns` to `next.config.ts` (Item #9)

### Problem
All images are external Unsplash URLs, but `next.config.ts` has no `images.remotePatterns`. Next/Image will refuse to optimize external images, causing them to fail to load or display broken.

### Required Change to `next.config.ts`

Add `images` configuration:
```ts
const nextConfig: NextConfig = {
  // ... existing config ...
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};
```

### Verification
- Home page hero image loads.
- Case study images load.
- Portfolio images load.
- Blog post images load.
- `npm run build` completes without image optimization warnings.

---

## Task 4: Add Missing PWA Icons (Items #6, #7, #8)

### Problem
- `sw.js` push handler references `/icons/icon-192x192.png` and `/icons/icon-72x72.png` — neither exists.
- `layout.tsx` references `/apple-touch-icon.png` — doesn't exist.
- `manifest.json` only has one SVG icon (`icon-512x512.svg`), no PNG fallbacks.

PWA install and push notifications will break.

### Required Changes

Create the following files in `public/icons/`:
1. `icon-192x192.png` — 192x192 PNG (brand "B" logo on orange background, or simple orange square with white "B")
2. `icon-72x72.png` — 72x72 PNG (same brand mark)
3. `apple-touch-icon.png` — 180x180 PNG (same brand mark)

Create `public/apple-touch-icon.png` as well (or reference `public/icons/apple-touch-icon.png` and update `layout.tsx`).

Update `layout.tsx` line 56 if needed:
```tsx
<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
```

Update `manifest.json` to include PNG fallbacks for different sizes:
```json
"icons": [
  {
    "src": "/icons/icon-72x72.png",
    "sizes": "72x72",
    "type": "image/png",
    "purpose": "any maskable"
  },
  {
    "src": "/icons/icon-192x192.png",
    "sizes": "192x192",
    "type": "image/png",
    "purpose": "any maskable"
  },
  {
    "src": "/icons/icon-512x512.svg",
    "sizes": "512x512",
    "type": "image/svg+xml",
    "purpose": "any maskable"
  }
]
```

### Verification
- PWA install prompt appears on mobile/desktop.
- `sw.js` push handler does not reference missing files.
- `apple-touch-icon` loads on iOS devices.
- Manifest validates without errors.

---

## Task 5: Fix `LiveChatWidget` Broken CSS Classes (Item #5)

### Problem
`LiveChatWidget.tsx` uses CSS classes that do not exist:
- `bg-bakyson-orange`
- `bg-bakyson-black`
- `bg-bakyson-gray`
- `text-bakyson-orange-dark`
- `text-bakyson-black`
- `bg-bakyson-black/50`

The chat widget is visually unstyled and broken.

### Required Changes to `src/components/LiveChatWidget.tsx`

Replace all `bg-bakyson-*`, `text-bakyson-*` classes with defined Tailwind/design system classes or inline styles matching the brand:

| Broken Class | Suggested Replacement |
|--------------|----------------------|
| `bg-bakyson-orange` | `bg-primary` (or `bg-orange-500`) |
| `bg-bakyson-black` | `bg-foreground` (or `bg-black-500` / `#0A0A0A`) |
| `bg-bakyson-gray` | `bg-muted` (or `bg-gray-100`) |
| `text-bakyson-orange-dark` | `text-primary-hover` (or `text-orange-700`) |
| `text-bakyson-black` | `text-foreground` |
| `bg-bakyson-black/50` | `bg-black/50` |
| `shadow-orange/40` | `shadow-orange` (if defined) or `shadow-primary` |

Also ensure:
- The floating button uses `--primary` / `--primary-foreground` tokens.
- Chat bubbles use defined colors, not arbitrary hex values.
- `aria-label` attributes are present on interactive elements.

### Verification
- Live chat button renders with orange background.
- Chat bubble colors are consistent with brand (orange/black/white).
- No undefined CSS classes in browser DevTools.
- Chat open/close toggle works.
- Message send/receive simulation works (local state only — no backend yet).

---

## Phase 1 Definition of Done

All of the following must be true before Phase 1 is considered complete:

- [ ] `globals.css` contains all shadcn-expected CSS variables (`--primary`, `--background`, `--card`, `--border`, `--ring`, etc.)
- [ ] `--ring` is defined; focus rings render correctly on shadcn components
- [ ] `--color-gray-400` is defined or replaced with an existing value
- [ ] `src/app/careers/page.tsx` imports from the correct path
- [ ] `/careers` route loads without 404 or module errors
- [ ] `next.config.ts` includes `images.remotePatterns` for `images.unsplash.com`
- [ ] All Unsplash images load across Home, About, Services, Portfolio, Case Studies, Blog pages
- [ ] `public/icons/icon-192x192.png` exists
- [ ] `public/icons/icon-72x72.png` exists
- [ ] `public/icons/apple-touch-icon.png` exists (or `public/apple-touch-icon.png`)
- [ ] `layout.tsx` references the correct `apple-touch-icon` path
- [ ] `manifest.json` includes PNG icon fallbacks
- [ ] `LiveChatWidget.tsx` uses no undefined `bg-bakyson-*` or `text-bakyson-*` classes
- [ ] Live chat renders with correct brand colors
- [ ] `npm run lint` passes with no new errors
- [ ] `npm run build` completes successfully
- [ ] All completed items marked `[x]` in `WORK_REFERENCE.md`
- [ ] Change Log updated in both `WORK_REFERENCE.md` and `ARCHITECTURE_REFERENCE.md`

---

## Commands to Use

```bash
# Install dependencies (if needed)
npm ci

# Run dev server
npm run dev

# Run lint
npm run lint

# Run build (verifies TypeScript and image config)
npm run build

# Type check only
npx tsc --noEmit
```

> **Note:** `package.json` currently has `typescript.ignoreBuildErrors: true` in `next.config.ts`. Do not remove this in Phase 1 — it is tracked as WORK_REFERENCE item #14 and should be addressed separately after Phase 1 stabilization.

---

## What Is NOT in Phase 1

Do NOT work on the following during Phase 1:
- Railway `Dockerfile`, `railway.toml`, or GitHub Actions rewrite
- Database provisioning (PostgreSQL, Redis)
- Prisma schema or migrations
- NextAuth.js / authentication
- File storage (R2/S3)
- Email provider (Resend)
- Dynamic routes (`/case-studies/[id]`, `/blog/[slug]`)
- Missing legal pages (`/terms-of-use`, `/cookie-policy`, `/privacy-policy`)
- Form API wiring (contact form currently fakes submission — that's fine for Phase 1)

These are tracked in `WORK_REFERENCE.md` and `ARCHITECTURE_REFERENCE.md` for Phase 2 and beyond.

---

## Handover Notes for Next Session

1. Start by reading `WORK_REFERENCE.md` and `ARCHITECTURE_REFERENCE.md` in full.
2. Execute Phase 1 tasks in the order listed (or as dependencies allow).
3. Mark each item `[x]` in `WORK_REFERENCE.md` as you verify it.
4. Add any new discoveries to `WORK_REFERENCE.md` as `[ ]` items.
5. Update the Change Log in both reference files.
6. Once all Phase 1 items are `[x]` and verified, proceed to Phase 2 (Infrastructure: Railway + Dockerfile + CI).

---

## Change Log

| Date | Item # | Action | Notes |
|------|--------|--------|-------|
| 2026-11-17 | All | Initial handover document created | Phase 1 scope defined from `WORK_REFERENCE.md` |
