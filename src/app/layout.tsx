import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteNav from "@/components/site-nav";
import PwaStatus from "@/components/pwa-status";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bakyson - Cutting-Edge ICT Solutions",
  description: "Design and Build ELV services provider for Sub-Saharan Africa. Affordable, cutting-edge ICT solutions.",
  metadataBase: new URL("https://bakyson.vercel.app"),
  applicationName: "Bakyson",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
    title: "Bakyson",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: "Bakyson - Cutting-Edge ICT Solutions",
    description: "Design and Build ELV services provider for Sub-Saharan Africa.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bakyson - Cutting-Edge ICT Solutions",
    description: "Design and Build ELV services provider for Sub-Saharan Africa.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#FF6B00",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        {/* Required for standalone mode on older iOS versions. */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-primary text-primary-foreground px-4 py-2 rounded-md">Skip to content</a>
        <header className="sticky top-0 z-40 border-b border-border bg-white/80 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
            {/* Full page navigation keeps pages cacheable by the service worker. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/" className="font-semibold text-lg sm:text-xl">Bakyson</a>
            <SiteNav />
          </div>
        </header>
        <main id="main-content" className="flex-1">{children}</main>
        <footer className="border-t border-border py-6 sm:py-8 text-center text-xs sm:text-sm text-muted-foreground">
          © 2026 Bakyson. All rights reserved.
        </footer>
        <PwaStatus />
      </body>
    </html>
  );
}
