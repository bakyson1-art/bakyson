# Bakyson — Railway Service Provisioning Guide

This document describes how to provision all required services on Railway for the Bakyson application.

## Prerequisites

- Railway account: https://railway.app
- Railway CLI installed: `npm install -g @railway/cli` or `brew install railway`
- GitHub repository connected to Railway

---

## Step 1: Create Railway Project

```bash
railway login
railway init
```

Select "Create new project" and name it `bakyson`.

---

## Step 2: Provision PostgreSQL

```bash
railway add postgresql
```

This creates a managed PostgreSQL instance. Railway will set the `DATABASE_URL` environment variable automatically.

**Verify:**
```bash
railway variables
```
Look for `DATABASE_URL` in the output.

---

## Step 3: Provision Redis

```bash
railway add redis
```

This creates a managed Redis instance. Railway sets the `REDIS_URL` environment variable automatically.

**Used for:** session storage, rate limiting, chat presence, caching.

---

## Step 4: Add PostgreSQL + Redis to the Web Service

Link the databases to your web service:

```bash
railway link
# Select your web service
railway service bakyson-web
railway connect postgresql
railway connect redis
```

Or in the Railway dashboard: Web Service → Settings → Add Service → Select PostgreSQL/Redis.

---

## Step 5: Run Database Migration

Apply the schema to the provisioned PostgreSQL:

```bash
# Get the DATABASE_URL
railway variables get DATABASE_URL

# Run migration locally against Railway DB
DATABASE_URL="$(railway variables get DATABASE_URL)" psql "$DATABASE_URL" -f database/schema.sql
```

Or via Railway CLI:
```bash
railway run psql -f database/schema.sql
```

---

## Step 6: Seed Demo Data (Optional)

```bash
DATABASE_URL="$(railway variables get DATABASE_URL)" npx tsx scripts/seed.ts
```

---

## Step 7: Configure Environment Variables

Add these to Railway (dashboard or CLI):

| Variable | Source | Notes |
|----------|--------|-------|
| `DATABASE_URL` | Railway PostgreSQL | Auto-set when linked |
| `REDIS_URL` | Railway Redis | Auto-set when linked |
| `NEXTAUTH_SECRET` | Generate: `openssl rand -base64 32` | Required for auth |
| `NEXTAUTH_URL` | `https://bakyson.com` | Your production domain |
| `RESEND_API_KEY` | Resend dashboard | Transactional email |
| `SMTP_FROM` | `noreply@bakyson.com` | Email from address |
| `ADMIN_EMAIL` | `support@bakyson.com` | Support contact |
| `R2_ACCOUNT_ID` | Cloudflare R2 | Object storage |
| `R2_ACCESS_KEY_ID` | Cloudflare R2 | S3-compatible key |
| `R2_SECRET_ACCESS_KEY` | Cloudflare R2 | S3-compatible secret |
| `R2_BUCKET_NAME` | `bakyson-assets` | Bucket name |
| `SENTRY_DSN` | Sentry project | Error tracking (optional) |
| `NEXT_PUBLIC_ANALYTICS_ID` | Plausible/Umami | Analytics (optional) |

```bash
railway variables set NEXTAUTH_SECRET="$(openssl rand -base64 32)"
railway variables set NEXTAUTH_URL=https://bakyson.com
railway variables set RESEND_API_KEY="your-resend-key"
railway variables set ADMIN_EMAIL="support@bakyson.com"
```

---

## Step 8: Add Custom Domain

In the Railway dashboard:
1. Web Service → Settings → Domains
2. Add `bakyson.com`
3. Configure DNS records as instructed by Railway
4. Railway provisions SSL automatically

---

## Step 9: Deploy

```bash
railway up
```

Or connect GitHub for automatic deploys on push to `main`.

---

## Step 7: Verify Deployment

```bash
railway open
# Visit https://bakyson.com/api/health
# Should return: {"status":"ok","checks":{"database":"connected"}}
```

---

## Service Architecture

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   Web       │──────│ PostgreSQL   │      │    Redis    │
│ (Next.js)   │      │ (Primary DB) │      │ (Cache/Rate)│
└─────────────┘      └──────────────┘      └─────────────┘
      │
      ▼
┌─────────────┐
│  Cloudflare │
│    R2       │
│  (Object    │
│  Storage)   │
└─────────────┘
      │
      ▼
┌─────────────┐
│   Resend    │
│   (Email)   │
└─────────────┘
```

---

## Environment Variable Checklist

Before deploying, ensure all required vars are set:

```bash
railway variables
```

Required: `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`
Recommended: `REDIS_URL`, `RESEND_API_KEY`, `ADMIN_EMAIL`, `R2_*`, `SENTRY_DSN`
