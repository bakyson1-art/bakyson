'use client'

import { ArrowUpRight, Mail, MapPin, Phone, X } from 'lucide-react'
import { useState } from 'react'

export default function ContactSection() {
  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  })

  const serviceOptions = [
    { value: '', label: 'Select a service (optional)' },
    { value: 'networks', label: 'Networks & Communication' },
    { value: 'audio-visual', label: 'Audio Visual' },
    { value: 'safety-security', label: 'Safety & Security' },
    { value: 'infotainment', label: 'Infotainment (IPTV, Digital Signage)' },
    { value: 'green-solutions', label: 'Green Solutions & Automation' },
    { value: 'back-of-house', label: 'Back of House (IT Hardware)' },
  ]

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setOpen(true)
        setFormData({ name: '', email: '', phone: '', company: '', service: '', message: '' })
      } else {
        alert('Failed to send message. Please try again.')
      }
    } catch {
      alert('Failed to send message. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="bg-background py-24 lg:py-40 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20 lg:mb-32 relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-[2px] w-24 bg-[#f3694f]"></div>
          <span className="inline-block px-5 py-2 rounded-full bg-[#f3694f]/10 text-[#f3694f] text-[10px] font-bold tracking-[0.15em] uppercase mb-5">
            Get in Touch
          </span>
          <h2 className="text-4xl lg:text-7xl font-bold text-[#0A0A0A] leading-tight mb-6 tracking-tight">
            Ready to upgrade your infrastructure?
          </h2>
          <p className="text-lg lg:text-xl text-[#0A0A0A]/85 max-w-2xl mx-auto leading-relaxed">
            Get a free consultation with our ICT specialists. We&apos;ll respond
            within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="space-y-12">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-full bg-[#f3694f]/10 text-[#f3694f] flex items-center justify-center shrink-0">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] text-lg mb-2">Call Us</h3>
                <p className="text-[#0A0A0A]/80 mt-1">
                  <a href="tel:+254706897778" className="text-[#f3694f] hover:underline font-medium transition-colors">
                    +254 706 897 778
                  </a>
                </p>
                <p className="text-sm text-[#0A0A0A]/60 mt-2">24/7 support for existing clients</p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-full bg-[#f3694f]/10 text-[#f3694f] flex items-center justify-center shrink-0">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] text-lg mb-2">Email Us</h3>
                <p className="text-[#0A0A0A]/80 mt-1">
                  <a href="mailto:hello@bakyson.io" className="text-[#f3694f] hover:underline font-medium transition-colors">
                    hello@bakyson.io
                  </a>
                </p>
                <p className="text-sm text-[#0A0A0A]/60 mt-2">Sales and general inquiries</p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-full bg-[#f3694f]/10 text-[#f3694f] flex items-center justify-center shrink-0">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] text-lg mb-2">Our Hubs</h3>
                <ul className="text-sm text-[#0A0A0A]/60 space-y-2">
                  <li className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#f3694f]" />
                    East Africa — Kenya
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#f3694f]" />
                    West Africa — Nigeria
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#f3694f]" />
                    Southern Africa — South Africa
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border border-[#0A0A0A]/20 rounded-[32px] bg-background p-8 lg:p-16 shadow-[0_20px_40px_rgba(0,0,0,0.04)] border-l-4 border-[#f3694f]">
            <div className="flex items-center gap-2.5 mb-10">
              <span className="w-3 h-3 rounded-full bg-[#f3694f]" />
              <h2 className="text-xl font-black text-[#0A0A0A] tracking-tight">Send us a Message</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-[10px] font-bold text-[#0A0A0A]/70 uppercase tracking-[0.15em]">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3.5 rounded-lg border border-[#0A0A0A]/20 text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#f3694f] transition-all duration-200"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-[10px] font-bold text-[#0A0A0A]/70 uppercase tracking-[0.15em]">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3.5 rounded-lg border border-[#0A0A0A]/20 text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#f3694f] transition-all duration-200"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-[10px] font-bold text-[#0A0A0A]/70 uppercase tracking-[0.15em]">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+254 7XX XXX XXX"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 rounded-lg border border-[#0A0A0A]/20 text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#f3694f] transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="company" className="block text-[10px] font-bold text-[#0A0A0A]/70 uppercase tracking-[0.15em]">
                  Company / Organization
                </label>
                <input
                  id="company"
                  name="company"
                  placeholder="e.g. Hilton Accra"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 rounded-lg border border-[#0A0A0A]/20 text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#f3694f] transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="service" className="block text-[10px] font-bold text-[#0A0A0A]/70 uppercase tracking-[0.15em]">
                  Service Interested In
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 rounded-lg border border-[#0A0A0A]/20 text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#f3694f] transition-all duration-200 bg-background"
                >
                  {serviceOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="block text-[10px] font-bold text-[#0A0A0A]/70 uppercase tracking-[0.15em]">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full min-h-[140px] px-5 py-3.5 rounded-lg border border-[#0A0A0A]/20 text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#f3694f] transition-all duration-200"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#f3694f] text-white px-8 py-4 rounded-full text-xs font-bold tracking-[0.1em] uppercase hover:bg-[#c94a3f] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60"
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
              <p className="mt-4 text-[10px] text-[#0A0A0A]/60">
                By submitting this form, you agree to be contacted by Bakyson
                about your inquiry.
              </p>
            </form>
          </div>
        </div>

        {open && (
          <div role="alert" className="fixed bottom-6 right-6 bg-[#0A0A0A] text-white px-6 py-4 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.3)] flex items-center gap-3 z-50">
            <div className="w-10 h-10 rounded-full bg-[#f3694f] text-[#0A0A0A] flex items-center justify-center">
              <ArrowUpRight className="h-5 w-5" />
            </div>
            <div>
              <div className="font-bold text-white">Message sent</div>
              <div className="text-xs text-white/80">We&apos;ll get back to you within 24 hours.</div>
            </div>
            <button onClick={() => setOpen(false)} className="ml-2 text-white/60 hover:text-[#f3694f] transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
