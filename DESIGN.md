# Bakyson — Design System Specification (LOCKED)

> **Status:** Locked. All palette, typography, and component decisions are final.
> Items marked **[PENDING CLIENT]** require real assets from the client (media, email, phone).
> This file is the single source of truth for visual design, component behaviour, and layout rules.
> It overrides `design-system/bakyson/MASTER.md` where the two conflict.

---

## 1. Brand Identity (LOCKED)

| Element | Specification | Status |
|---------|---------------|--------|
| Primary colour | `#f3694f` (Vivid Red) | ✅ Locked |
| Neutral dark | `#0A0A0A` (Black) | ✅ Locked |
| Neutral light | `#FFFFFF` (White) | ✅ Locked |
| Wacaco shell neutrals (hero only) | Canvas `#d6dad8`, surface `#f4f5f4`, ink `#373a39`, frame `#161717` | ✅ Locked (hero shell only) |
| Typography | Inter (400, 500, 600, 700) via `next/font/google` | ✅ Locked |
| Logo asset | `public/images/logo/bakyson-logo.svg` — ONLY logo file | ✅ Locked |
| Logo instances | Exactly 2 on homepage (hero header + hero lockup) | ✅ Locked |
| Forbidden | Text "BAKYSON" as logo, text monograms, emoji as icons, orange `#FF6B00` | ✅ Locked |

**Palette decision:** Vivid Red `#f3694f` + Black `#0A0A0A` + White `#FFFFFF`. Orange `#FF6B00` is removed from the entire codebase. Multi-colored service cards are removed.

---

## 2. Colour Tokens (LOCKED)

All tokens live in `src/app/globals.css`. These are the only colours permitted in the codebase.

| Token | Hex | CSS Variable | Role |
|-------|-----|--------------|------|
| `--color-primary` | `#f3694f` | Primary brand (Vivid Red) | CTAs, links, active states |
| `--color-primary-foreground` | `#FFFFFF` | Text on primary | White text on red |
| `--color-accent` | `#f3694f` | CTA accent | Same as primary |
| `--color-background` | `#FFFFFF` | Page background | White |
| `--color-foreground` | `#0A0A0A` | Body text | Black |
| `--color-secondary` | `#F5F5F5` | Secondary surfaces | Off-white |
| `--color-muted` | `#F3F4F6` | Muted backgrounds | Light gray |
| `--color-muted-foreground` | `#6B7280` | Muted text | Dark gray |
| `--color-border` | `#D1D5DB` | Borders | Light gray border |
| `--color-destructive` | `#DC2626` | Errors / destructive | Red (standard) |
| `--color-ring` | `#f3694f` | Focus rings | Vivid Red |
| `--color-card` | `#FFFFFF` | Card background | White |
| `--color-card-foreground` | `#0A0A0A` | Card text | Black |

### Hero shell (Wacaco — hero only, does not leak)

| Token | Hex | Role |
|-------|-----|------|
| `--hero-shell-bg` | `#f4f5f4` | Device shell surface |
| `--hero-shell-border` | `#161717` | Device shell frame (5–6px) |
| `--hero-shell-ink` | `#373a39` | Hero shell text/icons |
| `--hero-shell-shadow` | `0 24px 70px rgba(0,0,0,0.14)` | Device shell shadow |

---

## 3. Typography (LOCKED)

| Role | Font | Weights | Usage |
|------|------|---------|-------|
| Body / headings | Inter | 400, 500, 600, 700 | All text |
| Mono | ui-monospace, SFMono-Regular, monospace | — | Code, technical data |

- Imported via `next/font/google` with `variable: "--font-sans"`.
- `text-rendering: optimizeLegibility`, antialiased.
- `prefers-reduced-motion` respected (animations reduced to 0.01ms).

---

## 4. Spacing, Radius, Shadows, Motion (LOCKED)

### Spacing tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | 4px / 0.25rem | Tight gaps |
| `--space-sm` | 8px / 0.5rem | Icon gaps |
| `--space-md` | 16px / 1rem | Standard padding |
| `--space-lg` | 24px / 1.5rem | Section padding |
| `--space-xl` | 32px / 2rem | Large gaps |
| `--space-2xl` | 48px / 3rem | Section margins |
| `--space-3xl` | 64px / 4rem | Hero padding |

### Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius` | 0.5rem | Default component radius |
| Hero shell | 26–32px | Outer device shell |
| Cards | 24px | Section cards |
| Buttons | full / pill | CTAs |

### Shadows

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | 0 1px 2px rgba(0,0,0,0.05) | Subtle lift |
| `--shadow-md` | 0 4px 6px rgba(0,0,0,0.1) | Cards, buttons |
| `--shadow-lg` | 0 10px 15px rgba(0,0,0,0.1) | Modals, dropdowns |
| `--shadow-xl` | 0 20px 25px rgba(0,0,0,0.15) | Hero images |
| Hero shell | 0 24px 70px rgba(0,0,0,0.14) | Device shell |

### Motion

| Token | Value | Usage |
|-------|-------|-------|
| `--duration-fast` | 150ms | Micro-interactions |
| `--duration-base` | 200ms | Standard transitions |
| `--duration-slow` | 300ms | Slower overlays |
| `--ease-standard` | cubic-bezier(0.4, 0, 0.2, 1) | Standard ease |

---

