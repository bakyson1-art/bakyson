"use client";

import { useState } from "react";
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
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/blog", label: "Blog" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
  { href: "/portal", label: "Portal" },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="md:hidden">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" aria-label="Open menu">☰</Button>
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
                      className="text-lg hover:text-primary"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </DialogContent>
        </Dialog>
      </div>
      <nav className="hidden md:flex gap-6 text-sm" aria-label="Primary">
        {nav.map((item) => (
          <a key={item.href} href={item.href} className="hover:text-primary transition">
            {item.label}
          </a>
        ))}
      </nav>
    </>
  );
}
