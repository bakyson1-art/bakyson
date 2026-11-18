import { notFound } from "next/navigation";
import PageTransition from "@/components/PageTransition/page-transition";

const fallbackPosts: Record<string, any> = {
  "smart-hotel-technology-2025": {
    slug: "smart-hotel-technology-2025",
    title: "Smart Hotel Technology Trends Shaping 2025",
    excerpt:
      "Discover how IPTV, digital signage, and smart room controls are transforming guest experiences in African hotels.",
    category: "Hospitality",
    date: "Nov 15, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
    author: "Bakyson Team",
    content: `
      <p>The hospitality industry across Sub-Saharan Africa is undergoing a digital transformation. As guests become more tech-savvy, hotels must adapt by offering seamless, connected experiences that go beyond traditional amenities.</p>
      <h2>Interactive IPTV Systems</h2>
      <p>Modern IPTV solutions allow hotels to deliver personalized content directly to guest rooms. From localized welcome messages to in-room dining options and local tourism information, IPTV transforms the in-room experience.</p>
      <h2>Digital Signage Networks</h2>
      <p>Digital signage in lobbies, conference areas, and hallways provides real-time information, wayfinding, and promotional content. Centralized content management makes it easy to update displays across multiple properties.</p>
      <h2>Smart Room Controls</h2>
      <p>IoT-enabled room controls for lighting, temperature, and curtains give guests unprecedented control over their environment while helping hotels reduce energy consumption.</p>
    `,
  },
  "nurse-call-systems-healthcare": {
    slug: "nurse-call-systems-healthcare",
    title: "Why Nurse Call Systems Are Critical for Modern Hospitals",
    excerpt:
      "Improving patient safety and nurse response times with integrated nurse call and access control systems.",
    category: "Healthcare",
    date: "Oct 28, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1551082805-c58d867987ab?w=1200&q=80",
    author: "Bakyson Team",
    content: `
      <p>Patient safety is the top priority for healthcare facilities. Nurse call systems play a crucial role in ensuring timely response to patient needs, directly impacting care quality and outcomes.</p>
      <h2>Improved Response Times</h2>
      <p>Integrated nurse call systems with staff pagers and centralized monitoring dashboards reduce response times by up to 30%, ensuring patients receive timely assistance.</p>
      <h2>Secure Access Control</h2>
      <p>Biometric and card-based access control at critical areas (ICU, pharmacy, records) ensures only authorized personnel can enter sensitive zones, maintaining compliance with healthcare regulations.</p>
      <h2>Zero Downtime Reliability</h2>
      <p>Modern nurse call systems are built with redundancy and monitoring, achieving zero system downtime in the first 12 months of deployment at our healthcare clients.</p>
    `,
  },
  "structured-cabling-corporate": {
    slug: "structured-cabling-corporate",
    title: "Structured Cabling: The Foundation of Corporate IT",
    excerpt:
      "Why every corporate office in Sub-Saharan Africa needs professional structured cabling for reliable connectivity.",
    category: "Corporate",
    date: "Oct 10, 2024",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
    author: "Bakyson Team",
    content: `
      <p>A corporate network is only as strong as its foundation. Structured cabling provides the standardized, organized infrastructure that supports all voice, data, and video communications across an organization.</p>
      <h2>Enterprise-Grade Performance</h2>
      <p>Professional structured cabling delivers 99.9% network uptime and supports high-speed internet access for hundreds of employees simultaneously.</p>
      <h2>Scalability</h2>
      <p>A well-designed structured cabling system can easily accommodate organizational growth, new technologies, and changing office layouts without major rewiring.</p>
      <h2>Centralized Management</h2>
      <p>Network monitoring and security firewalls integrated into the cabling infrastructure provide centralized visibility and control over the entire network.</p>
    `,
  },
  "green-building-solutions-africa": {
    slug: "green-building-solutions-africa",
    title: "Green Building Solutions for African Schools",
    excerpt:
      "How BMS and GRMS are helping learning institutions reduce energy costs and create smarter campuses.",
    category: "Education",
    date: "Sep 20, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
    author: "Bakyson Team",
    content: `
      <p>Learning institutions across Africa are embracing smart building technologies to reduce energy costs, improve comfort, and create more sustainable campuses.</p>
      <h2>Building Management Systems (BMS)</h2>
      <p>BMS solutions provide centralized control over HVAC, lighting, and other building systems, optimizing energy usage based on occupancy and schedules.</p>
      <h2>Guest Room Management Systems (GRMS)</h2>
      <p>For boarding schools and university residences, GRMS enables room-level control of lighting, temperature, and power, reducing waste and improving student comfort.</p>
      <h2>Energy Monitoring</h2>
      <p>Real-time energy monitoring dashboards help facility managers identify inefficiencies and track progress toward sustainability goals.</p>
    `,
  },
};

export const metadata = {
  title: "Blog Post | Bakyson",
  description: "Industry insights and technology trends from Bakyson.",
};

export async function generateStaticParams() {
  return Object.keys(fallbackPosts).map((slug) => ({ slug }));
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  const post = fallbackPosts[slug];

  if (!post) {
    notFound();
  }

  return (
    <PageTransition>
      <section className="bg-background text-foreground min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider mb-4 block">
              {post.category}
            </span>
            <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight text-foreground mb-6">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-sm text-foreground/60">
              <span>{post.date}</span>
              <span>{post.readTime}</span>
              <span>{post.author}</span>
            </div>
          </div>

          <div className="lg:grid-cols-2 lg:gap-12">
            <div className="lg:col-span-2 prose prose-lg max-w-none text-foreground/90">
              {post.content.split("\n\n").map((block: string, i: number) => {
                if (block.startsWith("<h2>")) {
                  const title = block.replace(/<\/?h2>/g, "");
                  return (
                    <h2 key={i} className="text-2xl font-bold text-foreground mt-12 mb-4">
                      {title}
                    </h2>
                  );
                }
                return <p key={i} className="mb-6 leading-relaxed">{block}</p>;
              })}
            </div>
          </div>

          <div className="mt-16 border-t border-background pt-8 flex items-center justify-between">
            <a
              href="/blog"
              className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary-hover transition-colors"
            >
              ← Back to Blog
            </a>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
