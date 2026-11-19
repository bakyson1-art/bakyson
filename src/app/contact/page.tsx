'use client';

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

export default function ContactPage() {
  const [open, setOpen] = useState(false);
  return (
    <ToastProvider>
      <div className="min-h-screen bg-white">
        <section className="mx-auto max-w-4xl px-6 py-24">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="mt-6 text-muted-foreground">Get in touch for a free consultation.</p>
          <Card className="mt-8 max-w-md">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@company.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="How can we help?" />
              </div>
              <Button type="button" className="w-full" onClick={() => setOpen(true)}>Send</Button>
            </CardContent>
          </Card>
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
