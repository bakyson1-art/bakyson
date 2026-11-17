# Bakyson Design System

## Component Specifications

### Button
| Variant | Background | Text | Border | Hover | Disabled |
|---------|-----------|------|--------|-------|----------|
| primary | var(--color-primary) | var(--color-white) | none | var(--color-primary-hover) | var(--color-gray-300) / var(--color-gray-500) |
| secondary | transparent | var(--color-primary) | var(--color-primary) | var(--color-primary-light) | var(--color-gray-300) / var(--color-gray-500) |
| outline | transparent | var(--color-black-500) | var(--color-border) | var(--color-surface-hover) | var(--color-gray-300) / var(--color-gray-500) |
| ghost | transparent | var(--color-foreground-muted) | none | var(--color-surface-hover) | var(--color-gray-300) / var(--color-gray-500) |

**Sizes:**
- sm: h-10 px-3 text-sm
- md: h-12 px-4 text-base
- lg: h-14 px-6 text-lg

**States:**
- default: var(--button-primary-bg)
- hover: var(--button-primary-hover-bg)
- active: scale(0.98)
- disabled: var(--button-primary-disabled-bg), cursor: not-allowed
- loading: spinner + disabled, opacity 0.7

**Accessibility:**
- Focus ring: 2px solid var(--color-primary), offset -2px
- Touch target: min 44x44px
- aria-label for icon-only buttons

### Card
| Property | Default | Hover |
|----------|---------|-------|
| Background | var(--card-bg) | var(--card-bg) |
| Border | var(--card-border) | var(--color-primary) / 50% |
| Shadow | var(--card-shadow) | var(--card-hover-shadow) |
| Radius | var(--radius-lg) | var(--radius-lg) |

**Composition:**
- CardHeader: CardTitle, CardDescription
- CardContent: body content
- CardFooter: actions, metadata

### Input
| Property | Default | Focus | Error |
|----------|---------|-------|-------|
| Background | var(--input-bg) | var(--input-bg) | var(--input-bg) |
| Border | var(--input-border) | var(--input-focus-border) | var(--color-error) |
| Text | var(--input-text) | var(--input-text) | var(--input-text) |
| Placeholder | var(--input-placeholder) | var(--input-placeholder) | var(--input-placeholder) |

**States:**
- default: border var(--color-border)
- focus: ring-2 ring var(--color-primary) / 20%, border var(--color-primary)
- error: border var(--color-error), aria-invalid="true", aria-describedby error id
- disabled: bg var(--color-surface-hover), cursor not-allowed

### Badge
| Variant | Background | Text |
|---------|-----------|------|
| default | var(--color-surface-hover) | var(--color-foreground) |
| primary | var(--color-primary) | var(--color-white) |
| secondary | var(--color-black-50) | var(--color-primary) |
| success | var(--color-success) / 10% | var(--color-success) |
| warning | var(--color-accent) / 10% | var(--color-accent) |
| error | var(--color-error) / 10% | var(--color-error) |

### Alert
| Variant | Background | Border | Text | Icon |
|---------|-----------|--------|------|------|
| info | var(--color-primary) / 10% | var(--color-primary) / 20% | var(--color-primary) | Info |
| success | var(--color-success) / 10% | var(--color-success) / 20% | var(--color-success) | CheckCircle |
| warning | var(--color-accent) / 10% | var(--color-accent) / 20% | var(--color-accent) | AlertTriangle |
| error | var(--color-error) / 10% | var(--color-error) / 20% | var(--color-error) | AlertCircle |

### Table
| Property | Value |
|----------|-------|
| Background | var(--card-bg) |
| Border | var(--color-border) |
| Header bg | var(--color-surface-hover) |
| Header text | var(--color-foreground), font-medium |
| Row hover | var(--color-surface-hover) |
| Cell padding | 1rem |
| Border radius | var(--radius-md) |

