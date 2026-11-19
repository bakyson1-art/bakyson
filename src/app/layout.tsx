import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bakyson - Cutting-Edge ICT Solutions",
  description: "Design and Build ELV services provider for Sub-Saharan Africa. Affordable, cutting-edge ICT solutions.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const nav = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/blog", label: "Blog" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
    { href: "/portal", label: "Portal" },
  ];

  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-primary text-primary-foreground px-4 py-2 rounded-md">Skip to content</a>
        <header className="sticky top-0 z-40 border-b border-border bg-white/80 backdrop-blur">
          <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
            <a href="/" className="font-semibold text-lg">Bakyson</a>
            <nav className="hidden md:flex gap-6 text-sm" aria-label="Primary">
              {nav.map((item) => (
                <a key={item.href} href={item.href} className="hover:text-primary transition">
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </header>
        <main id="main-content" className="flex-1">{children}</main>
        <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
          © 2026 Bakyson. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
