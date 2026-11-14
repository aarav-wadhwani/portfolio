/**
 * Build step: render the React tree to static HTML and inline it into
 * dist/index.html, so all content is present at first paint, readable with
 * JavaScript disabled, and visible to crawlers and link previews.
 */
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, join } from 'node:path'
import { readFile, writeFile, rm } from 'node:fs/promises'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const htmlPath = join(root, 'dist/index.html')
const { render } = await import(pathToFileURL(join(root, 'dist-ssr/entry-server.js')).href)

const html = await readFile(htmlPath, 'utf8')
if (!html.includes('<!--app-html-->')) throw new Error('prerender: placeholder missing in dist/index.html')
const out = html.replace('<!--app-html-->', render())
await writeFile(htmlPath, out)
await rm(join(root, 'dist-ssr'), { recursive: true, force: true })
console.log(`prerendered dist/index.html (${(out.length / 1024).toFixed(1)} KB)`)
