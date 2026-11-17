"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldCheck, AlertTriangle, ArrowLeft, Clock, CheckCircle } from "lucide-react";

export default function TwoFAContent() {
  const [code, setCode] = useState("");
  const [step, setStep] = useState("verify");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [currentYear, setCurrentYear] = useState<number>(2024);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

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
      <div className="min-h-screen bg-bakyson-gray flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-green-600 mx-auto mb-6 shadow-lg shadow-green/20">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-extrabold text-bakyson-black mb-2">
            Access Granted
          </h1>
          <p className="text-bakyson-black/60 mb-8">
            You've been successfully authenticated. Redirecting to your portal...
          </p>
          <Link
            href="/portal/dashboard"
            className="bg-bakyson-orange text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-bakyson-orange-dark transition-all shadow-lg shadow-orange/25 inline-block"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bakyson-gray flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-xl bg-bakyson-orange flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-orange/40">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-bakyson-black mb-2">
            Two-Factor Authentication
          </h1>
          <p className="text-bakyson-black/60">
            Enter the 6-digit code sent to {email}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl border border-black/10">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="w-10 h-12 flex items-center justify-center border-2 border-black/20 rounded-xl text-2xl font-bold text-bakyson-black bg-bakyson-gray/50 focus-within:border-bakyson-orange focus-within:bg-white transition-all"
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
                    className="w-full h-full text-center outline-none text-bakyson-black font-mono"
                    autoFocus={i === 0}
                    inputMode="numeric"
                  />
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={submitting || code.length < 6}
              className="w-full bg-bakyson-orange text-white py-4 rounded-xl font-bold text-lg hover:bg-bakyson-orange-dark transition-all disabled:opacity-50 shadow-lg shadow-orange/25"
            >
              {submitting ? "Verifying..." : "Verify Code"}
            </button>

            <div className="mt-6 text-center">
              <p className="text-sm text-bakyson-black/60">
                Didn't receive the code?
                {" "}
                {resendEnabled ? (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="text-bakyson-orange font-bold hover:underline"
                  >
                    Resend code
                  </button>
                ) : (
                  <span className="text-bakyson-orange font-bold">
                    Resend in {timeLeft}s
                  </span>
                )}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-black/10">
              <Link
                href="/portal/login"
                className="flex items-center gap-2 text-sm text-bakyson-black/60 hover:text-bakyson-orange transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to login
              </Link>
            </div>
          </form>
        </div>

        <p className="text-center mt-6 text-sm text-bakyson-black/60">
          &copy; {currentYear} Bakyson. Secure portal access.
        </p>
      </div>
    </div>
  );
}
