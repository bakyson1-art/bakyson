# Bakyson — API Contract Specification

> **Status:** Draft. Items marked **[TBD]** require client or infra decision.
> This document defines the request/response contracts for all route handlers
> in `src/app/api/`. It is the single source of truth for frontend and backend
> integration. Any change to an endpoint must be reflected here in the same
> commit.

---

## 1. Base URL & environments

| Environment | Base URL | Notes |
|-------------|----------|-------|
| Local development | `http://localhost:3000/api` | `.env.local` |
| Preview (Vercel) | `https://*.vercel.app/api` | [TBD] |
| Production | `https://<production-domain>/api` | **[TBD]** domain TBD |

> `bakyson.com` is **forbidden**. Never hard-code it.

---

## 2. Authentication model

- **Provider:** next-auth v4 Credentials provider
- **Session strategy:** JWT
- **Session cookie:** issued by next-auth; `NEXTAUTH_SECRET` required
- **Protected routes:** middleware protects `/portal/:path+` only
- **Public API routes:** all `/api/*` routes except `/api/auth/[...nextauth]` are publicly accessible (no bearer token enforcement at route level). Portal data routes (`/api/projects`, `/api/tickets`) rely on middleware session protection at the page level, not API-level bearer auth.

> **Known gap:** `/api/projects` and `/api/tickets` route handlers do not currently validate the session token themselves. They depend on Next.js middleware blocking unauthenticated page access. If called directly with a valid session cookie, they will execute. Consider adding server-side session validation in these routes.

---

## 3. Common error format

All JSON errors follow this shape:

```json
{
  "error": "Human-readable message",
  "details": [ /* optional, Zod issue array */ ]
}
```

| Status | Meaning |
|--------|---------|
| 400 | Validation error (Zod). `details` contains `error.issues` |
| 500 | Internal server error (database, email provider, unexpected) |

---

## 4. Endpoints

### 4.1 POST /api/contact

Public contact form submission.

**Auth:** None  
**Content-Type:** `application/json`

**Request body:**

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `name` | string | Yes | min 2 chars |
| `email` | string | Yes | valid email format |
| `phone` | string | No | |
| `company` | string | No | |
| `service` | string | No | |
| `message` | string | Yes | min 10 chars |

**Validation:** `contactSchema` from `@/lib/validators`

**Success response:** `201 Created`
```json
{ "success": true }
```

**Error response:** `400 Bad Request` (validation) or `500 Internal Server Error`

**Writes to:** `submissions` table

---

### 4.2 POST /api/careers

Job application submission. Accepts `multipart/form-data`.

**Auth:** None  
**Content-Type:** `multipart/form-data`

**Request body (form fields):**

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `name` | string | Yes | min 2 chars |
| `email` | string | Yes | valid email format |
| `phone` | string | No | |
| `position` | string | Yes | min 2 chars |
| `cover_letter` | string | No | |

**Validation:** `careersSchema` from `@/lib/validators`

**Success response:** `201 Created`
```json
{ "success": true }
```

**Error response:** `400 Bad Request`

**Writes to:** `job_applications` table

> **Note:** `resume_url` is stored as text only. No file upload / S3 integration in v1.

---

### 4.3 POST /api/newsletter

Newsletter subscription.

**Auth:** None  
**Content-Type:** `application/json`

**Request body:**

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `email` | string | Yes | valid email format |

**Validation:** `newsletterSchema` from `@/lib/validators`

**Success response:** `201 Created`
```json
{ "success": true }
```

**Error response:** `400 Bad Request` or `500 Internal Server Error`

**Writes to:** `newsletter_subscriptions` table (upsert: sets `status = 'active'` on conflict)

---

### 4.4 GET /api/csrf

Returns a CSRF token for portal login forms.

**Auth:** None  
**Content-Type:** `application/json`

**Response:** `200 OK`
```json
{ "csrfToken": "<32 hex bytes>" }
```

**Side effects:** Sets `csrfToken` cookie (`httpOnly`, `sameSite: lax`, `secure` in production, `path: /`)

**Used by:** Portal sign-in page (`src/app/portal/page.tsx`)

---

### 4.5 GET /api/health

Health check for uptime monitoring.

**Auth:** None  
**Content-Type:** `application/json`

**Response:** `200 OK`
```json
{ "status": "ok" }
```

**Used by:** Railway healthcheck (`railway.toml`), uptime monitors (TBD)

---

### 4.6 GET/POST /api/projects

Portal-scoped project data.

**Auth:** Protected by middleware (session required for page access)

**GET** — List projects for authenticated user

**Query params:** None

**Success response:** `200 OK`
```json
[
  { "id": 1, "user_id": 2, "name": "...", "status": "...", "progress": 75, ... }
]
```

**POST** — Create project

**Request body:** TBD — schema not yet defined in validators

**Writes to:** `projects` table

> **Gap:** No Zod schema defined for project creation. Request body contract TBD.

---

### 4.7 GET/POST /api/tickets

Portal-scoped support ticket data.

**Auth:** Protected by middleware (session required for page access)

**GET** — List tickets for authenticated user

**POST** — Create ticket

**Request body:** TBD — schema not yet defined in validators

**Writes to:** `tickets` table

> **Gap:** No Zod schema defined for ticket creation. Request body contract TBD.

---

### 4.8 POST/GET /api/auth/[...nextauth]

NextAuth handler (Credentials provider).

**Paths:**
- `GET /api/auth/session` — returns current session
- `POST /api/auth/callback/credentials` — sign in
- `POST /api/auth/signout` — sign out
- `GET /api/auth/csrf` — NextAuth internal CSRF (distinct from custom `/api/csrf`)

**Auth:** None (self-authenticating)

**Known issue:** `pages.signIn` is configured as `/portal/login` which does not exist. Actual sign-in page is `/portal`. This causes redirect loops or 404s on unauthorized access to `/portal/projects` or `/portal/tickets`.

---

## 5. Database access pattern

All route handlers use the shared pattern:

```ts
import { query } from '@/lib/db';
import { someSchema } from '@/lib/validators';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = someSchema.parse(body);
    await query(`INSERT INTO ...`, [values]);
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

- `query()` wraps `pg.Pool`
- Connection string: `DATABASE_URL`
- No transaction support currently
- No connection pooling tuning beyond defaults

---

## 6. Rate limiting

`lib/rate-limit.ts` exists (referenced in PROJECT.md). Verify which endpoints it covers. Currently confirmed applied to:
- Password reset flow (`password_reset_tokens.attempts`)

Not confirmed applied to:
- `/api/contact`
- `/api/careers`
- `/api/newsletter`

> **Recommendation:** Add rate limiting to all public POST endpoints before production launch.

---

## 7. Email (Resend)

Resend is the transactional email provider. No email-sending route handler currently exists in `src/app/api/`. Password reset emails and contact form notifications are not yet wired to Resend.

**Required env var:** `RESEND_API_KEY`

> **Gap:** Email sending logic TBD. Contact form submits to DB but does not send confirmation email.

---

## 8. Versioning & deprecation

- No API versioning strategy yet (v1 is implicit)
- Breaking changes require: new route or query parameter, client coordination, and update to this document
- Deprecation notices should be added here before removing any endpoint
