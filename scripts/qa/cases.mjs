// Usage: node scripts/qa/cases.mjs <baseUrl> <outDir>
// Screenshots of each expanded case study and the contact section at the three QA widths.
import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
const [base = 'http://localhost:4173', out = 'qa/cases'] = process.argv.slice(2)
const sizes = [['mobile', 390, 844], ['tablet', 768, 1024], ['desktop', 1440, 900]]
await mkdir(out, { recursive: true })
const browser = await chromium.launch()
for (const [name, width, height] of sizes) {
  const page = await (await browser.newContext({ viewport: { width, height } })).newPage()
  for (const id of ['indago', 'copper', 'livestock', 'nailsense']) {
    await page.goto(`${base}/#${id}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(900)
    await page.locator(`#${id}`).screenshot({ path: `${out}/${name}-${id}.png` })
  }
  await page.goto(base, { waitUntil: 'networkidle' })
  for (const id of ['how', 'research', 'builds', 'teaching', 'about', 'contact']) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded()
    await page.waitForTimeout(300)
    await page.locator(`#${id}`).screenshot({ path: `${out}/${name}-${id}.png` })
  }
}
await browser.close()
console.log('done')
