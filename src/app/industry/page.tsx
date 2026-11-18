import Link from "next/link";

const industries = [
  {
    name: "Hospitality",
    description:
      "Hotels, resorts, and lodges — IPTV, digital signage, AV, HSIA, unified communication.",
    icon: "🏨",
  },
  {
    name: "Healthcare",
    description:
      "Hospitals, clinics, and medical centers — nurse call, access control, fire evacuation.",
    icon: "🏥",
  },
  {
    name: "Corporates",
    description:
      "Offices and headquarters — network infrastructure, AV, access control, structured cabling.",
    icon: "🏢",
  },
  {
    name: "Learning Institutions",
    description:
      "Schools and universities — interactive screens, digital displays, BMS/GRMS.",
    icon: "🏫",
  },
  {
    name: "Events & Stadia",
    description:
      "Digital signage, HSIA, unified communication for events and stadiums.",
    icon: "🏟️",
  },
  {
    name: "Telcos & ISPs",
    description:
      "Network infrastructure for telecommunications and internet service providers.",
    icon: "📡",
  },
];

export const metadata = {
  title: "Industries | Bakyson",
  description: "ICT solutions for Hospitality, Healthcare, Corporates, Learning Institutions, Events & Stadia, and Telcos & ISPs.",
};

export default function IndustryPage() {
  return (
    <section className="bg-background text-foreground min-h-screen py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-12">
          <Link
            href="/"
            className="text-sm text-foreground/60 hover:text-primary transition-colors"
          >
            ← Back to Home
          </Link>
        </nav>

        <h1 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-8">
          Industries We Serve
        </h1>
        <p className="text-foreground/70 text-lg mb-16 max-w-2xl">
          Bakyson delivers tailored ICT solutions across key sectors throughout
          Sub-Saharan Africa. From luxury hotels in Nairobi to hospitals in
          Kisumu, we design and build the systems that power modern
          organizations.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {industries.map((ind) => (
            <div
              key={ind.name}
              className="p-8 rounded-2xl bg-background border border-border hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <span className="text-3xl">{ind.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{ind.name}</h3>
              <p className="text-foreground/60 text-sm leading-relaxed">
                {ind.description}
              </p>
              <Link
                href="/services"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-hover transition-colors"
              >
                Explore Solutions <span className="text-xs">→</span>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary text-background px-8 py-4 rounded-xl font-bold hover:bg-primary-hover transition-colors shadow-lg shadow-primary/25"
          >
            Get a Free Quote <span className="text-xs">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
