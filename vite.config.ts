import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/** Preload the font files the hero needs, so the headline never swaps late. */
function preloadHeroFont(): Plugin {
  return {
    name: 'preload-hero-font',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(_html, ctx) {
        // the two faces the hero headline uses
        const wanted = [/schibsted-grotesk-latin-wght-normal.*\.woff2$/, /instrument-serif-latin-400-italic.*\.woff2$/]
        return Object.keys(ctx.bundle ?? {})
          .filter((f) => wanted.some((re) => re.test(f)))
          .map((font) => ({
            tag: 'link',
            attrs: { rel: 'preload', as: 'font', type: 'font/woff2', href: `/${font}`, crossorigin: '' },
            injectTo: 'head' as const,
          }))
      },
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), preloadHeroFont()],
  build: {
    target: 'es2020',
    assetsInlineLimit: 2048,
  },
})
