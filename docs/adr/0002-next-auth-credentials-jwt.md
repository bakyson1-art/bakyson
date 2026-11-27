# ADR-0002: next-auth v4 Credentials provider with JWT sessions

## Status
Accepted

## Date
2026-11-25

## Context
The Bakyson client portal requires email/password authentication for clients to view projects and tickets. The admin dashboard shares the same PostgreSQL database and needs a compatible user model.

## Decision
Use next-auth v4 with:
- Credentials provider only (no OAuth providers)
- JWT session strategy
- bcryptjs for password hashing (cost 10)
- Custom `/api/csrf` endpoint for portal login CSRF protection

## Options considered

| Option | Pros | Cons |
|--------|------|------|
| next-auth v4 Credentials + JWT | Simple, integrates with Next.js, shared DB with admin dashboard | v4 is in maintenance mode; v5 (Auth.js) is the future |
| next-auth v5 (Auth.js) | Newer, better TypeScript support | Less mature, migration path uncertain |
| Custom session implementation | Full control | High maintenance, security risk |
| OAuth only (Google, etc.) | No password management | Not suitable for B2B client credentials |

## Consequences

### Positive
- Single user table shared with admin dashboard
- JWT avoids server-side session storage
- Role-based access carried in token (`role` claim)
- Middleware protects `/portal/:path+` routes

### Negative
- next-auth v4 is in maintenance mode; eventual migration to v5 required
- Custom `/api/csrf` endpoint is redundant with next-auth's built-in CSRF
- `pages.signIn` points to `/portal/login` which does not exist (bug — fix before production)
- Password reset uses separate SHA-256 hash table, not next-auth's built-in flow

## References
- `src/app/api/auth/[...nextauth]/route.ts`
- `src/middleware.ts`
- `database/schema.sql` (`users`, `password_reset_tokens` tables)
