# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev                  # Vite dev server (CSR only — no prerender)
npm run build                # Full production pipeline (see below)
npm run build-blog           # Compile blog/*.md → public/blog-data/*.json
npm run build-programmatic   # Build + validate programmatic JSON from seeds
npm run generate-sitemap     # Write dist/sitemap.xml from all route sources
npm run lint                 # ESLint (flat config)
npm run preview              # Serve dist/ locally
```

There is **no test suite**. Quality gates are `npm run lint` and `npm run build` succeeding.

## Build Pipeline

`npm run build` is a 6-step chain defined in `package.json`; each step depends on outputs of the previous:

1. `build-blog` — `scripts/build-blog.cjs` parses `blog/*.md` frontmatter into `public/blog-data/*.json` and an `index.json`.
2. `build-programmatic` — `scripts/build-programmatic.mjs` expands `src/data/programmatic-integration-seeds.json` into `src/data/programmatic-integrations.json`, then `scripts/validate-programmatic.mjs` enforces schema invariants across the six programmatic JSON files (hubs + 5 families). **Run this whenever editing programmatic seeds or JSON.**
3. `vite build` — client bundle to `dist/`, with 4 HTML entry points (`index.html`, `blog.html`, `privacy.html`, `terms.html`) declared in `vite.config.ts`.
4. `vite build --ssr src/entry-server.tsx` — SSR bundle to `dist/server/`.
5. `scripts/prerender.mjs` — imports the SSR bundle, calls `getPrerenderPages()` + `renderApp()` for every route (home, blog listing, each blog post, each programmatic hub, each programmatic page, privacy, terms), injects HTML into the matching template, writes `dist/<route>/index.html`, then deletes the `blog.html`/`privacy.html`/`terms.html` template leftovers and `dist/server/`.
6. `generate-sitemap` — reads blog + programmatic JSON to emit `dist/sitemap.xml`.

If a change only affects runtime behavior (not prerendered HTML), `vite build` alone is insufficient — the prerender step overwrites `dist/index.html` and friends.

## Architecture

### SSR + hydration (not a plain SPA)
- `src/App.tsx` exports `AppShell` (router + layout, no `BrowserRouter`). Both client and server wrap it with their own router.
- Client entry `src/main.tsx` calls `hydrateRoot` when `#root` has children (prerendered case) and `createRoot` otherwise (dev).
- Server entry `src/entry-server.tsx` wraps `AppShell` in `StaticRouter` + `PageDataProvider`, exports `renderApp(url, initialData)`, `getPrerenderPages(posts)`, and `renderSEOHead`.
- Initial data (e.g. a blog post) is serialized into a `window.__SCANDOCPRO_PAGE_DATA__` script tag by `prerender.mjs` and consumed by `PageDataProvider` on hydration — this is how blog content appears in prerendered HTML without a fetch.

### Programmatic SEO pages
Five "families" are driven entirely by JSON in `src/data/`:
- `documents` → `/documents/:slug` (workflow intent)
- `solutions` → `/solutions/:slug` (role-based)
- `compare` → `/compare/:slug` (competitor comparison)
- `integrations` → `/integrations/:slug` (integration pages)
- `tools` → `/tools/:slug` (browser-based conversion utilities; see Tools subsection)

Each family has a hub page and detail pages rendered by `ProgrammaticHub`/`ProgrammaticPage` from `src/data/programmaticPages.ts`, which normalizes the raw JSON. The `integrations` family is special — its JSON is **generated** from `programmatic-integration-seeds.json` by `build-programmatic.mjs`; edit the seeds, not the generated file.

### Tools family
Tool pages carry a `tool` metadata block (`engine`, input/output formats, size limit, labels) and render an interactive `ToolRunner` component (`src/components/ToolRunner.tsx`) in the hero's right column instead of the SendFaxPro CTA. Conversion engines live in `src/lib/tools/engines/` and are **lazy-loaded via dynamic import** keyed on `tool.engine` — the bundle cost only hits users who actually convert a file. `ToolRunner` is SSR-safe via a `mounted` flag (initial render returns a placeholder; interactive UI appears after hydration). To add a new engine: drop a file in `engines/`, add its name to `ProgrammaticToolEngine` in `src/types/index.ts`, add it to `supportedToolEngines` in `validate-programmatic.mjs`, and branch on `tool.engine` in `ToolRunner.handleConvert`.

`validate-programmatic.mjs` is the schema contract for these JSON files — run `npm run build-programmatic` after any JSON edit to catch missing required fields before prerender fails.

### SEO
`src/utils/seo.ts` is used two ways:
- At **build time**, `renderSEOHead(seoProps)` returns HTML string injected into the `<head>` by `prerender.mjs`. Tags have `data-seo-managed="true"`.
- At **runtime** (`src/components/SEO.tsx`), the same props drive DOM mutations that strip existing `data-seo-managed` tags and re-add them on navigation.

When adding a page, both paths must be wired: add a `getXxxSEO()` helper, include it in `getPrerenderPages()`, and render `<SEO ... />` inside the page component.

### Theming
`ThemeContext` + `ThemeStore` (in `src/context/`) handle dark/light with Tailwind's `darkMode: 'class'` strategy, localStorage key `"theme"`, and `prefers-color-scheme` fallback.

## Adding a route

1. Create page component in `src/pages/`.
2. Add `<Route>` in `src/App.tsx` (inside `AppShell`, shared by SSR + client).
3. Add a `getXxxSEO()` in `src/utils/seo.ts` and push an entry in `getPrerenderPages()` in `src/entry-server.tsx`.
4. If the route needs a separate HTML template, add it to `vite.config.ts` `rollupOptions.input` **and** to the cleanup list at the bottom of `scripts/prerender.mjs`.
5. Add the route to `scripts/generate-sitemap.js` (or source it from data if templatable).

## Conventions

- TypeScript strict mode; use `@/` alias for imports from `src/`.
- Path imports only — no relative `../../` from `pages/` into `components/`.
- Content lives in JSON (`src/data/`) or Markdown (`blog/`), not in TSX. New marketing content should follow this pattern so it flows through the prerender + sitemap pipeline automatically.
- Domain is `https://scandoc.pro`; hardcoded in `scripts/generate-sitemap.js` and `src/utils/seo.ts`.

## Out-of-date reference

`AGENTS.md` predates the SSR/prerender and programmatic-pages work. Treat this file as the source of truth; `AGENTS.md` is still useful for component-level structure and the blog frontmatter schema.
