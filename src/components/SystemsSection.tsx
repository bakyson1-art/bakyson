export default function SystemsSection() {
  const verticals = [
    {
      id: 'hospitality',
      name: 'Hospitality',
      tagline: 'Hotels & Resorts',
      systems: ['Guest Wi-Fi (HSIA)', 'In-Room IPTV', 'Room Automation', 'Security & Access Control'],
      cta: 'Discuss Hospitality Project',
    },
    {
      id: 'healthcare',
      name: 'Healthcare',
      tagline: 'Medical Facilities',
      systems: ['Nurse Call Systems', 'Access Control', 'Fire Alarms', 'Clinical Networks'],
      cta: 'Talk to Our Engineers',
    },
    {
      id: 'corporate',
      name: 'Corporate & Commercial',
      tagline: 'Office & CRE Buildings',
      systems: ['BMS Integration', 'Biometric Access', 'CCTV', 'Boardroom AV'],
      cta: 'Request a Site Assessment',
    },
    {
      id: 'learning',
      name: 'Learning Institutions',
      tagline: 'Schools & Campuses',
      systems: ['High-Density Wi-Fi', 'Fiber Backbones', 'Classroom AV', 'Perimeter Access'],
      cta: 'Plan a Campus Upgrade',
    },
    {
      id: 'aviation',
      name: 'Aviation',
      tagline: 'Airports & Terminals',
      systems: ['Access Control', 'PAVA', 'Surveillance', 'Redundant Fiber Backbones'],
      cta: 'Speak With an Aviation Lead',
    },
    {
      id: 'mining',
      name: 'Remote & Mining Camps',
      tagline: 'Remote Sites',
      systems: ['Camp Wi-Fi', 'Worker IPTV', 'Gate Tracking', 'Perimeter CCTV'],
      cta: 'Scope Your Remote Site',
    },
  ]

  return (
    <section id="systems" className="bg-background py-24 lg:py-40 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20 lg:mb-32 relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-[2px] w-24 bg-[#f3694f]"></div>
          <span className="inline-block px-5 py-2 rounded-full bg-[#f3694f]/10 text-[#f3694f] text-[10px] font-bold tracking-[0.15em] uppercase mb-5">
            Our Systems
          </span>
          <h2 className="text-4xl lg:text-7xl font-bold text-[#0A0A0A] leading-tight mb-6 tracking-tight">
            Extra Low Voltage ICT Systems
          </h2>
          <p className="text-lg lg:text-xl text-[#0A0A0A]/85 max-w-2xl mx-auto leading-relaxed">
            Purpose-built low-voltage infrastructure for mission-critical
            environments. Every system is designed, installed, and supported by
            one partner.
          </p>
        </div>

        {/* System Vertical Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
          {verticals.map((v) => (
            <article key={v.id} className="border border-[#0A0A0A]/20 rounded-[32px] bg-background p-8 lg:p-12 shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_32px_64px_rgba(0,0,0,0.08)] hover:-translate-y-3 transition-all duration-500 ease-out group border-l-4 border-[#f3694f]">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h3 className="font-black text-[#0A0A0A] text-xl lg:text-2xl mb-3 tracking-tight">{v.name}</h3>
                  <p className="text-[11px] font-bold text-[#f3694f] uppercase tracking-[0.15em]">{v.tagline}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#f3694f] text-white flex items-center justify-center group-hover:bg-[#0A0A0A] transition-all duration-500">
                  <span className="text-[12px] font-black">{v.id.charAt(0).toUpperCase()}</span>
                </div>
              </div>

              <ul className="space-y-3.5 mb-10">
                {v.systems.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-sm text-[#0A0A0A]/85 leading-relaxed group-hover:text-[#0A0A0A] transition-colors duration-300">
                    <span className="w-2 h-2 rounded-full bg-[#f3694f] shrink-0 mt-[7px]" />
                    {s}
                  </li>
                ))}
              </ul>

              <a href="#contact" className="inline-flex items-center justify-center w-full bg-[#f3694f] text-white px-6 py-3.5 rounded-full text-xs font-bold tracking-[0.1em] uppercase hover:bg-[#c94a3f] hover:-translate-y-0.5 transition-all duration-300">
                {v.cta}
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </article>
          ))}
        </div>

        {/* Trust Bar */}
        <div className="mt-24 lg:mt-32 border-t border-[#0A0A0A]/20 pt-20 lg:pt-28">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
            <div className="text-center sm:text-left">
              <p className="text-[11px] font-bold text-[#f3694f] uppercase tracking-[0.15em] mb-3">Trusted across sectors</p>
              <p className="text-2xl font-black text-[#0A0A0A] tracking-tight">150+ installations nationwide</p>
            </div>
            <div className="flex items-center gap-10 text-sm text-[#0A0A0A]/60">
              <span className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#f3694f]" />
                Hotels · Schools · Corporates · Mining
              </span>
              <span className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#f3694f]" />
                Residential · Telecoms · ISPs
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
