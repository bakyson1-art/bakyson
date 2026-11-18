"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import LiveChatWidget from "@/components/LiveChatWidget";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Blog", href: "/blog" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

export default function ClientShell() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <Navbar
        links={NAV_LINKS}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <LiveChatWidget />
    </>
  );
}

function Navbar({
  links,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: {
  links: { name: string; href: string }[];
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}) {
  return (
    <nav
      className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border border-border focus-within:border-border"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2" aria-label="Bakyson Home">
            <svg
              className="size-10 text-primary-foreground"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Bakyson logo"
            >
              <rect width="24" height="24" fill="currentColor" rx="4" />
              <path
                d="M8 8L8 16L12 16L12 8"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-heading font-extrabold text-xl tracking-tight text-foreground italic">
              Bakyson
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  link.name === "Client Portal"
                    ? "text-primary font-bold"
                    : "text-foreground/70 hover:text-primary"
                }`}
                aria-current={link.href === "/" ? "page" : undefined}
              >
                {link.name}
              </Link>
            ))}
            <Button
              asChild
              variant="primary"
              size="sm"
              className="shadow-lg shadow-primary hover:shadow-primary"
            >
              <Link href="/portal/login">Client Portal</Link>
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-foreground p-2 rounded-md hover:bg-surface-hover hover:text-primary"
              aria-label="Open menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="px-4 py-4 space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-sm font-medium transition-colors text-foreground/70 hover:bg-surface-hover hover:text-primary"
              >
                {link.name}
              </Link>
            ))}
            <Button asChild variant="primary" size="sm" className="w-full shadow-lg shadow-primary">
              <Link href="/portal/login">Client Portal</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
