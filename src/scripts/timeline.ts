/**
 * Achievements rail: the vertical line draws itself as the page scrolls and each dot pops
 * when the "pen" reaches it.
 *
 * anime.js `onScroll({ sync })` links the line's scaleY to scroll position between two
 * thresholds ("<container> <target>": the entry's top / bottom crossing a line 70% down the
 * viewport). `sync: 0.35` smooths the progress so the line keeps easing for a few frames
 * after the wheel stops instead of freezing mid-stroke.
 */
import { animate, onScroll } from "animejs";
import { hasMotion } from "./prefs";

const PEN = "70%"; // where on the viewport the rail is being drawn

if (hasMotion) {
  document.querySelectorAll<HTMLElement>(".timeline-entry").forEach((entry) => {
    const dot = entry.querySelector<HTMLElement>(".tl-rail .dot");
    const line = entry.querySelector<HTMLElement>(".tl-rail .line");

    if (dot) {
      animate(dot, {
        scale: [0, 1],
        duration: 500,
        ease: "outExpo",
        autoplay: onScroll({ target: entry, enter: `${PEN} top`, repeat: false }),
      });
    }

    if (line) {
      animate(line, {
        scaleY: [0, 1],
        ease: "linear",
        autoplay: onScroll({
          target: entry,
          enter: `${PEN} top`,
          leave: `${PEN} bottom`,
          sync: 0.35,
        }),
      });
    }
  });
}
