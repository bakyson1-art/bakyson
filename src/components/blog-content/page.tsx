"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Calendar, Clock, User, Tag, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motionTokens, springs } from "@/lib/motion-tokens";
import { useSafeMotion } from "@/hooks/use-reduced-motion";
import { useState } from "react";

const posts = [
  {
    slug: "smart-hotel-technology-2025",
    title: "Smart Hotel Technology Trends Shaping 2025",
    excerpt:
      "Discover how IPTV, digital signage, and smart room controls are transforming guest experiences in African hotels.",
    category: "Hospitality",
    date: "Nov 15, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    author: "Bakyson Team",
  },
  {
    slug: "nurse-call-systems-healthcare",
    title: "Why Nurse Call Systems Are Critical for Modern Hospitals",
    excerpt:
      "Improving patient safety and nurse response times with integrated nurse call and access control systems.",
    category: "Healthcare",
    date: "Oct 28, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1551082805-c58d867987ab?w=800&q=80",
    author: "Bakyson Team",
  },
  {
    slug: "structured-cabling-corporate",
    title: "Structured Cabling: The Foundation of Corporate IT",
    excerpt:
      "Why every corporate office in Sub-Saharan Africa needs professional structured cabling for reliable connectivity.",
    category: "Corporate",
    date: "Oct 10, 2024",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    author: "Bakyson Team",
  },
  {
    slug: "green-building-solutions-africa",
    title: "Green Building Solutions for African Schools",
    excerpt:
      "How BMS and GRMS are helping learning institutions reduce energy costs and create smarter campuses.",
    category: "Education",
    date: "Sep 20, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    author: "Bakyson Team",
  },
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

export default function BlogContent() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [newsletterError, setNewsletterError] = useState("");

  const safeMotion = useSafeMotion(motionTokens.distance.md);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterSubmitting(true);
    setNewsletterError("");

    if (!newsletterEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail)) {
      setNewsletterError("Please enter a valid email address");
      setNewsletterSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      const data = await res.json();

      if (res.ok) {
        setNewsletterSubmitted(true);
        setNewsletterEmail("");
      } else {
        setNewsletterError(data.error || "Failed to subscribe");
      }
    } catch {
      setNewsletterError("Failed to subscribe. Please try again.");
    } finally {
      setNewsletterSubmitting(false);
    }
  };

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative pt-20 lg:py-32 pb-24 overflow-hidden" aria-labelledby="blog-heading">
        <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="mb-4">
            <Badge variant="primary">Bakyson Insights</Badge>
          </motion.div>
          <motion.h1
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl lg:text-6xl font-extrabold leading-tight text-foreground mb-6"
            id="blog-heading"
          >
            Industry Insights &<br />
            Technology Trends
          </motion.h1>
          <motion.p
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-lg max-w-2xl mx-auto leading-relaxed text-foreground/70"
          >
            Stay updated on the latest in ICT solutions, smart building
            technology, and industry news across Sub-Saharan Africa.
          </motion.p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-20 bg-surface" aria-labelledby="posts-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <motion.div
                key={post.slug}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="group cursor-pointer"
              >
                <Card variant="hover" className="relative rounded-2xl overflow-hidden bg-background border border-border hover:shadow-xl hover:border-primary/50 transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-foreground/40" />
                    <div className="absolute top-4 left-4 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-background/90 backdrop-blur text-xs font-bold text-foreground uppercase tracking-wider">
                      {post.category}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-xs text-foreground/60 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-foreground/60 text-sm leading-relaxed mb-6">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:text-primary-hover transition-colors"
                    >
                      Read article <ArrowRight className="w-3 h-3" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="py-20 bg-foreground" aria-labelledby="newsletter-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-2xl p-8 lg:p-16 text-center shadow-2xl shadow-primary/25 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-background" />
            <span className="text-background font-bold text-sm uppercase tracking-wider">
              Stay Updated
            </span>
            <motion.h2
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              className="text-3xl font-bold text-background mt-2 mb-6"
              id="newsletter-heading"
            >
              Subscribe to Our Newsletter
            </motion.h2>
            <motion.p
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="text-background/80 text-lg max-w-xl mx-auto mb-8"
            >
              Get the latest ICT insights, project updates, and industry news delivered to your inbox.
            </motion.p>
            {newsletterSubmitted ? (
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-background/20 flex items-center justify-center text-background mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <motion.h3 className="text-xl font-bold text-background mb-2">
                  Subscribed!
                </motion.h3>
                <motion.p className="text-background/80">
                  You'll now receive our latest insights and updates.
                </motion.p>
              </motion.div>
            ) : (
              <motion.form
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto"
                onSubmit={handleNewsletterSubmit}
              >
                <div className="flex-1 relative">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={newsletterEmail}
                    onChange={(e) => {
                      setNewsletterEmail(e.target.value);
                      setNewsletterError("");
                    }}
                    className="flex-1 px-6 py-4 rounded-xl border border-background/30 text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none bg-background/50"
                    disabled={newsletterSubmitting}
                    aria-describedby={newsletterError ? "newsletter-error" : undefined}
                    aria-invalid={!!newsletterError}
                  />
                  {newsletterError && (
                    <span id="newsletter-error" className="absolute bottom-[-20px] left-0 text-sm text-destructive" role="alert">
                      {newsletterError}
                    </span>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={newsletterSubmitting}
                  className="bg-background text-primary hover:bg-background/90 hover:text-primary transition-all px-8 py-4"
                  whileTap={{ scale: motionTokens.scale.press }}
                  transition={springs.snappy}
                >
                  {newsletterSubmitting ? "Subscribing..." : "Subscribe"}
                </Button>
              </motion.form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
