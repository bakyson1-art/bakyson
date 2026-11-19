import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteNav from "@/components/site-nav";

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
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-primary text-primary-foreground px-4 py-2 rounded-md">Skip to content</a>
        <header className="sticky top-0 z-40 border-b border-border bg-white/80 backdrop-blur">
          <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
            <a href="/" className="font-semibold text-lg">Bakyson</a>
            <SiteNav />
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
