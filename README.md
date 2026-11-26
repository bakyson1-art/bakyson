# Bakyson

> **Agents: read [`PROJECT.md`](./PROJECT.md) first.** It contains the full
> context, constraints, hero specification, issue log, and open decisions.

Bakyson - ICT Solutions website redesign for Sub-Saharan Africa

- Public website with services, portfolio, contact, careers, blog, and client portal
- Shared PostgreSQL database with admin dashboard
- Deployed on Vercel with Railway database
- Installable PWA with offline access to the public pages

## PWA

- `src/app/manifest.ts` generates `/manifest.webmanifest` (name, icons, shortcuts).
- `public/sw.js` precaches the public pages and their build assets, serves navigations
  network-first with a cache fallback, and falls back to `/offline`.
- The service worker is registered in production only by
  `src/components/pwa-status.tsx`, which also shows the offline and update banners.
- Run `npm run icons` after changing the brand mark; it regenerates the icons in
  `public/icons` and `src/app/favicon.ico` from one vector source.
- Bump `CACHE_VERSION` in `public/sw.js` whenever the precache list or caching logic
  changes so installed clients pick up the new assets.

Test offline behaviour with a production build (`npm run build && npm start`), then
toggle **Offline** in the browser devtools Network panel.

Deployed via CI/CD pipeline.