import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PortalPage() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <section className="mx-auto max-w-4xl px-6 py-24 lg:py-32 text-center">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">Client Portal</h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Secure access for project updates, service requests and documentation.
        </p>
        <Card className="mt-10 max-w-md mx-auto text-left">
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="you@company.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
            <Button className="w-full">Sign In</Button>
            <p className="text-sm text-muted-foreground">
              New client? Contact our team at <a href="/contact" className="text-primary underline">/contact</a> for access.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
