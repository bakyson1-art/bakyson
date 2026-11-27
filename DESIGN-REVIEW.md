# Bakyson — Design Review & Visual Audit

> **Status:** Draft. This document reviews the current visual state of the Bakyson
> website, catalogs every design problem, and defines the locked design system
> that replaces it. All design decisions are backed by the six design skills:
> `design`, `brand`, `ui-ux-pro-max`, `ui-styling`, `design-system`, `banner-design`.

---

## 1. Executive Summary

**The current website looks like shit because:**

| Problem | Severity | Where |
|---------|----------|-------|
| Palette war: orange `#FF6B00` vs red `#f3694f` vs Wacaco neutrals | Critical | Everywhere |
| Multi-colored service cards (blue, indigo, purple, red, emerald, gray) | Critical | `/services` |
| Text "Bakyson" used as logo instead of SVG | Critical | `site-header.tsx` |
| Emoji `✕` used as close icon | High | `ContactSection.tsx` |
| Inconsistent spacing, shadows, border radii | High | All sections |
| Placeholder media (picsum/w3schools) | High | `public/images/` |
| Placeholder email/phone | Medium | `contact/page.tsx`, `ContactSection.tsx` |
| Unverified marketing claims | Medium | `SystemsSection.tsx` |
| Mega menu anchors don't match section IDs | Medium | `site-nav.tsx` |
| No CSS design tokens — hardcoded hex values everywhere | Medium | `globals.css`, components |

---

## 2. Palette Conflict Audit

### Current state (broken)

| Location | Color | Hex | Status |
|----------|-------|-----|--------|
| `globals.css` `--color-primary` | Orange | `#FF6B00` | Site-wide |
| `globals.css` `--color-accent` | Orange | `#FF6B00` | Site-wide |
| Hero sections | Red | `#f3694f` | Homepage only |
| Hero shell bg | Canvas | `#f4f5f4` | Hero only |
| Hero shell ink | Ink | `#373a39` | Hero only |
| Services cards | 8 different | blue/indigo/purple/red/emerald/gray | `/services` |
| `site-header.tsx` text logo | Text "Bakyson" | N/A | Every page except `/` |

### Client requirement (from PROJECT.md §10)

> "Primary colour is Vivid Red `#f3694f`, then Black and White. I do not want to see any other colour except these three."

### Locked decision

**Primary: `#f3694f` (Vivid Red) | Neutral: Black `#0A0A0A` | Neutral: White `#FFFFFF`**

Wacaco shell neutrals (`#d6dad8`/`#f4f5f4`/`#373a39`/`#161717`) are **approved for the hero shell only** — they stay inside the Wacaco device shell and do not leak into the rest of the site.

**Everything else gets repainted to red/black/white.** Orange `#FF6B00` is dead. Multi-colored service cards are dead.

---

## 3. Typography Audit

### Current state
- `globals.css`: Inter via `next/font/google` — weights 400, 500, 600, 700
- `MASTER.md`: Inter — "modern, innovative, bold, professional"
- UI Pro Max recommendation: Inter — "Modern Dark Cinema (System)" — dark, cinematic, technical, precision, clean, premium

### Locked decision
**Inter (400, 500, 600, 700)** — already in use, correct for industrial/technical B2B. No change needed.

---

## 4. Layout & Structure Audit

### Homepage (current)
```
BakysonHero (Wacaco) → AboutSection → SystemsSection → IndustriesSection → ContactSection
```
This order is correct per PROJECT.md §7: identity → proof/context → what we build → who we serve → convert.

### Services page (broken)
- 6 service cards each with a different accent color
- Hero section uses `bg-orange-50` CTA band
- Anchors (`#infotainment`, `#networks`, etc.) don't match mega menu (`#cabling`, `#cctv`, etc.)

### Locked decision
- Hero + Features + CTA pattern (UI Pro Max landing pattern)
- Single accent color: Vivid Red `#f3694f`
- All service cards use red accent, black text, white cards
- Fix anchor mismatches in mega menu

---

## 5. Component Audit

### Buttons
| Component | Current | Problem | Fix |
|-----------|---------|---------|-----|
| Primary CTA | `#f3694f` / `#FF6B00` | Inconsistent across pages | Lock to `#f3694f` |
| Secondary | Transparent + orange border | Wrong color | Transparent + red border |
| Ghost | None defined | Missing | Add red text, no bg |

