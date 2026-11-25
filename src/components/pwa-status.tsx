"use client";

import { useEffect, useRef, useState } from "react";
import { RefreshCw, WifiOff } from "lucide-react";

/**
 * Registers the service worker in production and surfaces the two states that
 * matter to a PWA user: no connection, and a newer version ready to install.
 */
export default function PwaStatus() {
  const [isOffline, setIsOffline] = useState(false);
  const [updateReady, setUpdateReady] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const registrationRef = useRef<ServiceWorkerRegistration | null>(null);
  const updateAcceptedRef = useRef(false);

  useEffect(() => {
    const syncOnlineState = () => setIsOffline(!navigator.onLine);

    syncOnlineState();
    window.addEventListener("online", syncOnlineState);
    window.addEventListener("offline", syncOnlineState);

    return () => {
      window.removeEventListener("online", syncOnlineState);
      window.removeEventListener("offline", syncOnlineState);
    };
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) {
      return;
    }

    let disposed = false;

    const onControllerChange = () => {
      if (updateAcceptedRef.current) {
        window.location.reload();
      }
    };

    const watchInstallingWorker = (registration: ServiceWorkerRegistration) => {
      const worker = registration.installing;
      if (!worker) return;

      worker.addEventListener("statechange", () => {
        if (worker.state === "installed" && navigator.serviceWorker.controller && !disposed) {
          setUpdateReady(true);
        }
      });
    };

    navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);

    navigator.serviceWorker
      .register("/sw.js", { scope: "/", updateViaCache: "none" })
      .then((registration) => {
        if (disposed) return;
        registrationRef.current = registration;

        if (registration.waiting && navigator.serviceWorker.controller) {
          setUpdateReady(true);
        }

        registration.addEventListener("updatefound", () => watchInstallingWorker(registration));
        registration.update().catch(() => {
          // A failed update check is harmless; the cached app still works.
        });
      })
      .catch((error) => {
        console.error("Service worker registration failed", error);
      });

    return () => {
      disposed = true;
      navigator.serviceWorker.removeEventListener("controllerchange", onControllerChange);
    };
  }, []);

  function applyUpdate() {
    const waitingWorker = registrationRef.current?.waiting;

    if (!waitingWorker) {
      window.location.reload();
      return;
    }

    updateAcceptedRef.current = true;
    setIsApplying(true);
    waitingWorker.postMessage({ type: "SKIP_WAITING" });

    // Fallback in case the browser does not emit controllerchange.
    window.setTimeout(() => window.location.reload(), 4000);
  }

  if (!isOffline && !updateReady) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex flex-col items-center gap-2 p-3 sm:p-4"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      {updateReady && (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-auto flex w-full max-w-md flex-col gap-3 rounded-xl border border-border bg-white p-4 shadow-xl sm:flex-row sm:items-center"
        >
          <RefreshCw className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground">Update available</p>
            <p className="text-xs text-muted-foreground">Refresh to get the latest version of Bakyson.</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => setUpdateReady(false)}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              Later
            </button>
            <button
              type="button"
              onClick={applyUpdate}
              disabled={isApplying}
              className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isApplying ? "Refreshing…" : "Refresh"}
            </button>
          </div>
        </div>
      )}

      {isOffline && (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-auto flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm text-white shadow-lg"
        >
          <WifiOff className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>You&apos;re offline — saved pages are still available.</span>
        </div>
      )}
    </div>
  );
}
