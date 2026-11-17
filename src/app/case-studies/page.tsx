import Link from "next/link";
import { ArrowRight, MapPin, Clock, Users, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Case Studies",
  description:
    "Bakyson case studies — detailed project stories across Hospitality, Healthcare, Corporates, and Learning Institutions in Sub-Saharan Africa.",
};

const caseStudies = [
  {
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
  {
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
  {
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
  {
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
];

export default function CaseStudiesPage() {
  return (
    <div className="bg-bakyson-white">
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-bakyson-orange rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-bakyson-orange font-bold text-sm uppercase tracking-wider inline-block mb-4">
            Case Studies
          </span>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-bakyson-black leading-tight mb-6">
            Proven Impact Across<br />
            the Continent
          </h1>
          <p className="text-bakyson-black/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Real stories from real clients. See how Bakyson's ICT solutions
            have transformed businesses across Sub-Saharan Africa.
          </p>
        </div>
      </section>

      <section className="py-20 bg-bakyson-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {caseStudies.map((study) => (
              <article
                key={study.id}
                className="group relative rounded-2xl overflow-hidden bg-white border border-black/10 hover:shadow-xl hover:border-bakyson-orange/50 transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-bakyson-black/40" />
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 backdrop-blur text-xs font-bold text-bakyson-black uppercase tracking-wider">
                    {study.sector}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-bakyson-orange uppercase tracking-wider">
                      {study.sector}
                    </span>
                    <Link
                      href={`/case-studies/${study.id}`}
                      className="text-xs font-bold text-bakyson-black hover:text-bakyson-orange transition-colors"
                    >
                      Read story <ArrowRight className="w-3 h-3 ml-1" />
                    </Link>
                  </div>
                  <h3 className="text-xl font-bold text-bakyson-black mb-2 group-hover:text-bakyson-orange transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {study.location}
                  </p>
                  <div className="flex items-center justify-between text-xs text-bakyson-black/60">
                    <span>
                      <Clock className="w-3 h-3 mr-1" />
                      {study.duration}
                    </span>
                    <span>
                      <Users className="w-3 h-3 mr-1" />
                      {study.teamSize} experts
                    </span>
                  </div>
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
              Ready for Your Success Story?
            </span>
            <h2 className="text-3xl font-bold text-bakyson-black mt-2 mb-6">
              Let's Build Your Next Project
            </h2>
            <p className="text-bakyson-black/80 text-lg max-w-xl mx-auto mb-8">
              Whether it's a hotel, hospital, corporate office, or school —
              we'll design and build the ICT solution that fits your needs.
            </p>
            <Link
              href="/contact"
              className="bg-bakyson-black text-bakyson-orange px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-bakyson-black transition-all shadow-lg"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
