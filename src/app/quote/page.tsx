'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  { value: "infotainment", label: "Infotainment (IPTV, Digital Signage, Guest Room Management)" },
  { value: "networks", label: "Networks & Communication (Wi-Fi, Cabling, IP Phone)" },
  { value: "audio-visual", label: "Audio Visual (Boardrooms, Displays, Video Walls)" },
  { value: "safety-security", label: "Safety & Security (CCTV, Access Control, Fire Alarms)" },
  { value: "green-solutions", label: "Green Solutions (BMS, GRMS, Automation)" },
  { value: "back-of-house", label: "Back of House (Servers, Computers, Printers)" },
  { value: "multiple", label: "Multiple Services" },
  { value: "other", label: "Not Sure / Other" },
];

const locationOptions = [
  { value: "kenya", label: "Kenya (East Africa Hub)" },
  { value: "nigeria", label: "Nigeria (West Africa Hub)" },
  { value: "south-africa", label: "South Africa (Southern Africa Hub)" },
  { value: "other", label: "Other" },
];

const sizeOptions = [
  { value: "small", label: "Small (single room or office)" },
  { value: "medium", label: "Medium (floor or wing of a building)" },
  { value: "large", label: "Large (entire building or property)" },
  { value: "enterprise", label: "Enterprise (multiple sites)" },
];

const timelineOptions = [
  { value: "asap", label: "As soon as possible" },
  { value: "1month", label: "Within 1 month" },
  { value: "3months", label: "Within 3 months" },
  { value: "6months", label: "Within 6 months" },
  { value: "planning", label: "Just planning / budgeting" },
];

export default function QuotePage() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    location: "",
    serviceType: "",
    projectSize: "",
    timeline: "",
    details: "",
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
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          service: formData.serviceType,
          message: `[QUOTE REQUEST]\nLocation: ${formData.location}\nProject Size: ${formData.projectSize}\nTimeline: ${formData.timeline}\n\nDetails:\n${formData.details}`,
        }),
      });

      if (res.ok) {
        setOpen(true);
        setFormData({
          fullName: "", email: "", phone: "", company: "",
          location: "", serviceType: "", projectSize: "", timeline: "", details: "",
        });
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "Failed to send quote request. Please try again.");
      }
    } catch {
      alert("Failed to send quote request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-white">
        <section className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
              Get a Free Quote
            </h1>
            <p className="text-lg text-muted-foreground">
              Tell us about your project and we’ll design a solution that fits your needs and budget.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="p-8">
              <CardHeader>
                <CardTitle>Request a Quote</CardTitle>
                <p className="text-muted-foreground mt-2">
                  No obligation — we’ll review your request and respond within 1 business day.
                </p>
              </CardHeader>
              <CardContent className="p-0 pt-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        placeholder="John Doe"
                        value={formData.fullName}
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
                      required
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
                    <Label htmlFor="location">Project Location</Label>
                    <select
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select country</option>
                      {locationOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serviceType">Service(s) Interested In</Label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select service</option>
                      {serviceOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="projectSize">Project Size</Label>
                    <select
                      id="projectSize"
                      name="projectSize"
                      value={formData.projectSize}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select size</option>
                      {sizeOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeline">Preferred Timeline</Label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select timeline</option>
                      {timelineOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="details">Project Details</Label>
                    <Textarea
                      id="details"
                      name="details"
                      placeholder="Tell us about your project — number of rooms, type of building, any specific requirements..."
                      value={formData.details}
                      onChange={handleChange}
                      className="min-h-[160px]"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full py-3 text-lg" disabled={submitting}>
                    {submitting ? "Sending..." : "Get My Quote"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="p-8 bg-muted">
              <CardHeader>
                <CardTitle>What to Expect</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-6">
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold">Review</h3>
                      <p className="text-sm text-muted-foreground">
                        Our team reviews your request within 1 business day.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold">Clarify</h3>
                      <p className="text-sm text-muted-foreground">
                        We may contact you for a site survey or clarification.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold">Proposal</h3>
                      <p className="text-sm text-muted-foreground">
                        You receive a detailed, itemized proposal with timeline.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Toast open={open} onOpenChange={setOpen}>
          <ToastTitle>Quote request sent</ToastTitle>
          <ToastDescription>We’ll contact you within 1 business day.</ToastDescription>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </div>
    </ToastProvider>
  );
}