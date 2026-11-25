import type { Metadata } from "next";
import { WifiOff } from "lucide-react";

export const metadata: Metadata = {
  title: "Offline | Bakyson",
  description: "You are currently offline. Saved Bakyson pages are still available.",
  robots: { index: false, follow: false },
};

const savedPages = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
  { href: "/support", label: "Support" },
  { href: "/quote", label: "Get a Quote" },
];

export default function OfflinePage() {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-2xl flex-col items-center justify-center px-4 py-16 text-center">
      <span className="rounded-2xl bg-muted p-4">
        <WifiOff className="h-8 w-8 text-primary" aria-hidden="true" />
      </span>

      <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">You&apos;re offline</h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
        This page hasn&apos;t been saved on your device yet. Pages you visited before are still
        available, and the site will reconnect automatically when you&apos;re back online.
      </p>

      {/* A full navigation lets the service worker serve the cached page offline. */}
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a
        href="/"
        className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 font-medium text-white transition hover:bg-orange-700"
      >
        Try again
      </a>

      <section className="mt-12 w-full border-t border-border pt-8" aria-labelledby="saved-pages-heading">
        <h2 id="saved-pages-heading" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Saved pages
        </h2>
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {savedPages.map((page) => (
            <li key={page.href}>
              <a
                href={page.href}
                className="block rounded-lg border border-border bg-white px-4 py-3 text-sm font-medium transition hover:border-primary hover:text-primary"
              >
                {page.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-8 text-xs text-muted-foreground">
        Forms and the client portal need a connection.
      </p>
    </div>
  );
}
