declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, unknown> }) => void;
  }
}

export function trackPageView(path: string) {
  if (typeof window === 'undefined') return;
  window.plausible?.('pageview', { props: { path } });
}

export function trackEvent(name: string, props?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  window.plausible?.(name, { props });
}
