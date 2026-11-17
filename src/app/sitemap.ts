import { MetadataRoute } from "next";

const siteUrl = "https://bakyson.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/case-studies",
    "/blog",
    "/careers",
    "/contact",
    "/portal/login",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.8,
  }));

  const caseStudyRoutes = [
    "jw-marriott-nairobi",
    "aga-khan-kisumu",
    "african-reagent-accra",
    "hilton-accra",
  ].map((slug) => ({
    url: `${siteUrl}/case-studies/${slug}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogRoutes = [
    "smart-hotel-technology-2025",
    "nurse-call-systems-healthcare",
    "structured-cabling-corporate",
    "green-building-solutions-africa",
  ].map((slug) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...pages, ...caseStudyRoutes, ...blogRoutes];
}
