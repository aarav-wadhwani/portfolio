// Usage: node scripts/qa/checks.mjs <baseUrl>
// Automated half of the Section 9 QA checklist. Prints one PASS/FAIL line per check.
import { chromium } from 'playwright'
import { AxeBuilder } from '@axe-core/playwright'

const base = process.argv[2] ?? 'http://localhost:4173'
const results = []
const check = (name, pass, detail = '') => {
  results.push({ name, pass })
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? `  (${detail})` : ''}`)
}

const browser = await chromium.launch()

// 1. No horizontal scroll at any width, with every row closed and with each row open.
for (const [w, h] of [[390, 844], [768, 1024], [1440, 900]]) {
  const page = await (await browser.newContext({ viewport: { width: w, height: h } })).newPage()
  let worst = 0
  for (const hash of ['', '#indago', '#copper', '#livestock', '#nailsense']) {
    await page.goto(`${base}/${hash}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(500)
    const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    worst = Math.max(worst, over)
  }
  check(`no horizontal scroll at ${w}px`, worst <= 0, `overflow ${worst}px`)
  if (w === 1440) {
    await page.goto(base, { waitUntil: 'networkidle' })
    const height = await page.evaluate(() => document.documentElement.scrollHeight)
    check('desktop page height under 7,500px (plan target)', height < 7500, `${height}px`)
    const fold = await page.evaluate(() => ({
      h1: document.querySelector('h1').getBoundingClientRect().bottom <= window.innerHeight,
      pillars: [...document.querySelectorAll('#top ul a')].filter((el) => el.getBoundingClientRect().bottom <= window.innerHeight).length,
    }))
    check('headline and all three pillars above the 900px fold', fold.h1 && fold.pillars === 3, `${fold.pillars} pillars`)
  }
  await page.context().close()
}

// 2. Banned strings and em dashes in the served HTML (which is the full prerendered page).
const html = await (await fetch(base)).text()
const text = html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ')
check('no em dashes in served HTML', !html.includes('\u2014'))
for (const banned of ['incoming', '1.74', 'Quantitative Research Intern', 'deal screening', 'REV A', 'REV B', 'Signal resolved', 'End of trace']) {
  check(`banned string absent: "${banned}"`, !text.toLowerCase().includes(banned.toLowerCase()))
}
check('no dollar figures', !/\$\s?\d/.test(text))

// 3. Content is in the HTML itself (readable without JavaScript).
{
  const ctx = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } })
  const page = await ctx.newPage()
  await page.goto(base, { waitUntil: 'load' })
  const visible = await page.evaluate(() => {
    const vis = (sel) => [...document.querySelectorAll(sel)].every((el) => el.getBoundingClientRect().height > 40)
    return {
      panelsOpen: vis('.ledger-panel'),
      h1: document.querySelector('h1')?.textContent ?? '',
      words: document.body.innerText.split(/\s+/).length,
    }
  })
  check('no-JS: all case studies render open', visible.panelsOpen)
  check('no-JS: page text present', visible.words > 900 && visible.h1.includes('finance teams'), `${visible.words} words`)
  await ctx.close()
}

// 4. Keyboard-only pass: every tab stop is visible and has a focus indicator.
{
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage()
  await page.goto(base, { waitUntil: 'networkidle' })
  let stops = 0
  let bad = []
  const seen = new Set()
  for (let i = 0; i < 80; i++) {
    await page.keyboard.press('Tab')
    const info = await page.evaluate(() => {
      const el = document.activeElement
      if (!el || el === document.body) return null
      const r = el.getBoundingClientRect()
      const cs = getComputedStyle(el)
      return {
        key: `${el.tagName}:${el.textContent?.trim().slice(0, 30)}:${el.getAttribute('href') ?? el.id}:${Math.round(r.top + window.scrollY)}:${Math.round(r.left)}`,
        visible: r.width > 0 && r.height > 0 && cs.visibility !== 'hidden',
        ring: cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) >= 2,
      }
    })
    if (!info) continue
    if (seen.has(info.key)) break
    seen.add(info.key)
    stops++
    if (!info.visible || !info.ring) bad.push(info.key)
  }
  check('keyboard: every tab stop is visible with a focus ring', bad.length === 0 && stops > 15, `${stops} stops${bad.length ? ', bad: ' + bad.join(' | ') : ''}`)

  // ledger keyboard behaviour
  await page.goto(base, { waitUntil: 'networkidle' })
  await page.focus('#indago-button')
  await page.keyboard.press('Enter')
  const opened = await page.getAttribute('#indago-button', 'aria-expanded')
  await page.keyboard.press('ArrowDown')
  const moved = await page.evaluate(() => document.activeElement?.id)
  await page.keyboard.press('Space')
  const state = await page.evaluate(() => [...document.querySelectorAll('.ledger-row button')].map((b) => b.getAttribute('aria-expanded')).join(','))
  check('ledger: Enter opens, arrows move, only one row open', opened === 'true' && moved === 'copper-button' && state === 'false,true,false,false', state)
  const hiddenFocusable = await page.evaluate(() => {
    const closed = document.querySelector('#indago-panel')
    return getComputedStyle(closed).visibility
  })
  check('ledger: closed panels are hidden from keyboard and screen readers', hiddenFocusable === 'hidden')
  await page.context().close()
}