### Navigation Bar
| Property | Value |
|----------|-------|
| Height | var(--nav-height) |
| Background | var(--nav-bg) / 95% with backdrop-blur |
| Border bottom | var(--nav-border) |
| Logo size | w-10 h-10 |
| Link text | text-sm font-medium |
| Link hover | text var(--color-primary) |
| Active link | text var(--color-primary), border-b-2 border var(--color-primary) |
| Mobile breakpoint | md:hidden (mobile menu) |

### Footer
| Property | Value |
|----------|-------|
| Background | var(--footer-bg) |
| Text | var(--footer-text) |
| Border top | var(--color-border) |
| Padding y | 3rem (desktop), 2rem (mobile) |
| Link hover | text var(--color-primary) |

### Portal Sidebar
| Property | Value |
|----------|-------|
| Background | var(--portal-sidebar-bg) |
| Border right | var(--color-border) |
| Width | 16rem (256px) desktop, hidden mobile |
| Active item bg | var(--color-primary-light) |
| Active item text | var(--color-primary) |

### Portal Card
| Property | Default | Hover |
|----------|---------|-------|
| Background | var(--portal-card-bg) | var(--portal-card-bg) |
| Border | var(--portal-card-border) | var(--color-primary) / 50% |
| Shadow | var(--card-shadow) | var(--card-hover-shadow) |

## Layout Tokens

### Container
- max-width: var(--container-max-width)
- padding-left: 1rem (mobile), 1.5rem (desktop)
- padding-right: 1rem (mobile), 1.5rem (desktop)

### Section
- padding-y: 5rem (desktop), 3rem (mobile)
- gap between sections: 5rem (desktop), 3rem (mobile)

### Grid System
- Mobile: 1 column
- Tablet (768px+): 2 columns
- Desktop (1024+): 3 columns
- Wide (1440+): 4 columns

## Motion Specifications

### Page Transitions
- mode: "wait"
- enter: opacity 0 → 1, y 16px → 0
- exit: opacity 1 → 0, y 0 → -16px
- duration: normal (0.35s)
- easing: smooth [0.22, 1, 0.36, 1]

### Hover States
- buttons: scale 1.04 (pop)
- cards: shadow-lg, translateY -2px
- links: underline, color primary

### Tap States
- buttons: scale 0.96 (press)
- icons: scale 0.95

### Loading States
- Skeleton: pulse opacity 0.5 → 1 → 0.5, duration crawl (1.0s)
- Spinner: rotate 360deg, duration slow (0.6s)

### Reduced Motion
- All transforms disabled
- Opacity-only fades at 0.15s max
- No layout animations

## Accessibility Specifications

### Focus Rings
- 2px solid var(--color-primary), offset -2px, rounded var(--radius-md)
- Visible on all interactive elements

### Contrast Ratios
- Normal text: 4.5:1 minimum
- Large text (18px+ bold or 24px+): 3:1 minimum
- UI components: 3:1 minimum

### Touch Targets
- Minimum: 44x44px (WCAG 2.2 AA)
- Ideal: 48x48px
- Spacing between targets: minimum 8px

### Keyboard Navigation
- Tab order matches visual order
- No focus traps except in modals
- Escape closes modals/dialogs
- Focus restored to trigger on modal close

### ARIA
- icon-only buttons: aria-label
- modals: role="dialog", aria-modal="true", aria-labelledby
- dropdowns: role="combobox", aria-expanded, aria-controls
- alerts: role="alert", aria-live="polite"
- form errors: aria-describedby, aria-invalid

## Anti-Patterns (Do Not Use)
- Purple/indigo default colors
- Excessive gradients
- rounded-2xl on everything (use radius scale)
- Generic hero sections with placeholder copy
- Lorem ipsum text
- Oversized padding everywhere
- Uniform stock card grids
- Shadow-heavy design
- Emojis as structural icons
- Raw hex values in components (use tokens)
- `transition: all` (use explicit properties)
- `will-change: all`
