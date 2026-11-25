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
import { Skeleton } from "@/components/ui/skeleton";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services", mega: true },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/blog", label: "Blog" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
  { href: "/quote", label: "Get a Quote" },
  { href: "/support", label: "Support" },
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

  // The staff dashboard is a separate application (see NEXT_PUBLIC_ADMIN_URL).
  const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL;
  const adminLink = adminUrl ? (
    <a
      href={adminUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm sm:text-base hover:text-primary transition px-3 py-2 rounded-md hover:bg-muted"
    >
      Admin Dashboard
    </a>
  ) : null;

  return (
    <>
      {/* Mobile Menu */}
      <div className="md:hidden">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" aria-label="Open main menu" className="h-10 w-10 p-2">
              <Menu className="h-6 w-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="p-4 sm:p-6">
            <DialogHeader className="pb-3">
              <DialogTitle className="text-lg sm:text-xl">Menu</DialogTitle>
            </DialogHeader>
            <nav aria-label="Mobile Primary Navigation">
              <ul className="flex flex-col gap-2 mt-4">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className={`block px-4 py-3 text-base sm:text-lg rounded-lg hover:text-primary ${isActive(item.href) ? "text-primary font-semibold bg-muted" : ""}`}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                {isStaff && (
                  <li>
                    <a
                      href={adminUrl ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-3 text-base sm:text-lg rounded-lg hover:text-primary hover:bg-muted"
                    >
                      Admin Dashboard
                    </a>
                  </li>
                )}
              </ul>
            </nav>
          </DialogContent>
        </Dialog>
      </div>

      {/* Desktop Menu */}
      <nav className="hidden md:flex gap-6 text-sm sm:text-base items-center" aria-label="Primary Navigation">
        {nav.map((item) => {
          if (item.mega) {
            return (
              <div key={item.href} className="relative group">
                <a href={item.href} className={`flex items-center gap-1 px-3 py-2 rounded-md hover:text-primary transition ${isActive(item.href) ? "text-primary font-semibold" : ""}`} aria-current={isActive(item.href) ? "page" : undefined}>
                  {item.label}
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </a>
                <div className="absolute left-0 top-full mt-2 w-[600px] rounded-2xl border border-border bg-white/90 backdrop-blur-xl shadow-xl p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Industries</h4>
                      <ul className="space-y-2">
                        {megaIndustries.map((i) => (
                          <li key={i.label}>
                            <a href={i.href} className="block text-sm hover:text-primary transition cursor-pointer px-3 py-1 rounded-md hover:bg-muted">{i.label}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Services</h4>
                      <ul className="space-y-2">
                        {megaServices.map((s) => (
                          <li key={s.label}>
                            <a href={s.href} className="block text-sm hover:text-primary transition cursor-pointer px-3 py-1 rounded-md hover:bg-muted">{s.label}</a>
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
            <a key={item.href} href={item.href} className={`px-3 py-2 rounded-md hover:text-primary transition ${isActive(item.href) ? "text-primary font-semibold" : ""}`} aria-current={isActive(item.href) ? "page" : undefined}>
              {item.label}
            </a>
          );
        })}
        {isStaff && adminLink}
      </nav>
    </>
  );
}
