# ADR-0004: Tailwind CSS v4 with `@theme` tokens

## Status
Accepted

## Date
2026-11-25

## Context
The Bakyson design system needed a utility-first CSS framework with design token support. The project uses Tailwind CSS v4 with `@import "tailwindcss"` and `@theme` CSS variables rather than a `tailwind.config.*` file.

## Decision
Use Tailwind CSS v4:
- `@import "tailwindcss"` in `src/app/globals.css`
- Design tokens defined via `@theme { --color-primary: #FF6B00; ... }`
- Path alias `@/*` → `src/*`
- No `tailwind.config.js` or `tailwind.config.ts`

## Options considered

| Option | Pros | Cons |
|--------|------|------|
| Tailwind v4 (`@theme`) | Native CSS variables, no config file, JIT by default | Newer syntax; fewer community examples; v4-specific deprecations possible |
| Tailwind v3 (`tailwind.config.ts`) | Mature, extensive documentation | Requires config file, purging step, older CSS variable approach |
| CSS modules + custom properties | No framework dependency | More boilerplate, no utility class ecosystem |
| Styled Components / Emotion | Runtime styling | Bundle size, runtime cost, not aligned with utility-first approach |

## Consequences

### Positive
- Design tokens are native CSS custom properties, accessible in JS and CSS
- No build step for config changes
- Consistent with PostCSS v4 (`@tailwindcss/postcss`)

### Negative
- `globals.css` contains the entire theme; no separation of component-level config
- Palette conflict (#FF6B00 orange vs #f3694f red) must be resolved in `globals.css` tokens
- v4 is newer; some plugins or tooling may not yet support it

## References
- `src/app/globals.css`
- `postcss.config.mjs`
- `design-system/bakyson/MASTER.md` (legacy design tokens — conflicts with `globals.css`)
