export default function BlogPage() {
  const posts = [
    {
      title: "Designing Resilient Networks for Healthcare",
      excerpt: "Key considerations for uptime, redundancy and compliance in hospital networks.",
      date: "2026-11-01",
    },
    {
      title: "CCTV Best Practices for Hospitality",
      excerpt: "Balancing guest privacy with security coverage in hotels and resorts.",
      date: "2026-10-18",
    },
    {
      title: "Fire Alarm Integration with Building Management",
      excerpt: "How integrated systems improve response times and safety outcomes.",
      date: "2026-09-30",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-foreground">
      <section className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">Blog</h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-3xl">
          Insights on ELV design, security, network best practices and technology trends for Sub-Saharan Africa.
        </p>

        <div className="mt-12 divide-y divide-border">
          {posts.map((p) => (
            <article key={p.title} className="py-8">
              <time className="text-sm text-muted-foreground">{p.date}</time>
              <h2 className="mt-2 text-2xl font-semibold">{p.title}</h2>
              <p className="mt-2 text-muted-foreground">{p.excerpt}</p>
              <a href="#" className="mt-4 inline-flex font-medium text-primary hover:underline">
                Read article
              </a>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