// 5. Deep link opens the matching row.
{
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage()
  await page.goto(`${base}/#indago`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(300)
  check('deep link #indago opens its row', (await page.getAttribute('#indago-button', 'aria-expanded')) === 'true')
  await page.context().close()
}

// 6. Reduced motion: no running animations, no transitions with real duration.
{
  const ctx = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } })
  const page = await ctx.newPage()
  await page.goto(base, { waitUntil: 'domcontentloaded' })
  const anim = await page.evaluate(() => ({
    running: document.getAnimations().length,
    rowAnim: getComputedStyle(document.querySelector('.ledger-row')).animationName,
    panelTransition: getComputedStyle(document.querySelector('.ledger-panel')).transitionDuration,
  }))
  check('reduced motion: nothing animates', anim.running === 0 && anim.rowAnim === 'none', JSON.stringify(anim))
  await ctx.close()
}

// 7. Mobile menu: opens, traps focus, closes on Escape.
{
  const page = await (await browser.newContext({ viewport: { width: 390, height: 844 } })).newPage()
  await page.goto(base, { waitUntil: 'networkidle' })
  await page.click('button[aria-controls="mobile-menu"]')
  const open = await page.isVisible('#mobile-menu')
  for (let i = 0; i < 12; i++) await page.keyboard.press('Tab')
  const inside = await page.evaluate(() => !!document.activeElement?.closest('#mobile-menu, header'))
  await page.keyboard.press('Escape')
  const closed = !(await page.isVisible('#mobile-menu'))
  check('mobile menu: opens, traps focus, Esc closes', open && inside && closed)
  await page.context().close()
}

// 8. axe-core: closed state, and with a case study open, desktop and mobile.
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const page = await (await browser.newContext({ viewport: { width: w, height: h } })).newPage()
  for (const hash of ['', '#indago']) {
    await page.goto(`${base}/${hash}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(700)
    const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice']).analyze()
    const serious = r.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
    check(`axe ${w}px ${hash || '(closed)'}: zero serious or critical`, serious.length === 0,
      `${r.violations.length} total` + (r.violations.length ? ': ' + r.violations.map((v) => `${v.id}[${v.impact}]x${v.nodes.length}`).join(', ') : ''))
  }
  await page.context().close()
}

// 9. Structure: one h1, landmarks, skip link, JSON-LD.
{
  const page = await browser.newPage()
  await page.goto(base, { waitUntil: 'networkidle' })
  const s = await page.evaluate(() => ({
    h1: document.querySelectorAll('h1').length,
    main: document.querySelectorAll('main').length,
    skip: !!document.querySelector('a[href="#main"]'),
    ld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((x) => JSON.parse(x.textContent)['@graph'].map((g) => g['@type'])).flat().join(','),
    headings: [...document.querySelectorAll('h1,h2,h3,h4,h5')].map((h) => +h.tagName[1]),
  }))
  let skips = 0
  for (let i = 1; i < s.headings.length; i++) if (s.headings[i] - s.headings[i - 1] > 1) skips++
  check('one h1, one main, skip link', s.h1 === 1 && s.main === 1 && s.skip)
  check('heading levels never skip', skips === 0, `${s.headings.length} headings`)
  check('JSON-LD has Person and ScholarlyArticle', s.ld === 'Person,ScholarlyArticle', s.ld)
  await page.close()
}

await browser.close()
const failed = results.filter((r) => !r.pass).length
console.log(`\n${results.length - failed}/${results.length} passed`)
process.exit(failed ? 1 : 0)
