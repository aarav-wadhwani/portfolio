import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/** Preload the one font file the hero needs, so the headline never swaps late. */
function preloadHeroFont(): Plugin {
  return {
    name: 'preload-hero-font',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(_html, ctx) {
        const font = Object.keys(ctx.bundle ?? {}).find((f) =>
          /schibsted-grotesk-latin-wght-normal.*\.woff2$/.test(f),
        )
        if (!font) return []
        return [
          {
            tag: 'link',
            attrs: { rel: 'preload', as: 'font', type: 'font/woff2', href: `/${font}`, crossorigin: '' },
            injectTo: 'head',
          },
        ]
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
