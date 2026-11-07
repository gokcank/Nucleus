# nucleus-web

Promo and documentation website for Project Nucleus (a Tauri desktop app, repo `gokcank/ProjectNucleus`), published on GitHub Pages at https://gokcank.github.io/Nucleus/.

## Build & test
- `npm ci` then `npm run dev` (served at `/`).
- `npm run build` — type-check (`tsc -b`) + Vite build with base `/Nucleus/`; `postbuild` copies `dist/index.html`
  to `dist/404.html` for deep links.
- `npm run lint` (oxlint). `npx tsc -b --noEmit` should be clean.
- Deep links and base-path asset loading must be tested against a static server that mimics GitHub Pages 404
  behaviour — the Vite dev server hides these problems. Check light/dark, EN/TR and ~420 px width visually.

## Layout
- `src/router/Router.tsx`: hand-written `pushState` router (no router library), base-path aware via `BASE_URL`.
- `src/i18n/`: EN/TR dictionary for UI chrome; keep both languages' keys in sync. Language stored in `localStorage`.
- `src/content/roadmap.md`, `src/content/decisions.md`: manual copies of the main project's `docs/ROADMAP.md` and
  `docs/DECISIONS.md` (English only, imported with `?raw`). No automatic sync — re-copy when those change.
- `src/index.css`: design tokens (light/dark via `prefers-color-scheme`), `.glass-panel`, `.prose`.
- `reference/` (git-ignored): copies of main-project docs for copywriting only; never commit.
- Deploy: `.github/workflows/deploy.yml` builds and publishes on every push to `main`.

## Project rules
- This repo is the website (`Nucleus`); the app lives in `ProjectNucleus`. Links to the app's code point there.
  Do not modify the main Nucleus project from here.
- Do not add custom Tailwind spacing tokens with t-shirt names (`xs`…`2xl`): they break `max-w-*`/`min-w-*` in
  Tailwind v4. Use the default 4px numeric scale.
- Keep dependencies minimal; prefer small hand-written code over a dependency that `npm audit` flags.
- Base path is set only in `vite.config.ts`; a domain change should touch nothing else.
- Design follows the main app's UI guidelines: restrained glassmorphism, radius 10/18/24 px, Lucide icons,
  system font, 150–250 ms ease-out animations.
- Roadmap/Decisions stay English-only unless translation is requested.

## Status (as of 2026-11-07)
- Feature-complete and live since 2026-08-01: home, roadmap, decisions, EN/TR toggle, logo and favicon.

## Open items
- Product screenshots (to be supplied) — the site has none yet.
- `README.md` is still the create-vite template.

## More context
Background, decisions and history are in the second brain: `/home/gokcank/ikinci-beyin/projects/nucleus-web.md` (read on demand).
