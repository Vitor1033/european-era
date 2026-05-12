/**
 * Modular analytics — enable via env and extend per provider.
 * Do not commit measurement IDs to the repo; use environment variables.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    lintrk?: (a: string, b: string) => void;
  }
}

export function initGoogleAnalytics() {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!id || typeof window === "undefined") return;
  window.gtag?.("config", id);
}

export function trackEvent(name: string, params?: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, params);
}

export function initMetaPixel() {
  const id = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  if (!id || typeof window === "undefined") return;
  window.fbq?.("init", id);
}

export function initLinkedInInsight() {
  const id = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID;
  if (!id || typeof window === "undefined") return;
  window.lintrk?.("track", { conversion_id: id });
}
