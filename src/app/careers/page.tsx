export default function CareersPage() {
  const roles = [
    {
      title: "ICT Project Engineer",
      location: "Nairobi, Kenya",
      type: "Full-time",
    },
    {
      title: "CCTV & Security Technician",
      location: "Remote / Field",
      type: "Full-time",
    },
    {
      title: "Network Solutions Consultant",
      location: "Kampala, Uganda",
      type: "Contract",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-foreground">
      <section className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">Careers</h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-3xl">
          Join Bakyson and help build reliable ICT infrastructure across Sub-Saharan Africa. We value innovation, craftsmanship and client focus.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((r) => (
            <div key={r.title} className="rounded-xl border border-border p-6 hover:shadow-md transition">
              <h2 className="font-semibold text-xl">{r.title}</h2>
              <p className="mt-2 text-muted-foreground">{r.location} • {r.type}</p>
              <a href="/contact" className="mt-4 inline-flex items-center justify-center rounded-md bg-primary text-white px-4 py-2 font-medium">
                Apply
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
