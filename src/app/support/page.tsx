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

const priorityOptions = [
  { value: "low", label: "Low — General inquiry or question" },
  { value: "medium", label: "Medium — System degraded, still usable" },
  { value: "high", label: "High — System down, business impacted" },
  { value: "critical", label: "Critical — Emergency, safety at risk" },
];

const systemOptions = [
  { value: "infotainment", label: "Infotainment (IPTV, Digital Signage)" },
  { value: "networks", label: "Networks & Communication (Wi-Fi, Cabling)" },
  { value: "audio-visual", label: "Audio Visual (Boardrooms, Displays)" },
  { value: "safety-security", label: "Safety & Security (CCTV, Access Control)" },
  { value: "green-solutions", label: "Green Solutions (BMS, GRMS, Automation)" },
  { value: "back-of-house", label: "Back of House (Servers, Computers)" },
  { value: "other", label: "Other / Not Sure" },
];

export default function SupportPage() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    siteName: "",
    systemType: "",
    priority: "medium",
    description: "",
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
          service: formData.systemType,
          message: `[SUPPORT TICKET]\nSite: ${formData.siteName}\nSystem: ${formData.systemType}\nPriority: ${formData.priority}\n\nDescription:\n${formData.description}`,
        }),
      });

      if (res.ok) {
        setOpen(true);
        setFormData({
          fullName: "", email: "", phone: "", company: "",
          siteName: "", systemType: "", priority: "medium", description: "",
        });
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "Failed to submit ticket. Please try again.");
      }
    } catch {
      alert("Failed to submit ticket. Please try again.");
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
                Technical Support
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Having an issue with your IPTV, CCTV, network, or AV system? Submit a ticket and our engineers will help.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600 shrink-0">
                    <span>🚨</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Emergency Support</h3>
                    <p className="text-muted-foreground">
                      For critical safety or security system failures, call our emergency line immediately.
                    </p>
                    <a href="tel:+254706897778" className="text-red-600 font-semibold hover:underline mt-2 inline-block">
                      +254 706 897 778
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <span>🕐</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Support Hours</h3>
                    <ul className="text-sm text-muted-foreground space-y-1 mt-2">
                      <li>Mon–Fri: 8:00 AM – 6:00 PM EAT</li>
                      <li>Saturday: 9:00 AM – 2:00 PM EAT</li>
                      <li>Sunday & Holidays: Emergency only</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-muted rounded-xl p-6 mt-8">
                  <h3 className="font-semibold mb-3">What to Include</h3>
                  <ul className="text-sm text-muted-foreground space-y-2 list-disc ml-5">
                    <li>Your site name and location</li>
                    <li>Which system is affected (CCTV, Wi-Fi, IPTV, etc.)</li>
                    <li>When the issue started</li>
                    <li>Any error messages or indicator lights</li>
                    <li>Photos or videos of the issue (helpful!)</li>
                  </ul>
                </div>
              </div>
            </div>

            <Card className="p-8">
              <CardHeader>
                <CardTitle>Submit a Support Ticket</CardTitle>
                <p className="text-muted-foreground mt-2">
                  We’ll assign an engineer and keep you updated on progress.
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
                    <Label htmlFor="siteName">Site / Project Name</Label>
                    <Input
                      id="siteName"
                      name="siteName"
                      placeholder="e.g. Nairobi Office — Wing B"
                      value={formData.siteName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="systemType">System Type</Label>
                    <select
                      id="systemType"
                      name="systemType"
                      value={formData.systemType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select system</option>
                      {systemOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <select
                      id="priority"
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {priorityOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Describe the Issue</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="What’s happening? When did it start? Any error messages?"
                      value={formData.description}
                      onChange={handleChange}
                      className="min-h-[160px]"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full py-3" disabled={submitting}>
                    {submitting ? "Submitting..." : "Submit Ticket"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        <Toast open={open} onOpenChange={setOpen}>
          <ToastTitle>Ticket submitted</ToastTitle>
          <ToastDescription>Our team will contact you shortly.</ToastDescription>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </div>
    </ToastProvider>
  );
}