"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { MapPin, ShieldCheck, ArrowRight, Play, Layers, Users, Award, MapPin as MapPinIcon } from "lucide-react";
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

export default function HomeContent() {
  const safeMotion = useSafeMotion(motionTokens.distance.md);

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

  return (
    <div className="bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:rounded-md focus:font-bold"
      >
        Skip to main content
      </a>

      {/* Hero Section */}
      <section
        id="main-content"
        className="relative pt-24 pb-32 lg:pt-40 lg:pb-40 overflow-hidden"
        aria-labelledby="hero-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-6">
              <motion.div
                variants={safeMotion}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-2"
              >
                <Badge variant="primary" className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary-foreground" />
                  Now Serving 15+ Countries
                </Badge>
              </motion.div>

              <motion.h1
                variants={safeMotion}
                initial="hidden"
                animate="visible"
                className="text-5xl lg:text-7xl font-extrabold leading-[1.1] text-foreground tracking-tight text-balance"
                id="hero-heading"
              >
                Reinvent Your Business with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-foreground to-primary">
                  Cutting-Edge ICT Solutions
                </span>
              </motion.h1>

              <motion.p
                variants={safeMotion}
                initial="hidden"
                animate="visible"
                className="text-lg lg:text-xl text-foreground/70 leading-relaxed max-w-xl mt-6"
              >
                Bakyson is a Design and Build ELV services provider delivering
                affordable, next-generation ICT systems for Hospitality,
                Healthcare, Corporates, and Learning Institutions across Nigeria,
                Kenya, South Africa, and beyond.
              </motion.p>

              <motion.div
                variants={safeMotion}
                initial="hidden"
                animate="visible"
                className="flex flex-col sm:flex-row gap-4 mt-8"
              >
                <Button
                  asChild
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto shadow-lg shadow-primary hover:shadow-primary"
                  whileTap={{ scale: motionTokens.scale.press }}
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
                  whileTap={{ scale: motionTokens.scale.press }}
                  transition={springs.snappy}
                >
                  <Link href="/portal/login">Client Portal</Link>
                </Button>
              </motion.div>
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
                  <h3 className="mt-2 text-2xl font-bold text-foreground-inverse">
                    Interactive IPTV Deployment
                  </h3>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary p-6 rounded-2xl shadow-2xl border-4 border-background z-10 animate-[pulse_3s_cubic-bezier(0.4,0,0.6,1)_infinite]">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center text-primary font-bold text-xl shadow-lg">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-foreground-inverse font-bold text-lg">
                      99.9%
                    </p>
                    <p className="text-foreground-inverse/90 text-sm">
                      System Uptime SLA
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        className="py-24 bg-foreground border-y border-border"
        aria-labelledby="services-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge variant="primary" className="inline-block mb-4">
              Our Services
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-foreground mb-6" id="services-heading">
              Powering Africa&apos;s Smart Buildings
            </h2>
            <p className="text-lg text-foreground-muted max-w-2xl mx-auto leading-relaxed">
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
                whileHover={{ y: -8 }}
                transition={springs.gentle}
              >
                <Card variant="hover">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary transition-colors">
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
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1 shrink-0" />
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
      </section>
    </div>
  );
}