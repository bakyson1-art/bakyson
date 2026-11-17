"use client";

import Link from "next/link";
import { useState } from "react";
import { MapPin, ArrowRight, Building2, Hotel, Stethoscope, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "motion/react";

const portfolioItems = [
  {
    id: "jw-marriott-nairobi",
    title: "JW Marriott Nairobi",
    location: "Nairobi, Kenya",
    country: "Kenya",
    sector: "Hospitality",
    solution: "Interactive IPTV & Digital Signage",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    lat: -1.2921,
    lng: 36.8219,
    icon: Hotel,
  },
  {
    id: "aga-khan-kisumu",
    title: "Aga Khan University Hospital Kisumu",
    location: "Kisumu, Kenya",
    country: "Kenya",
    sector: "Healthcare",
    solution: "Nurse Call & Access Control",
    image: "https://images.unsplash.com/photo-1551082805-c58d867987ab?w=800&q=80",
    lat: -0.0975,
    lng: 34.7613,
    icon: Stethoscope,
  },
  {
    id: "african-reagent-accra",
    title: "African Reagent Accra",
    location: "Accra, Ghana",
    country: "Ghana",
    sector: "Corporate",
    solution: "Network Infrastructure & HSIA",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    lat: 5.6037,
    lng: -0.187,
    icon: Briefcase,
  },
  {
    id: "hilton-accra",
    title: "Hilton Accra Cantonments",
    location: "Accra, Ghana",
    country: "Ghana",
    sector: "Hospitality",
    solution: "Audio Visual & Meeting Rooms",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?w=800&q=80",
    lat: 5.6321,
    lng: -0.1876,
    icon: Hotel,
  },
  {
    id: "kertel-suites-kinshasa",
    title: "Kertel Suites Kinshasa",
    location: "Kinshasa, DRC",
    country: "DRC",
    sector: "Hospitality",
    solution: "Digital Signage & BGM",
    image: "https://images.unsplash.com/photo-1551882644-e0836243d4c1?w=800&q=80",
    lat: -4.4419,
    lng: 15.2663,
    icon: Hotel,
  },
  {
    id: "john-wood-abuja",
    title: "John Wood Abuja",
    location: "Abuja, Nigeria",
    country: "Nigeria",
    sector: "Corporate",
    solution: "Access Control & CCTV",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    lat: 9.0765,
    lng: 7.3986,
    icon: Building2,
  },
  {
    id: "peduase-valley-resort",
    title: "Peduase Valley Resort",
    location: "Peduase, Ghana",
    country: "Ghana",
    sector: "Hospitality",
    solution: "IPTV & Network Infrastructure",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    lat: 5.9062,
    lng: -0.1292,
    icon: Hotel,
  },
  {
    id: "the-pearl-abuja",
    title: "The Pearl Abuja",
    location: "Abuja, Nigeria",
    country: "Nigeria",
    sector: "Hospitality",
    solution: "Audio Visual & Security",
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&q=80",
    lat: 9.0579,
    lng: 7.4951,
    icon: Hotel,
  },
];

const countryStats = [
  { name: "Nigeria", projects: 12, cities: ["Lagos", "Abuja", "Port Harcourt"] },
  { name: "Kenya", projects: 18, cities: ["Nairobi", "Kisumu", "Mombasa"] },
  { name: "South Africa", projects: 8, cities: ["Johannesburg", "Cape Town", "Durban"] },
  { name: "Ghana", projects: 10, cities: ["Accra", "Kumasi", "Tamale"] },
  { name: "DRC", projects: 5, cities: ["Kinshasa", "Lubumbashi"] },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export default function PortfolioContent() {
  const [selectedItem, setSelectedItem] = useState(portfolioItems[0]);

  return (
    <div className="bg-background text-foreground">
      <section className="py-20 lg:py-32 relative overflow-hidden" aria-labelledby="portfolio-heading">
        <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-foreground/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="mb-4">
              <Badge variant="primary">Our Portfolio</Badge>
            </motion.div>
            <motion.h1
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="text-4xl lg:text-6xl font-extrabold leading-tight text-foreground mb-6"
              id="portfolio-heading"
            >
              Where We've Built Across Africa
            </motion.h1>
            <motion.p
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="text-lg max-w-2xl mx-auto leading-relaxed text-foreground/60"
            >
              From Lagos to Nairobi, Johannesburg to Accra — explore our project locations on the interactive map below. Click any pin to see project details, photos, and case studies.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 min-h-[700px]">
            {/* Map Visualization - Left Side */}
            <div className="lg:col-span-7 relative rounded-2xl overflow-hidden shadow-2xl border-4 border-background aspect-[4/3] min-h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-foreground/5" />
              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <svg className="w-32 h-32 text-foreground/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>

              {/* Map pins */}
              {portfolioItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="absolute cursor-pointer transition-transform duration-200 group"
                  style={{
                    left: `${30 + ((item.lng + 20) / 60) * 40}%`,
                    top: `${40 - ((item.lat - (-5)) / 40) * 30}%`,
                  }}
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-background shadow-lg shadow-primary/40 group-hover:scale-110 transition-transform border-4 border-background z-10">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap bg-foreground text-background px-3 py-1.5 rounded text-xs font-bold shadow-lg">
                      {item.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Project Details - Right Side */}
            <div className="lg:col-span-5 space-y-6">
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="bg-foreground rounded-2xl p-8 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <selectedItem.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">
                    {selectedItem.sector}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{selectedItem.title}</h3>
                <p className="text-foreground-muted text-sm mb-6 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  {selectedItem.location}, {selectedItem.country}
                </p>
                <p className="text-foreground/70 text-sm leading-relaxed mb-6">
                  {selectedItem.solution} — a comprehensive deployment tailored to {selectedItem.sector.toLowerCase()} industry requirements.
                </p>
                <Link
                  href={`/case-studies/${selectedItem.id}`}
                  className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:text-primary-hover transition-colors"
                >
                  View Case Study <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid md:grid-cols-2 gap-6"
              >
                {portfolioItems.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="cursor-pointer group p-4 rounded-xl border border-border bg-background hover:border-primary/50 hover:bg-black/5 transition-all"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-background text-xs">
                        {item.country.charAt(0)}
                      </div>
                      <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                      </span>
                    </div>
                    <p className="text-xs text-foreground/60">{item.solution}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Country Presence Section */}
      <section className="py-20 bg-surface" aria-labelledby="presence-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="text-3xl font-bold text-foreground text-center mb-12"
            id="presence-heading"
          >
            Our Presence Across Sub-Saharan Africa
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-3 gap-6"
          >
            {countryStats.map((stat) => (
              <div key={stat.name} className="p-6 rounded-2xl bg-background border border-border shadow-sm">
                <h3 className="text-xl font-bold text-foreground mb-2">{stat.name}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-primary">{stat.projects}</span>
                  <span className="text-sm text-foreground/60">projects</span>
                </div>
                <ul className="space-y-1 text-sm text-foreground/70">
                  {stat.cities.map((city) => (
                    <li key={city} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {city}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background" aria-labelledby="visit-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={sectionVariants} initial="hidden" animate="visible">
            <motion.h2
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="text-3xl font-bold text-foreground mb-6"
              id="visit-heading"
            >
              Want to See Our Work in Person?
            </motion.h2>
            <motion.p
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="text-lg max-w-xl mx-auto leading-relaxed text-foreground/60 mb-8"
            >
              Visit one of our project sites or schedule a virtual walkthrough with our team.
            </motion.p>
            <Link href="/contact" className="inline-flex items-center gap-2">
              <Button variant="primary" size="lg" className="shadow-lg shadow-primary hover:shadow-primary">
                Schedule a Visit <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
