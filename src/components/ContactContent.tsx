"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, Phone, MapPin, Clock, ArrowRight, Send, MessageSquare, Smartphone, CheckCircle } from "lucide-react";

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

  const services = [
    "Infotainment & IPTV",
    "Digital Signage",
    "Network & Communication",
    "Safety & Security",
    "Audio Visual",
    "Green Solutions",
    "Back of House",
  ];

  return (
    <div className="bg-bakyson-white">
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-bakyson-orange rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-bakyson-orange font-bold text-sm uppercase tracking-wider inline-block mb-4">
            Get in Touch
          </span>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-bakyson-black leading-tight mb-6">
            Ready to Transform<br />
            Your Business?
          </h1>
          <p className="text-bakyson-black/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Contact us for a free consultation, project quote, or technical
            support. Our team is ready to help you design and build your ICT solution.
          </p>
        </div>
      </section>

      <section className="py-20 bg-bakyson-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {submitted ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 mx-auto mb-6">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-bakyson-black mb-4">
                Message Sent!
              </h2>
              <p className="text-bakyson-black/60 max-w-xl mx-auto mb-8">
                Thank you for contacting Bakyson. We've received your message
                and will get back to you within 24 hours.
              </p>
              <Link
                href="/"
                className="bg-bakyson-orange text-white px-8 py-4 rounded-xl font-bold hover:bg-bakyson-orange-dark transition-all"
              >
                Return to Home
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-bakyson-black mb-6">
                    Contact Information
                  </h2>
                  {offices.map((office) => (
                    <div
                      key={office.city}
                      className="p-6 rounded-2xl bg-white border border-black/10 shadow-sm"
                    >
                      <h3 className="text-lg font-bold text-bakyson-black mb-2">
                        {office.name}
                      </h3>
                      <p className="text-bakyson-black/60 text-sm mb-3">
                        {office.address}
                      </p>
                      <div className="flex items-start gap-3 mb-2">
                        <Phone className="w-4 h-4 text-bakyson-orange mt-0.5 shrink-0" />
                        <span className="text-sm text-bakyson-black">
                          {office.phone}
                        </span>
                      </div>
                      <div className="flex items-start gap-3 mb-2">
                        <Mail className="w-4 h-4 text-bakyson-orange mt-0.5 shrink-0" />
                        <span className="text-sm text-bakyson-black">
                          {office.email}
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="w-4 h-4 text-bakyson-orange mt-0.5 shrink-0" />
                        <span className="text-sm text-bakyson-black">
                          {office.hours}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 rounded-2xl bg-bakyson-black text-white">
                  <h3 className="text-lg font-bold mb-4">Live Chat Support</h3>
                  <p className="text-gray-300 text-sm mb-6">
                    Need immediate help? Chat with our support team or leave a
                    message and we'll respond quickly.
                  </p>
                  <button className="w-full bg-bakyson-orange text-white py-3 rounded-xl font-bold hover:bg-bakyson-orange-dark transition-colors">
                    Open Live Chat
                  </button>
                </div>
              </div>

              <div className="lg:col-span-8">
                <div className="p-8 lg:p-12 rounded-2xl bg-white border border-black/10 shadow-xl">
                  <h2 className="text-2xl font-bold text-bakyson-black mb-6">
                    Request a Quote
                  </h2>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setSubmitting(true);
                      try {
                        const res = await fetch("/api/contact", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(formData),
                        });
                        const data = await res.json();
                        if (res.ok) {
                          setSubmitted(true);
                        } else {
                          setSubmitting(false);
                          alert(data.error || "Failed to send message");
                        }
                      } catch (err) {
                        setSubmitting(false);
                        alert("Failed to send message. Please try again.");
                      }
                    }}
                    className="space-y-5"
                  >
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-bold text-bakyson-black mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-black/20 focus:ring-2 focus:ring-bakyson-orange focus:border-bakyson-orange outline-none text-bakyson-black"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-bakyson-black mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-black/20 focus:ring-2 focus:ring-bakyson-orange focus:border-bakyson-orange outline-none text-bakyson-black"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-bold text-bakyson-black mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-black/20 focus:ring-2 focus:ring-bakyson-orange focus:border-bakyson-orange outline-none text-bakyson-black"
                          placeholder="+254 7XX XXX XXX"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-bakyson-black mb-1">
                          Company
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) =>
                            setFormData({ ...formData, company: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-black/20 focus:ring-2 focus:ring-bakyson-orange focus:border-bakyson-orange outline-none text-bakyson-black"
                          placeholder="Company name"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-bakyson-black mb-1">
                        Service Interested In
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) =>
                          setFormData({ ...formData, service: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-black/20 focus:ring-2 focus:ring-bakyson-orange focus:border-bakyson-orange outline-none text-bakyson-black bg-white"
                      >
                        <option value="">Select a service</option>
                        {services.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-bakyson-black mb-1">
                        Message
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-black/20 focus:ring-2 focus:ring-bakyson-orange focus:border-bakyson-orange outline-none text-bakyson-black"
                        placeholder="Tell us about your project..."
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-bakyson-orange text-white py-4 rounded-xl font-bold text-lg hover:bg-bakyson-orange-dark transition-all disabled:opacity-50 shadow-lg shadow-orange/25 flex items-center justify-center gap-2"
                    >
                      {submitting ? "Sending..." : "Send Message"}
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
