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
  a template) and prepend a matching card entry to `src/data/pit-notes.ts`.
- **Race-day "Live" chip** — toggle `showLiveChip` in `src/config.ts`.

### Design system

`src/styles/tokens.css` defines the "DeepSpeed" design system: a monochrome ink scale (the logo is
pure black/white) plus sparingly-used accent colors with semantic meaning — `--race-red` (race /
record / live), `--flag-yellow` (caution / engineering), `--flag-green` (go / pass / online),
`--grid-cyan` (telemetry / data). Dark theme (`--ink-900` background) is the default; the brand
"lives on black." Prefer reusing existing tokens/utility classes from `app.css`/`site.css` over
introducing new colors or one-off styles.

### Known content gaps

`src/pages/pit-notes/p3-at-icra-2024.astro` is a sample article layout with placeholder body copy,
and several `src/data/pit-notes.ts` entries currently point their `href` at that same sample page
pending real write-ups — check before assuming every pit-note card links to a finished article.

## Git workflow

After completing a change, create a git commit (following the repo-wide commit conventions in your
global instructions) so it's ready to push through the deploy workflow.
