# Changelog

## 2.0.0, "The Deployment Ledger" (branch `redesign/v2`, 14 Nov 2026)

Full redesign following `portfolio_redesign_plan.md`, Direction 1. Not merged to `main`
and not promoted to production. Awaiting review.

### What changed

**Positioning.** The site now leads with "I build AI systems inside finance teams, and stay
until people use them." Indago Capital is the flagship; ML, quant and research are the proof.

**Visual system.** Light theme (paper `#F7F8FA`, ink `#0F1B2D`, slate `#4A5568`, one amber
accent). Schibsted Grotesk for text, Martian Mono for numbers, dates and ledger values only.
Sentence-case labels, no tracked uppercase, body text at 16 to 17px.

**Structure.** Sticky nav, then a hero whose signature element is a ledger of four real
deployments. Each row expands in place into an Input, Process, Output case study, and
`/#indago`, `/#copper`, `/#livestock`, `/#nailsense` deep-link to an open row. Then How I work,
Research, Builds, Earlier work, Teaching, About, Contact. Desktop page height went from
13,316px to about 6,100px.

**Content.** Rewritten from the plan's Fact Sheet only:
- Indago: new flagship case (connectors, 10+ Claude skills, deal wiki, pricing framework). No
  dollar figures, no colleague names, no deal details, no screening agent.
- Macquarie: official title, two cases, one public number each.
- NailSense: renamed, first-author UIST '26 demo with DOI, new results (8.91 mm, 5.97 mm,
  93.4%). The 1.74 cm figure and the old pipeline narrative are retired.
- Questra: the screenshot that showed an error banner is gone; a labeled slot is in its place.
- Skills regrouped for the target roles; the proficiency meters are removed.

**Removed.** Loader, custom cursor, probe field, grid background, scroll HUD, header traces,
scroll-linked signal trace, Power Rail, and every scroll-triggered reveal.

**Engineering.**
- The page is prerendered to static HTML at build time (`scripts/prerender.mjs`) and then
  hydrated, so all text is present at first paint, in link previews, and with JavaScript off
  (where every case study renders open).
- JSON-LD `Person` and `ScholarlyArticle` (NailSense DOI). New OG image, favicon and 404 page.
- Hero font is preloaded; images are lazy below the fold with intrinsic sizes.
- JS is about 58 KB gzipped (budget 150 KB).
- QA scripts: `npm run qa` (overflow, banned strings, keyboard, reduced motion, no-JS, axe)
  and `npm run qa:shots` (screenshots at 390, 768 and 1440px).

### Decisions taken by default

| ID | Decision | What I did |
|---|---|---|
| D0 | Design direction | Direction 1, as instructed. |
| D1 | Macquarie title | "Commodities and Global Markets Intern", with "quant modeling for the metals / agriculture desk" in the case note. The resume PDF still needs to match. |
| D2 | Desk numbers | Published as one small line per case: "71% directional accuracy" and "Under 5% MAPE across 10 markets". I did not add "in backtests" because the Fact Sheet does not say it. |
| D3 | Resume PDF | Not updated here (separate task). The site still links the old PDF. **Blocker before production.** |
| D4 | Primary domain | `aaravwadhwani.com` is attached to the Vercel project but is not registered (DNS returns NXDOMAIN), so canonical, OG, sitemap and JSON-LD now point to `https://aaravwadhwani.vercel.app`. Previously they pointed at a domain that does not resolve. |
| D5 | Khao | Left off. |
| D6 | NailSense sticker weight | Omitted. |
| D7 | Questra secondary metrics | Omitted (5,000+ questions, 92% accuracy, sub-2s). Only "5 UW math courses" and "2,500+ UW students" appear. |
| D8 | Assets | Labeled placeholder slots for the Questra screenshot and the NailSense poster figure. The existing headshot is reused. |

### Deviations from the plan (each is easy to reverse)

- **Framer Motion removed.** Section 6.1 says keep it, but the only two animations left
  (ledger fill, row expansion) are plain CSS, which also works before hydration. Shipping the
  library for nothing would cost about 40 KB.
- **Hero size is 56px, not 61px.** At 61px the fourth ledger row fell below a 900px fold.
- **Focus ring is amber with a thin ink edge.** Amber alone is about 2.2:1 on white, under the
  3:1 a focus indicator needs.
- **Macquarie is two ledger rows**, not one tabbed case, so each desk reads as its own deployment.
- **The old pose-overlay figure is retired** along with the 1.74 cm result it illustrated.

### Open TODO(aarav) items

1. **Resume PDF (D3).** Replace `public/resume/Aarav_Wadhwani_Resume.pdf`. It predates Indago
   and uses the old Macquarie title. Do this before production.
2. **Questra screenshot (D8).** Add `assets-src/questra-ui.png`, then follow the note in
   `scripts/generate-assets.mjs`.
3. **NailSense figure (D8).** Add the poster pipeline figure or a demo photo.
4. **Headshot (D8).** Optional replacement at `assets-src/headshot.jpeg`.
5. **Sticker weight (D6).** 0.65 g (poster) or 0.39 g (paper)?
6. **Questra metrics (D7).** Confirm or drop for good.
7. **Khao (D5).** Include as "in progress" or not.
8. **About wording.** Confirm "I'm from New Delhi and study in Seattle".
9. **Domain (D4).** Register `aaravwadhwani.com` if you want it, then switch the canonical back.
   Make LinkedIn match whichever you choose.
10. **Links for OneGlance and Food Desert Mapper**, if you want them clickable.
11. **Kernel Labs (2022).** Listed with no description because the Fact Sheet has none.
