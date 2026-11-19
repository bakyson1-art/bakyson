export default function CaseStudiesPage() {
  const studies = [
    {
      title: "Hospital ELV Upgrade",
      summary: "End-to-end ELV modernization for a 200-bed regional hospital, improving safety and connectivity.",
      tags: ["Healthcare", "Fire Alarm", "Network"],
    },
    {
      title: "Corporate Campus Security",
      summary: "Integrated CCTV and access control across 5 buildings with centralized monitoring.",
      tags: ["CCTV", "Access Control", "Public Address"],
    },
    {
      title: "University Learning Hub",
      summary: "Structured cabling and Wi-Fi design supporting 3,000 concurrent users.",
      tags: ["Structured Cabling", "Network Solutions"],
    },
  ];

  return (
    <div className="min-h-screen bg-white text-foreground">
      <section className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">Case Studies</h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-3xl">
          Real projects delivering reliable ICT infrastructure for hospitality, healthcare, corporates and education across Sub-Saharan Africa.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studies.map((s) => (
            <article key={s.title} className="rounded-xl border border-border p-6 hover:shadow-md transition">
              <h2 className="font-semibold text-xl">{s.title}</h2>
              <p className="mt-3 text-muted-foreground">{s.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span key={t} className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
