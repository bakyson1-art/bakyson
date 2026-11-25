import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Bakyson — Cutting-Edge ICT Solutions",
    short_name: "Bakyson",
    description:
      "Design and build ELV and ICT infrastructure for hospitality, healthcare, corporate and education across Sub-Saharan Africa.",
    lang: "en",
    dir: "ltr",
    start_url: "/",
    scope: "/",
    display: "standalone",
    display_override: ["standalone", "minimal-ui"],
    background_color: "#FFFFFF",
    theme_color: "#FF6B00",
    categories: ["business", "productivity", "utilities"],
    prefer_related_applications: false,
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Get a Quote",
        short_name: "Quote",
        description: "Request a project quote from Bakyson.",
        url: "/quote",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
      },
      {
        name: "Contact Us",
        short_name: "Contact",
        description: "Talk to the Bakyson team.",
        url: "/contact",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
      },
      {
        name: "Support",
        short_name: "Support",
        description: "Log a support request.",
        url: "/support",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
      },
      {
        name: "Client Portal",
        short_name: "Portal",
        description: "Sign in to the Bakyson client portal.",
        url: "/portal",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
      },
    ],
  };
}
