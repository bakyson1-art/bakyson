"use client";

import Link from "next/link";
import { useState } from "react";
import { MapPin, ArrowRight, Building2, Hotel, Stethoscope, Briefcase } from "lucide-react";

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

export default function PortfolioContent() {
  const [selectedItem, setSelectedItem] = useState(portfolioItems[0]);

  return (
    <div className="bg-bakyson-white">
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-bakyson-orange rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-bakyson-black/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-bakyson-orange font-bold text-sm uppercase tracking-wider inline-block mb-4">
              Our Portfolio
            </span>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-bakyson-black leading-tight mb-6">
              Where We've Built Across Africa
            </h1>
            <p className="text-bakyson-black/60 text-lg max-w-2xl mx-auto leading-relaxed">
              From Lagos to Nairobi, Johannesburg to Accra — explore our
              project locations on the interactive map below. Click any pin
              to see project details, photos, and case studies.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 min-h-[700px]">
            <div className="lg:col-span-7 relative rounded-2xl overflow-hidden shadow-2xl border-4 border-bakyson-white aspect-[4/3] min-h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-br from-bakyson-orange/5 via-bakyson-white to-bakyson-black/5" />
              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <svg className="w-32 h-32 text-bakyson-black/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>

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
                    <div className="w-10 h-10 bg-bakyson-orange rounded-full flex items-center justify-center text-white shadow-lg shadow-orange/40 group-hover:scale-110 transition-transform border-4 border-white z-10">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap bg-bakyson-black text-white px-3 py-1.5 rounded text-xs font-bold shadow-lg">
                      {item.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="bg-bakyson-black rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-bakyson-orange" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-bakyson-orange/20 flex items-center justify-center text-bakyson-orange">
                    <selectedItem.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-bakyson-orange uppercase tracking-wider">
                    {selectedItem.sector}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-bakyson-white mb-2">{selectedItem.title}</h3>
                <p className="text-gray-400 text-sm mb-6">
                  <MapPin className="w-4 h-4 inline mr-2 text-bakyson-orange" />
                  {selectedItem.location}, {selectedItem.country}
                </p>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  {selectedItem.solution} — a comprehensive deployment tailored to {selectedItem.sector.toLowerCase()} industry requirements.
                </p>
                <Link
                  href={`/case-studies/${selectedItem.id}`}
                  className="inline-flex items-center gap-2 text-bakyson-orange font-bold text-sm hover:text-white transition-colors"
                >
                  View Case Study <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {portfolioItems.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="cursor-pointer group p-4 rounded-xl border border-black/10 bg-white hover:border-bakyson-orange/50 hover:bg-black/5 transition-all"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-bakyson-orange flex items-center justify-center text-white text-xs">
                        {item.country.charAt(0)}
                      </div>
                      <span className="text-sm font-bold text-bakyson-black group-hover:text-bakyson-orange transition-colors">
                        {item.title}
                      </span>
                    </div>
                    <p className="text-xs text-bakyson-black/60">{item.solution}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-bakyson-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-bakyson-black text-center mb-12">
            Our Presence Across Sub-Saharan Africa
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {countryStats.map((stat) => (
              <div
                key={stat.name}
                className="p-6 rounded-2xl bg-white border border-black/10 shadow-sm"
              >
                <h3 className="text-xl font-bold text-bakyson-black mb-2">{stat.name}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-bakyson-orange">{stat.projects}</span>
                  <span className="text-sm text-bakyson-black/60">projects</span>
                </div>
                <ul className="space-y-1 text-sm text-bakyson-black/70">
                  {stat.cities.map((city) => (
                    <li key={city} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-bakyson-orange" />
                      {city}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-bakyson-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-bakyson-black mb-6">
            Want to See Our Work in Person?
          </h2>
          <p className="text-bakyson-black/60 text-lg mb-8 max-w-xl mx-auto">
            Visit one of our project sites or schedule a virtual walkthrough with our team.
          </p>
          <Link
            href="/contact"
            className="bg-bakyson-orange text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-bakyson-orange-dark transition-all shadow-lg shadow-orange/25"
          >
            Schedule a Visit
          </Link>
        </div>
      </section>
    </div>
  );
}
