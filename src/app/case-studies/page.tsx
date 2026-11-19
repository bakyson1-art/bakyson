export default function CaseStudiesPage() {
  const studies = [
    {
      title: "Lakeside Regional Hospital – ELV Modernization",
      client: "Lakeside Regional Hospital, Kenya",
      year: "2024",
      summary: "End-to-end ELV modernization for a 200-bed regional hospital, improving safety, compliance and connectivity across clinical and administrative wings.",
      challenge: "Aging infrastructure, unreliable fire alarm coverage, and fragmented CCTV created compliance risk and operational blind spots.",
      solution: "Structured cabling backbone, addressable fire alarm, IP CCTV with VMS, access control for wards, and PA/VA system integrated to nurse call.",
      results: ["99.8% system uptime", "Fire compliance audit passed", "Response time reduced 40%"],
      tags: ["Healthcare", "Fire Alarm", "Network", "CCTV"],
    },
    {
      title: "Nairobi Corporate Campus Security",
      client: "Nairobi Corporate Campus",
      year: "2023",
      summary: "Integrated security and communications across 5 buildings with centralized monitoring and visitor management.",
      challenge: "Multiple vendors, siloed systems, and no single view of premises security.",
      solution: "Unified CCTV + access control + PA system on single network, centralized SOC dashboard, and structured cabling upgrade.",
      results: ["Unified operations dashboard", "Incident response time -35%", "Scalable to 2 additional buildings"],
      tags: ["CCTV", "Access Control", "Public Address"],
    },
    {
      title: "East Africa University Learning Hub",
      client: "East Africa University",
      year: "2025",
      summary: "Structured cabling and campus Wi-Fi design supporting 3,000 concurrent users and hybrid learning labs.",
      challenge: "Legacy copper, bandwidth contention, and poor coverage in lecture halls and labs.",
      solution: "Cat6A horizontal cabling, fiber backbone, Wi-Fi 6 access points, and network monitoring with QoS for video streaming.",
      results: ["3,200 concurrent users supported", "Latency <15ms", "Zero downtime during exams"],
      tags: ["Structured Cabling", "Network Solutions", "Education"],
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
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-xl">{s.title}</h2>
                <span className="text-xs text-muted-foreground">{s.year}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{s.client}</p>
              <p className="mt-3 text-muted-foreground">{s.summary}</p>
              <div className="mt-4 space-y-2 text-sm">
                <p><strong>Challenge:</strong> {s.challenge}</p>
                <p><strong>Solution:</strong> {s.solution}</p>
                <p><strong>Results:</strong></p>
                <ul className="list-disc ml-5">
                  {s.results.map(r => <li key={r}>{r}</li>)}
                </ul>
              </div>
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
