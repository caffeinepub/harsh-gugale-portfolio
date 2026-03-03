/**
 * Google Analytics 4 — lightweight event helper.
 *
 * GA4 measurement ID is read from the build-time env variable
 * VITE_GA_MEASUREMENT_ID (e.g. G-XXXXXXXXXX).
 * If the variable is absent the helpers are silent no-ops so the
 * site works fine before an ID is configured.
 */

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const GA_ID = (import.meta as unknown as { env: Record<string, string> }).env
  ?.VITE_GA_MEASUREMENT_ID;

/** True once the gtag script has been injected */
let initialized = false;

/**
 * Lazily inject the gtag script on first use.
 * Called automatically by `trackEvent`; no need to call manually.
 */
function init(): void {
  if (initialized || !GA_ID || typeof window === "undefined") return;
  initialized = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, {
    // Disable automatic page-view on config so we fire it manually
    send_page_view: false,
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

/**
 * Send a GA4 custom event.
 *
 * @param eventName  Snake_case event name shown in GA4 dashboard.
 * @param params     Optional key/value parameters attached to the event.
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>,
): void {
  if (!GA_ID) return; // No ID configured — silent no-op
  init();
  try {
    window.gtag("event", eventName, params ?? {});
  } catch {
    // Never let analytics throw to the user
  }
}

// ── Convenience helpers ────────────────────────────────────────────────

/** Fired when the user clicks the Download Resume button */
export function trackResumeDownload(): void {
  trackEvent("resume_download", { event_category: "engagement" });
}

/** Fired when a blog post card / read-more is clicked */
export function trackBlogClick(postTitle: string, category?: string): void {
  trackEvent("blog_click", {
    event_category: "content",
    post_title: postTitle,
    ...(category ? { blog_category: category } : {}),
  });
}

/** Fired when a project card link (GitHub / demo / details) is clicked */
export function trackProjectClick(
  projectTitle: string,
  action: "github" | "demo" | "view_details",
): void {
  trackEvent("project_click", {
    event_category: "content",
    project_title: projectTitle,
    action,
  });
}

/** Fired when the Contact form is submitted */
export function trackContactSubmit(): void {
  trackEvent("contact_form_submit", { event_category: "engagement" });
}
