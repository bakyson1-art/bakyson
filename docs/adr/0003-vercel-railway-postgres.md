# ADR-0003: Vercel hosting + Railway PostgreSQL

## Status
Accepted

## Date
2026-11-25

## Context
The Bakyson public site needed a hosting platform with automatic deployment from GitHub, managed TLS, and edge networking. The database needed to be shared with the separate admin dashboard application.

## Decision
- **Hosting:** Vercel (auto-deploy from GitHub `master` via GitHub Actions)
- **Database:** Railway PostgreSQL (shared with admin dashboard)
- **Alternative:** Docker + Railway (`Dockerfile`, `railway.toml` present)

## Options considered

| Option | Pros | Cons |
|--------|------|------|
| Vercel + Railway | Seamless GitHub integration, managed TLS, serverless functions, shared DB accessible externally | Vendor lock-in on Vercel; database region may not match user geography |
| Railway full-stack | Single provider for app + DB | Less mature frontend hosting than Vercel |
| AWS (EC2 + RDS) | Full control, regional flexibility | High operational overhead, no auto-deploy from GitHub out of the box |
| Netlify + Supabase | Similar to Vercel + Railway | Less familiar to team |

## Consequences

### Positive
- GitHub Actions CI/CD (lint → build → deploy) is straightforward
- Vercel provides managed TLS, custom domains, and preview deployments
- Railway Postgres is accessible via public connection URL
- `Dockerfile` + `railway.toml` provide a portable alternative

### Negative
- `bakyson.com` is forbidden; production domain unconfirmed (cannot finalize `NEXTAUTH_URL`)
- Database backups and disaster recovery not yet verified
- Shared DB means schema changes in admin dashboard can break public site and vice versa

## References
- `.github/workflows/ci.yml`
- `railway.toml`
- `Dockerfile`
- `PROJECT.md` §14 (Deployment)
