import Link from "next/link";
import { ArrowRight, ShieldCheck, Users, Globe, Award, Layers } from "lucide-react";

export const metadata = {
  title: "About",
  description:
    "Learn about Bakyson — a Design and Build ELV services provider for Sub-Saharan Africa serving Hospitality, Healthcare, Corporates, and Learning Institutions.",
};

const cornerstones = [
  {
    title: "Innovation",
    description:
      "We embrace the spirit of innovation and strive to redefine what is possible. At Bakyson, innovation is at the heart of everything we do.",
    icon: Layers,
  },
  {
    title: "Experience",
    description:
      "We believe that true value lies in the experience we deliver to clients. Every interaction with our technology leaves a lasting, positive impact.",
    icon: Users,
  },
  {
    title: "Knowledge",
    description:
      "We pride ourselves on being a trusted source of knowledge in our field. Our team is composed of seasoned professionals passionate about continuous learning.",
    icon: Globe,
  },
  {
    title: "Commitment",
    description:
      "Commitment at Bakyson is more than a promise — it is the foundation of everything we do. We are deeply committed to your success.",
    icon: ShieldCheck,
  },
  {
    title: "Coverage",
    description:
      "Bakyson's reach extends across Sub-Saharan Africa with hubs in Nigeria, Kenya, and South Africa, serving diverse industry verticals.",
    icon: Award,
  },
];

const stats = [
  { value: "15+", label: "Countries Served" },
  { value: "500+", label: "Projects Delivered" },
  { value: "3", label: "Regional Hubs" },
  { value: "24/7", label: "Support Available" },
];

export default function AboutPage() {
  return (
    <div className="bg-bakyson-white">
      <section className="relative bg-bakyson-black py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-bakyson-orange rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-bakyson-orange font-bold text-sm uppercase tracking-wider inline-block mb-4">
            About Bakyson
          </span>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-bakyson-white leading-tight mb-6">
            Designing and Building ELV Solutions<br />
            for Sub-Saharan Africa
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            We are a Design and Build ELV services provider delivering
            affordable, cutting-edge ICT solutions that transform businesses
            across Hospitality, Healthcare, Corporates, and Learning
            Institutions.
          </p>
        </div>
      </section>

      <section className="py-20 bg-bakyson-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-bakyson-orange to-bakyson-black rounded-2xl blur opacity-20" />
              <div className="relative rounded-2xl overflow-hidden border border-black/10 shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                  alt="Bakyson team and technology"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
            <div className="space-y-6">
              <span className="text-bakyson-orange font-bold text-sm uppercase tracking-wider">
                Who We Are
              </span>
              <h2 className="text-3xl font-bold text-bakyson-black">Built on Trust, Delivered with Excellence</h2>
              <p className="text-bakyson-black/70 leading-relaxed">
                Bakyson was founded with a clear mission: to bring
                world-class ICT infrastructure to businesses across
                Sub-Saharan Africa. From luxury hotels in Nairobi to hospitals
                in Kisumu, from corporate headquarters in Lagos to learning
                institutions in Accra — we design and build the systems that
                power modern organizations.
              </p>
              <p className="text-bakyson-black/70 leading-relaxed">
                Our core focus is on Hospitality, Healthcare, Corporates, and
                Learning Institutions — sectors where reliable technology
                isn't a luxury, it's a necessity.
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-bakyson-orange font-bold hover:text-bakyson-orange-dark transition-colors"
              >
                Explore Our Services <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-bakyson-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-bakyson-orange font-bold text-sm uppercase tracking-wider">
              Our Cornerstones
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-bakyson-black mt-2">
              Excellence in Every Detail
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {cornerstones.map((c) => (
              <div
                key={c.title}
                className="p-8 rounded-2xl bg-bakyson-gray border border-black/10 hover:border-bakyson-orange/50 hover:bg-black/5 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-bakyson-orange/10 flex items-center justify-center mb-6 text-bakyson-orange">
                  <c.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-bakyson-black mb-3">{c.title}</h3>
                <p className="text-bakyson-black/60 leading-relaxed text-sm">
                  {c.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-bakyson-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 border-t border-black/30 pt-12">
            {stats.map((stat) => (
              <div key={stat.value} className="text-center">
                <div className="text-4xl font-bold text-bakyson-orange mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-bakyson-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-bakyson-orange rounded-2xl p-8 lg:p-16 text-center shadow-2xl shadow-orange/25 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-bakyson-black" />
            <span className="text-bakyson-black font-bold text-sm uppercase tracking-wider">
              Partner With Us
            </span>
            <h2 className="text-3xl font-bold text-bakyson-black mt-2 mb-6">
              Let's Build Something Extraordinary Together
            </h2>
            <p className="text-bakyson-black/80 text-lg max-w-xl mx-auto mb-8">
              Whether you're planning a new hotel, hospital, corporate office,
              or school — we'll design and build the ICT solution that fits
              your needs.
            </p>
            <Link
              href="/contact"
              className="bg-bakyson-black text-bakyson-orange px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-bakyson-black transition-all shadow-lg"
            >
              Start a Conversation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
