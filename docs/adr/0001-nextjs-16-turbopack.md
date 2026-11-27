# ADR-0001: Next.js 16.4.6 with App Router and Turbopack

## Status
Accepted

## Date
2026-11-25

## Context
The Bakyson public site needed a modern React framework with server-side rendering, API route handling, and PWA support. The project was initiated before Next.js 16 was widely documented in training data, so conventions differ from older Next.js versions.

## Decision
Use Next.js 16.4.6 with:
- App Router (`src/app/`)
- Turbopack bundler
- React 19.3.0
- TypeScript 5 strict mode

## Options considered

| Option | Pros | Cons |
|--------|------|------|
| Next.js 16 + Turbopack | Modern, Vercel-native, App Router, API routes, PWA support | Breaking changes from older versions; `middleware` deprecated in favor of `proxy` |
| Next.js 13/14 (Pages Router) | More documentation available | Legacy routing, no App Router benefits |
| Remix | Strong data model | Not aligned with Vercel deployment target |
| Vite + React SPA | Fast build | No SSR, no API routes, worse SEO |

## Consequences

### Positive
- Vercel auto-deployment is seamless
- App Router supports layout nesting, loading states, and error boundaries
- API route handlers eliminate need for separate backend service
- Turbopack provides fast local dev and builds

### Negative
- `middleware` convention is deprecated; must migrate to `proxy` before Next.js 17 (ADR-0012 backlog)
- Training data and community examples may reference older Next.js patterns
- AGENTS.md auto-block is injected by `next dev` and must be preserved

## References
- `next.config.ts`
- `AGENTS.md`
- `PROJECT.md` §84–89 (Next.js 16 deprecation warnings)
