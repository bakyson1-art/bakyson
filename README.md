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

| Website | Purpose | Directory | URL |
|---------|---------|-----------|-----|
| **Main site** | Public-facing website (services, portfolio, contact, careers, blog, client portal) | Root (`.`) | `https://bakyson.com` |
| **Admin dashboard** | Backend management for admins & employees | `admin/` | `https://admin.bakyson.com` |

### Main Website (`/`)

The public site includes a **Client Portal** at `/portal` where clients can sign in to view project updates and support tickets.

#### Portal Sign-In

The `/portal` sign-in form is wired to NextAuth. When submitted, it posts credentials to `/api/auth/callback/credentials` and redirects to `/portal` on success.

### Admin Dashboard (`/admin/`)

A completely separate Next.js application with its own `package.json`, routes, and deployment. It connects to the **same** PostgreSQL database and uses the **same** `NEXTAUTH_SECRET` so sessions are compatible.

#### Access

- URL: `https://admin.bakyson.com/login` (dedicated admin login page)
- After signing in, redirected to `https://admin.bakyson.com/dashboard`
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

Both applications share the same database. Apply `database/schema.sql` to provision tables, then create an admin account with `database/seed.sql`:

```bash
psql "$DATABASE_URL" -f database/schema.sql
psql "$DATABASE_URL" -f database/seed.sql
```

### Environment Variables (both apps)

```
NEXTAUTH_URL=https://<your-domain>       # main site URL
NEXTAUTH_ADMIN_URL=https://admin.<your-domain>  # admin site URL
NEXTAUTH_SECRET=<random-secret>          # must match between both apps
DATABASE_URL=<postgres-connection-string> # shared PostgreSQL
RESEND_API_KEY=re_...   # optional; enables ticket status-change email notifications
```

### Running Locally

```bash
# Main site
npm run dev

# Admin dashboard (separate terminal)
cd admin
npm run dev
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
