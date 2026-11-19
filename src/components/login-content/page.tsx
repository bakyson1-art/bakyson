"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, Lock, ShieldCheck, ArrowRight, AlertTriangle, Eye, EyeOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";
import { motionTokens, springs } from "@/lib/motion-tokens";

const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function LoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/auth/callback/credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        window.location.href = "/portal/2fa";
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.message || "Invalid email or password");
        setSubmitting(false);
      }
    } catch {
      setError("Invalid email or password. Try demo@bakyson.com / demo123");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center text-background mx-auto mb-4 shadow-lg shadow-primary/40"
          >
            <ShieldCheck className="w-8 h-8" />
          </motion.div>
          <motion.h1
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-3xl font-extrabold text-foreground mb-2"
          >
            Client Portal
          </motion.h1>
          <motion.p
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-foreground/60"
          >
            Secure access to your projects and support
          </motion.p>
        </div>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="bg-background rounded-2xl p-8 lg:p-12 shadow-xl border border-border"
        >
          {error && (
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm flex items-start gap-3"
            >
              <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email-input" className="block text-sm font-bold text-foreground mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <Input
                  id="email-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className={`w-full pl-10 pr-4 py-4 rounded-xl border border-background/20 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-foreground ${error ? "border-red-500" : ""}`}
                  aria-describedby={error ? "email-error" : undefined}
                  aria-invalid={error ? true : undefined}
                />
              </div>
              {error && (
                <p id="email-error" className="text-xs text-red-600 mt-1">
                  {error}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password-input" className="text-sm font-bold text-foreground">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs text-primary font-medium hover:text-primary-hover transition-colors"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <Input
                  id="password-input"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-4 py-4 rounded-xl border border-background/20 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-foreground ${error ? "border-red-500" : ""}`}
                  aria-describedby={error ? "password-error" : undefined}
                  aria-invalid={error ? true : undefined}
                />
                <Eye className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40 cursor-pointer" />
              </div>
              {error && (
                <p id="password-error" className="text-xs text-red-600 mt-1">
                  {error}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary text-background py-4 rounded-xl font-bold text-lg hover:bg-primary-hover transition-all disabled:opacity-50 shadow-lg shadow-primary/25 flex items-center justify-center gap-2"
              whileTap={{ scale: motionTokens.scale.press }}
              transition={springs.snappy}
            >
              {submitting ? "Signing in..." : "Sign In"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-border">
            <motion.p variants={itemVariants} initial="hidden" animate="visible" className="text-sm text-foreground/60 text-center mb-4">
              Don't have an account? Contact your account manager to get access.
            </motion.p>
            <div className="bg-surface rounded-xl p-4 text-center">
              <motion.p variants={itemVariants} initial="hidden" animate="visible" className="text-xs text-foreground/40 mb-2">
                Demo credentials:
              </motion.p>
              <div className="flex items-center justify-between text-sm text-foreground">
                <span className="font-medium">Email:</span>
                <span className="font-mono text-primary">demo@bakyson.com</span>
              </div>
              <div className="flex items-center justify-between text-sm text-foreground">
                <span className="font-medium">Password:</span>
                <span className="font-mono text-primary">demo123</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.p variants={itemVariants} initial="hidden" animate="visible" className="text-center mt-6 text-sm text-foreground/60">
          &copy; {new Date().getFullYear()} Bakyson. Secure portal access.
        </motion.p>
      </div>
    </div>
  );
}
