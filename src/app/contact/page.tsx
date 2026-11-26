'use client';

import { Phone, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ToastProvider,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastViewport,
} from "@/components/ui/toast";

const serviceOptions = [
  { value: "", label: "Select a service (optional)" },
  { value: "infotainment", label: "Infotainment (IPTV, Digital Signage)" },
  { value: "networks", label: "Networks & Communication" },
  { value: "audio-visual", label: "Audio Visual" },
  { value: "safety-security", label: "Safety & Security" },
  { value: "green-solutions", label: "Green Solutions & Automation" },
  { value: "back-of-house", label: "Back of House (IT Hardware)" },
];

export default function ContactPage() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setOpen(true);
        setFormData({ name: "", email: "", phone: "", company: "", service: "", message: "" });
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "Failed to send message. Please try again.");
      }
    } catch {
      alert("Failed to send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-white">
        <section className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
                Contact Us
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Get in touch for a free consultation. We respond within 24 hours.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Call Us</h3>
                    <p className="text-muted-foreground">
                      <a href="tel:+254706897778" className="text-primary hover:underline">
                        +254 706 897 778
                      </a>
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      24/7 support for existing clients
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email Us</h3>
                    <p className="text-muted-foreground">
                      <a href="mailto:hello@bakyson.io" className="text-primary hover:underline">
                        hello@bakyson.io
                      </a>
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Sales and general inquiries
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Our Hubs</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>East Africa — Kenya</li>
                      <li>West Africa — Nigeria</li>
                      <li>Southern Africa — South Africa</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <Card className="p-8">
              <CardContent className="p-0">
                <h2 className="text-xl font-semibold mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+254 7XX XXX XXX"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company / Organization</Label>
                    <Input
                      id="company"
                      name="company"
                      placeholder="e.g. Hilton Accra"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service">Service Interested In</Label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {serviceOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="min-h-[120px]"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full py-3"
                    disabled={submitting}
                  >
                    {submitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
                <p className="mt-4 text-xs text-muted-foreground">
                  By submitting this form, you agree to be contacted by Bakyson about your inquiry.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Toast open={open} onOpenChange={setOpen}>
          <ToastTitle>Message sent</ToastTitle>
          <ToastDescription>We’ll get back to you within 24 hours.</ToastDescription>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </div>
    </ToastProvider>
  );
}