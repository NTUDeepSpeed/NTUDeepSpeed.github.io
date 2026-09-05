/**
 * Article reading progress: a 2px race-red line pinned to the top edge that fills as the
 * reader moves through `.article-wrap`.
 *
 * Motion `scroll()` binds the bar's scaleX to the article's scroll progress; where the
 * browser supports ScrollTimeline the animation runs entirely off the main thread. This is
 * scroll-linked UI rather than autonomous motion, so it is not gated on `has-motion`.
 */
import { animate } from "motion/mini";
import { scroll } from "motion";

const article = document.querySelector<HTMLElement>(".article-wrap");
if (article) {
  const bar = document.createElement("div");
  bar.className = "reading-progress";
  bar.setAttribute("aria-hidden", "true");
  document.body.append(bar);

  scroll(animate(bar, { transform: ["scaleX(0)", "scaleX(1)"] }, { ease: "linear" }), {
    target: article,
    offset: ["start start", "end end"],
  });
}
