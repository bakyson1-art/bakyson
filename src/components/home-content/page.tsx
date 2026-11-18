"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { MapPin, ShieldCheck, ArrowRight, Play, Layers, Users, Award, MapPin as MapPinIcon, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motionTokens, springs } from "@/lib/motion-tokens";
import { useSafeMotion } from "@/hooks/use-reduced-motion";

const services = [
  {
    title: "Infotainment & IPTV",
    subtitle: "Guest entertainment systems",
    description: "Interactive IPTV and digital signage solutions that transform guest experiences in hotels and public spaces.",
    icon: Play,
    features: [
      "Interactive TV & casting",
      "Digital signage management",
      "Content delivery networks",
      "Guest device integration",
      "Analytics & reporting",
    ],
  },
  {
    title: "Network & Communication",
    subtitle: "Connectivity infrastructure",
    description: "HSIA, structured cabling, IP telephony, and network infrastructure for seamless connectivity across campuses.",
    icon: Layers,
    features: [
      "High-speed internet (HSIA)",
      "Structured cabling (Cat6a/Fiber)",
      "IP telephony & PBX",
      "Wi-Fi 6/6E deployment",
      "Network monitoring & NOC",
    ],
  },
  {
    title: "Safety & Security",
    subtitle: "Protection systems",
    description: "Access control, fire evacuation, video surveillance, and voice evacuation systems for maximum protection.",
    icon: ShieldCheck,
    features: [
      "Access control & biometrics",
      "CCTV & video analytics",
      "Fire detection & evacuation",
      "Voice alarm systems",
      "Perimeter intrusion detection",
    ],
  },
  {
    title: "Audio Visual",
    subtitle: "Meeting & event tech",
    description: "Meeting room solutions, video walls, BGM, displays, and projectors for corporate and event spaces.",
    icon: Users,
    features: [
      "Video conferencing rooms",
      "LED video walls & displays",
      "Professional sound systems",
      "Digital signage & wayfinding",
      "Control systems & automation",
    ],
  },
  {
    title: "Green Solutions",
    subtitle: "Energy efficiency",
    description: "BMS, GRMS, and home automation systems that drive energy efficiency and smart building operations.",
    icon: Award,
    features: [
      "Building management (BMS)",
      "Guest room management (GRMS)",
      "Energy monitoring & optimization",
      "IoT sensor networks",
      "Sustainability reporting",
    ],
  },
  {
    title: "Back of House",
    subtitle: "IT hardware & ops",
    description: "Servers, laptops, computers, printers, and IT hardware to power your operations behind the scenes.",
    icon: MapPinIcon,
    features: [
      "Server & storage solutions",
      "Endpoint devices (laptops/PCs)",
      "Print & document management",
      "IT asset management",
      "Helpdesk & support services",
    ],
  },
];

const caseStudies = [
  {
    slug: "jw-marriott-nairobi",
    title: "JW Marriott Nairobi",
    location: "Nairobi, Kenya",
    sector: "Hospitality",
    solution: "Interactive IPTV & Digital Signage",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
  },
  {
    slug: "aga-khan-kisumu",
    title: "Aga Khan University Hospital Kisumu",
    location: "Kisumu, Kenya",
    sector: "Healthcare",
    solution: "Nurse Call & Access Control",
    image: "https://images.unsplash.com/photo-1551082805-c58d867987ab?w=800&q=80",
  },
  {
    slug: "african-reagent-accra",
    title: "African Reagent Accra",
    location: "Accra, Ghana",
    sector: "Corporate",
    solution: "Network Infrastructure & HSIA",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  },
  {
    slug: "hilton-accra-cantonments",
    title: "Hilton Accra Cantonments",
    location: "Accra, Ghana",
    sector: "Hospitality",
    solution: "Audio Visual & Meeting Rooms",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?w=800&q=80",
  },
];

