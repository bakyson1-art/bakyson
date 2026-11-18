const ANALYTICS_ID = process.env.NEXT_PUBLIC_ANALYTICS_ID;

export function isAnalyticsEnabled(): boolean {
  return Boolean(ANALYTICS_ID) && typeof window !== "undefined";
}

export function pageview(url: string): void {
  if (!isAnalyticsEnabled()) return;

  if (typeof window !== "undefined" && (window as any).plausible) {
    (window as any).plausible("pageview", { u: url });
  }
}

export function event(name: string, props?: Record<string, string | number | boolean>): void {
  if (!isAnalyticsEnabled()) return;

  if (typeof window !== "undefined" && (window as any).plausible) {
    (window as any).plausible(name, { props });
  }
}

export function outboundLink(url: string): void {
  if (!isAnalyticsEnabled()) return;

  if (typeof window !== "undefined" && (window as any).plausible) {
    (window as any).plausible("Outbound Link", { u: url });
  }
}
