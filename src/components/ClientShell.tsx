"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
  { name: "Client Portal", href: "/portal/login" },
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
    <nav className="sticky top-0 z-50 bg-bakyson-white/95 backdrop-blur-md border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 orange-gradient rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
              B
            </div>
            <span className="font-extrabold text-xl tracking-tight text-bakyson-black italic">
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
                    ? "text-bakyson-orange font-bold"
                    : "text-bakyson-black/70 hover:text-bakyson-orange"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/portal/login"
              className="bg-bakyson-orange text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-bakyson-orange-dark transition-colors shadow-lg shadow-orange/20 hover:shadow-orange/40"
            >
              Client Portal
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-bakyson-black"
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
        <div className="md:hidden bg-bakyson-white border-b border-black/10">
          <div className="px-4 py-4 space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 text-sm font-medium transition-colors ${
                  link.name === "Client Portal"
                    ? "text-bakyson-orange font-bold bg-bakyson-orange/10"
                    : "text-bakyson-black/70 hover:bg-black/5 hover:text-bakyson-orange"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/portal/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-center bg-bakyson-orange text-white px-4 py-3 rounded-lg font-bold hover:bg-bakyson-orange-dark transition-colors"
            >
              Client Portal
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