const portfolioProjects = [
  { code: "NG", name: "Nigeria", count: 3, cities: ["Lagos", "Abuja", "Port Harcourt"] },
  { code: "KE", name: "Kenya", count: 3, cities: ["Nairobi", "Kisumu", "Mombasa"] },
  { code: "ZA", name: "South Africa", count: 2, cities: ["Johannesburg", "Cape Town"] },
  { code: "GH", name: "Ghana", count: 2, cities: ["Accra", "Kumasi"] },
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

export default function HomeContent() {
  const safeMotion = useSafeMotion(motionTokens.distance.md);

  return (
    <div className="bg-background text-foreground">
      {/* Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:rounded-md focus:font-bold"
      >
        Skip to main content
      </a>

      {/* Hero Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="relative pt-20 pb-24 lg:pt-32 lg:pb-32 overflow-hidden"
        aria-labelledby="hero-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <Badge variant="primary" className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary-foreground" />
                Now Serving 15+ Countries Across Sub-Saharan Africa
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight text-foreground tracking-tight text-balance" id="hero-heading">
                Reinvent Your Business with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-foreground to-primary">
                  Cutting-Edge ICT Solutions
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-foreground/70 leading-relaxed max-w-xl">
                Bakyson is a Design and Build ELV services provider delivering
                affordable, next-generation ICT systems for Hospitality,
                Healthcare, Corporates, and Learning Institutions across Nigeria,
                Kenya, South Africa, and beyond.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  asChild
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto shadow-lg shadow-primary hover:shadow-primary"
                  whileTap={{ scale: 0.97 }}
                  transition={springs.snappy}
                >
                  <Link href="/services">
                    Explore Services <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto shadow-lg"
                  whileTap={{ scale: 0.97 }}
                  transition={springs.snappy}
                >
                  <Link href="/portal/login">Client Portal</Link>
                </Button>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-background">
                <Image
                  src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80"
                  alt="Modern hotel lobby with digital signage"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 text-foreground-inverse">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold">
                    <MapPin className="w-4 h-4" />
                    JW Marriott, Nairobi
                  </div>
                  <h3 className="mt-2 text-2xl font-bold text-foreground-inverse">Interactive IPTV Deployment</h3>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary p-6 rounded-2xl shadow-2xl border-4 border-background z-10 animate-[pulse_3s_cubic-bezier(0.4,0,0.6,1)_infinite]">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center text-primary font-bold text-xl shadow-lg">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-foreground-inverse font-bold text-lg">99.9%</p>
                    <p className="text-foreground-inverse/90 text-sm">System Uptime SLA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="py-20 bg-foreground border-y border-border"
        aria-labelledby="services-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="primary" className="inline-block mb-4">
              Our Services
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-2" id="services-heading">
              Powering Africa&apos;s Smart Buildings
            </h2>
            <p className="text-foreground-muted mt-4 max-w-2xl mx-auto">
              Comprehensive ELV systems integration across six solution families,
              tailored to your industry and scale.
            </p>
          </div>

          <motion.ul
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0 m-0"
          >
            {services.map((service) => (
              <motion.li
                key={service.title}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                transition={springs.gentle}
              >
                <Card variant="hover">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary transition-colors">
                      <service.icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>
                    <p className="text-foreground-muted text-sm font-medium">{service.subtitle}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground-muted text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground-muted">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link href="/services" className="text-sm font-bold text-primary flex items-center gap-1 hover:text-primary-hover transition-colors">
                      Learn more <ArrowRight className="w-3 h-3" />
                    </Link>
                  </CardFooter>
                </Card>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="py-20 bg-background"
        aria-labelledby="about-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="primary" className="inline-block mb-4">
                About Bakyson
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-2 mb-6" id="about-heading">
                Designing and Building ELV Solutions for Sub-Saharan Africa
              </h2>
              <p className="text-foreground/70 leading-relaxed mb-6">
                Bakyson is a Design and Build ELV services provider with a core
                focus on Hospitality, Healthcare, Corporates, and Learning
                Institutions. We deliver affordable, cutting-edge, and viable ICT
                solutions that transform how businesses operate and how people
                experience technology.
              </p>
              <p className="text-foreground/70 leading-relaxed mb-8">
                With strategic operational hubs in Nigeria, Kenya, and South
                Africa, we serve diverse industry verticals across the continent,
                building lasting partnerships that drive success.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {["Innovation", "Experience", "Knowledge", "Commitment", "Coverage"].map((tag) => (
                  <Badge key={tag} variant="outline" className="gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-background">
                <Image
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&q=80"
                  alt="Network infrastructure and server room"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-foreground/40" />
                <div className="absolute bottom-6 left-6 text-foreground-inverse">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider">
                    Sub-Saharan Africa
                  </span>
                  <h3 className="mt-2 text-xl font-bold text-foreground-inverse">Strategic Coverage</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Case Studies Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="py-20 bg-surface"
        aria-labelledby="case-studies-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-6 mb-12">
            <div>
              <Badge variant="primary" className="inline-block mb-4">
                Featured Work
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-2" id="case-studies-heading">
                Proven Impact Across the Continent
              </h2>
            </div>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary-hover transition-colors"
            >
              View All Case Studies <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <motion.ul
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 list-none p-0 m-0"
          >
            {caseStudies.map((study) => (
              <motion.li
                key={study.slug}
                variants={itemVariants}
                whileHover={{ y: -motionTokens.distance.md }}
                transition={springs.gentle}
              >
                <Card variant="hover">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={study.image}
                      alt={study.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-background/90 backdrop-blur text-xs font-bold text-foreground uppercase tracking-wider">
                      {study.sector}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {study.title}
                    </h3>
                    <p className="text-foreground-muted text-sm mb-4">{study.location}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-primary">
                        {study.solution}
                      </span>
                      <Link
                        href={`/case-studies/${study.slug}`}
                        className="text-xs font-bold text-foreground hover:text-primary transition-colors"
                      >
                        Read story
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </motion.section>

      {/* Portfolio Map Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="py-20 bg-background"
        aria-labelledby="portfolio-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="primary" className="inline-block mb-4">
              Our Portfolio
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-2 mb-6" id="portfolio-heading">
              Where We&apos;ve Built Across Africa
            </h2>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto leading-relaxed">
              Explore our project locations on the interactive map below. From
              Lagos to Nairobi, Johannesburg to Accra — Bakyson is there.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Map Visualization */}
            <div className="lg:col-span-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-background aspect-video min-h-[400px]">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-foreground/5" />
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                  <svg className="w-32 h-32 text-foreground/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                {/* Country markers on map */}
                <div className="relative h-full w-full">
                  {/* Nigeria */}
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-1/4 left-1/5 w-3 h-3 rounded-full bg-primary border-4 border-background shadow-lg"
                    style={{ top: '25%', left: '20%' }}
                    aria-label="Nigeria projects"
                  >
                    <span className="sr-only">Nigeria: 3 projects</span>
                  </motion.button>
                  {/* Kenya */}
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-1/3 left-3/5 w-3 h-3 rounded-full bg-primary border-4 border-background shadow-lg"
                    style={{ top: '33%', left: '60%' }}
                    aria-label="Kenya projects"
                  >
                    <span className="sr-only">Kenya: 3 projects</span>
                  </motion.button>
                  {/* South Africa */}
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute bottom-1/4 left-1/3 w-3 h-3 rounded-full bg-primary border-4 border-background shadow-lg"
                    style={{ top: '75%', left: '33%' }}
                    aria-label="South Africa projects"
                  >
                    <span className="sr-only">South Africa: 2 projects</span>
                  </motion.button>
                  {/* Ghana */}
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-1/2 left-1/3 w-3 h-3 rounded-full bg-primary border-4 border-background shadow-lg"
                    style={{ top: '50%', left: '33%' }}
                    aria-label="Ghana projects"
                  >
                    <span className="sr-only">Ghana: 2 projects</span>
                  </motion.button>
                </div>
                <div className="absolute bottom-6 left-6 right-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                  <div className="bg-background p-4 rounded-xl shadow-lg border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-sm font-bold text-foreground">12 Active Projects</span>
                    </div>
                    <div className="flex gap-2">
                      {portfolioProjects.map((project) => (
                        <span key={project.code} className="px-2 py-1 rounded bg-foreground text-foreground-inverse text-xs font-bold">
                          {project.code}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link
                    href="/portfolio"
                    className="bg-foreground text-primary px-6 py-3 rounded-xl font-bold hover:bg-primary hover:text-foreground-inverse transition-colors shadow-xl text-center"
                  >
                    View Full Portfolio
                  </Link>
                </div>
              </div>
            </div>

            {/* Country Presence Panel */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-foreground">Country Presence</h3>
              <div className="space-y-4">
                {portfolioProjects.map((project) => (
                  <motion.div
                    key={project.code}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-surface p-4 rounded-xl border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider">
                          {project.code}
                        </span>
                        <span className="font-bold text-foreground">{project.name}</span>
                      </div>
                      <Badge variant="primary" className="text-xs">
                        {project.count} Projects
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground-muted">
                      {project.cities.join(", ")}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="py-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-foreground border-4 border-primary" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-foreground rounded-2xl p-8 lg:p-12 shadow-2xl border border-primary/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div className="text-center md:text-left space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Ready to Transform Your Business?
              </h2>
              <p className="text-foreground-muted text-lg max-w-xl md:max-w-none">
                Get a free consultation and custom quote for your ICT project.
                We&apos;ll design, build, and support your solution end to end.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button
                  asChild
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto shadow-lg shadow-primary hover:shadow-primary"
                  whileTap={{ scale: 0.97 }}
                  transition={springs.snappy}
                >
                  <Link href="/contact">Get a Free Quote <ArrowRight className="w-5 h-5" /></Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto shadow-lg"
                  whileTap={{ scale: 0.97 }}
                  transition={springs.snappy}
                >
                  <Link href="/portal/login">Client Portal</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}