import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play, MapPin, ShieldCheck, Users, Layers, Award } from "lucide-react";

const services = [
  {
    title: "Infotainment & IPTV",
    description:
      "Interactive IPTV and digital signage solutions that transform guest experiences in hotels and public spaces.",
    icon: Play,
    color: "text-bakyson-orange",
  },
  {
    title: "Network & Communication",
    description:
      "HSIA, structured cabling, IP telephony, and network infrastructure for seamless connectivity across campuses.",
    icon: Layers,
    color: "text-bakyson-orange",
  },
  {
    title: "Safety & Security",
    description:
      "Access control, fire evacuation, video surveillance, and voice evacuation systems for maximum protection.",
    icon: ShieldCheck,
    color: "text-bakyson-orange",
  },
  {
    title: "Audio Visual",
    description:
      "Meeting room solutions, video walls, BGM, displays, and projectors for corporate and event spaces.",
    icon: Users,
    color: "text-bakyson-orange",
  },
  {
    title: "Green Solutions",
    description:
      "BMS, GRMS, and home automation systems that drive energy efficiency and smart building operations.",
    icon: Award,
    color: "text-bakyson-orange",
  },
  {
    title: "Back of House",
    description:
      "Servers, laptops, computers, printers, and IT hardware to power your operations behind the scenes.",
    icon: MapPin,
    color: "text-bakyson-orange",
  },
];

const industries = [
  { name: "Hotels", clients: ["JW Marriott", "Radisson Blue", "Le Meridien", "Hilton"] },
  { name: "Hospitals", clients: ["Aga Khan University Hospital", "Hotpoint"] },
  { name: "Corporates", clients: ["John Wood", "Bolton", "Kertel Suites"] },
  { name: "Learning Institutions", clients: ["African Reagent", "The Pearl"] },
  { name: "Events & Stadia", clients: [] },
  { name: "Telcos & ISPs", clients: [] },
];

const caseStudies = [
  {
    title: "JW Marriott Nairobi",
    location: "Nairobi, Kenya",
    sector: "Hospitality",
    solution: "Interactive IPTV & Digital Signage",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    mapLat: -1.2921,
    mapLng: 36.8219,
  },
  {
    title: "Aga Khan University Hospital Kisumu",
    location: "Kisumu, Kenya",
    sector: "Healthcare",
    solution: "Nurse Call & Access Control",
    image: "https://images.unsplash.com/photo-1551082805-c58d867987ab?w=800&q=80",
    mapLat: -0.0975,
    mapLng: 34.7613,
  },
  {
    title: "African Reagent Accra",
    location: "Accra, Ghana",
    sector: "Corporate",
    solution: "Network Infrastructure & HSIA",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    mapLat: 5.6037,
    mapLng: -0.187,
  },
  {
    title: "Hilton Accra Cantonments",
    location: "Accra, Ghana",
    sector: "Hospitality",
    solution: "Audio Visual & Meeting Rooms",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?w=800&q=80",
    mapLat: 5.6321,
    mapLng: -0.1876,
  },
];

