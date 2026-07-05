# aaravwadhwani.com: "Engineering the Signal"

Single-page portfolio drawn as one continuous engineering schematic: a scroll-linked
signal trace runs down the page, plugging into each project "component board"
(input → process → output), and resolves into a clean output terminal at the end.

**Stack:** React + Vite + TypeScript · Tailwind CSS (custom token theme) · Framer Motion.
No icon/UI kits: all schematic symbols are hand-authored inline SVG. No audio, by design.

## Commands

```sh
npm install
npm run dev      # dev server on :5173
npm run build    # type-check + production build -> dist/
npm run preview  # serve the production build on :4173
npm run assets   # regenerate optimized images / favicon / OG image from assets-src/
```

## Editing content

Everything lives in **`src/content/site.ts`**: hero, bio, all project boards U1–U8
(including hover tooltips and connector annotations), the Power Rail index items,
the EE 201 checkoff-sheet content, skills, and contact ports. A ready-to-duplicate
**TEMPLATE block** for adding a new project board is commented at the bottom of the
`boards` array there. House style: no em dashes in copy, anywhere.

Images: drop the original into **`assets-src/`**, add a line to
`scripts/generate-assets.mjs`, run `npm run assets`, then reference the generated
`src/assets/*.webp` from `site.ts`. The resume PDF lives at
`public/resume/Aarav_Wadhwani_Resume.pdf`.

## Deploying (Vercel + GitHub)

1. Push this repo to GitHub (`git remote add origin … && git push -u origin main`).
2. vercel.com → Add New Project → import the repo. Vercel auto-detects Vite;
   no custom build settings needed.
3. Every push to `main` deploys to production; other branches/PRs get preview URLs.
4. Custom domain: Vercel project → Settings → Domains → add `aaravwadhwani.com`,
   then add the DNS records Vercel shows at the registrar (A record for the root,
   CNAME for `www`). HTTPS certs are automatic.

`public/404.html` is served for unknown paths on Vercel static deployments.
Canonical URL, Open Graph tags, `robots.txt`, and `sitemap.xml` are already wired
to `https://aaravwadhwani.com`.
