# Changelog

## 2.0.0, "The Deployment Ledger" (branch `redesign/v2`, 14 Nov 2026)

Full redesign following `portfolio_redesign_plan.md`, Direction 1. Not merged to `main`
and not promoted to production. Awaiting review.

### Second pass: "The Ledger, live" (15 Nov 2026)

The first pass followed the plan's calm, one-animation brief and was reviewed as too basic. This
pass keeps every verified fact and guarantee and rebuilds the presentation at full volume.

- **Hero.** Full viewport. Headline at about 100px with italic serif accents (Instrument Serif)
  and the headshot as an inline pill. A canvas price tape draws itself behind it and drifts
  toward the pointer. Local Seattle time, an "Open to 2027 roles" beacon, and three pillars that
  jump straight to their ledger rows.
- **Tape band.** An ink marquee of Fact Sheet figures. It pauses on hover.
- **Ledger.** Set large. Rows invert to ink on hover while a preview card (chart, photo or
  skill chips) trails the pointer. The open row stays ink; charts draw themselves on open.
- **How I work.** An ink band with a pinned heading. The step nearest the middle of the screen
  lights up and a large numeral and progress rule track it.
- **Research, Builds, Teaching, About.** Oversized headings with index numbers, pinned media,
  a pull quote set in display serif, image zoom on hover.
- **Contact.** An amber band with the address set huge, over an ink footer with the name at
  about 12vw.
- **Motion layer.** Reveal on scroll, masked line rises, magnetic buttons, smooth wheel
  scrolling (Lenis, desktop only), a scroll progress bar, and a nav that hides on scroll down.

Guarantees kept: all of this hangs off one `motion` class that is only set when JavaScript runs
and the visitor has not asked for reduced motion. Without it the page is static and complete.
The page is still prerendered, still reads with JavaScript off, and still scores 100 on all four
Lighthouse categories on mobile. JS is about 70 KB gzipped.

**Plan targets this pass knowingly misses**
- **Page height.** Desktop is about 10,800px against the plan's 7,500px target. Full-viewport
  hero, pinned sections and display type cost height. The old site's problem was empty gaps;
  this length is content.
- **"Nothing animates on scroll."** Replaced by the motion layer above, at the owner's request.
- **Ledger in the hero.** The ledger moved to its own section directly below. The hero carries
  the three pillars instead, so the five-second test still passes above the fold.

**Deliberately not done:** figures do not count up from zero. An early build did, and a
screenshot caught "63%" on its way to 71%. Figures now rise out of a mask, so every frame shows
the true value.

### What changed (first pass)

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
- **Dates are set in the text face, not the mono.** Mono is kept for pure figures (71%, 8.91 mm, row numbers, the DOI). An independent critique flagged mono dates as gappy.
- **Focus ring is amber with a thin ink edge.** Amber alone is about 2.2:1 on white, under the
  3:1 a focus indicator needs.
- **Macquarie is two ledger rows**, not one tabbed case, so each desk reads as its own deployment.
- **The old pose-overlay figure is retired** along with the 1.74 cm result it illustrated.

### Found during QA

- **questra-ai.com has lapsed.** It now returns a 302 to an unrelated survey site, so the Questra
  card no longer links to it. The Fact Sheet still lists it as the site.
- **An independent fact audit** of the built page found no contradictions with the Fact Sheet. Its
  unsupported or stretched lines were tightened: the Indago status reads "Shipped" (only Firm
  Dossier is confirmed as still in use), the How I work evidence lines no longer imply more than
  the facts say, and descriptive claims were removed from chart captions and alt text.
- **An independent design critique** (by an agent that did not write the code) drove the ledger
  card layout below 1024px, the row numbers and header rule, the stacked Indago layout, and the
  mobile hero tightening.
- **Preview QA.** Vercel preview URLs are behind Vercel Authentication. The preview build log shows
  the same asset hashes as the local production build, so the automated QA ran against that
  identical build on localhost.

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
11. **Kernel Labs (2022).** Listed as one line ("Internship, 2022") because the Fact Sheet has no detail.
12. **Questra link.** Renew questra-ai.com or leave the card unlinked.
13. **How I work, step 2.** The DealCloud connector is the evidence for "Find the step that hurts". Confirm CRM entry really was the pain point.
14. **LLM ranking plots.** They are the original Plotly exports on a white matte. Re-exporting them in the site palette with larger labels would make them readable at a glance.
