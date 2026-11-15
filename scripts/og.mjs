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

const serif = pathToFileURL(
  join(root, 'node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2'),
).href

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: SG; src: url('${font('schibsted-grotesk', 'schibsted-grotesk-latin-wght-normal.woff2')}'); font-weight: 400 900; }
@font-face { font-family: IS; font-style: italic; src: url('${serif}'); }
* { box-sizing: border-box; margin: 0; }
body { width: 1200px; height: 630px; background: #F7F8FA; color: #0F1B2D; font-family: SG, sans-serif; display: flex; flex-direction: column; }
.top { padding: 52px 64px 0; display: flex; justify-content: space-between; font-size: 24px; color: #4A5568; }
.top b { color: #0F1B2D; font-weight: 600; }
h1 { padding: 30px 64px 0; font-size: 92px; line-height: 0.98; letter-spacing: -0.04em; font-weight: 600; }
i { font-family: IS, serif; font-weight: 400; letter-spacing: -0.02em; }
.band { margin-top: auto; background: #0F1B2D; color: #F7F8FA; display: flex; align-items: center; gap: 30px; padding: 26px 64px; font-size: 30px; font-weight: 500; }
.dot { width: 12px; height: 12px; border-radius: 50%; background: #E8A317; flex: none; }
.band i { font-size: 36px; }
</style></head><body>
<p class="top"><b>Aarav Wadhwani</b><span>AI and quant engineering</span></p>
<h1>I build AI systems inside <i>finance teams</i>, and stay until people <i>use them.</i></h1>
<div class="band"><span>UIST ’26</span><span class="dot"></span><i>Indago Capital</i><span class="dot"></span><span>Macquarie</span></div>
</body></html>`

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await page.setContent(html, { waitUntil: 'load' })
await page.evaluate(() => document.fonts.ready)
await page.screenshot({ path: join(root, 'public/og-image.png') })
await browser.close()
console.log('public/og-image.png written')
