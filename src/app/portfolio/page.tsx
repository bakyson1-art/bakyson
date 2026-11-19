export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="mx-auto max-w-4xl px-6 py-24">
        <h1 className="text-4xl font-bold">Portfolio</h1>
        <p className="mt-6 text-muted-foreground">Selected projects across Africa.</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {["Hotel CCTV Upgrade", "Hospital Fire Alarm", "University Network", "Corporate Office ELV"].map(p => (
            <div key={p} className="rounded-xl border border-border p-6">{p}</div>
          ))}
        </div>
      </section>
    </div>
  );
}
