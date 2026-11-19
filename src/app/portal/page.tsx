import { Button } from "@/components/ui/button";

export default function PortalPage() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <section className="mx-auto max-w-4xl px-6 py-24 lg:py-32 text-center">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">Client Portal</h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Secure access for project updates, service requests and documentation.
        </p>
        <div className="mt-10 max-w-md mx-auto rounded-xl border border-border p-6 text-left">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input className="w-full rounded-md border border-input px-3 py-2 mb-4" placeholder="you@company.com" />
          <label className="block text-sm font-medium mb-2">Password</label>
          <input type="password" className="w-full rounded-md border border-input px-3 py-2 mb-6" placeholder="••••••••" />
          <Button className="w-full">Sign In</Button>
          <p className="mt-4 text-sm text-muted-foreground">
            New client? Contact our team at <a href="/contact" className="text-primary underline">/contact</a> for access.
          </p>
        </div>
      </section>
    </div>
  );
}
