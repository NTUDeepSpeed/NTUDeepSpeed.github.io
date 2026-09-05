/**
 * Count-up for headline numbers marked `data-count` (stat panels on Home and Achievements).
 *
 * The number is parsed straight out of the element's text, so the templates stay plain and
 * the no-JS render is the final value: "00:41.8" (lap time), "9.4", "#9" and "14" all work.
 * Put the attribute on an element that holds only the number (wrap it in a <span> if a unit
 * or other markup sits beside it).
 *
 * anime.js drives it: `animate()` tweens a plain JS object and `onScroll()` starts the tween
 * once, the first time the number scrolls into view (`repeat: false`).
 */
import { animate, onScroll } from "animejs";
import { hasMotion } from "./prefs";

interface Parsed {
  prefix: string;
  suffix: string;
  value: number;
  format: (v: number) => string;
}

function parse(text: string): Parsed | null {
  const m = text.trim().match(/^(\D*?)(\d[\d:.]*)(.*)$/s);
  if (!m) return null;
  const [, prefix, raw, suffix] = m;

  if (raw.includes(":")) {
    // Lap-time style "mm:ss.d" — tween total seconds, format back with the same digit widths.
    const [mm, ss] = raw.split(":");
    const decimals = (ss.split(".")[1] ?? "").length;
    const value = Number(mm) * 60 + Number(ss);
    const format = (v: number) => {
      const minutes = Math.floor(v / 60);
      const seconds = v - minutes * 60;
      return `${String(minutes).padStart(mm.length, "0")}:${seconds.toFixed(decimals).padStart(ss.length, "0")}`;
    };
    return { prefix, suffix, value, format };
  }

  const decimals = (raw.split(".")[1] ?? "").length;
  return { prefix, suffix, value: Number(raw), format: (v) => v.toFixed(decimals) };
}

if (hasMotion) {
  document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
    const parsed = parse(el.textContent ?? "");
    if (!parsed || !Number.isFinite(parsed.value)) return;
    const { prefix, suffix, value, format } = parsed;

    const counter = { v: 0 };
    const render = () => {
      el.textContent = `${prefix}${format(counter.v)}${suffix}`;
    };
    render();

    animate(counter, {
      v: value,
      duration: 1500,
      ease: "outQuint",
      onUpdate: render,
      autoplay: onScroll({ target: el, enter: "bottom-=40 top", repeat: false }),
    });
  });
}
