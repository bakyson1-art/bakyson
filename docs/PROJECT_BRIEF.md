# Bakyson Project Brief

## Company Overview
**Bakyson** — Design and Build ELV services provider for Sub-Saharan Africa  
**Core focus:** Hospitality, Healthcare, Corporates, and Learning Institutions  
**Coverage:** Nigeria, Kenya, South Africa (strategic operational hubs)  
**Existing site:** bakyson.com  
**Company tagline:** "Reinvent Your Business With Bakyson's ICT Solutions"

## Redesign Goals (Agreed)
- Full redesign of existing bakyson.com
- New site structure and architecture
- Add new features (client portal, quote form, case studies, blog, careers, live chat)
- SEO-ready (sitemap.xml, robots.txt, OpenGraph metadata)
- Separate mobile and desktop viewports (responsive)
- PWA installable (manifest.json, service worker)
- Production build on free tier initially (GitHub + Vercel), upgrade to paid in 1–2 months

## Brand Identity (Agreed)
- **Colors:** Orange (#FF6B00), Black (#0A0A0A), White (#FFFFFF)
- **Vibe:** Bold and dynamic
- **Logo:** "B" mark + "Bakyson" wordmark (italic, font-extrabold)
- **Existing brand maintained** — no color or logo changes

## Target Audience
- Hospitality (hotels, resorts) — IPTV, digital signage, AV
- Healthcare (hospitals, clinics) — nurse call, access control, fire evacuation
- Corporates (offices, headquarters) — network infrastructure, AV, access control
- Learning Institutions (schools, universities) — interactive screens, digital displays, BMS/GRMS
- Events & Stadia — digital signage, HSIA, unified communication
- Telcos & ISPs — network infrastructure

## Site Structure (Agreed)
| Page | Purpose |
|------|---------|
| / | Home — hero, services preview, case studies preview, portfolio preview, CTA |
| /about | Company story, cornerstones (Innovation, Experience, Knowledge, Commitment, Coverage), stats |
| /services | 6 service families with features |
| /portfolio | Map-oriented project locations across Sub-Saharan Africa |
| /case-studies | Detailed project stories with results and metrics |
| /blog | Industry insights and technology trends |
| /careers | Job listings + application form |
| /contact | Quote form + office locations (NG, KE, ZA) |
| /portal/login | Secure login (2FA) |
| /portal/dashboard | Client dashboard — projects, support tickets, documents |

## Features (Agreed)
- Client portal with email/password login + 2FA authentication
- Service request / quote form
- Case studies / project gallery
- Blog / news section
- Live chat widget
- Careers page with application form (PDF resume upload)
- Map-oriented portfolio section
- Contact information for 3 offices (Nigeria, Kenya, South Africa)

## Content Strategy (Agreed)
- Mix of existing content (from bakyson.com) + new content created
- Company profile PDF available for download
- Client logos and partner logos available

## Technical Stack (Agreed)
- **Framework:** Next.js 16 (App Router), TypeScript, Tailwind CSS
- **Build:** Webpack (Windows-compatible)
- **Hosting:** GitHub (code) + Vercel (frontend + API routes), free tier initially
- **PWA:** manifest.json + service worker (sw.js)
- **Security:** CSP, HSTS, X-Frame-Options: DENY, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- **CI/CD:** GitHub Actions → Vercel
- **Forms:** API routes (/api/contact, /api/careers, /api/support-ticket)
- **Auth:** Client-side demo auth (demo@bakyson.com / demo123, 2FA code 123456)

## Live URL
https://bakyson.vercel.app/

## GitHub Repository
https://github.com/bakyson1-art/bakyson

## Design Stack Loaded
frontend-ui-engineering, ui-ux-pro-max, design-system, design-system-tokens, frontend-design-direction, accessibility, frontend-a11y, frontend-patterns, ui-styling, shadcn, rayden-code, react-patterns, react-performance, make-interfaces-feel-better, motion-foundations, motion-patterns, motion-advanced, motion-ui

## Rules (Locked)
- All questions to user must be asked as clear, detailed prompts with examples via the `question` tool
- No assumptions made without user direction
- No emojis in code unless explicitly requested
- Design stack must be loaded before any UI/UX work
- Accessibility (WCAG 2.2 AA) is mandatory
- Mobile-first responsive design
- No paid services invoked unless user explicitly asks
