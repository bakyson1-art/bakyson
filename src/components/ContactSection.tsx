'use client'

import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
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
    <section id="contact" className="bg-white py-20 lg:py-32 border-t border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-24">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#f3694f]/10 text-[#f3694f] text-xs font-semibold tracking-wider uppercase mb-4">
            Get in Touch
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-black leading-tight mb-6">
            Ready to upgrade your infrastructure?
          </h2>
          <p className="text-lg text-black/[0.75] max-w-2xl mx-auto leading-relaxed">
            Get a free consultation with our ICT specialists. We&apos;ll respond
            within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#f3694f]/10 flex items-center justify-center text-[#f3694f] shrink-0">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-black">Call Us</h3>
                <p className="text-black/[0.7] mt-1">
                  <a href="tel:+254706897778" className="text-[#f3694f] hover:underline font-medium">
                    +254 706 897 778
                  </a>
                </p>
                <p className="text-sm text-black/[0.6] mt-1">24/7 support for existing clients</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#f3694f]/10 flex items-center justify-center text-[#f3694f] shrink-0">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-black">Email Us</h3>
                <p className="text-black/[0.7] mt-1">
                  <a href="mailto:hello@bakyson.io" className="text-[#f3694f] hover:underline font-medium">
                    hello@bakyson.io
                  </a>
                </p>
                <p className="text-sm text-black/[0.6] mt-1">Sales and general inquiries</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#f3694f]/10 flex items-center justify-center text-[#f3694f] shrink-0">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-black">Our Hubs</h3>
                <ul className="text-sm text-black/[0.6] space-y-1">
                  <li>East Africa — Kenya</li>
                  <li>West Africa — Nigeria</li>
                  <li>Southern Africa — South Africa</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border border-black/10 rounded-[24px] bg-white p-6 lg:p-8 shadow-[0_12px_30px_rgba(0,0,0,0.06)]">
            <h2 className="text-xl font-bold text-black mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-xs font-semibold text-black/[0.8] uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-black/20 text-black focus:outline-none focus:ring-2 focus:ring-[#f3694f] transition"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-xs font-semibold text-black/[0.8] uppercase tracking-wider">
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
                    className="w-full px-4 py-3 rounded-lg border border-black/20 text-black focus:outline-none focus:ring-2 focus:ring-[#f3694f] transition"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-xs font-semibold text-black/[0.8] uppercase tracking-wider">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+254 7XX XXX XXX"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-black/20 text-black focus:outline-none focus:ring-2 focus:ring-[#f3694f] transition"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="company" className="block text-xs font-semibold text-black/[0.8] uppercase tracking-wider">
                  Company / Organization
                </label>
                <input
                  id="company"
                  name="company"
                  placeholder="e.g. Hilton Accra"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-black/20 text-black focus:outline-none focus:ring-2 focus:ring-[#f3694f] transition"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="service" className="block text-xs font-semibold text-black/[0.8] uppercase tracking-wider">
                  Service Interested In
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-black/20 text-black focus:outline-none focus:ring-2 focus:ring-[#f3694f] transition bg-white"
                >
                  {serviceOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="block text-xs font-semibold text-black/[0.8] uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full min-h-[120px] px-4 py-3 rounded-lg border border-black/20 text-black focus:outline-none focus:ring-2 focus:ring-[#f3694f] transition"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#f3694f] text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-black transition-colors disabled:opacity-60"
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
              <p className="mt-3 text-xs text-black/[0.6]">
                By submitting this form, you agree to be contacted by Bakyson
                about your inquiry.
              </p>
            </form>
          </div>
        </div>

        {open && (
          <div role="alert" className="fixed bottom-6 right-6 bg-black text-white px-6 py-4 rounded-lg shadow-[0_20px_40px_rgba(0,0,0,0.2)] flex items-center gap-3 z-50">
            <div className="w-8 h-8 rounded-full bg-[#f3694f] flex items-center justify-center">
              <ArrowUpRight className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-semibold text-black">Message sent</div>
              <div className="text-xs text-black/[0.7]">We&apos;ll get back to you within 24 hours.</div>
            </div>
            <button onClick={() => setOpen(false)} className="ml-2 text-black/[0.6] hover:text-[#f3694f] transition">
              ✕
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
