"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services", mega: true },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/blog", label: "Blog" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
  { href: "/portal", label: "Portal" },
];

const megaIndustries = [
  { label: "Hospitality", href: "/services#hospitality" },
  { label: "Healthcare", href: "/services#healthcare" },
  { label: "Corporate", href: "/services#corporate" },
  { label: "Education", href: "/services#education" },
];

const megaServices = [
  { label: "Structured Cabling", href: "/services#cabling" },
  { label: "CCTV & Security", href: "/services#cctv" },
  { label: "Fire Alarm Systems", href: "/services#fire" },
  { label: "Access Control", href: "/services#access" },
  { label: "Public Address", href: "/services#pa" },
  { label: "Network Solutions", href: "/services#network" },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<{ role?: string } | null>(null);
  const [loaded, setLoaded] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href));
  const isStaff = loaded && (user?.role === 'admin' || user?.role === 'employee');

  useEffect(() => {
    fetch('/api/auth/session')
      .then(async (res) => {
        try {
          const data = await res.json();
          setUser(data?.user ?? null);
        } catch {
          setUser(null);
        }
      })
      .catch(() => setUser(null))
      .finally(() => setLoaded(true));
  }, []);

  const adminLink = (
    <a href="/admin" className="text-sm hover:text-primary transition">
      Admin Dashboard
    </a>
  );

  return (
    <>
      <div className="md:hidden">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" aria-label="Open menu"><Menu className="h-5 w-5" /></Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Menu</DialogTitle>
            </DialogHeader>
            <nav aria-label="Mobile Primary">
              <ul className="flex flex-col gap-4 mt-4">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className={`text-lg hover:text-primary ${isActive(item.href) ? "text-primary font-semibold" : ""}`}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                {isStaff && <li>{adminLink}</li>}
              </ul>
            </nav>
          </DialogContent>
        </Dialog>
      </div>
      <nav className="hidden md:flex gap-6 text-sm items-center" aria-label="Primary">
        {nav.map((item) => {
          if (item.mega) {
            return (
              <div key={item.href} className="relative group">
                <a href={item.href} className={`flex items-center gap-1 hover:text-primary transition ${isActive(item.href) ? "text-primary font-semibold" : ""}`} aria-current={isActive(item.href) ? "page" : undefined}>
                  {item.label}
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </a>
                <div className="absolute left-0 top-full mt-3 w-[600px] rounded-2xl border border-border bg-white/90 backdrop-blur-xl shadow-xl p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Industries</h4>
                      <ul className="space-y-2">
                        {megaIndustries.map((i) => (
                          <li key={i.label}>
                            <a href={i.href} className="block text-sm hover:text-primary transition cursor-pointer">{i.label}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Services</h4>
                      <ul className="space-y-2">
                        {megaServices.map((s) => (
                          <li key={s.label}>
                            <a href={s.href} className="block text-sm hover:text-primary transition cursor-pointer">{s.label}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
          return (
            <a key={item.href} href={item.href} className={`hover:text-primary transition ${isActive(item.href) ? "text-primary font-semibold" : ""}`} aria-current={isActive(item.href) ? "page" : undefined}>
              {item.label}
            </a>
          );
        })}
        {isStaff && adminLink}
      </nav>
    </>
  );
}
