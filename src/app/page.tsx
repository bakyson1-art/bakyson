'use client';

import { Hotel, HeartPulse, Building2, GraduationCap, Server, Wrench, Gauge } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  return (
      <div className="min-h-screen bg-white text-foreground">
        {/* Hero - Video/Mission with Glassmorphism */}
        <section className="relative overflow-hidden min-h-[80vh] flex items-center">
          <video className="absolute inset-0 w-full h-full object-cover opacity-30" autoPlay muted loop playsInline poster="/placeholder-hero.jpg">
            <source src="/hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-white pointer-events-none" />
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-orange-200/20 blur-3xl pointer-events-none sm:hidden lg:block" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 lg:px-6 lg:py-32 w-full">
            <div className="max-w-4xl mx-auto rounded-2xl border border-white/30 bg-white/60 backdrop-blur-xl shadow-xl p-6 lg:p-12">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
                Reinvent Your Business with Cutting-Edge ICT Solutions
              </h1>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
                Bakyson designs and builds ELV services for Sub-Saharan Africa. Affordable, reliable infrastructure for hospitality, healthcare, corporates and learning institutions.
              </p>
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-3">
                <a href="/contact" className="inline-flex items-center justify-center rounded-md bg-primary text-white px-5 sm:px-6 py-3 font-medium hover:bg-orange-700 transition cursor-pointer w-full sm:w-auto">
                  Contact Sales
                </a>
                <a href="/portal" className="inline-flex items-center justify-center rounded-md border border-border bg-white/70 backdrop-blur-md px-5 sm:px-6 py-3 font-medium hover:bg-muted transition cursor-pointer w-full sm:w-auto">
                  Login
                </a>
              </div>
              <div className="mt-6 sm:mt-10">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3 sm:mb-4">I am a...</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                  {[
                    { label: "Hospitality", href: "/services#hospitality" },
                    { label: "Healthcare", href: "/services#healthcare" },
                    { label: "Corporate", href: "/services#corporate" },
                    { label: "Education", href: "/services#education" },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="group rounded-xl border border-border bg-white/70 backdrop-blur-md p-3 sm:p-4 text-center font-medium text-sm sm:text-base hover:border-primary hover:shadow-md transition cursor-pointer"
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
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-semibold">Solutions by Industry</h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-leading-relaxed">
              Tailored ELV infrastructure for the sectors we serve across Sub-Saharan Africa.
            </p>
          </div>
          <div className="mt-6 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
                  className="group rounded-2xl border border-border bg-white p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <Icon className="h-5 w-5 text-primary mb-2 sm:mb-3" />
                  <h3 className="font-semibold text-base sm:text-lg group-hover:text-primary transition">{item.title}</h3>
                  <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-muted-foreground">{item.desc}</p>
                </a>
              );
            })}
          </div>
        </section>

        {/* Solutions by Role */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-semibold">Solutions by Role</h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Resources and services built for the people who run facilities.
            </p>
          </div>
          <div className="mt-6 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              { title: "IT Managers", desc: "Design, deploy and maintain resilient networks and security.", icon: Server },
              { title: "Facilities Managers", desc: "Integrated access, CCTV and life safety systems.", icon: Wrench },
              { title: "Operations Directors", desc: "Minimize downtime with managed support and upgrades.", icon: Gauge },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-border bg-white p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <Icon className="h-5 w-5 text-primary mb-2 sm:mb-3" />
                  <h3 className="font-semibold text-base sm:text-lg">{item.title}</h3>
                  <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-muted-foreground">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Stats */}
        <section className="bg-muted py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 text-center">
            {[
              { label: "Projects", value: "500+" },
              { label: "Clients", value: "15+" },
              { label: "Years", value: "3+" },
              { label: "Support", value: "24/7" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl sm:text-3xl font-bold">{stat.value}</div>
                <div className="mt-1 text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Client Logos */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <p className="text-center text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wide">Trusted by</p>
          <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-8 items-center opacity-70">
            {[
              { src: '/globe.svg', alt: 'Client 1' },
              { src: '/next.svg', alt: 'Client 2' },
              { src: '/vercel.svg', alt: 'Client 3' },
              { src: '/window.svg', alt: 'Client 4' },
              { src: '/file.svg', alt: 'Client 5' },
              { src: '/globe.svg', alt: 'Client 6' },
            ].map((logo, idx) => (
              <div key={idx} className="flex justify-center">
                <img src={logo.src} alt={logo.alt} className="h-6 sm:h-8 w-auto grayscale hover:grayscale-0 transition" loading="lazy" />
              </div>
            ))}
          </div>
        </section>

        {/* Contact Sales */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-50 via-white to-white" />
          <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-24 text-center">
            <div className="rounded-2xl border border-white/30 bg-white/60 backdrop-blur-xl shadow-xl p-6 sm:p-10 lg:p-16">
              <h2 className="text-2xl sm:text-3xl font-semibold">Ready to upgrade your infrastructure?</h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Get a free consultation with our ICT specialists. We’ll respond within 24 hours.
              </p>
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-3">
                <a href="/contact" className="inline-flex items-center justify-center rounded-md bg-primary text-white px-5 sm:px-6 py-3 font-medium hover:bg-orange-700 transition cursor-pointer w-full sm:w-auto">
                  Contact Sales
                </a>
                <a href="/portal" className="inline-flex items-center justify-center rounded-md border border-border px-5 sm:px-6 py-3 font-medium hover:bg-muted transition cursor-pointer w-full sm:w-auto">
                  Login
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
}
