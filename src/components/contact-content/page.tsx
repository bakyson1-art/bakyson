"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, Phone, MapPin, Clock, ArrowRight, Send, MessageSquare, Smartphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const offices = [
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

const services = [
  "Infotainment & IPTV",
  "Digital Signage",
  "Network & Communication",
  "Safety & Security",
  "Audio Visual",
  "Green Solutions",
  "Back of House",
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

export default function ContactContent() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative pt-20 lg:py-32 pb-24 overflow-hidden" aria-labelledby="contact-heading">
        <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="mb-4">
            <Badge variant="primary">Get in Touch</Badge>
          </motion.div>
          <motion.h1
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl lg:text-6xl font-extrabold leading-tight text-foreground mb-6"
            id="contact-heading"
          >
            Ready to Transform<br />
            Your Business?
          </motion.h1>
          <motion.p
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-lg max-w-2xl mx-auto leading-relaxed text-foreground/70"
          >
            Contact us for a free consultation, project quote, or technical
            support. Our team is ready to help you design and build your ICT solution.
          </motion.p>
        </div>
      </section>

      {submitted ? (
        <section className="py-20 bg-surface" aria-labelledby="message-sent-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-20">
              <motion.div variants={itemVariants} initial="hidden" animate="visible" className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <motion.h2 variants={itemVariants} initial="hidden" animate="visible" className="text-3xl font-bold text-foreground mb-4">
                Message Sent!
              </motion.h2>
              <motion.p variants={itemVariants} initial="hidden" animate="visible" className="text-foreground/60 max-w-xl mx-auto mb-8">
                Thank you for contacting Bakyson. We've received your message and will get back to you within 24 hours.
              </motion.p>
              <Link href="/" className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-hover transition-all">
                Return to Home
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-20 bg-surface" aria-labelledby="contact-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Contact Info */}
              <div className="lg:col-span-4 space-y-8">
                <div>
                  <motion.h2 variants={sectionVariants} initial="hidden" animate="visible" className="text-2xl font-bold text-foreground mb-6">
                    Contact Information
                  </motion.h2>
                  {offices.map((office) => (
                    <div key={office.city} className="p-6 rounded-2xl bg-background border border-border shadow-sm">
                      <h3 className="text-lg font-bold text-foreground mb-2">{office.name}</h3>
                      <p className="text-foreground/60 text-sm mb-3">{office.address}</p>
                      <div className="flex items-start gap-3 mb-2">
                        <Phone className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span className="text-foreground">{office.phone}</span>
                      </div>
                      <div className="flex items-start gap-3 mb-2">
                        <Mail className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span className="text-foreground">{office.email}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span className="text-foreground">{office.hours}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 rounded-2xl bg-foreground text-background">
                  <h3 className="text-lg font-bold mb-4">Live Chat Support</h3>
                  <p className="text-background/60 text-sm mb-6">
                    Need immediate help? Chat with our support team or leave a message and we'll respond quickly.
                  </p>
                  <button className="w-full bg-primary text-background py-3 rounded-xl font-bold hover:bg-primary-hover transition-colors">
                    Open Live Chat
                  </button>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-8">
                <div className="p-8 lg:p-12 rounded-2xl bg-background border border-border shadow-xl">
                  <motion.h2 variants={sectionVariants} initial="hidden" animate="visible" className="text-2xl font-bold text-foreground mb-6">
                    Request a Quote
                  </motion.h2>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSubmitting(true);
                      setTimeout(() => {
                        setSubmitting(false);
                        setSubmitted(true);
                      }, 1500);
                    }}
                    className="space-y-5"
                  >
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-bold text-foreground mb-1">Full Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-background/20 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-foreground"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-foreground mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-background/20 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-foreground"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-bold text-foreground mb-1">Phone Number</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-background/20 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-foreground"
                          placeholder="+254 7XX XXX XXX"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-foreground mb-1">Company</label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-background/20 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-foreground"
                          placeholder="Company name"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-foreground mb-1">Service Interested In</label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-background/20 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-foreground bg-background"
                      >
                        <option value="">Select a service</option>
                        {services.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-foreground mb-1">Message</label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-background/20 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-foreground"
                        placeholder="Tell us about your project..."
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-primary text-background py-4 rounded-xl font-bold text-lg hover:bg-primary-hover transition-all disabled:opacity-50 shadow-lg shadow-primary/25 flex items-center justify-center gap-2"
                    >
                      {submitting ? "Sending..." : "Send Message"}
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