## 5. Hero Specification (BINDING — do not redesign)

The client explicitly rejected a simplified split hero and demanded the **Wacaco / Minipresso reference layout**. Preserve it exactly.

### 5.1 Required structure

1. **Outer device shell** — rounded rectangle (~26–32px radius), thick black border (5–6px), large soft shadow, centred on page padding.
2. **Top header row** — logo (left) · pill navigation (centre) · dark pill CTA with circular arrow badge (right); mobile: compact CTA + hamburger drawer.
3. **Hero stage** — two overlapping layers:
   - **Top-left editorial block:** logo + vertical divider + vertical name, then a row: rounded thumbnail + subhead + two pill buttons + arrow button.
   - **Main media layer:** full-stage image/video masked by SVG `clipPath` with a notch (top-left cut) and diagonal cut (bottom-right).
4. **Bottom-right diagonal feature card** — separate clipped card showing close-up detail image, visually separated by small gap.
5. **Overlays** — centred play button; two decorative loading spinners.
6. **Mobile fallback strip** — dark gradient card with vertical name, headline, subhead, and detail image.

### 5.2 Implementation rules

- Mask paths computed in `computeMainMaskPath(w,h)` and `computeCornerCardPath(w,h)` from measured stage size via `ResizeObserver`.
- `clipPath` applied only at `window.innerWidth >= 1024`; mobile uses plain rounded containers.
- Stage heights: `lg:h-[660px] xl:h-[700px]`.
- Media: silent autoplay loop (`autoPlay loop muted playsInline`) with `poster={thumbnail}`.
- Auto-advance slides every 7000 ms; clicking play button resets timer.

### 5.3 Logo rule — HARD CONSTRAINT

- `public/images/logo/bakyson-logo.svg` is the ONLY logo.
- Appears exactly twice on homepage: hero header + hero brand lockup.
- Never render "BAKYSON" as text in place of the logo.
- Global `SiteHeader` hidden on `/` to avoid duplicating hero header/logo.
- No text monograms.

---

## 6. Component Specifications

### Buttons

| Variant | Background | Text | Border | Radius | Usage |
|---------|-----------|------|--------|--------|-------|
| Primary | `#f3694f` | White | None | Full / pill | Main CTAs |
| Secondary | Transparent | `#f3694f` | 1px `#f3694f` | Full / pill | Secondary actions |
| Ghost | Transparent | `#0A0A0A` | None | Rounded | Tertiary actions |

- Hover: darken by ~10%, transition 150–300ms.
- `cursor-pointer` on all clickable elements.
- Visible focus ring (2px `#f3694f`) for keyboard navigation.

### Cards

- Background: white
- Border: 1px `#D1D5DB`
- Radius: 24px
- Padding: 24px (mobile) / 32px (desktop)
- Shadow: `--shadow-md`, hover `--shadow-lg`
- Transition: all 200ms ease

### Inputs

- Padding: 12px 16px
- Border: 1px `#D1D5DB`
- Radius: 8px / 0.5rem
- Focus: 2px ring `#f3694f`, no outline

### Dialogs / Toast

- Radix Dialog + Toast primitives.
- Backdrop blur, visible focus states.
- Toast: positioned bottom-right.

---

## 7. Layout & Responsive Rules

| Breakpoint | Prefix | Usage |
|------------|--------|-------|
| Mobile | default | 375px and up |
| Tablet | `sm:` | 640px and up |
| Desktop | `lg:` | 1024px and up |
| Wide | `xl:` | 1280px and up |

- Hero masks only at `>= 1024px`; mobile uses rounded fallbacks.
- No horizontal scroll at 375 / 768 / 1024 / 1440.
- No content hidden behind fixed navbars.
- Skip-to-content link present (`#main-content`).

---

## 8. Accessibility Targets

| Target | Specification |
|--------|---------------|
| WCAG contrast | 4.5:1 minimum for normal text, 3:1 for large text |
| Focus states | Visible focus ring on all interactive elements |
| Keyboard navigation | All functions operable via keyboard |
| ARIA | `aria-label`, `aria-current`, `role="alert"` where appropriate |
| Reduced motion | `prefers-reduced-motion` disables animations |
| Skip link | Present and visible on focus |

---

## 9. Anti-Patterns (Do Not Use)

- ❌ Emojis as icons — use SVG (lucide-react)
- ❌ Text "BAKYSON" as logo or decorative monogram
- ❌ Dark mode by default (light mode only)
- ❌ Orange `#FF6B00` anywhere in the codebase
- ❌ Multi-coloured service cards or section accents
- ❌ Layout-shifting hovers (avoid scale transforms that shift layout)
- ❌ Low contrast text (< 4.5:1)
- ❌ Instant state changes (always use transitions 150–300ms)
- ❌ Invisible focus states
- ❌ Multiple logos on homepage (max 2)

---

## 10. Pre-Delivery Checklist

- [ ] No emojis used as icons
- [ ] All icons from lucide-react
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150–300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
- [ ] Homepage shows exactly two logo instances
- [ ] No text "BAKYSON" used as logo anywhere
- [ ] No `#FF6B00` orange anywhere in codebase
- [ ] Palette is Vivid Red `#f3694f` + Black `#0A0A0A` + White `#FFFFFF`
- [ ] `npm run lint` passes
- [ ] `npm run build` passes
