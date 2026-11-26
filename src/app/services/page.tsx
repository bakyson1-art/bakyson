import {
  Tv,
  Wifi,
  Video,
  ShieldCheck,
  Leaf,
  Server,
  Check,
} from "lucide-react";

const services = [
  {
    id: "infotainment",
    title: "Infotainment",
    icon: Tv,
    color: "bg-blue-50 text-blue-600 border-blue-100",
    iconColor: "text-blue-600",
    description:
      "Guest-facing entertainment and information systems that transform the visitor experience in hotels, resorts, and public spaces.",
    features: [
      "Interactive IPTV with live TV and video-on-demand",
      "Digital signage for lobbies and common areas",
      "Guest room management and in-room controls",
      "Express check-out integrated with PMS",
      "View bill and in-room service ordering from room TV",
    ],
    industries: ["Hospitality", "Corporate", "Healthcare"],
  },
  {
    id: "networks",
    title: "Networks & Communication",
    icon: Wifi,
    color: "bg-indigo-50 text-indigo-600 border-indigo-100",
    iconColor: "text-indigo-600",
    description:
      "Enterprise-grade connectivity infrastructure — from high-speed guest Wi-Fi to structured cabling and IP telephony.",
    features: [
      "HSIA (High-Speed Internet Access) with guest authentication",
      "Structured cabling (Cat5e, Cat6, Cat6A, fibre)",
      "Network switches, access points, and rack systems",
      "IP telephony and VoIP solutions",
      "Network monitoring and management",
    ],
    industries: ["Hospitality", "Corporate", "Education", "Mining & Telcos"],
  },
  {
    id: "audio-visual",
    title: "Audio Visual",
    icon: Video,
    color: "bg-purple-50 text-purple-600 border-purple-100",
    iconColor: "text-purple-600",
    description:
      "Professional AV integration for meeting rooms, boardrooms, events, and public spaces — combining premium equipment with expert installation.",
    features: [
      "Smart boardroom automation and control",
      "Video walls for immersive displays",
      "Background music (BGM) systems",
      "Displays and projectors",
      "Video conferencing and wireless presentation",
    ],
    industries: ["Corporate", "Events & Stadia", "Education"],
  },
  {
    id: "safety-security",
    title: "Safety & Security",
    icon: ShieldCheck,
    color: "bg-red-50 text-red-600 border-red-100",
    iconColor: "text-red-600",
    description:
      "Advanced security solutions to protect people, assets, and premises — with real-time monitoring and centralized management.",
    features: [
      "Biometric and smart card access control",
      "IP-based CCTV surveillance with video analytics",
      "Fire alarm and voice evacuation systems",
      "Intrusion detection alarms",
      "Locks, safes, and minibars",
    ],
    industries: ["Hospitality", "Healthcare", "Corporate", "Construction"],
  },
  {
    id: "green-solutions",
    title: "Green Solutions",
    icon: Leaf,
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    iconColor: "text-emerald-600",
    description:
      "Smart building automation that optimizes energy consumption, enhances occupant comfort, and reduces environmental impact.",
    features: [
      "Building Management Systems (BMS)",
      "Guest Room Management Systems (GRMS)",
      "Smart lighting and room control",
      "Home and office automation",
      "Energy monitoring and optimization",
    ],
    industries: ["Hospitality", "Corporate", "Smart Homes"],
  },
  {
    id: "back-of-house",
    title: "Back of House",
    icon: Server,
    color: "bg-gray-50 text-gray-600 border-gray-100",
    iconColor: "text-gray-600",
    description:
      "Reliable IT infrastructure and equipment to support daily operations behind the scenes.",
    features: [
      "Servers for data and application hosting",
      "Business-grade laptops and computers",
      "Networked printing solutions",
      "IT hardware procurement and deployment",
    ],
    industries: ["All Industries"],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
            Our Services
          </h1>
          <p className="text-lg text-muted-foreground">
            Comprehensive ICT and ELV solutions designed and built for your business across Sub-Saharan Africa.
          </p>
        </div>

        {/* Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.id}
                className="group rounded-xl border border-border bg-card shadow-md p-6 hover:shadow-lg transition-all duration-200"
              >
                <div className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center mb-6`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-sm text-muted-foreground mb-6 line-clamp-3">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6 text-sm">
                  {service.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground">
                      <Check className="h-4 w-4 shrink-0 mt-0.5 text-primary-foreground" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1 mt-auto pt-6 border-t border-border">
                  {service.industries.map((ind, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground"
                    >
                      {ind}
                    </span>
                  ))}
                </div>
                <a
                  href={`#${service.id}-detail`}
                  className="mt-6 inline-flex items-center justify-center rounded-md bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-orange-700 transition w-full"
                >
                  Learn More
                </a>
              </article>
            );
          })}
        </div>

        {/* Detailed Service Sections */}
        <section className="mb-16">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                id={`${service.id}-detail`}
                className="mb-16 rounded-2xl border border-border bg-card overflow-hidden"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  <div className={`p-8 ${service.color}`}>
                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">{service.title}</h2>
                    <p className="text-sm mb-6 opacity-90">
                      {service.description}
                    </p>
                    <div className="space-y-3">
                      {service.features.map((f, i) => (
                        <div key={i} className="flex items-start gap-3 text-sm opacity-90">
                          <Check className="h-4 w-4 shrink-0 mt-0.5 text-primary-foreground" />
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <h3 className="text-xl font-semibold mb-4">What We Provide</h3>
                    <ul className="space-y-4 mb-8">
                      {service.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <span className="text-primary-foreground mt-0.5">•</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-6 border-t border-border">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                        Best for
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.industries.map((ind, i) => (
                          <span
                            key={i}
                            className="text-xs px-2.5 py-1 rounded-md bg-muted text-muted-foreground"
                          >
                            {ind}
                          </span>
                        ))}
                      </div>
                    </div>
                    <a
                      href={`/contact?service=${service.id}`}
                      className="mt-6 inline-flex items-center justify-center rounded-md bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-orange-700 transition w-full"
                    >
                      Request a Quote
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* CTA */}
        <section className="rounded-2xl border border-border bg-orange-50 p-10 lg:p-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get a free consultation and tailored quote for your ICT infrastructure needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="inline-flex items-center justify-center rounded-md bg-primary text-white px-8 py-3 text-lg font-medium hover:bg-orange-700 transition">
              Contact Sales
            </a>
            <a href="/case-studies" className="inline-flex items-center justify-center rounded-md border border-border px-8 py-3 text-lg font-medium hover:bg-muted transition">
              Explore Case Studies
            </a>
          </div>
        </section>
      </section>
    </div>
  );
}