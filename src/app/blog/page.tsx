import Link from "next/link";
import { Calendar, Clock, User, Tag, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Blog",
  description:
    "Bakyson blog — insights on ICT trends, smart building technology, and industry news for Hospitality, Healthcare, Corporates, and Learning Institutions.",
};

const posts = [
  {
    slug: "smart-hotel-technology-2025",
    title: "Smart Hotel Technology Trends Shaping 2025",
    excerpt:
      "Discover how IPTV, digital signage, and smart room controls are transforming guest experiences in African hotels.",
    category: "Hospitality",
    date: "Nov 15, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    author: "Bakyson Team",
  },
  {
    slug: "nurse-call-systems-healthcare",
    title: "Why Nurse Call Systems Are Critical for Modern Hospitals",
    excerpt:
      "Improving patient safety and nurse response times with integrated nurse call and access control systems.",
    category: "Healthcare",
    date: "Oct 28, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1551082805-c58d867987ab?w=800&q=80",
    author: "Bakyson Team",
  },
  {
    slug: "structured-cabling-corporate",
    title: "Structured Cabling: The Foundation of Corporate IT",
    excerpt:
      "Why every corporate office in Sub-Saharan Africa needs professional structured cabling for reliable connectivity.",
    category: "Corporate",
    date: "Oct 10, 2024",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    author: "Bakyson Team",
  },
  {
    slug: "green-building-solutions-africa",
    title: "Green Building Solutions for African Schools",
    excerpt:
      "How BMS and GRMS are helping learning institutions reduce energy costs and create smarter campuses.",
    category: "Education",
    date: "Sep 20, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    author: "Bakyson Team",
  },
];

export default function BlogPage() {
  return (
    <div className="bg-bakyson-white">
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-bakyson-orange rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-bakyson-orange font-bold text-sm uppercase tracking-wider inline-block mb-4">
            Bakyson Insights
          </span>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-bakyson-black leading-tight mb-6">
            Industry Insights &<br />
            Technology Trends
          </h1>
          <p className="text-bakyson-black/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Stay updated on the latest in ICT solutions, smart building
            technology, and industry news across Sub-Saharan Africa.
          </p>
        </div>
      </section>

      <section className="py-20 bg-bakyson-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group rounded-2xl overflow-hidden bg-white border border-black/10 hover:shadow-xl hover:border-bakyson-orange/50 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 backdrop-blur text-xs font-bold text-bakyson-black uppercase tracking-wider">
                    {post.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-bakyson-black/60 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {post.author}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-bakyson-black mb-2 group-hover:text-bakyson-orange transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-bakyson-black/60 text-sm leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-bakyson-orange font-bold text-sm hover:text-bakyson-orange-dark transition-colors"
                  >
                    Read article <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-bakyson-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-bakyson-orange rounded-2xl p-8 lg:p-16 text-center shadow-2xl shadow-orange/25 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-bakyson-black" />
            <span className="text-bakyson-black font-bold text-sm uppercase tracking-wider">
              Stay Updated
            </span>
            <h2 className="text-3xl font-bold text-bakyson-black mt-2 mb-6">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-bakyson-black/80 text-lg max-w-xl mx-auto mb-8">
              Get the latest ICT insights, project updates, and industry news delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl border border-bakyson-black/30 text-bakyson-black focus:ring-2 focus:ring-bakyson-orange focus:border-bakyson-orange outline-none"
              />
              <button
                type="button"
                className="bg-bakyson-black text-bakyson-orange px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-bakyson-black transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
