export default function ServicesPage() {
  const services = [
    "Structured Cabling",
    "CCTV & Video Surveillance",
    "Access Control",
    "Fire Alarm Systems",
    "Public Address & Voice Evacuation",
    "Network Design & Support",
    "Data Center Solutions",
    "Smart Building Integration",
  ];
  return (
    <div className="min-h-screen bg-white">
      <section className="mx-auto max-w-4xl px-6 py-24">
        <h1 className="text-4xl font-bold">Services</h1>
        <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map(s => (
            <li key={s} className="rounded-lg border border-border p-4">{s}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
