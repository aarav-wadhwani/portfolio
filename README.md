# aaravwadhwani.vercel.app

Personal site for Aarav Wadhwani: AI and quant engineering for finance teams.
The signature element is a ledger of real deployments; each row expands into a case study.

**Stack:** React 18, Vite 5, TypeScript, Tailwind 3 (custom tokens only), Fontsource
(Schibsted Grotesk, Instrument Serif, Martian Mono), Lenis for smooth scrolling. All motion is
CSS plus a few small hooks in `src/lib/motion.ts`, gated by a `motion` class on `<html>`. The page is prerendered to static HTML at build time and
hydrated on load, so it reads fully with JavaScript off.

## Commands

```sh
npm install
npm run dev        # dev server on :5173
npm run build      # type-check, client build, SSR build, prerender into dist/index.html
npm run preview    # serve the production build on :4173
npm run assets     # regenerate optimized images and favicons from assets-src/
npm run og         # re-render public/og-image.png with the real web fonts
npm run qa         # automated QA checks against a running build (default :4173)
npm run qa:shots   # screenshots at 390, 768 and 1440px
```

`npm run og`, `qa` and `qa:shots` need Chromium once: `npx playwright install chromium`.

## Editing content

Everything lives in **`src/content/site.ts`**: positioning, the `deployments` ledger and its
case studies, How I work, the publication, builds, teaching, about, skills and contact.

Rules for that file:
- Every claim must match the Fact Sheet in the redesign plan. Do not round or reword numbers.
- No em dashes. First person, sentence case.
- Open questions are marked `TODO(aarav)` and listed in `CHANGELOG.md`.

To add a case study, add an entry to `deployments`. Its `id` becomes a deep link
(`/#your-id` opens that row).

Images: put the original in `assets-src/`, add a line to `scripts/generate-assets.mjs`,
run `npm run assets`, then import the generated `src/assets/*.webp` in `site.ts`.

## Deploying

Vercel builds every push. `main` is production; any other branch gets a preview URL.
