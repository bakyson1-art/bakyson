"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import SiteNav from "@/components/site-nav";

/**
 * Global site header.
 *
 * The homepage renders its own full-bleed hero shell (BakysonHero) which
 * includes its own logo + navigation. Rendering this header on `/` as well
 * duplicated the brand mark and navigation, so it is hidden on the homepage.
 */
export default function SiteHeader() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
        {/* Full page navigation keeps pages cacheable by the service worker. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo/bakyson-logo.svg"
            alt="Bakyson"
            width={132}
            height={30}
            className="h-6 sm:h-7"
            priority
          />
        </a>
        <SiteNav />
      </div>
    </header>
  );
}
