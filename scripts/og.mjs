/**
 * Renders public/og-image.png (1200x630) in the site's own type and palette,
 * using headless Chromium so the real web fonts are used. Run: `npm run og`.
 */
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, join } from 'node:path'
import { chromium } from 'playwright'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const font = (pkg, file) =>
  pathToFileURL(join(root, 'node_modules/@fontsource-variable', pkg, 'files', file)).href

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: SG; src: url('${font('schibsted-grotesk', 'schibsted-grotesk-latin-wght-normal.woff2')}'); font-weight: 400 900; }
@font-face { font-family: MM; src: url('${font('martian-mono', 'martian-mono-latin-wght-normal.woff2')}'); font-weight: 100 800; }
* { box-sizing: border-box; margin: 0; }
body { width: 1200px; height: 630px; background: #F7F8FA; color: #0F1B2D; font-family: SG, sans-serif; padding: 64px 72px; display: flex; flex-direction: column; }
.name { font-size: 30px; font-weight: 600; letter-spacing: -0.01em; }
h1 { margin-top: 44px; font-size: 68px; line-height: 1.06; letter-spacing: -0.025em; font-weight: 600; max-width: 960px; }
.ledger { margin-top: auto; background: #fff; border: 1px solid #DDE2EA; border-radius: 12px; display: flex; }
.cell { flex: 1; padding: 22px 28px; font-size: 26px; font-weight: 600; display: flex; align-items: center; gap: 14px; border-left: 1px solid #DDE2EA; }
.cell:first-child { border-left: 0; }
.dot { width: 14px; height: 14px; border-radius: 50%; background: #E8A317; flex: none; }
</style></head><body>
<p class="name">Aarav Wadhwani</p>
<h1>I build AI systems inside finance teams, and stay until people use them.</h1>
<div class="ledger">
  <div class="cell"><span class="dot"></span>UIST ’26</div>
  <div class="cell"><span class="dot"></span>Indago Capital</div>
  <div class="cell"><span class="dot"></span>Macquarie</div>
</div>
</body></html>`

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await page.setContent(html, { waitUntil: 'load' })
await page.evaluate(() => document.fonts.ready)
await page.screenshot({ path: join(root, 'public/og-image.png') })
await browser.close()
console.log('public/og-image.png written')
