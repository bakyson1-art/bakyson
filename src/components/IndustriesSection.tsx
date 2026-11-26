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
    <section id="industries" className="bg-white py-20 lg:py-32 border-t border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-24">
          <span
            className="inline-block px-4 py-1.5 rounded-full bg-[#f3694f]/10 text-[#f3694f] text-xs font-semibold tracking-wider uppercase mb-4"
          >
            Industries We Serve
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-black leading-tight mb-6">
            Tailored ELV Infrastructure for Every Sector
          </h2>
          <p className="text-lg text-black/[0.75] max-w-2xl mx-auto leading-relaxed">
            Purpose-built low-voltage solutions for the environments where
            reliability is non-negotiable.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {verticals.map((v) => (
            <article
              key={v.id}
              className="
                border border-black/10
                rounded-[24px]
                bg-white
                p-6 lg:p-8
                shadow-[0_12px_30px_rgba(0,0,0,0.06)]
                hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]
                transition-all
                group
              "
            >
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h3 className="text-xl font-bold text-black mb-1">
                    {v.name}
                  </h3>
                  <p className="text-xs font-medium text-[#f3694f] uppercase tracking-wider">
                    {v.tagline}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#f3694f]/10 flex items-center justify-center text-[#f3694f] group-hover:bg-[#f3694f] group-hover:text-white transition-colors">
                  <span className="text-[10px] font-bold">
                    {v.id.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>

              <p className="text-sm text-black/[0.85] leading-relaxed mb-8">
                {v.desc}
              </p>

              <a
                href="/services"
                className="inline-flex items-center justify-center w-full bg-[#f3694f] text-white px-5 py-3 rounded-full text-sm font-semibold hover:bg-black transition-colors"
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
