/**
 * One-shot asset pipeline.
 *
 * Reads originals from assets-src/, writes:
 *   - optimized .webp images  -> src/assets/
 *   - favicon.ico (16+32)     -> public/
 *   - apple-touch-icon.png    -> public/
 *
 * Re-run with `npm run assets` whenever an original in assets-src/ changes.
 * The OG image is rendered separately with real web fonts: `npm run og`.
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
// To add the new Questra screenshot or NailSense figures, drop the original in
// assets-src/, add a line here, run `npm run assets`, and reference it in site.ts.
const images = [
  ['headshot.jpeg', 'headshot.webp', 640, 82],
  ['ubicomp-device.jpg', 'ubicomp-device.webp', 900, 74],
  ['birdnet-device.jpg', 'birdnet-device.webp', 1200, 74],
  ['llm-style-coefficients.png', 'llm-style-coefficients.webp', 1280, 86],
  ['llm-ranking-comparison.png', 'llm-ranking-comparison.webp', 1280, 86],
]

for (const [input, output, width, quality] of images) {
  const info = await sharp(src(input))
    .rotate() // respect EXIF orientation
    .resize({ width, withoutEnlargement: true })
    .webp({ quality })
    .toFile(out(output))
  console.log(`${output}: ${info.width}x${info.height} ${(info.size / 1024).toFixed(0)}KB`)
}

const faviconSvg = await readFile(pub('favicon.svg'))
const png32 = await sharp(faviconSvg, { density: 300 }).resize(32, 32).png().toBuffer()
const png16 = await sharp(faviconSvg, { density: 300 }).resize(16, 16).png().toBuffer()
await writeFile(pub('favicon.ico'), await pngToIco([png16, png32]))
await sharp(faviconSvg, { density: 300 }).resize(180, 180).png().toFile(pub('apple-touch-icon.png'))
console.log('favicon.ico + apple-touch-icon.png written')
