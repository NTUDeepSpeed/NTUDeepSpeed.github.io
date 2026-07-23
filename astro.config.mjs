// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Static multi-page site served from the GitHub Pages org root
// (https://ntudeepspeed.github.io) — no base path needed.
export default defineConfig({
  site: "https://ntudeepspeed.github.io",
  integrations: [sitemap()],
});