### Cards
| Component | Current | Problem | Fix |
|-----------|---------|---------|-----|
| Section cards | `bg-white border-black/10 rounded-[24px]` | OK but inconsistent shadow | Lock shadow: `--shadow-md` → `--shadow-lg` hover |
| Service cards | Multi-colored bg | Critical | All white + red accent |

### Forms
| Component | Current | Problem | Fix |
|-----------|---------|---------|-----|
| Inputs | `border-black/20 focus:ring-[#f3694f]` | OK | Lock focus ring to red |
| Selects | Same | OK | Lock to red |
| Textarea | Same | OK | Lock to red |

### Icons
| Component | Current | Problem | Fix |
|-----------|---------|---------|-----|
| Close button `✕` | Emoji | Violates design system | Replace with Lucide `X` SVG |
| All icons | lucide-react | OK | Keep lucide-react, no emojis |

---

## 6. Hero (Wacaco) — Binding, Do Not Redesign

The hero is the one good thing. Per PROJECT.md §9:
- Wacaco/Minipresso layout is **binding** — do not simplify or redesign
- `computeMainMaskPath` / `computeCornerCardPath` via ResizeObserver — keep
- `clipPath` only at `>= 1024px` — keep
- Logo appears exactly twice (hero header + hero lockup) — keep
- Shell neutrals (`#d6dad8`/`#f4f5f4`/`#373a39`/`#161717`) — stay inside hero only
- Accent `#f3694f` — correct

### What to fix in hero
- The vertical name text uses `{slide.model}` in `#f3694f` — correct
- Primary/secondary CTAs use `#373a39` borders — should be black/red per locked palette
- Decorative loading spinners use `#f3694f` — correct

---

## 7. Files That Need Design Changes

| File | Issue | Priority |
|------|-------|----------|
| `src/app/globals.css` | Orange tokens `#FF6B00` need to become red `#f3694f` | Critical |
| `src/components/site-header.tsx` | Text "Bakyson" logo — replace with SVG | Critical |
| `src/components/ContactSection.tsx` | Emoji `✕` — replace with Lucide X | High |
| `src/components/site-nav.tsx` | Mega menu anchors don't match service page anchors | High |
| `src/components/AboutSection.tsx` | Uses `#f3694f` — correct, but verify black text | Medium |
| `src/components/SystemsSection.tsx` | Uses `#f3694f` — correct, but "150+" claim unverified | Medium |
| `src/components/IndustriesSection.tsx` | Uses `#f3694f` — correct | Medium |
| `src/components/ContactSection.tsx` | Uses `#f3694f` — correct | Medium |
| `src/app/services/page.tsx` | 8 accent colors — repaint all to red | Critical |
| `src/app/about/page.tsx` | Uses orange/text-primary — repaint | High |
| `src/app/contact/page.tsx` | Uses `text-primary` (orange) — repaint to red | High |
| `public/images/logo/bakyson-logo.svg` | Only approved logo — keep | Locked |

---

## 8. Reference Documents Created

| File | Purpose |
|------|---------|
| `DESIGN.md` | Locked design system spec (this review feeds into it) |
| `ARCHITECTURE.md` | Technical architecture |
| `INFRASTRUCTURE.md` | Deployment & ops |
| `ROADMAP.md` — includes commit documentation checklist | Phased milestones + documentation rule |
| `PRD.md` | Product requirements |
| `API.md` | API contracts |
| `SECURITY.md` | Security policy |
| `CONTRIBUTING.md` | Contribution conventions |
| `TESTING.md` | Test strategy |
| `docs/adr/0001-0004` | Architecture decision records |
| `PROJECT.md` | Existing handbook (preserved) |

---

## 9. Next Steps

1. **Lock the palette** in `DESIGN.md` (Vivid Red `#f3694f` + Black `#0A0A0A` + White `#FFFFFF`)
2. **Update `globals.css`** tokens to match
3. **Fix `site-header.tsx`** — replace text logo with SVG
4. **Fix `ContactSection.tsx`** — replace emoji with Lucide X
5. **Fix `site-nav.tsx`** — align mega menu anchors
6. **Repaint `services/page.tsx`** — all cards red/black/white
7. **Repaint remaining pages** — about, contact, quote, support
8. **Remove placeholder media** — await client brand assets
9. **Build and verify** — `npm run lint && npm run build`
