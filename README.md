# NTU DeepSpeed — Team Website

Static site for [NTU DeepSpeed](https://ntudeepspeed.github.io), Nanyang Technological
University's autonomous racing (RoboRacer / F1Tenth) team.

Built with [Astro](https://astro.build) (Vite-based) + TypeScript, managed with Yarn,
deployed to GitHub Pages via GitHub Actions.

## Development

```bash
yarn install
yarn dev        # dev server at http://localhost:4321
yarn build      # type-check (astro check) + production build into dist/
yarn preview    # serve the production build locally
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and
publishes `dist/` to GitHub Pages. One-off deploys can be triggered from the Actions tab
(`workflow_dispatch`).

> **One-time repo setup:** in *Settings → Pages*, set **Source** to **GitHub Actions**.

## Project structure

```
public/
  assets/            static assets (logos, sponsor marks, team photos, hero video)
src/
  config.ts          site-wide config: nav, social links, contact info, "Live" chip toggle
  data/              content as typed data — edit these to update the site
    members.ts       team roster + alumni (photos, LinkedIn, saved photo crops)
    achievements.ts  race timeline + headline stats
    pit-notes.ts     article cards for Home + Pit notes index
  styles/
    tokens.css       DeepSpeed design-system tokens (colors, type, spacing, motion)
    app.css          design-system component styles (header, cards, timeline, …)
    site.css         site-specific additions + responsive layer
  components/        shared Astro components (Header, Footer, NoteCard, MemberCard)
  layouts/Base.astro shared page chrome (head, header, footer)
  pages/             one .astro file per page → one URL per file
    index.astro              /
    achievements.astro       /achievements/
    members.astro            /members/
    contact.astro            /contact/
    pit-notes/index.astro    /pit-notes/
    pit-notes/p3-at-icra-2024.astro   sample article layout
```

## Common edits

- **Add a member / update a photo** — edit `src/data/members.ts`; put the photo in
  `public/assets/team/`. A member without a `photo` renders an initials placeholder.
- **Add a race result** — prepend an entry in `src/data/achievements.ts`.
- **Add a pit note** — create `src/pages/pit-notes/<slug>.astro` (copy the sample
  article) and prepend a card entry in `src/data/pit-notes.ts`.
- **Race-day "Live" chip** — set `showLiveChip: true` in `src/config.ts`.

## Asset notes

- `public/assets/drive.mp4` — the home hero footage. If the file is removed, the hero
  gracefully falls back to the dark grid stage without video.
- Members without a `photo` in `src/data/members.ts` render an initials placeholder.
