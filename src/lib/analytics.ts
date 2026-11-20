export function trackPageView(path: string) {
  if (typeof window === 'undefined') return;
  // @ts-ignore
  window.plausible?.('pageview', { props: { path } });
}

export function trackEvent(name: string, props?: Record<string, any>) {
  if (typeof window === 'undefined') return;
  // @ts-ignore
  window.plausible?.(name, { props });
}
