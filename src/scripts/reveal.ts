/**
 * Entrance reveals for any element marked `data-reveal` (loaded on every page via Base.astro).
 *
 * Motion (motion.dev) does the work: `inView` is a thin IntersectionObserver wrapper that
 * fires once per element, and the mini `animate` runs the tween through the Web Animations
 * API on the compositor — we animate the full `transform` string (not `x`/`y`) precisely so
 * it stays hardware-accelerated.
 *
 * Elements that enter the viewport in the same frame are staggered as one batch, so a grid
 * cascades in on load but items further down the page reveal the moment they arrive,
 * without waiting on siblings that already played.
 *
 * Variants: data-reveal (up, default) | "left" | "scale" | "fade".
 */
import { animate } from "motion/mini";
import { inView } from "motion";
import { EASE_MECH, hasMotion } from "./prefs";

const DURATION = 0.7;
const STEP = 0.07; // stagger between items that entered together
const MAX_DELAY = 0.45;

const FROM: Record<string, string> = {
  up: "translateY(22px)",
  left: "translateX(-18px)",
  scale: "scale(0.96)",
  fade: "none",
};

const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

/** Hand the element back to the stylesheet: the CSS initial state is keyed on the
 *  missing `data-revealed`, and the inline styles Motion commits on finish would
 *  otherwise shadow hover transforms (cards lift on hover). */
function show(el: HTMLElement) {
  el.setAttribute("data-revealed", "");
  el.style.opacity = "";
  el.style.transform = "";
}

if (!hasMotion || !("IntersectionObserver" in window)) {
  items.forEach(show);
} else if (items.length) {
  let batch: HTMLElement[] = [];
  let scheduled = 0;

  const flush = () => {
    scheduled = 0;
    const entered = batch;
    batch = [];
    entered.forEach((el, i) => {
      const from = FROM[el.dataset.reveal || "up"] ?? FROM.up;
      animate(
        el,
        { opacity: [0, 1], transform: [from, "none"] },
        { duration: DURATION, delay: Math.min(i * STEP, MAX_DELAY), ease: EASE_MECH },
      ).then(() => show(el));
    });
  };

  inView(
    items,
    (el) => {
      batch.push(el as HTMLElement);
      if (!scheduled) scheduled = requestAnimationFrame(flush);
      // No leave handler returned → Motion unobserves the element: reveal once.
    },
    { margin: "0px 0px -60px 0px" },
  );
}
