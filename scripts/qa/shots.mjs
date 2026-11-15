// Usage: node scripts/qa/shots.mjs <baseUrl> <outDir>
// Full-page and above-the-fold screenshots at the three QA widths, plus page height.
import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'

const [base = 'http://localhost:4173', out = 'qa/shots'] = process.argv.slice(2)
const sizes = [
  ['mobile', 390, 844],
  ['tablet', 768, 1024],
  ['desktop', 1440, 900],
]
await mkdir(out, { recursive: true })
const browser = await chromium.launch()
const report = {}
for (const [name, width, height] of sizes) {
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 })
  const page = await ctx.newPage()
  await page.goto(base, { waitUntil: 'networkidle' })
  await page.waitForTimeout(4000)
  await page.screenshot({ path: `${out}/${name}-fold.png` })
  // walk the page so lazy images and in-view reveals settle before the full capture
  const h = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y < h; y += height) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y)
    await page.waitForTimeout(250)
  }
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(400)
  await page.screenshot({ path: `${out}/${name}-full.png`, fullPage: true })
  report[name] = await page.evaluate(() => ({
    height: document.documentElement.scrollHeight,
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
  }))
  await ctx.close()
}
await browser.close()
await writeFile(`${out}/report.json`, JSON.stringify(report, null, 2))
console.log(JSON.stringify(report))
