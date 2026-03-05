/**
 * Google Analytics 4 — lightweight event helper.
 *
 * The gtag script is loaded in index.html <head> (G-4CQ8LN5Q5M).
 * This module only sends custom events via the global window.gtag.
 * It falls back silently if gtag is not yet available.
 */

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
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
  try {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", eventName, params ?? {});
    }
  } catch {
    // Never let analytics errors surface to the user
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
