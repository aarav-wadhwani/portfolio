/**
 * One-shot asset pipeline.
 *
 * Reads originals from assets-src/, writes:
 *   - optimized .webp images  -> src/assets/
 *   - favicon.ico (16+32)     -> public/
 *   - apple-touch-icon.png    -> public/
 *   - og-image.png (1200x630) -> public/
 *
 * Re-run with `npm run assets` whenever an original in assets-src/ changes.
 */
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import sharp from 'sharp'
import pngToIco from 'png-to-ico'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const src = (p) => join(root, 'assets-src', p)
const out = (p) => join(root, 'src/assets', p)
const pub = (p) => join(root, 'public', p)

await mkdir(join(root, 'src/assets'), { recursive: true })

// [input, output, max width, webp quality]
const images = [
  ['headshot.jpeg', 'headshot.webp', 640, 82],
  ['ubicomp-pose-overlay-1.png', 'ubicomp-pose-overlay-1.webp', 1100, 84],
  ['ubicomp-device.jpg', 'ubicomp-device.webp', 900, 74],
  ['birdnet-device.jpg', 'birdnet-device.webp', 1200, 74],
  ['birdnet-webapp.png', 'birdnet-webapp.webp', 1000, 80],
  ['questra-ui.png', 'questra-ui.webp', 1400, 80],
  ['llm-style-coefficients.png', 'llm-style-coefficients.webp', 1280, 86],
  ['llm-ranking-comparison.png', 'llm-ranking-comparison.webp', 1280, 86],
  ['llm-per-category-ranks.png', 'llm-per-category-ranks.webp', 1000, 86],
]

for (const [input, output, width, quality] of images) {
  const info = await sharp(src(input))
    .rotate() // respect EXIF orientation
    .resize({ width, withoutEnlargement: true })
    .webp({ quality })
    .toFile(out(output))
  console.log(`${output}: ${info.width}x${info.height} ${(info.size / 1024).toFixed(0)}KB`)
}

// ---- favicons ----------------------------------------------------------
const faviconSvg = await readFile(pub('favicon.svg'))
const png32 = await sharp(faviconSvg, { density: 300 }).resize(32, 32).png().toBuffer()
const png16 = await sharp(faviconSvg, { density: 300 }).resize(16, 16).png().toBuffer()
await writeFile(pub('favicon.ico'), await pngToIco([png16, png32]))
await sharp(faviconSvg, { density: 300 }).resize(180, 180).png().toFile(pub('apple-touch-icon.png'))
console.log('favicon.ico + apple-touch-icon.png written')

// ---- OG image (1200x630) ----------------------------------------------
// Same visual system as the site: graphite ground, faint schematic grid,
// label plate, one live-blue trace.
const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
      <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#E8E8E6" stroke-opacity="0.05" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="#0A0A0B"/>
  <rect width="1200" height="630" fill="url(#grid)"/>

  <!-- live trace: noisy on the left, resolving to clean on the right -->
  <path d="M 60 340
           L 150 340 L 170 300 L 190 380 L 210 310 L 230 372 L 250 322 L 270 358 L 292 334
           L 340 340 L 380 340 L 400 316 L 430 316 L 450 340
           L 620 340 L 660 300 L 700 300 L 740 340 L 1140 340"
        fill="none" stroke="#3B82F6" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
  <circle cx="620" cy="340" r="6" fill="#3B82F6"/>
  <circle cx="1140" cy="340" r="6" fill="none" stroke="#3B82F6" stroke-width="3"/>

  <!-- label plate -->
  <rect x="60" y="392" width="700" height="150" fill="none" stroke="#E8E8E6" stroke-opacity="0.35" stroke-width="1.5"/>
  <text x="84" y="432" font-family="'JetBrains Mono',Menlo,monospace" font-size="19" letter-spacing="4" fill="#3B82F6">U0 / SIGNAL SOURCE</text>
  <text x="82" y="500" font-family="'Space Grotesk','Helvetica Neue',Arial,sans-serif" font-size="58" font-weight="600" letter-spacing="-1" fill="#E8E8E6">Aarav Wadhwani</text>

  <text x="60" y="180" font-family="'Space Grotesk','Helvetica Neue',Arial,sans-serif" font-size="34" fill="#E8E8E6" fill-opacity="0.85">Engineering the Signal</text>
  <text x="60" y="228" font-family="'JetBrains Mono',Menlo,monospace" font-size="21" fill="#E8E8E6" fill-opacity="0.6">raw signals → structure → working systems</text>

  <!-- corner reference ticks -->
  <path d="M 24 24 h 22 M 24 24 v 22" stroke="#E8E8E6" stroke-opacity="0.5" stroke-width="2"/>
  <path d="M 1176 606 h -22 M 1176 606 v -22" stroke="#E8E8E6" stroke-opacity="0.5" stroke-width="2"/>
  <text x="1140" y="60" text-anchor="end" font-family="'JetBrains Mono',Menlo,monospace" font-size="17" letter-spacing="3" fill="#E8E8E6" fill-opacity="0.45">AARAVWADHWANI.COM</text>
</svg>`
await sharp(Buffer.from(ogSvg), { density: 96 }).png().toFile(pub('og-image.png'))
console.log('og-image.png written')
