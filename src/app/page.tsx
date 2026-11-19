import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ToastProvider,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastViewport,
} from "@/components/ui/toast";

export default function Home() {
  const [toastOpen, setToastOpen] = useState(false);
  return (
    <ToastProvider>
      <div className="min-h-screen bg-white text-foreground">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
                Reinvent Your Business with Cutting-Edge ICT Solutions
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Bakyson designs and builds ELV services for Sub-Saharan Africa. Affordable, reliable infrastructure for hospitality, healthcare, corporates and learning institutions.
              </p>
              <div className="mt-8 flex gap-4">
                <a href="/services" className="inline-flex items-center justify-center rounded-md bg-primary text-white px-6 py-3 font-medium hover:bg-orange-700 transition">
                  Explore Services
                </a>
                <a href="/contact" className="inline-flex items-center justify-center rounded-md border border-border px-6 py-3 font-medium hover:bg-muted transition">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="text-3xl font-semibold">Our Services</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Structured Cabling", desc: "High-performance copper and fiber networks." },
              { title: "CCTV & Security", desc: "Intelligent surveillance and access control." },
              { title: "Fire Alarm Systems", desc: "Life safety systems compliant with standards." },
              { title: "Access Control", desc: "Secure entry solutions for premises." },
              { title: "Public Address", desc: "Clear communication across facilities." },
              { title: "Network Solutions", desc: "Robust LAN/WAN design and support." },
            ].map((s) => (
              <div key={s.title} className="rounded-xl border border-border p-6 hover:shadow-md transition will-change-transform hover:-translate-y-0.5">
                <h3 className="font-semibold text-lg">{s.title}</h3>
                <p className="mt-2 text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="bg-muted py-16">
          <div className="mx-auto max-w-7xl px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Projects", value: "500+" },
              { label: "Clients", value: "15+" },
              { label: "Years", value: "3+" },
              { label: "Support", value: "24/7" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-6 py-24 text-center">
          <h2 className="text-3xl font-semibold">Ready to upgrade your infrastructure?</h2>
          <p className="mt-4 text-muted-foreground">Get a free consultation with our ICT specialists.</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mt-8">Get Started</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Free Consultation</DialogTitle>
                <DialogDescription>
                  Tell us about your project and we’ll get back within 24 hours.
                </DialogDescription>
              </DialogHeader>
              <form
                className="space-y-4 mt-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setToastOpen(true);
                }}
              >
                <div className="space-y-2">
                  <Label htmlFor="consult-name">Name</Label>
                  <Input id="consult-name" placeholder="Your name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="consult-email">Email</Label>
                  <Input id="consult-email" type="email" placeholder="you@company.com" required />
                </div>
                <Button type="submit" className="w-full">Request Call</Button>
              </form>
            </DialogContent>
          </Dialog>
        </section>
        <Toast open={toastOpen} onOpenChange={setToastOpen}>
          <ToastTitle>Request received</ToastTitle>
          <ToastDescription>We’ll contact you within 24 hours for your free consultation.</ToastDescription>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </div>
    </ToastProvider>
  );
}

