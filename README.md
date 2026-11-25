This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Architecture: Two Separate Websites

Bakyson is split into two separate Next.js applications that share the same PostgreSQL database:

| Website | Purpose | Repository | URL |
|---------|---------|------------|-----|
| **Main site** | Public-facing website (services, portfolio, contact, careers, blog, client portal) | [`bakyson1-art/bakyson`](https://github.com/bakyson1-art/bakyson) | `https://<main-site-url>` |
| **Admin dashboard** | Backend management for admins & employees | [`bakyson1-art/bakyson-admin`](https://github.com/bakyson1-art/bakyson-admin) | `https://<admin-site-url>` |

The two apps live in **separate GitHub repositories** and deploy as two independent
services. They share one PostgreSQL database and one `NEXTAUTH_SECRET`.

### Main Website (`/`)

The public site includes a **Client Portal** at `/portal` where clients can sign in to view project updates and support tickets.

#### Portal Sign-In

The `/portal` page is the public sign-in screen. It fetches a CSRF token from
`/api/auth/csrf`, posts credentials to `/api/auth/callback/credentials`, then shows
the signed-in state with a sign-out button. Only routes *below* `/portal` (e.g.
`/portal/projects`) are protected by middleware, so the sign-in page itself stays
reachable.

### Admin Dashboard (separate repository)

A completely separate Next.js application in its own repo:
**[bakyson1-art/bakyson-admin](https://github.com/bakyson1-art/bakyson-admin)**.
It connects to the **same** PostgreSQL database and uses the **same**
`NEXTAUTH_SECRET`. See that repo's README for its setup and deployment steps.

#### Access

- URL: `https://<admin-site-url>/login` (dedicated admin login page)
- After signing in, redirected to `https://<admin-site-url>/dashboard`
- Middleware protects all routes under `/dashboard`; `/login` and `/` are public
- Only users with role `admin` or `employee` can access the dashboard
- `/dashboard/users` and `/dashboard/activity-logs` are `admin`-only

#### Roles

| Role | Can do |
|------|--------|
| `admin` | Full access: manage users (create, change role, delete), projects, tickets, submissions, job applications, newsletter subscribers, settings, activity log |
| `employee` | View and update projects/tickets, no user management or activity log |
| `user` | No admin access |

#### Features

- **Dashboard** — overview stats (users, projects, tickets, submissions), recent tickets, and recent staff activity
- **Users** — create staff accounts, change roles, delete users
- **Projects** — create, update status and progress, delete projects
- **Tickets** — update support ticket status; customers are notified by email when a ticket status changes (requires `RESEND_API_KEY`)
- **Submissions** — review and delete contact-form submissions
- **Job Applications** — track application status, download resumes
- **Newsletter** — manage subscribers
- **Activity Log** — audit trail of every admin action (who, what, when)
- **Settings** — change your password

### Database

Both applications share the same database. Railway's Postgres service has no SQL
editor, so use the setup script instead of `psql`. Run it from this repo against
the **public** connection URL (Railway: Postgres service -> Connect -> Public
Network):

```powershell
$env:DATABASE_URL="postgresql://postgres:PASSWORD@HOST.proxy.rlwy.net:PORT/railway"
$env:ADMIN_EMAIL="you@yourcompany.com"
$env:ADMIN_PASSWORD="a-strong-password"
node scripts/db-setup.mjs
```

It applies `database/schema.sql` (idempotent), then creates the admin account, or
resets its password if that email already exists. Re-running is safe.
Add `--schema-only` to skip the admin account.

### Environment Variables

Main site:

```
NEXTAUTH_URL=https://<main-site-url>        # this app's public URL
NEXTAUTH_SECRET=<random-secret>             # must match the admin app
DATABASE_URL=<postgres-connection-string>   # shared PostgreSQL
RESEND_API_KEY=re_...                       # optional; ticket status emails
NEXT_PUBLIC_ADMIN_URL=https://<admin-site-url>  # staff "Admin Dashboard" link
```

Admin app (see its repo):

```
NEXTAUTH_URL=https://<admin-site-url>       # the ADMIN app's public URL
NEXTAUTH_SECRET=<same value as above>
DATABASE_URL=<same database>
RESEND_API_KEY=re_...                       # required for password reset emails
RESEND_FROM=Bakyson <no-reply@yourdomain>   # verified sender in Resend
```

`NEXTAUTH_URL` must be the URL of the app it is set in - do not share one value
between the two services.

### Running Locally

```bash
# Main site (this repo)
npm run dev

# Admin dashboard (separate repo, separate terminal)
git clone https://github.com/bakyson1-art/bakyson-admin
cd bakyson-admin
npm install
npm run dev -- -p 3001
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
