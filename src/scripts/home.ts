/**
 * Home page choreography.
 *
 * - Hero intro: an anime.js timeline — the footage settles from a slight zoom while the
 *   wordmark writes itself. The title is an SVG of the font's outlines masked by "pen"
 *   strokes (src/data/hero-glyphs.ts); `createDrawable` turns each pen into a drawable and
 *   the timeline draws them in writing order at a constant pen speed, so long strokes take
 *   longer than short ones. The lede, the button and the HUD come in while it's still writing.
 * - HUD clock: the "T+" readout mirrors the footage's own playback clock.
 * - Scroll-linked (Motion `scroll` + WAAPI, hardware-accelerated where ScrollTimeline is
 *   supported): the hero overlay drifts and fades as the hero leaves, and the car cut-out
 *   tracks slowly across its grid as its panel passes through the viewport.
 */
import { createTimeline, createDrawable } from "animejs";
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
  const svg = overlay.querySelector<SVGSVGElement>(".hero-glyphs");
  const pens = svg ? Array.from(svg.querySelectorAll<SVGPathElement>(".pen")) : [];
  const sub = overlay.querySelector<HTMLElement>(".hero-sub");
  const actions = overlay.querySelector<HTMLElement>(".drive-actions");
  const hud = hero.querySelector<HTMLElement>(".drive-hud");

  const PEN_SPEED = 60; // font units per ms — 30 strokes, ~1.4s for the whole wordmark
  const LIFT_SAME_GLYPH = 5; // ms between strokes of one letter
  const LIFT_NEXT_GLYPH = 14; // ms between letters
  const START = 60;

  // Positions are absolute ms on the timeline. The lede and the CTA come in while the
  // title is still being written so the button is usable well under a second in.
  const tl = createTimeline({ defaults: { ease: "outExpo", duration: 900 } });
  if (video && !hero.classList.contains("no-video")) {
    tl.add(video, { scale: [1.08, 1], duration: 2400, ease: "outQuad" }, 0);
  }

  if (svg && pens.length) {
    // createDrawable arms every pen at "0 0" (nothing drawn) synchronously, so it's safe
    // to lift the CSS hidden state right after.
    const drawables = createDrawable(pens);
    pens.forEach((pen) => (pen.style.visibility = "visible"));

    let t = START;
    drawables.forEach((drawable, i) => {
      const pen = pens[i];
      const duration = Math.max(40, pen.getTotalLength() / PEN_SPEED);
      tl.add(drawable, { draw: ["0 0", "0 1"], duration, ease: "inOutSine" }, t);
      const next = pens[i + 1];
      t += duration + (next && next.dataset.glyph === pen.dataset.glyph ? LIFT_SAME_GLYPH : LIFT_NEXT_GLYPH);
    });
    tl.call(() => {
      // Pen down: hand the finished title back to the stylesheet (drop shadow fades in)
      // and lift the mask so nothing depends on pen coverage any more.
      svg.classList.add("written");
      svg.querySelector(".glyphs")?.removeAttribute("mask");
    }, t);
  }

  if (sub) tl.add(sub, { opacity: [0, 1], y: [18, 0], duration: 700 }, 500);
  if (actions) tl.add(actions, { opacity: [0, 1], y: [14, 0], duration: 550 }, 650);
  if (hud) tl.add(hud, { opacity: [0, 1], duration: 500 }, 800);

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
