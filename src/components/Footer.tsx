import Link from "next/link";

const currentYear = new Date().getFullYear();

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/BakysonEnt",
    icon: (
      <svg
        className="w-5 h-5 text-white"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06c0 5.23 4.27 9.54 9.54 9.54.22 0 .43-.02.64-.05v-6.63h-3.49v-2.89h3.49V8.47c0-2.5 1.25-3.89 3.06-3.89.54 0 1.06.07 1.25.12v2.87h-2.03c-1.25 0-1.48.57-1.48 1.37v1.74h2.48l-.36 2.89h-2.12v6.63c.25.04.51.07.78.07 5.06 0 9.29-3.89 9.29-9.29 0-5.18-4.02-9.63-9.29-9.63" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/bakysonent/",
    icon: (
      <svg
        className="w-5 h-5 text-white"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.43 9.72 8.13 10.93.17.08.27.19.39.19.05 0 .11-.01.17-.02.71-.12 1.27-.79 1.27-1.61v-2.4c-1.23.18-2.37.47-3.57.47-3.07 0-4.97-2.39-4.97-5.36 0-1.33.42-2.6 1.36-3.63-.35-.22-.79-.87-.39-1.37.37-.47 1.2-.55 2.11-.47 1.07.1 2.19.52 2.19 1.29 0 .74.43 1.32 1.11 1.48 1.12.25 1.92.92 1.92 2.03v2.6c.39-.12.79-.18 1.21-.18 2.23 0 3.26-1.83 3.26-3.62 0-2.02-1.21-3.18-2.73-3.54-1.22-.3-2.46-.47-3.72-.47-3.07 0-4.96 2.39-4.96 5.36 0 1.33.42 2.6 1.36 3.63.35.22.79.87.39 1.37-.37.47-1.2.55-2.11.47-1.07-.1-2.19-.52-2.19-1.29 0-.74-.43-1.32-1.11-1.48-1.12-.25-1.92-.92-1.92-2.03v-2.6c0-.17.03-.31.08-.45.17-.47.75-.82 1.48-.82 2.23 0 3.26 1.83 3.26 3.62 0 2.02 1.21 3.18 2.73 3.54 1.22.3 2.46.47 3.72.47 3.07 0 4.96-2.39 4.96-5.36 0-1.33-.42-2.6-1.36-3.63-.35-.22-.79-.87-.39-1.37.37-.47 1.2-.55 2.11-.47 1.07.1 2.19.52 2.19 1.29 0 .74.43 1.32 1.11 1.48 1.12.25 1.92.92 1.92 2.03v2.6c-.39.12-.79.18-1.21.18-2.23 0-3.26-1.83-3.26-3.62 0-2.02-1.21-3.18-2.73-3.54-1.22-.3-2.46-.47-3.72-.47-3.07 0-4.96 2.39-4.96 5.36 0 1.33.42 2.6 1.36 3.63.35.22.79.87.39 1.37-.37.47-1.2.55-2.11.47-1.07-.1-2.19-.52-2.19-1.29 0-.74-.43-1.32-1.11-1.48-1.12-.25-1.92-.92-1.92-2.03V12c0-5.87 4.77-10.67 10.67-10.67 5.88 0 10.67 4.8 10.67 10.67C22.67 6.63 17.9 12 12 12" />
      </svg>
    ),
  },
];

const officeLinks = [
  {
    name: "Nigeria Office",
    city: "Lagos",
    address: "Victoria Island, Lagos, Nigeria",
    phone: "+234 1 234 5678",
    email: "lagos@bakyson.com",
    hours: "Mon–Fri, 9:00 AM – 5:00 PM WAT",
  },
  {
    name: "Kenya Office (HQ)",
    city: "Nairobi",
    address: "Westlands, Nairobi, Kenya",
    phone: "+254 706 897 778",
    email: "nairobi@bakyson.com",
    hours: "Mon–Fri, 8:00 AM – 6:00 PM EAT",
  },
  {
    name: "South Africa Office",
    city: "Johannesburg",
    address: "Sandton, Johannesburg, South Africa",
    phone: "+27 10 123 4567",
    email: "johannesburg@bakyson.com",
    hours: "Mon–Fri, 8:30 AM – 5:30 PM SAST",
  },
];

const serviceLinks = [
  "Infotainment & IPTV",
  "Digital Signage",
  "Network & Communication",
  "Safety & Security",
  "Audio Visual",
  "Green Solutions",
];

const industryLinks = [
  "Hotels",
  "Hospitals",
  "Corporates",
  "Learning Institutions",
  "Events & Stadia",
  "Telcos & ISPs",
];

const legalLinks = [
  { name: "Terms of Use", href: "/terms-of-use" },
  { name: "Cookie Policy", href: "/cookie-policy" },
  { name: "Privacy Policy", href: "/privacy-policy" },
];

export default function Footer() {
  return (
    <footer className="bg-foreground text-foreground-inverse border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
                B
              </div>
              <span className="font-heading font-extrabold text-lg tracking-tight text-foreground-inverse italic">
                Bakyson
              </span>
            </div>
            <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-xs">
              Reinventing businesses across Sub-Saharan Africa with cutting-edge
              ICT solutions for Hospitality, Healthcare, Corporates, and
              Learning Institutions.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-foreground/50 hover:bg-primary transition-colors flex items-center justify-center"
                  aria-label={social.name}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-primary font-bold text-sm uppercase tracking-wider mb-6">
              Services
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((service, i) => (
                <li key={i}>
                  <Link
                    href={`/services#${service.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    className="text-sm text-foreground-muted hover:text-primary transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-primary font-bold text-sm uppercase tracking-wider mb-6">
              Industries
            </h3>
            <ul className="space-y-3">
              {industryLinks.map((industry, i) => (
                <li key={i}>
                  <Link
                    href={`/industry#${industry.toLowerCase()}`}
                    className="text-sm text-foreground-muted hover:text-primary transition-colors"
                  >
                    {industry}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-primary font-bold text-sm uppercase tracking-wider mb-6">
              Contact
            </h3>
            <ul className="space-y-3">
              {officeLinks.map((office) => (
                <li key={office.city} className="text-sm text-foreground-muted flex items-center gap-3">
                  <div className="flex flex-col">
                    <div className="flex items-start gap-3 mb-2">
                      <svg
                        className="w-4 h-4 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2" />
                      </svg>
                      <span className="text-foreground-inverse">{office.phone}</span>
                    </div>
                    <div className="flex items-start gap-3 mb-2">
                      <svg
                        className="w-4 h-4 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2" />
                      </svg>
                      <span className="text-foreground-inverse">{office.email}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-4 h-4 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-foreground-inverse">{office.hours}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-foreground-muted">
            © {currentYear} Bakyson. All Rights Reserved.
          </p>
          <div className="flex gap-4 text-sm">
            {legalLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-foreground-muted hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
