import { notFound } from "next/navigation";
import { query } from "@/lib/db";
import PageTransition from "@/components/PageTransition/page-transition";

const fallbackCaseStudies: Record<string, any> = {
  "jw-marriott-nairobi": {
    id: "jw-marriott-nairobi",
    title: "JW Marriott Nairobi",
    location: "Nairobi, Kenya",
    sector: "Hospitality",
    solution: "Interactive IPTV & Digital Signage",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
    client: "JW Marriott",
    challenge:
      "The hotel needed a modern in-room entertainment system that could deliver localized content, hotel information, and branding across 200+ guest rooms and public areas.",
    solutionDesc:
      "We deployed a full Interactive IPTV system with digital signage integration. Each guest room now receives personalized welcome messages, in-room dining options, and local tourism information through a centralized content management system.",
    results: [
      "95% guest satisfaction with in-room entertainment",
      "40% reduction in printed collateral costs",
      "Real-time content updates across all screens",
      "Seamless integration with existing property management system",
    ],
    duration: "8 weeks",
    teamSize: 6,
    date: "March 2024",
  },
  "aga-khan-kisumu": {
    id: "aga-khan-kisumu",
    title: "Aga Khan University Hospital Kisumu",
    location: "Kisumu, Kenya",
    sector: "Healthcare",
    solution: "Nurse Call & Access Control",
    image: "https://images.unsplash.com/photo-1551082805-c58d867987ab?w=1200&q=80",
    client: "Aga Khan University Hospital",
    challenge:
      "The hospital required a reliable nurse call system and secure access control for sensitive areas including the ICU, pharmacy, and records department.",
    solutionDesc:
      "We installed a wireless nurse call system integrated with staff pagers and a centralized monitoring dashboard. Access control with biometric and card-based entry was deployed at all critical access points.",
    results: [
      "30% faster nurse response times",
      "100% access audit trail for sensitive areas",
      "HIPAA-compliant data handling",
      "Zero system downtime in first 12 months",
    ],
    duration: "12 weeks",
    teamSize: 8,
    date: "June 2024",
  },
  "african-reagent-accra": {
    id: "african-reagent-accra",
    title: "African Reagent Accra",
    location: "Accra, Ghana",
    sector: "Corporate",
    solution: "Network Infrastructure & HSIA",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
    client: "African Reagent",
    challenge:
      "The corporate office needed enterprise-grade network infrastructure with high-speed internet access for 150+ employees and visiting clients.",
    solutionDesc:
      "We designed and deployed a complete structured cabling system with HSIA, enterprise Wi-Fi, and redundant network core. The solution includes network monitoring and security firewall.",
    results: [
      "99.9% network uptime SLA met",
      "2x faster internet speeds for employees",
      "Centralized network management dashboard",
      "Scalable infrastructure for future growth",
    ],
    duration: "6 weeks",
    teamSize: 4,
    date: "September 2024",
  },
  "hilton-accra": {
    id: "hilton-accra",
    title: "Hilton Accra Cantonments",
    location: "Accra, Ghana",
    sector: "Hospitality",
    solution: "Audio Visual & Meeting Rooms",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?w=1200&q=80",
    client: "Hilton Accra Cantonments",
    challenge:
      "The hotel needed modern audio-visual systems for their conference and meeting rooms to support corporate events and international meetings.",
    solutionDesc:
      "We equipped 6 meeting rooms with video conferencing systems, wireless presentation, professional audio, and automated lighting control. All rooms integrate with the hotel's booking system.",
    results: [
      "50% increase in meeting room bookings",
      "Wireless presentation in all rooms",
      "One-touch meeting start system",
      "Professional-grade audio for hybrid meetings",
    ],
    duration: "10 weeks",
    teamSize: 5,
    date: "November 2024",
  },
};

export const metadata = {
  title: "Case Study | Bakyson",
  description: "Detailed project story from Bakyson's ICT solutions portfolio.",
};

export async function generateStaticParams() {
  return Object.keys(fallbackCaseStudies).map((slug) => ({ slug }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  let study = fallbackCaseStudies[slug];

  // Try to fetch from database if available
  try {
    const result = await query(
      `SELECT * FROM submissions WHERE id = $1 OR name ILIKE $2 LIMIT 1`,
      [slug, `%${slug}%`]
    );
    if (result.rows.length > 0) {
      study = result.rows[0];
    }
  } catch {
    // Database not available, use fallback
  }

  if (!study) {
    notFound();
  }

  return (
    <PageTransition>
      <section className="bg-background text-foreground min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider mb-4 block">
              {study.sector}
            </span>
            <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight text-foreground mb-6">
              {study.title}
            </h1>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto leading-relaxed">
              {study.solution}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-background">
              <img
                src={study.image}
                alt={study.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">The Challenge</h2>
                <p className="text-foreground/70 leading-relaxed">
                  {study.challenge}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Our Solution</h2>
                <p className="text-foreground/70 leading-relaxed">
                  {study.solutionDesc}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Results</h2>
                <ul className="space-y-3 text-foreground/70 leading-relaxed">
                  {study.results.map((result: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-surface rounded-2xl p-6 border border-border">
                <h3 className="text-lg font-bold text-foreground mb-4">Project Details</h3>
                <dl className="space-y-4 text-sm text-foreground/60">
                  <div className="flex justify-between">
                    <dt className="font-medium text-foreground">Client</dt>
                    <dd>{study.client}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-foreground">Location</dt>
                    <dd>{study.location}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-foreground">Duration</dt>
                    <dd>{study.duration}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-foreground">Team Size</dt>
                    <dd>{study.teamSize} experts</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-foreground">Date</dt>
                    <dd>{study.date}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <a
              href="/case-studies"
              className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary-hover transition-colors"
            >
              ← Back to Case Studies
            </a>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
