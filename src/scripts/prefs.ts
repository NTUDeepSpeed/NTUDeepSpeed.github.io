/**
 * Shared motion preferences for the client-side animation modules in src/scripts/.
 *
 * `has-motion` is stamped on <html> by an inline script in Base.astro, and only when
 * JS is running and the visitor has not asked for reduced motion. Every module checks
 * it before touching the DOM, and site.css scopes every "hidden until animated" initial
 * state under it, so no-JS and reduced-motion visitors always get the static page.
 */
export const hasMotion =
  typeof document !== "undefined" && document.documentElement.classList.contains("has-motion");

/** The design system's `--ease-mech` curve (tokens.css) — "flick to stop" — as a bezier tuple. */
export const EASE_MECH: [number, number, number, number] = [0.2, 0.7, 0.1, 1];
