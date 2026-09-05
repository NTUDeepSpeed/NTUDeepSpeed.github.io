/**
 * Home page choreography.
 *
 * - Hero intro: an anime.js timeline — the footage settles from a slight zoom while the
 *   three words of the wordmark rise out of their clips in sequence, then the lede, the
 *   button and the HUD follow. Waits for the web fonts (capped) so the reveal doesn't
 *   play on the fallback face.
 * - HUD clock: the "T+" readout mirrors the footage's own playback clock.
 * - Scroll-linked (Motion `scroll` + WAAPI, hardware-accelerated where ScrollTimeline is
 *   supported): the hero overlay drifts and fades as the hero leaves, and the car cut-out
 *   tracks slowly across its grid as its panel passes through the viewport.
 */
import { createTimeline, stagger } from "animejs";
import { animate } from "motion/mini";
import { scroll } from "motion";
import { hasMotion } from "./prefs";

const hero = document.querySelector<HTMLElement>(".drive-hero");
const video = hero?.querySelector<HTMLVideoElement>(".drive-video") ?? null;
const overlay = hero?.querySelector<HTMLElement>(".drive-overlay") ?? null;

// If the hero footage isn't present (or fails to load), fall back to the dark stage —
// grid + vignette still frame the overlay.
if (hero && video) {
  video.addEventListener("error", () => hero.classList.add("no-video"), true);
  video.play().catch(() => {
    /* autoplay rejection is fine — the poster frame still shows */
  });
}

// ---- HUD clock -----------------------------------------------------------------------
const hudTime = hero?.querySelector<HTMLElement>("[data-hud-time]") ?? null;
if (video && hudTime) {
  let last = "";
  const tick = () => {
    const t = video.currentTime;
    const text = `${String(Math.floor(t / 60)).padStart(2, "0")}:${(t % 60).toFixed(1).padStart(4, "0")}`;
    if (text !== last) {
      hudTime.textContent = text;
      last = text;
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

if (hasMotion && hero && overlay) {
  // ---- Hero intro ----------------------------------------------------------------------
  const words = overlay.querySelectorAll<HTMLElement>(".hero-word");
  const sub = overlay.querySelector<HTMLElement>(".hero-sub");
  const actions = overlay.querySelector<HTMLElement>(".drive-actions");
  const hud = hero.querySelector<HTMLElement>(".drive-hud");

  const fontsReady = Promise.race([
    document.fonts?.ready ?? Promise.resolve(),
    new Promise((resolve) => setTimeout(resolve, 600)),
  ]);

  fontsReady.then(() => {
    // Positions are absolute ms on the timeline. The words lead; the lede and the CTA
    // follow close behind so the button is usable well under a second in.
    const tl = createTimeline({ defaults: { ease: "outExpo", duration: 900 } });
    if (video && !hero.classList.contains("no-video")) {
      tl.add(video, { scale: [1.08, 1], duration: 2400, ease: "outQuad" }, 0);
    }
    tl.add(words, { y: ["140%", "0%"], delay: stagger(100) }, 0);
    if (sub) tl.add(sub, { opacity: [0, 1], y: [18, 0], duration: 700 }, 280);
    if (actions) tl.add(actions, { opacity: [0, 1], y: [14, 0], duration: 550 }, 380);
    if (hud) tl.add(hud, { opacity: [0, 1], duration: 500 }, 480);
  });

  // ---- Hero overlay drifts out as the page scrolls -------------------------------------
  scroll(
    animate(
      overlay,
      { transform: ["translateY(0px)", "translateY(80px)"], opacity: [1, 0] },
      { ease: "linear" },
    ),
    { target: hero, offset: ["start start", "end start"] },
  );
}

// ---- Car cut-out parallax ---------------------------------------------------------------
const carVis = document.querySelector<HTMLElement>(".car-vis");
const car = carVis?.querySelector<HTMLElement>(".car-photo") ?? null;
if (hasMotion && carVis && car) {
  scroll(
    animate(car, { transform: ["translateX(-5%)", "translateX(5%)"] }, { ease: "linear" }),
    { target: carVis, offset: ["start end", "end start"] },
  );
}
