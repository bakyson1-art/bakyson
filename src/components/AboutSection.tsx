export default function AboutSection() {
  return (
    <section id="about" className="bg-white py-20 lg:py-32 border-t border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-24">
          <span
            className="inline-block px-4 py-1.5 rounded-full bg-[#f3694f]/10 text-[#f3694f] text-xs font-semibold tracking-wider uppercase mb-4"
          >
            About Bakyson
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-black leading-tight mb-6">
            Intelligent ICT Solutions Across Sub-Saharan Africa
          </h2>
          <p className="text-lg text-black/[0.75] max-w-2xl mx-auto leading-relaxed">
            We design and build intelligent ICT solutions across Sub-Saharan
            Africa. From structured cabling to integrated security, we deliver
            reliable infrastructure that powers hospitality, healthcare,
            corporates, and education.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {[
            {
              title: 'Our Mission',
              desc:
                'Enable digital transformation through affordable, cutting-edge ICT.',
            },
            {
              title: 'Our Vision',
              desc:
                'Be the trusted partner for intelligent building systems.',
            },
            {
              title: 'Our Values',
              desc:
                'Integrity, innovation, reliability, and customer focus.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="
                border border-black/10
                rounded-[24px]
                bg-white
                p-6 lg:p-8
                shadow-[0_12px_30px_rgba(0,0,0,0.06)]
                hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]
                transition-all
              "
            >
              <h3 className="font-bold text-black text-lg lg:text-xl mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-black/[0.7] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
