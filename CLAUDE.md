# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Static team website for NTU DeepSpeed (RoboRacer / F1Tenth autonomous racing team, Nanyang
Technological University). Built with Astro (Vite-based) + TypeScript, package-managed with Yarn,
deployed to GitHub Pages via GitHub Actions on every push to `main`.

## Commands

```bash
yarn install
yarn dev        # dev server at http://localhost:4321
yarn build      # astro check (type-check) + production build into dist/
yarn preview    # serve the production build locally
yarn check      # astro check only (no build)
```

There is no test suite and no linter configured — `astro check` (part of `yarn build`) is the only
correctness gate. Run it before considering a change done.

Deployment is automatic: pushing to `main` triggers `.github/workflows/deploy.yml`, which runs
`yarn build` and publishes `dist/` to GitHub Pages. There's no separate deploy command to run
locally. **After making changes, commit them with git** (see repo-wide commit conventions) so the
deploy workflow can pick them up on push.

## Architecture

This is a content-as-data site: pages are thin Astro templates, and nearly all editable content
lives in typed TypeScript modules under `src/data/`, imported by the pages that render it.

```
public/assets/            static assets (logos, sponsor marks, team photos, hero video)
src/
  config.ts                site-wide config: nav items, social links, contact info, "Live" chip toggle
  data/
    members.ts              team roster + alumni (photo paths, LinkedIn, saved photo crops)
    achievements.ts          race timeline + headline stats
    pit-notes.ts             article cards shown on Home and the Pit notes index
  styles/
    tokens.css               DeepSpeed design-system tokens (colors, type, spacing, motion)
    app.css                  design-system component styles (header, cards, timeline, …)
    site.css                 site-specific additions + responsive layer
  components/               shared Astro components (Header, Footer, NoteCard, MemberCard, icons.ts)
  layouts/Base.astro         shared page chrome: head, Header, <slot/>, Footer
  pages/                     one .astro file per page → one URL per file (index, achievements, members, contact)
  pages/pit-notes/           index.astro (listing) + one .astro file per article
  scripts/                   client-side motion modules (see "Motion" below), imported from page <script> tags
    prefs.ts                  `hasMotion` gate + the shared easing curve
    reveal.ts                 in-view entrance reveals for [data-reveal] — loaded on every page by Base.astro
    counters.ts               count-up for [data-count] numbers (Home + Achievements stats)
    home.ts                   hero intro timeline, HUD clock, hero/car scroll parallax
    timeline.ts               scroll-synced Achievements rail
    reading-progress.ts       article reading-progress bar
```

- `astro.config.mjs` sets `site` to the GitHub Pages org root (`https://ntudeepspeed.github.io`) —
  no `base` path, since this repo deploys to the org root, not a project subpath.
- Every page wraps its content in `<Base active={pageId} title=... description=...>` from
  `src/layouts/Base.astro`, which pulls in the three stylesheets in a fixed order (`tokens.css` →
  `app.css` → `site.css`) and renders the shared Header/Footer.
- `src/config.ts`'s `NAV_ITEMS` and the `PageId` union drive header active-state — adding a page
  means adding both a route under `src/pages/` and a matching nav entry.

### Content editing patterns

- **Add/update a member** — edit `src/data/members.ts`; place the photo in
  `public/assets/team/`. A member without a `photo` renders an initials placeholder
  (see `MemberCard.astro`). Optional `crop: { s, x, y }` fine-tunes photo framing within the
  fixed-aspect image slot.
- **Add a race result** — prepend an entry to `src/data/achievements.ts` (list is newest-first).
- **Add a pit note** — create `src/pages/pit-notes/<slug>.astro` (copy an existing article page as
  a template) and prepend a matching card entry to `src/data/pit-notes.ts`. Article photos/videos
  go in `public/assets/pit-notes/<slug>/`, rendered with the `.article-figure` / `.article-media`
  classes from `site.css`. Every card entry requires a `thumb` image (16:9 crop), shown on the
  Pit notes index.
- **Race-day "Live" chip** — toggle `showLiveChip` in `src/config.ts`.

### Design system

`src/styles/tokens.css` defines the "DeepSpeed" design system: a monochrome ink scale (the logo is
pure black/white) plus sparingly-used accent colors with semantic meaning — `--race-red` (race /
record / live), `--flag-yellow` (caution / engineering), `--flag-green` (go / pass / online),
`--grid-cyan` (telemetry / data). Dark theme (`--ink-900` background) is the default; the brand
"lives on black." Prefer reusing existing tokens/utility classes from `app.css`/`site.css` over
introducing new colors or one-off styles.

### Motion

Two libraries with distinct jobs, both bundled by Astro from `src/scripts/`:

- **Motion** (`motion` / `motion/mini`) — the global, hardware-accelerated primitives: `inView`
  entrance reveals, `scroll()`-linked progress/parallax, the mobile-nav stagger. Always animate the
  full `transform` string (not `x`/`y`) so it stays on the compositor.
- **anime.js** (`animejs`) — page-level choreography: the hero `createTimeline`, `onScroll` count-ups
  and the scroll-*synced* Achievements rail. Only imported by the pages that use it.

Conventions:

- **Reveal an element on scroll** — add `data-reveal` (optionally `="left" | "scale" | "fade"`).
  Items entering together are staggered automatically; nothing else to wire. Don't put it on an
  element whose layout relies on a CSS `transform` (e.g. `.article-figure.wide`) — mark a child.
- **Count a number up** — add `data-count` to an element containing *only* the number (lap times
  like `00:41.8`, `#9`, `9.4` all parse in place).
- **Reduced motion / no JS** — `Base.astro` stamps `<html class="has-motion">` only when JS runs
  and `prefers-reduced-motion` is not set. Every "hidden until animated" CSS state in `site.css`
  is scoped under it, and every script checks `hasMotion` from `scripts/prefs.ts`. Keep it that
  way: motion must never be a prerequisite for seeing content.
- Motion timing should feel mechanical, not bouncy: use `EASE_MECH` / `outExpo`, never springs.

## Git workflow

After completing a change, create a git commit (following the repo-wide commit conventions in your
global instructions) so it's ready to push through the deploy workflow.
