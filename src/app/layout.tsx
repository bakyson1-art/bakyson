import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientShell from "@/components/ClientShell";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition/page-transition";

const inter = Inter({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: {
    template: "%s | Bakyson",
    default: "Bakyson - Reinvent Your Business With ICT Solutions",
  },
  description:
    "Bakyson is a Design and Build ELV services provider for Sub-Saharan Africa. We provide affordable, cutting-edge ICT solutions for Hospitality, Healthcare, Corporates, and Learning Institutions.",
  keywords: [
    "Bakyson",
    "ICT solutions",
    "ELV services",
    "Sub-Saharan Africa",
    "hospitality technology",
    "healthcare technology",
    "corporate ICT",
    "learning institutions",
    "digital signage",
    "IPTV",
    "access control",
    "video surveillance",
    "network infrastructure",
  ],
  authors: [{ name: "Bakyson" }],
  openGraph: {
    title: "Bakyson - ICT Solutions for Sub-Saharan Africa",
    description:
      "Design and Build ELV services provider for Hospitality, Healthcare, Corporates, and Learning Institutions.",
    type: "website",
    locale: "en",
    siteName: "Bakyson",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bakyson - ICT Solutions for Sub-Saharan Africa",
    description:
      "Design and Build ELV services provider for Hospitality, Healthcare, Corporates, and Learning Institutions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#FF6B00" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Bakyson" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#0A0A0A" />
        {process.env.NEXT_PUBLIC_ANALYTICS_ID && (
          <script
            defer
            data-domain="bakyson.com"
            src="https://plausible.io/js/script.js"
          ></script>
        )}
      </head>
      <body className="bg-background text-foreground font-sans antialiased selection:bg-primary selection:text-foreground-inverse">
        <SkipNavigation />
        <ClientShell />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}

function SkipNavigation() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:rounded-md focus:font-bold"
    >
      Skip to main content
    </a>
  );
}
