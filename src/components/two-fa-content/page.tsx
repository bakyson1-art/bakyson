"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, ShieldCheck, AlertTriangle, Clock, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function TwoFAContent() {
  const [code, setCode] = useState("");
  const [step, setStep] = useState("verify");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [resendEnabled, setResendEnabled] = useState(false);

  const searchParams = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );
  const email = searchParams.get("email") || "user@bakyson.com";

  useEffect(() => {
    if (step === "verify" && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, step]);

  useEffect(() => {
    if (timeLeft === 0 && !resendEnabled) {
      setResendEnabled(true);
    }
  }, [timeLeft, resendEnabled]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (code === "123456") {
      setStep("success");
    } else {
      setError("Invalid verification code. Try 123456 for demo.");
      setSubmitting(false);
    }
  };

  const handleResend = () => {
    setTimeLeft(60);
    setResendEnabled(false);
  };

  const codeDigits = code.split("").slice(0, 6);

  if (step === "success") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-green-600 mx-auto mb-6 shadow-lg shadow-green/20"
          >
            <CheckCircle className="w-10 h-10" />
          </motion.div>
          <motion.h1
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-3xl font-extrabold text-foreground mb-2"
          >
            Access Granted
          </motion.h1>
          <motion.p
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-foreground/60 mb-8"
          >
            You've been successfully authenticated. Redirecting to your portal...
          </motion.p>
          <Link href="/portal/dashboard" className="inline-flex items-center gap-2">
            <Button variant="primary" size="lg" className="shadow-lg shadow-primary hover:shadow-primary">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

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
            Two-Factor Authentication
          </motion.h1>
          <motion.p
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-foreground/60"
          >
            Enter the 6-digit code sent to {email}
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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className="w-10 h-12 flex items-center justify-center border-2 border-background/20 rounded-xl text-2xl font-bold text-foreground bg-surface/50 focus-within:border-primary focus-within:bg-background transition-all"
                >
                  <input
                    type="text"
                    maxLength="1"
                    value={codeDigits[i] || ""}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      setCode((prev) => {
                        const digits = prev.split("");
                        digits[i] = val;
                        return digits.join("");
                      });
                      if (val && i < 5) {
                        const nextInput = document.querySelectorAll(
                          'input[type="text"]'
                        )[i + 1] as HTMLInputElement;
                        nextInput?.focus();
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && !codeDigits[i] && i > 0) {
                        const prevInput = document.querySelectorAll(
                          'input[type="text"]'
                        )[i - 1] as HTMLInputElement;
                        prevInput?.focus();
                      }
                    }}
                    className="w-full h-full text-center outline-none text-foreground font-mono"
                    autoFocus={i === 0}
                    inputMode="numeric"
                  />
                </motion.div>
              ))}
            </div>

            <Button
              type="submit"
              disabled={submitting || code.length < 6}
              className="w-full bg-primary text-background py-4 rounded-xl font-bold text-lg hover:bg-primary-hover transition-all disabled:opacity-50 shadow-lg shadow-primary/25"
            >
              {submitting ? "Verifying..." : "Verify Code"}
            </Button>

            <motion.div variants={itemVariants} initial="hidden" animate="visible" className="mt-6 text-center">
              <motion.p variants={itemVariants} initial="hidden" animate="visible" className="text-sm text-foreground/60">
                Didn't receive the code?
                {" "}
                {resendEnabled ? (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="text-primary font-bold hover:underline"
                  >
                    Resend code
                  </button>
                ) : (
                  <span className="text-primary font-bold">
                    Resend in {timeLeft}s
                  </span>
                )}
              </motion.p>
            </motion.div>

            <motion.div variants={itemVariants} initial="hidden" animate="visible" className="mt-8 pt-6 border-t border-border">
              <Link href="/portal/login" className="flex items-center gap-2 text-sm text-foreground/60 hover:text-primary transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to login
              </Link>
            </motion.div>
          </form>
        </motion.div>

        <motion.p variants={itemVariants} initial="hidden" animate="visible" className="text-center mt-6 text-sm text-foreground/60">
          &copy; {new Date().getFullYear()} Bakyson. Secure portal access.
        </motion.p>
      </div>
    </div>
  );
}
