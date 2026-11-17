import Link from "next/link";
import { ChevronRight, Play, Layers, ShieldCheck, Users, Award, MapPin, Monitor, Smartphone, Wifi } from "lucide-react";

export const metadata = {
  title: "Services",
  description:
    "Bakyson ICT services: Infotainment & IPTV, Digital Signage, Network & Communication, Safety & Security, Audio Visual, Green Solutions, and Back of House for Sub-Saharan Africa.",
};

const serviceCategories = [
  {
    id: "infotainment",
    title: "Infotainment",
    subtitle: "Interactive IPTV & Digital Signage",
    description:
      "Transform guest experiences with interactive IPTV and digital signage solutions designed for hotels, hospitals, and public spaces. Deliver entertainment, information, and branding directly to every screen.",
    features: [
      "Interactive IPTV systems",
      "Digital signage networks",
      "Guest room entertainment",
      "Content management systems",
      "Wayfinding displays",
    ],
    icon: Play,
    color: "text-bakyson-orange",
  },
  {
    id: "networks",
    title: "Network & Communication",
    subtitle: "HSIA, Structured Cabling & IP Telephony",
    description:
      "Seamless connectivity across campuses with HSIA (High Speed Internet Access), structured cabling, IP telephony, and network infrastructure built for reliability and scale.",
    features: [
      "High-speed internet access (HSIA)",
      "Structured cabling",
      "IP telephony solutions",
      "Network infrastructure",
      "Wi-Fi deployment",
    ],
    icon: Layers,
    color: "text-bakyson-orange",
  },
  {
    id: "safety",
    title: "Safety & Security",
    subtitle: "Access Control, Fire & Video Surveillance",
    description:
      "Maximum protection with access control, fire evacuation, video surveillance, and voice evacuation systems. Keep people and property safe with integrated security technology.",
    features: [
      "Access control systems",
      "Fire alarm & evacuation",
      "Video surveillance (CCTV)",
      "Voice evacuation",
      "Locks & safes",
    ],
    icon: ShieldCheck,
    color: "text-bakyson-orange",
  },
  {
    id: "audio-visual",
    title: "Audio Visual",
    subtitle: "Meeting Rooms, Video Walls & Displays",
    description:
      "Professional AV solutions for meeting rooms, boardrooms, event spaces, and public areas. Video walls, BGM, displays, and projectors that impress and perform.",
    features: [
      "Meeting room solutions",
      "Video walls",
      "Background music (BGM)",
      "Displays & projectors",
      "Wireless presentation",
    ],
    icon: Monitor,
    color: "text-bakyson-orange",
  },
  {
    id: "green-solutions",
    title: "Green Solutions",
    subtitle: "BMS, GRMS & Home Automation",
    description:
      "Energy-efficient building management with BMS (Building Management Systems), GRMS (Guest Room Management Systems), and home automation. Smart, sustainable, and cost-effective.",
    features: [
      "Building Management Systems",
      "Guest Room Management Systems",
      "Home automation",
      "Lighting & control",
      "Energy monitoring",
    ],
    icon: Award,
    color: "text-bakyson-orange",
  },
  {
    id: "back-of-house",
    title: "Back of House",
    subtitle: "Servers, Laptops, Computers & Printers",
    description:
      "Reliable IT hardware to power your operations behind the scenes. Servers, laptops, computers, printers, and accessories for smooth day-to-day functioning.",
    features: [
      "Servers & data storage",
      "Laptops & computers",
      "Printers & scanners",
      "IT hardware procurement",
      "Technical support",
    ],
    icon: Layers,
    color: "text-bakyson-orange",
  },
];

const industries = [
  { name: "Hotels", icon: MapPin },
  { name: "Hospitals", icon: ShieldCheck },
  { name: "Corporates", icon: Users },
  { name: "Learning Institutions", icon: Award },
  { name: "Events & Stadia", icon: Smartphone },
  { name: "Telcos & ISPs", icon: Wifi },
];

export default function ServicesPage() {
  return (
    <div className="bg-bakyson-white">
      <section className="py-20 lg:py-32 bg-bakyson-black relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-bakyson-orange rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-bakyson-orange font-bold text-sm uppercase tracking-wider inline-block mb-4">
            Our Services
          </span>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-bakyson-white leading-tight mb-6">
            Affordable, Cutting-Edge<br />
            ICT Solutions for Africa
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Comprehensive ELV systems integration across six solution families,
            tailored to your industry and scale. From concept to execution,
            we design, build, and support your technology end to end.
          </p>
        </div>
      </section>

      <section className="py-20 bg-bakyson-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-bold text-bakyson-black">Explore Our Solution Families</h2>
              <p className="text-bakyson-black/60 mt-2">
                Click on any service to learn more about what we offer.
              </p>
            </div>
            <Link
              href="/contact"
              className="bg-bakyson-orange text-white px-6 py-3 rounded-xl font-bold hover:bg-bakyson-orange-dark transition-colors shadow-lg shadow-orange/25"
            >
              Request a Quote
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCategories.map((svc) => (
              <div
                key={svc.id}
                className="group relative p-8 rounded-2xl bg-white border border-black/10 hover:border-bakyson-orange/50 hover:bg-black/5 transition-all duration-300 cursor-pointer"
              >
                <div className="absolute top-6 right-6 w-12 h-12 rounded-xl bg-bakyson-orange/10 flex items-center justify-center text-bakyson-orange group-hover:bg-bakyson-orange group-hover:text-white transition-colors">
                  <svc.icon className="w-6 h-6" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-bakyson-black mb-2 group-hover:text-bakyson-orange transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-sm font-medium text-bakyson-orange mb-4 uppercase tracking-wider">
                    {svc.subtitle}
                  </p>
                  <p className="text-bakyson-black/60 text-sm leading-relaxed mb-6">
                    {svc.description}
                  </p>
                  <ul className="space-y-2">
                    {svc.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-bakyson-black/70">
                        <ChevronRight className="w-4 h-4 text-bakyson-orange mt-0.5 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-bakyson-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="text-bakyson-orange font-bold text-sm uppercase tracking-wider">
                Industries We Serve
              </span>
              <h2 className="text-3xl font-bold text-bakyson-black">
                Tailored Solutions for Every Sector
              </h2>
              <p className="text-bakyson-black/60 leading-relaxed">
                We understand that every industry has unique technology needs.
                That's why we customize our ICT solutions for each sector we
                serve across Sub-Saharan Africa.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {industries.map((ind) => (
                <div
                  key={ind.name}
                  className="flex items-center gap-3 p-4 rounded-xl bg-bakyson-gray border border-black/10 hover:bg-black/5 hover:border-bakyson-orange/50 transition-colors"
                >
                  <ind.icon className="w-5 h-5 text-bakyson-orange shrink-0" />
                  <span className="text-sm font-medium text-bakyson-black">{ind.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-bakyson-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-bakyson-orange rounded-2xl p-8 lg:p-16 text-center shadow-2xl shadow-orange/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-bakyson-black" />
            <span className="text-bakyson-black font-bold text-sm uppercase tracking-wider">
              Ready to Get Started?
            </span>
            <h2 className="text-3xl font-bold text-bakyson-black mt-2 mb-6">
              Let's Design Your ICT Solution
            </h2>
            <p className="text-bakyson-black/80 text-lg max-w-xl mx-auto mb-8">
              Tell us about your project and we'll provide a custom proposal
              with pricing and timeline.
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
