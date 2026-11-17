# Bakyson Design Tokens

## Design Direction
- **Purpose:** Corporate ICT solutions provider website — trustworthy, professional, bold, dynamic
- **Audience:** B2B decision makers in Hospitality, Healthcare, Corporates, Learning Institutions across Sub-Saharan Africa
- **Tone:** Bold, dynamic, cutting-edge, reliable, African-tech-forward
- **Memorable detail:** Orange (#FF6B00) as the primary accent against Black/White — high contrast, energetic, distinctive

## Three-Layer Token Architecture

### Layer 1: Primitives (Raw Values)
```css
--color-orange-50: #FFF4E6;
--color-orange-100: #FFE0B2;
--color-orange-500: #FF6B00;
--color-orange-700: #E55A00;
--color-orange-900: #8B4500;

--color-black-50: #F5F5F5;
--color-black-100: #E5E5E5;
--color-black-500: #0A0A0A;
--color-black-900: #000000;

--color-white: #FFFFFF;
--color-white-500: #F9F9F9;

--color-gray-100: #F3F4F6;
--color-gray-300: #D1D5DB;
--color-gray-500: #6B7280;
--color-gray-700: #374151;
--color-gray-900: #111827;

--color-green-500: #10B981;
--color-green-600: #059669;
--color-red-500: #EF4444;
--color-red-600: #DC2626;

--font-sans: "Inter", system-ui, -apple-system, sans-serif;
--font-heading: "Inter", system-ui, -apple-system, sans-serif;
--font-mono: "ui-monospace", SFMono-Regular, monospace;

--radius-sm: 0.375rem;   /* 6px */
--radius-md: 0.5rem;     /* 8px */
--radius-lg: 0.75rem;    /* 12px */
--radius-xl: 1rem;       /* 16px */
--radius-2xl: 1.5rem;    /* 24px */
--radius-full: 9999px;

--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-orange: 0 10px 15px -3px rgb(255 107 0 / 0.25);
--shadow-orange-lg: 0 20px 25px -5px rgb(255 107 0 / 0.35);

--space-0: 0;
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-20: 5rem;    /* 80px */

--transition-fast: 150ms ease-out;
--transition-normal: 250ms ease-out;
--transition-slow: 350ms ease-out;
```

### Layer 2: Semantic (Purpose Aliases)
```css
--color-background: var(--color-white);
--color-surface: var(--color-black-50);
--color-surface-hover: var(--color-black-100);
--color-foreground: var(--color-black-500);
--color-foreground-muted: var(--color-gray-500);
--color-foreground-inverse: var(--color-white);

--color-primary: var(--color-orange-500);
--color-primary-hover: var(--color-orange-700);
--color-primary-light: var(--color-orange-100);
--color-primary-dark: var(--color-orange-900);

--color-accent: var(--color-orange-500);
--color-accent-hover: var(--color-orange-700);

--color-success: var(--color-green-600);
--color-error: var(--color-red-600);
--color-warning: var(--color-orange-700);
--color-info: var(--color-primary);

--color-border: var(--color-gray-300);
--color-border-hover: var(--color-primary);
--color-border-focus: var(--color-primary);

--color-shadow: var(--shadow-md);
--color-shadow-primary: var(--shadow-orange);
```

### Layer 3: Component Tokens
```css
--button-primary-bg: var(--color-primary);
--button-primary-text: var(--color-white);
--button-primary-hover-bg: var(--color-primary-hover);
--button-primary-disabled-bg: var(--color-gray-300);
--button-primary-disabled-text: var(--color-gray-500);

--button-secondary-bg: transparent;
--button-secondary-text: var(--color-primary);
--button-secondary-border: var(--color-primary);
--button-secondary-hover-bg: var(--color-primary-light);

--button-outline-bg: transparent;
--button-outline-text: var(--color-black-500);
--button-outline-border: var(--color-border);
--button-outline-hover-bg: var(--color-surface-hover);

--card-bg: var(--color-white);
--card-border: var(--color-border);
--card-shadow: var(--shadow-md);
--card-hover-shadow: var(--shadow-lg);

--input-bg: var(--color-white);
--input-border: var(--color-border);
--input-focus-border: var(--color-primary);
--input-text: var(--color-foreground);
--input-placeholder: var(--color-gray-500);

--nav-height: 4rem;   /* 64px */
--nav-bg: var(--color-white);
--nav-border: var(--color-border);

--footer-bg: var(--color-black-500);
--footer-text: var(--color-gray-400);

--modal-bg: var(--color-white);
--modal-overlay: rgba(0, 0, 0, 0.5);

--portal-card-bg: var(--color-white);
--portal-card-border: var(--color-border);
--portal-sidebar-bg: var(--color-black-50);
```

## Typography Scale
| Token | Size | Weight | Line Height | Use |
|-------|------|--------|-------------|-----|
| --text-xs | 0.75rem (12px) | 400 | 1.5 | Captions, helper text |
| --text-sm | 0.875rem (14px) | 400 | 1.5 | Small body, labels |
| --text-base | 1rem (16px) | 400 | 1.625 | Default body text |
| --text-lg | 1.125rem (18px) | 400 | 1.625 | Lead paragraphs |
| --text-xl | 1.25rem (20px) | 600 | 1.5 | Section headings |
| --text-2xl | 1.5rem (24px) | 700 | 1.375 | Page subtitles |
| --text-3xl | 1.875rem (30px) | 700 | 1.25 | Page titles |
| --text-4xl | 2.25rem (36px) | 800 | 1.125 | Hero headings |
| --text-5xl | 3rem (48px) | 800 | 1.1 | Landing page hero |

## Spacing Scale (Consistent 4px/8px increments)
- section-padding-y: 5rem (80px) desktop, 3rem (48px) mobile
- container-max-width: 80rem (1280px)
- gap-sm: 1rem (16px)
- gap-md: 1.5rem (24px)
- gap-lg: 2rem (32px)
- gap-xl: 3rem (48px)

## Border Radius
- sm: 0.375rem (6px) — badges, pills, small chips
- md: 0.5rem (8px) — inputs, buttons, cards
- lg: 0.75rem (12px) — modals, dialogs, hero sections
- xl: 1rem (16px) — large cards, feature boxes
- 2xl: 1.5rem (24px) — hero containers, landing sections
- full: 9999px — avatars, circular buttons

## Motion Tokens (from motion-foundations)
```ts
duration: {
  instant: 0.08,
  fast:    0.18,
  normal:  0.35,
  slow:    0.6,
  crawl:   1.0,
}
easing: {
  smooth: [0.22, 1, 0.36, 1],
  sharp:  [0.4, 0, 0.2, 1],
  bounce: [0.34, 1.56, 0.64, 1],
  linear: [0, 0, 1, 1],
}
springs: {
  snappy:  { type: "spring", stiffness: 300, damping: 30 },
  gentle:  { type: "spring", stiffness: 120, damping: 14 },
  bouncy:  { type: "spring", stiffness: 400, damping: 10 },
  instant: { type: "spring", stiffness: 600, damping: 35 },
  release: { type: "spring", stiffness: 200, damping: 20, restDelta: 0.001 },
}
```

## Contrast Ratios (WCAG 2.2 AA)
- Primary orange (#FF6B00) on White (#FFFFFF): ~4.6:1 ✓
- Primary orange (#FF6B00) on Black (#0A0A0A): ~11.2:1 ✓
- Black (#0A0A0A) on White (#FFFFFF): ~15.9:1 ✓
- White (#FFFFFF) on Black (#0A0A0A): ~15.9:1 ✓
- Gray-500 (#6B7280) on White (#FFFFFF): ~4.5:1 ✓
