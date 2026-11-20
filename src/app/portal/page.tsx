'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PortalPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const res = await fetch('/api/auth/callback/credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          email,
          password,
          csrfToken: '',
          callbackUrl: '/portal',
          json: 'true',
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error?.message || 'Invalid email or password');
      }

      router.push('/portal');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white text-foreground">
      <section className="mx-auto max-w-4xl px-6 py-24 lg:py-32 text-center">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">Client Portal</h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Secure access for project updates, service requests and documentation.
        </p>

        {error && (
          <div className="mx-auto max-w-md mb-6 p-4 rounded-md bg-red-50 border border-red-200 text-red-800 text-sm">
            {error}
          </div>
        )}

        <Card className="mt-10 max-w-md mx-auto text-left">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <p className="text-sm text-muted-foreground">
              Enter your client credentials to access the portal.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="you@company.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" placeholder="••••••••" required />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
            <p className="text-sm text-muted-foreground">
              New client? Contact our team at <a href="/contact" className="text-primary underline">/contact</a> for access.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