export const metadata = {
  title: "Home",
  description:
    "Bakyson - Design and Build ELV services provider for Sub-Saharan Africa. Affordable, cutting-edge ICT solutions for Hospitality, Healthcare, Corporates, and Learning Institutions.",
};

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-bakyson-white">
      <div className="absolute inset-0 -z-10 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-bakyson-orange/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-bakyson-black/10 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2" />
      </div>

      <Hero />
      <ServicesSection />
      <AboutSection />
      <CaseStudiesSection />
      <PortfolioMapSection />
      <CTASection />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative pt-20 pb-24 lg:pt-32 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bakyson-orange/10 border border-bakyson-orange/20 text-bakyson-orange font-bold text-sm uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-bakyson-orange animate-pulse" />
              Now Serving 15+ Countries Across Sub-Saharan Africa
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight text-bakyson-black tracking-tight text-balance">
              Reinvent Your Business with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-bakyson-orange via-bakyson-black to-bakyson-orange">
                Cutting-Edge ICT Solutions
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-bakyson-black/70 leading-relaxed max-w-xl">
              Bakyson is a Design and Build ELV services provider delivering
              affordable, next-generation ICT systems for Hospitality,
              Healthcare, Corporates, and Learning Institutions across Nigeria,
              Kenya, South Africa, and beyond.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/services"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-bakyson-orange text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-bakyson-orange-dark transition-all shadow-lg shadow-orange/25 hover:shadow-orange/40"
              >
                Explore Services <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/portal/login"
                className="w-full sm:w-auto flex items-center justify-center gap-2 border-2 border-bakyson-black text-bakyson-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-bakyson-black hover:text-white transition-all"
              >
                Client Portal <Play className="w-5 h-5" />
              </Link>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-bakyson-white">
              <Image
                src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80"
                alt="Modern hotel lobby with digital signage"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bakyson-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-bakyson-orange/90 text-white text-sm font-bold">
                  <MapPin className="w-4 h-4" />
                  JW Marriott, Nairobi
                </div>
                <h3 className="mt-2 text-2xl font-bold">Interactive IPTV Deployment</h3>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-bakyson-orange p-6 rounded-2xl shadow-2xl border-4 border-bakyson-white z-10 animate-[pulse_3s_cubic-bezier(0.4,0,0.6,1)_infinite]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-bakyson-orange font-bold text-xl">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-white font-bold text-lg">99.9%</p>
                  <p className="text-white/90 text-sm">System Uptime SLA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="py-20 bg-bakyson-black border-y border-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-bakyson-orange font-bold text-sm uppercase tracking-wider">Our Services</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-bakyson-white mt-2">Powering Africa's Smart Buildings</h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Comprehensive ELV systems integration across six solution families,
            tailored to your industry and scale.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative p-6 rounded-xl bg-bakyson-gray/10 border border-black/30 hover:border-bakyson-orange/50 hover:bg-black/40 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-bakyson-orange/10 flex items-center justify-center mb-4 group-hover:bg-bakyson-orange transition-colors">
                <service.icon className={`w-6 h-6 ${service.color}`} />
              </div>
              <h3 className="text-xl font-bold text-bakyson-white mb-2 group-hover:text-bakyson-orange transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="py-20 bg-bakyson-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-bakyson-orange font-bold text-sm uppercase tracking-wider">About Bakyson</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-bakyson-black mt-2 mb-6">
              Designing and Building ELV Solutions for Sub-Saharan Africa
            </h2>
            <p className="text-bakyson-black/70 leading-relaxed mb-6">
              Bakyson is a Design and Build ELV services provider with a core
              focus on Hospitality, Healthcare, Corporates, and Learning
              Institutions. We deliver affordable, cutting-edge, and viable ICT
              solutions that transform how businesses operate and how people
              experience technology.
            </p>
            <p className="text-bakyson-black/70 leading-relaxed mb-8">
              With strategic operational hubs in Nigeria, Kenya, and South
              Africa, we serve diverse industry verticals across the continent,
              building lasting partnerships that drive success.
            </p>
            <div className="flex items-center gap-4">
              <div className="h-1 w-1 bg-bakyson-orange rounded-full" />
              <span className="font-bold text-bakyson-black">Innovation</span>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <div className="h-1 w-1 bg-bakyson-orange rounded-full" />
              <span className="font-bold text-bakyson-black">Experience</span>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-bakyson-white">
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&q=80"
                alt="Network infrastructure and server room"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-bakyson-black/40" />
              <div className="absolute bottom-6 left-6 text-white">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bakyson-orange text-white text-xs font-bold uppercase tracking-wider">
                  Sub-Saharan Africa
                </span>
                <h3 className="mt-2 text-xl font-bold">Strategic Coverage</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CaseStudiesSection() {
  return (
    <section className="py-20 bg-bakyson-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-6 mb-12">
          <div>
            <span className="text-bakyson-orange font-bold text-sm uppercase tracking-wider">Featured Work</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-bakyson-black mt-2">
              Proven Impact Across the Continent
            </h2>
          </div>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-bakyson-orange font-bold hover:text-bakyson-orange-dark transition-colors"
          >
            View All Case Studies <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((study) => (
            <div
              key={study.title}
              className="group relative rounded-2xl overflow-hidden bg-white border border-black/10 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={study.image}
                  alt={study.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 backdrop-blur text-xs font-bold text-bakyson-black uppercase tracking-wider">
                  {study.sector}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-bakyson-black mb-1 group-hover:text-bakyson-orange transition-colors">
                  {study.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4">{study.location}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-bakyson-orange">
                    {study.solution}
                  </span>
                  <Link
                    href={`/case-studies/${study.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-xs font-bold text-bakyson-black hover:text-bakyson-orange"
                  >
                    Read story
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioMapSection() {
  return (
    <section className="py-20 bg-bakyson-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-bakyson-orange font-bold text-sm uppercase tracking-wider">Our Portfolio</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-bakyson-black mt-2 mb-6">
            Where We've Built Across Africa
          </h2>
          <p className="text-bakyson-black/60 max-w-2xl mx-auto leading-relaxed">
            Explore our project locations on the interactive map below. From
            Lagos to Nairobi, Johannesburg to Accra — Bakyson is there.
          </p>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-bakyson-white aspect-video min-h-[400px]">
          <div className="absolute inset-0 bg-gradient-to-br from-bakyson-orange/10 via-bakyson-white to-bakyson-black/5" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-bakyson-orange rounded-full flex items-center justify-center text-white mx-auto mb-4 shadow-2xl shadow-orange/40">
                <Layers className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-bakyson-black">Interactive Map</h3>
              <p className="text-bakyson-black/60 mt-2">
                Click any pin to see project details, photos, and case studies.
              </p>
            </div>
          </div>
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
            <div className="bg-white p-4 rounded-xl shadow-lg border border-black/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-bakyson-orange" />
                <span className="text-sm font-bold text-bakyson-black">12 Active Projects</span>
              </div>
              <div className="flex gap-2">
                {["NG", "KE", "ZA", "GH"].map((code) => (
                  <span key={code} className="px-2 py-1 rounded bg-bakyson-black text-white text-xs font-bold">
                    {code}
                  </span>
                ))}
              </div>
            </div>
            <Link
              href="/portfolio"
              className="bg-bakyson-black text-white px-6 py-3 rounded-xl font-bold hover:bg-bakyson-orange transition-colors shadow-xl"
            >
              View Full Portfolio
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80')] bg-cover bg-center opacity-20" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-bakyson-black rounded-2xl p-8 lg:p-12 shadow-2xl border border-bakyson-orange/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-bakyson-orange to-transparent" />
          <div className="text-center md:text-left space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-bakyson-white">
              Ready to Transform Your Business?
            </h2>
            <p className="text-gray-400 text-lg max-w-xl md:max-w-none">
              Get a free consultation and custom quote for your ICT project.
              We'll design, build, and support your solution end to end.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href="/contact"
                className="w-full sm:w-auto bg-bakyson-orange text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-bakyson-orange-dark transition-all shadow-lg shadow-orange/30"
              >
                Get a Free Quote <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/portal/login"
                className="w-full sm:w-auto border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-bakyson-black transition-all"
              >
                Client Portal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
