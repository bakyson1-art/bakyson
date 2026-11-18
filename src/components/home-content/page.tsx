"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { MapPin, ShieldCheck, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motionTokens, springs } from "@/lib/motion-tokens";
import { useSafeMotion } from "@/hooks/use-reduced-motion";

export default function HomeContent() {
  const safeMotion = useSafeMotion(motionTokens.distance.md);

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
    </div>
  );
}