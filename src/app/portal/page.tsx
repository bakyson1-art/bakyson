'use client';

import { useEffect, useState } from 'react';
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type SessionUser = {
  name?: string | null;
  email?: string | null;
  role?: string;
};

async function getCsrfToken() {
  const res = await fetch('/api/auth/csrf', { cache: 'no-store' });
  if (!res.ok) throw new Error('Could not start sign in');
  const data = await res.json();
  return data.csrfToken as string;
}

export default function PortalPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState<SessionUser | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    fetch('/api/auth/session', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => setUser(data?.user ?? null))
      .catch(() => setUser(null))
      .finally(() => setChecked(true));
  }, []);

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const csrfToken = await getCsrfToken();
      const res = await fetch('/api/auth/callback/credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          email,
          password,
          csrfToken,
          callbackUrl: '/portal',
          json: 'true',
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || data.error) {
        throw new Error(
          data.error === 'CredentialsSignin'
            ? 'Invalid email or password'
            : data.error?.message || 'Invalid email or password'
        );
      }

      const session = await fetch('/api/auth/session', { cache: 'no-store' }).then((r) => r.json());
      setUser(session?.user ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSignOut() {
    setError('');
    setIsLoading(true);

    try {
      const csrfToken = await getCsrfToken();
      await fetch('/api/auth/signout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ csrfToken, callbackUrl: '/portal', json: 'true' }),
      });
      setUser(null);
    } catch {
      setError('Sign out failed. Please try again.');
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
          <div className="mx-auto max-w-md mb-6 mt-8 p-4 rounded-md bg-red-50 border border-red-200 text-red-800 text-sm">
            {error}
          </div>
        )}

        {checked && user ? (
          <Card className="mt-10 max-w-md mx-auto text-left">
            <CardHeader>
              <CardTitle>Signed In</CardTitle>
              <p className="text-sm text-muted-foreground">
                You are signed in as <span className="font-medium text-foreground">{user.email}</span>.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                View your project progress and support tickets below.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="/portal/projects"
                  className={`${buttonVariants({ variant: 'outline' })} w-full`}
                >
                  My Projects
                </a>
                <a
                  href="/portal/tickets"
                  className={`${buttonVariants({ variant: 'outline' })} w-full`}
                >
                  My Tickets
                </a>
                <a
                  href="/contact"
                  className={`${buttonVariants({ variant: 'outline' })} w-full`}
                >
                  Contact Support
                </a>
              </div>
              <Button className="w-full" onClick={handleSignOut} disabled={isLoading}>
                {isLoading ? 'Signing out...' : 'Sign Out'}
              </Button>
            </CardContent>
          </Card>
        ) : (
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
        )}
      </section>
    </div>
  );
}
