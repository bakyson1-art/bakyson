export default function AboutSection() {
  return (
    <section id="about" className="bg-background py-24 lg:py-40 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20 lg:mb-32 relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-[2px] w-24 bg-[#f3694f]"></div>
          <span
            className="inline-block px-5 py-2 rounded-full bg-[#f3694f]/10 text-[#f3694f] text-[10px] font-bold tracking-[0.15em] uppercase mb-5"
          >
            About Bakyson
          </span>
          <h2 className="text-4xl lg:text-7xl font-bold text-[#0A0A0A] leading-tight mb-6 tracking-tight">
            Intelligent ICT Solutions Across Sub-Saharan Africa
          </h2>
          <p className="text-lg lg:text-xl text-[#0A0A0A]/85 max-w-2xl mx-auto leading-relaxed">
            We design and build intelligent ICT solutions across Sub-Saharan
            Africa. From structured cabling to integrated security, we deliver
            reliable infrastructure that powers hospitality, healthcare,
            corporates, and education.
          </p>
        </div>

        {/* Mission / Vision / Values Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          {[
            {
              title: 'Our Mission',
              desc:
                'Enable digital transformation through affordable, cutting-edge ICT.',
              accent: 'border-[#f3694f] bg-[#f3694f]/5',
              iconBg: 'bg-[#f3694f]/10',
              iconHover: 'group-hover:bg-[#f3694f]',
            },
            {
              title: 'Our Vision',
              desc:
                'Be the trusted partner for intelligent building systems.',
              accent: 'border-[#f3694f]/20 bg-[#f3694f]/3',
              iconBg: 'bg-[#f3694f]/5',
              iconHover: 'group-hover:bg-[#f3694f]/20',
            },
            {
              title: 'Our Values',
              desc:
                'Integrity, innovation, reliability, and customer focus.',
              accent: 'border-[#f3694f] bg-[#f3694f]/8',
              iconBg: 'bg-[#f3694f]/15',
              iconHover: 'group-hover:bg-[#f3694f]/30',
            },
          ].map((item) => (
            <div
              key={item.title}
              className={`
                border border-[#0A0A0A]/20
                rounded-[32px]
                bg-background
                p-8 lg:p-12
                shadow-[0_20px_40px_rgba(0,0,0,0.04)]
                hover:shadow-[0_32px_64px_rgba(0,0,0,0.08)]
                hover:-translate-y-3
                transition-all duration-500 ease-out
                group
                ${item.accent}
              `}
            >
              <div className="w-12 h-12 rounded-full ${item.iconBg} text-[#f3694f] flex items-center justify-center mb-6 ${item.iconHover} transition-all duration-500">
                <span className="text-[12px] font-black tracking-tight">
                  {item.title.charAt(0)}
                </span>
              </div>
              <h3 className="font-black text-[#0A0A0A] text-xl lg:text-2xl mb-4 group-hover:text-[#f3694f] transition-colors duration-300 tracking-tight">
                {item.title}
              </h3>
              <p className="text-base text-[#0A0A0A]/75 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
