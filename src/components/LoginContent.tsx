"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Mail, Lock, ShieldCheck, ArrowRight, AlertTriangle, Eye } from "lucide-react";

export default function LoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [currentYear, setCurrentYear] = useState<number>(2024);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (email === "demo@bakyson.com" && password === "demo123") {
      window.location.href = "/portal/2fa?email=" + encodeURIComponent(email);
    } else {
      setError("Invalid email or password. Try demo@bakyson.com / demo123");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-bakyson-gray flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-xl bg-bakyson-orange flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-orange/40">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-bakyson-black mb-2">
            Client Portal
          </h1>
          <p className="text-bakyson-black/60">
            Secure access to your projects and support
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl border border-black/10">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-bakyson-black mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-bakyson-black/40" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-4 rounded-xl border border-black/20 focus:ring-2 focus:ring-bakyson-orange focus:border-bakyson-orange outline-none text-bakyson-black"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-bakyson-black">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs text-bakyson-orange font-medium hover:text-bakyson-orange-dark transition-colors"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-bakyson-black/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-4 rounded-xl border border-black/20 focus:ring-2 focus:ring-bakyson-orange focus:border-bakyson-orange outline-none text-bakyson-black"
                  placeholder="••••••••"
                />
                <Eye className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-bakyson-black/40 cursor-pointer" />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-bakyson-orange text-white py-4 rounded-xl font-bold text-lg hover:bg-bakyson-orange-dark transition-all disabled:opacity-50 shadow-lg shadow-orange/25 flex items-center justify-center gap-2"
            >
              {submitting ? "Signing in..." : "Sign In"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-black/10">
            <p className="text-sm text-bakyson-black/60 text-center mb-4">
              Don't have an account? Contact your account manager to get access.
            </p>
            <div className="bg-bakyson-gray rounded-xl p-4 text-center">
              <p className="text-xs text-bakyson-black/40 mb-2">Demo credentials:</p>
              <div className="flex items-center justify-between text-sm text-bakyson-black">
                <span className="font-medium">Email:</span>
                <span className="font-mono text-bakyson-orange">demo@bakyson.com</span>
              </div>
              <div className="flex items-center justify-between text-sm text-bakyson-black">
                <span className="font-medium">Password:</span>
                <span className="font-mono text-bakyson-orange">demo123</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center mt-6 text-sm text-bakyson-black/60">
          &copy; {currentYear} Bakyson. Secure portal access.
        </p>
      </div>
    </div>
  );
}
