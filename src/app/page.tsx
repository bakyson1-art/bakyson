'use client';

import { Hotel, HeartPulse, Building2, GraduationCap, Server, Wrench, Gauge } from "lucide-react";

export default function Home() {
  return (
      <div className="min-h-screen bg-white text-foreground">
        {/* Hero - Video/Mission with Glassmorphism */}
        <section className="relative overflow-hidden min-h-[80vh] flex items-center">
          <video className="absolute inset-0 w-full h-full object-cover opacity-30" autoPlay muted loop playsInline poster="/placeholder-hero.jpg">
            <source src="/hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-white pointer-events-none" />
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-orange-200/20 blur-3xl pointer-events-none" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:py-32 w-full">
            <div className="max-w-4xl mx-auto rounded-2xl border border-white/30 bg-white/60 backdrop-blur-xl shadow-xl p-8 lg:p-12">
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-foreground">
                Reinvent Your Business with Cutting-Edge ICT Solutions
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Bakyson designs and builds ELV services for Sub-Saharan Africa. Affordable, reliable infrastructure for hospitality, healthcare, corporates and learning institutions.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="/contact" className="inline-flex items-center justify-center rounded-md bg-primary text-white px-6 py-3 font-medium hover:bg-orange-700 transition cursor-pointer">
                  Contact Sales
                </a>
                <a href="/portal" className="inline-flex items-center justify-center rounded-md border border-border bg-white/70 backdrop-blur-md px-6 py-3 font-medium hover:bg-muted transition cursor-pointer">
                  Login
                </a>
              </div>
              <div className="mt-10">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">I am a...</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: "Hospitality", href: "/services#hospitality" },
                    { label: "Healthcare", href: "/services#healthcare" },
                    { label: "Corporate", href: "/services#corporate" },
                    { label: "Education", href: "/services#education" },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="group rounded-xl border border-border bg-white/70 backdrop-blur-md p-4 text-center font-medium hover:border-primary hover:shadow-md transition cursor-pointer"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Solutions by Industry */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold">Solutions by Industry</h2>
            <p className="mt-4 text-muted-foreground">Tailored ELV infrastructure for the sectors we serve across Sub-Saharan Africa.</p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Hospitality", desc: "Guest experience, security and communications for hotels and resorts.", href: "/services#hospitality", icon: Hotel },
              { title: "Healthcare", desc: "Reliable networks, access control and safety systems for clinics and hospitals.", href: "/services#healthcare", icon: HeartPulse },
              { title: "Corporate", desc: "Scalable cabling, CCTV and network solutions for offices and campuses.", href: "/services#corporate", icon: Building2 },
              { title: "Education", desc: "Learning-ready infrastructure for schools and universities.", href: "/services#education", icon: GraduationCap },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.title}
                  href={item.href}
                  className="group rounded-2xl border border-border bg-white p-6 shadow-md hover:shadow-lg transition cursor-pointer"
                >
                  <Icon className="h-6 w-6 text-primary mb-3" />
                  <h3 className="font-semibold text-lg group-hover:text-primary transition">{item.title}</h3>
                  <p className="mt-2 text-muted-foreground text-sm">{item.desc}</p>
                </a>
              );
            })}
          </div>
        </section>

        {/* Solutions by Role */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold">Solutions by Role</h2>
            <p className="mt-4 text-muted-foreground">Resources and services built for the people who run facilities.</p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "IT Managers", desc: "Design, deploy and maintain resilient networks and security.", icon: Server },
              { title: "Facilities Managers", desc: "Integrated access, CCTV and life safety systems.", icon: Wrench },
              { title: "Operations Directors", desc: "Minimize downtime with managed support and upgrades.", icon: Gauge },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-border bg-white p-6 shadow-md hover:shadow-lg transition cursor-pointer"
                >
                  <Icon className="h-6 w-6 text-primary mb-3" />
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="mt-2 text-muted-foreground text-sm">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Stats */}
        <section className="bg-muted py-16">
          <div className="mx-auto max-w-7xl px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Projects", value: "500+" },
              { label: "Clients", value: "15+" },
              { label: "Years", value: "3+" },
              { label: "Support", value: "24/7" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Client Logos */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wide">Trusted by</p>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-70">
            {[
              { src: '/globe.svg', alt: 'Client 1' },
              { src: '/next.svg', alt: 'Client 2' },
              { src: '/vercel.svg', alt: 'Client 3' },
              { src: '/window.svg', alt: 'Client 4' },
              { src: '/file.svg', alt: 'Client 5' },
              { src: '/globe.svg', alt: 'Client 6' },
            ].map((logo, idx) => (
              <div key={idx} className="flex justify-center">
                <img src={logo.src} alt={logo.alt} className="h-8 w-auto grayscale hover:grayscale-0 transition" />
              </div>
            ))}
          </div>
        </section>

        {/* Contact Sales */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-50 via-white to-white" />
          <div className="mx-auto max-w-4xl px-6 py-24 text-center">
            <div className="rounded-2xl border border-white/30 bg-white/60 backdrop-blur-xl shadow-xl p-10 lg:p-16">
              <h2 className="text-3xl font-semibold">Ready to upgrade your infrastructure?</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">Get a free consultation with our ICT specialists. We’ll respond within 24 hours.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a href="/contact" className="inline-flex items-center justify-center rounded-md bg-primary text-white px-6 py-3 font-medium hover:bg-orange-700 transition cursor-pointer">
                  Contact Sales
                </a>
                <a href="/portal" className="inline-flex items-center justify-center rounded-md border border-border px-6 py-3 font-medium hover:bg-muted transition cursor-pointer">
                  Login
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
}

