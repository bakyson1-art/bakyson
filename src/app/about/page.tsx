export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="mx-auto max-w-4xl px-6 py-24">
        <h1 className="text-4xl font-bold">About Bakyson</h1>
        <p className="mt-6 text-lg text-muted-foreground">
          We design and build intelligent ICT solutions across Sub-Saharan Africa. From structured cabling to integrated security, we deliver reliable infrastructure that powers hospitality, healthcare, corporates and education.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Our Mission", desc: "Enable digital transformation through affordable, cutting-edge ICT." },
            { title: "Our Vision", desc: "Be the trusted partner for intelligent building systems." },
            { title: "Our Values", desc: "Integrity, innovation, reliability, and customer focus." },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-border p-6">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-2 text-muted-foreground text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
