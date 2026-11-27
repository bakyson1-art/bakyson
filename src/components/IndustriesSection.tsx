export default function IndustriesSection() {
  const verticals = [
    {
      id: 'hospitality',
      name: 'Hospitality',
      tagline: 'Hotels & Resorts',
      desc: 'Guest experience, security, and communications for hotels and resorts.',
    },
    {
      id: 'healthcare',
      name: 'Healthcare',
      tagline: 'Medical Facilities',
      desc: 'Reliable networks, access control, and safety systems for clinics and hospitals.',
    },
    {
      id: 'corporate',
      name: 'Corporate & Commercial',
      tagline: 'Office & CRE Buildings',
      desc: 'Scalable cabling, CCTV, and network solutions for offices and campuses.',
    },
    {
      id: 'learning',
      name: 'Learning Institutions',
      tagline: 'Schools & Campuses',
      desc: 'Learning-ready infrastructure for schools and universities.',
    },
    {
      id: 'aviation',
      name: 'Aviation',
      tagline: 'Airports & Terminals',
      desc: 'Airside-to-landside access control, PAVA, surveillance, and fiber backbones.',
    },
    {
      id: 'mining',
      name: 'Remote & Mining Camps',
      tagline: 'Remote Sites',
      desc: 'Ruggedized camp Wi-Fi, worker IPTV, gate tracking, and perimeter CCTV.',
    },
  ]

  return (
    <section id="industries" className="bg-background py-24 lg:py-40 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20 lg:mb-32 relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-[2px] w-24 bg-[#f3694f]"></div>
          <span
            className="inline-block px-5 py-2 rounded-full bg-[#f3694f]/10 text-[#f3694f] text-[10px] font-bold tracking-[0.15em] uppercase mb-5"
          >
            Industries We Serve
          </span>
          <h2 className="text-4xl lg:text-7xl font-bold text-[#0A0A0A] leading-tight mb-6 tracking-tight">
            Tailored ELV Infrastructure for Every Sector
          </h2>
          <p className="text-lg lg:text-xl text-[#0A0A0A]/85 max-w-2xl mx-auto leading-relaxed">
            Purpose-built low-voltage solutions for the environments where
            reliability is non-negotiable.
          </p>
        </div>

        {/* Industry Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
          {verticals.map((v) => (
            <article
              key={v.id}
              className="border border-[#0A0A0A]/20 rounded-[32px] bg-background p-8 lg:p-12 shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_32px_64px_rgba(0,0,0,0.08)] hover:-translate-y-3 transition-all duration-500 ease-out group border-l-4 border-[#f3694f]"
            >
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h3 className="font-black text-[#0A0A0A] text-xl lg:text-2xl mb-3 tracking-tight">
                    {v.name}
                  </h3>
                  <p className="text-[11px] font-bold text-[#f3694f] uppercase tracking-[0.15em]">
                    {v.tagline}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#f3694f] text-white flex items-center justify-center group-hover:bg-[#0A0A0A] transition-all duration-500">
                  <span className="text-[12px] font-black">
                    {v.id.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>

              <p className="text-base text-[#0A0A0A]/80 leading-relaxed mb-10 group-hover:text-[#0A0A0A] transition-colors duration-300">
                {v.desc}
              </p>

              <a
                href="/services"
                className="inline-flex items-center justify-center w-full bg-[#f3694f] text-white px-6 py-3.5 rounded-full text-xs font-bold tracking-[0.1em] uppercase hover:bg-[#c94a3f] hover:-translate-y-0.5 transition-all duration-300"
              >
                Explore {v.name} Systems
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
