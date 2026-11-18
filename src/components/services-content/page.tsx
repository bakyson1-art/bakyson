"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ChevronRight, Play, Layers, ShieldCheck, Users, Award, MapPin, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motionTokens, springs } from "@/lib/motion-tokens";

const serviceCategories = [
  {
    id: "infotainment",
    title: "Infotainment",
    subtitle: "Interactive IPTV & Digital Signage",
    description:
      "Transform guest experiences with interactive IPTV and digital signage solutions designed for hotels, hospitals, and public spaces. Deliver entertainment, information, and branding directly to every screen.",
    features: [
      "Interactive IPTV systems",
      "Digital signage networks",
      "Guest room entertainment",
      "Content management systems",
      "Wayfinding displays",
    ],
    icon: Play,
  },
  {
    id: "networks",
    title: "Network & Communication",
    subtitle: "HSIA, Structured Cabling & IP Telephony",
    description:
      "Seamless connectivity across campuses with HSIA (High Speed Internet Access), structured cabling, IP telephony, and network infrastructure built for reliability and scale.",
    features: [
      "High-speed internet access (HSIA)",
      "Structured cabling",
      "IP telephony solutions",
      "Network infrastructure",
      "Wi-Fi deployment",
    ],
    icon: Layers,
  },
  {
    id: "safety",
    title: "Safety & Security",
    subtitle: "Access Control, Fire & Video Surveillance",
    description:
      "Maximum protection with access control, fire evacuation, video surveillance, and voice evacuation systems. Keep people and property safe with integrated security technology.",
    features: [
      "Access control systems",
      "Fire alarm & evacuation",
      "Video surveillance (CCTV)",
      "Voice evacuation",
      "Locks & safes",
    ],
    icon: ShieldCheck,
  },
  {
    id: "audio-visual",
    title: "Audio Visual",
    subtitle: "Meeting Rooms, Video Walls & Displays",
    description:
      "Professional AV solutions for meeting rooms, boardrooms, event spaces, and public areas. Video walls, BGM, displays, and projectors that impress and perform.",
    features: [
      "Meeting room solutions",
      "Video walls",
      "Background music (BGM)",
      "Displays & projectors",
      "Wireless presentation",
    ],
    icon: Users,
  },
  {
    id: "green-solutions",
    title: "Green Solutions",
    subtitle: "BMS, GRMS & Home Automation",
    description:
      "Energy-efficient building management with BMS (Building Management Systems), GRMS (Guest Room Management Systems), and home automation. Smart, sustainable, and cost-effective.",
    features: [
      "Building Management Systems",
      "Guest Room Management Systems",
      "Home automation",
      "Lighting & control",
      "Energy monitoring",
    ],
    icon: Award,
  },
  {
    id: "back-of-house",
    title: "Back of House",
    subtitle: "Servers, Laptops, Computers & Printers",
    description:
      "Reliable IT hardware to power your operations behind the scenes. Servers, laptops, computers, printers, and accessories for smooth day-to-day functioning.",
    features: [
      "Servers & data storage",
      "Laptops & computers",
      "Printers & scanners",
      "IT hardware procurement",
      "Technical support",
    ],
    icon: MapPin,
  },
];

const industries = [
  { name: "Hotels", icon: MapPin },
  { name: "Hospitals", icon: ShieldCheck },
  { name: "Corporates", icon: Users },
  { name: "Learning Institutions", icon: Award },
  { name: "Events & Stadia", icon: MapPin },
  { name: "Telcos & ISPs", icon: Layers },
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

export default function ServicesContent() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative pt-20 lg:py-32 pb-24 overflow-hidden" aria-labelledby="services-heading">
        <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="mb-4">
            <Badge variant="primary">Our Services</Badge>
          </motion.div>
          <motion.h1
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl lg:text-6xl font-extrabold leading-tight text-foreground mb-6"
            id="services-heading"
          >
            Affordable, Cutting-Edge<br />
            ICT Solutions for Africa
          </motion.h1>
          <motion.p
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-lg max-w-2xl mx-auto leading-relaxed text-foreground/70"
          >
            Comprehensive ELV systems integration across six solution families,
            tailored to your industry and scale. From concept to execution,
            we design, build, and support your technology end to end.
          </motion.p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-surface" aria-labelledby="explore-services-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="primary" className="inline-block mb-4">
              Our Services
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-2" id="explore-services-heading">
              Powering Africa&apos;s Smart Buildings
            </h2>
            <p className="text-foreground-muted mt-4 max-w-2xl mx-auto">
              Comprehensive ELV systems integration across six solution families,
              tailored to your industry and scale.
            </p>
          </div>

          <motion.ul variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0 m-0">
            {serviceCategories.map((svc) => (
              <motion.li
                key={svc.id}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                transition={springs.gentle}
              >
                <Card variant="hover">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary transition-colors">
                      <svc.icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {svc.title}
                    </CardTitle>
                    <p className="text-foreground-muted text-sm font-medium">{svc.subtitle}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground-muted text-sm leading-relaxed mb-4">
                      {svc.description}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {svc.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground-muted">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
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

      {/* Industries Section */}
      <section className="py-20 bg-background" aria-labelledby="industries-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <Badge variant="primary">Industries We Serve</Badge>
              <h2 className="text-3xl font-bold text-foreground" id="industries-heading">
                Tailored Solutions for Every Sector
              </h2>
              <p className="text-foreground/60 leading-relaxed">
                We understand that every industry has unique technology needs.
                That's why we customize our ICT solutions for each sector we
                serve across Sub-Saharan Africa.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {industries.map((ind) => (
                <div key={ind.name} className="flex items-center gap-3 p-4 rounded-xl bg-surface border border-border hover:bg-black/5 hover:border-primary/50 transition-colors cursor-pointer">
                  <ind.icon className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm font-medium text-foreground">{ind.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-foreground" aria-labelledby="cta-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-2xl p-8 lg:p-16 text-center shadow-2xl shadow-primary/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-foreground" />
            <span className="text-background font-bold text-sm uppercase tracking-wider">
              Ready to Get Started?
            </span>
            <h2 className="text-3xl font-bold text-background mt-2 mb-6" id="cta-heading">
              Let's Design Your ICT Solution
            </h2>
            <p className="text-background/80 text-lg max-w-xl mx-auto mb-8">
              Tell us about your project and we'll provide a custom proposal
              with pricing and timeline.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2">
              <Button variant="outline" size="lg" className="text-primary hover:bg-background hover:text-primary" whileTap={{ scale: motionTokens.scale.press }} transition={springs.snappy}>
                Contact Sales <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
