"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, ShieldCheck, Users, Globe, Award, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const cornerstones = [
  {
    title: "Innovation",
    description:
      "We embrace the spirit of innovation and strive to redefine what is possible. At Bakyson, innovation is at the heart of everything we do.",
    icon: Layers,
  },
  {
    title: "Experience",
    description:
      "We believe that true value lies in the experience we deliver to clients. Every interaction with our technology leaves a lasting, positive impact.",
    icon: Users,
  },
  {
    title: "Knowledge",
    description:
      "We pride ourselves on being a trusted source of knowledge in our field. Our team is composed of seasoned professionals passionate about continuous learning.",
    icon: Globe,
  },
  {
    title: "Commitment",
    description:
      "Commitment at Bakyson is more than a promise — it is the foundation of everything we do. We are deeply committed to your success.",
    icon: ShieldCheck,
  },
  {
    title: "Coverage",
    description:
      "Bakyson's reach extends across Sub-Saharan Africa with hubs in Nigeria, Kenya, and South Africa, serving diverse industry verticals.",
    icon: Award,
  },
];

const stats = [
  { value: "15+", label: "Countries Served" },
  { value: "500+", label: "Projects Delivered" },
  { value: "3", label: "Regional Hubs" },
  { value: "24/7", label: "Support Available" },
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

export default function AboutContent() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 lg:pt-32 lg:pb-32 overflow-hidden" aria-labelledby="about-heading">
        <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="mb-4"
          >
            <Badge variant="primary">About Bakyson</Badge>
          </motion.div>
          <motion.h1
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl lg:text-6xl font-extrabold leading-tight text-foreground mb-6"
            id="about-heading"
          >
            Designing and Building ELV Solutions<br />
            for Sub-Saharan Africa
          </motion.h1>
          <motion.p
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-lg max-w-2xl mx-auto leading-relaxed text-foreground/70"
          >
            We are a Design and Build ELV services provider delivering
            affordable, cutting-edge ICT solutions that transform businesses
            across Hospitality, Healthcare, Corporates, and Learning
            Institutions.
          </motion.p>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-20 bg-surface" aria-labelledby="who-we-are-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-foreground rounded-2xl blur opacity-20" />
              <div className="relative rounded-2xl overflow-hidden border border-border shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                  alt="Bakyson team and technology"
                  className="w-full h-[400px] object-cover"
                  priority
                />
              </div>
            </div>
            <motion.div variants={sectionVariants} initial="hidden" animate="visible">
              <div className="space-y-6">
                <Badge variant="primary">Who We Are</Badge>
                <h2 className="text-3xl font-bold text-foreground" id="who-we-are-heading">
                  Built on Trust, Delivered with Excellence
                </h2>
                <p className="text-foreground/70 leading-relaxed mb-6">
                  Bakyson was founded with a clear mission: to bring
                  world-class ICT infrastructure to businesses across
                  Sub-Saharan Africa. From luxury hotels in Nairobi to
                  hospitals in Kisumu, from corporate headquarters in Lagos to
                  learning institutions in Accra — we design and build the
                  systems that power modern organizations.
                </p>
                <p className="text-foreground/70 leading-relaxed mb-8">
                  Our core focus is on Hospitality, Healthcare, Corporates, and
                  Learning Institutions — sectors where reliable technology
                  isn't a luxury, it's a necessity.
                </p>
                <Link href="/services" className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary-hover transition-colors">
                  Explore Our Services <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cornerstones Section */}
      <section className="py-20 bg-background" aria-labelledby="cornerstones-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="primary">Our Cornerstones</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-2" id="cornerstones-heading">
              Excellence in Every Detail
            </h2>
          </div>

          <motion.ul
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-3 gap-6 list-none p-0 m-0"
          >
            {cornerstones.map((c) => (
              <motion.li
                key={c.title}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="group cursor-pointer"
              >
                <Card variant="hover" className="p-8">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                    <c.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-foreground/60 leading-relaxed text-sm">
                    {c.description}
                  </p>
                </Card>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-foreground border-y border-border" aria-labelledby="stats-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 border-t border-border pt-12">
            {stats.map((stat) => (
              <motion.div
                key={stat.value}
                variants={itemVariants}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-foreground-muted uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background" aria-labelledby="partner-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-2xl p-8 lg:p-16 text-center shadow-2xl shadow-primary/25 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-foreground" />
            <span className="text-foreground font-bold text-sm uppercase tracking-wider">
              Partner With Us
            </span>
            <h2 className="text-3xl font-bold text-background mt-2 mb-6">
              Let's Build Something Extraordinary Together
            </h2>
            <p className="text-background/80 text-lg max-w-xl mx-auto mb-8">
              Whether you're planning a new hotel, hospital, corporate office,
              or school — we'll design and build the ICT solution that fits
              your needs.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2">
              <Button variant="outline" size="lg" className="text-primary hover:bg-background hover:text-primary">
                Start a Conversation <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
