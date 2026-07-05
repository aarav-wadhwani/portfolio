import type { Config } from 'tailwindcss'

/**
 * Custom theme only — the default palette is intentionally not extended.
 * Tokens come from the "Engineering the Signal" visual system:
 *   ink    #0A0A0B  near-black graphite background
 *   line   #E8E8E6  off-white line/text
 *   signal #3B82F6  electric blue, the one live wire (use sparingly)
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      ink: '#0A0A0B',
      line: '#E8E8E6',
      signal: '#3B82F6',
      // derived tones of `line` for hierarchy (never new hues)
      muted: 'rgba(232, 232, 230, 0.62)',
      faint: 'rgba(232, 232, 230, 0.38)',
      trace: 'rgba(232, 232, 230, 0.16)',
      grid: 'rgba(232, 232, 230, 0.045)',
    },
    fontFamily: {
      sans: ['"Space Grotesk Variable"', 'system-ui', 'sans-serif'],
      mono: ['"JetBrains Mono Variable"', 'ui-monospace', 'monospace'],
    },
    // Disciplined 4-step type scale: ann < label < body < display
    fontSize: {
      ann: ['0.6875rem', { lineHeight: '1.5', letterSpacing: '0.08em' }],
      label: ['0.8125rem', { lineHeight: '1.6', letterSpacing: '0.04em' }],
      body: ['1.0625rem', { lineHeight: '1.65' }],
      display: ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
    },
    extend: {
      maxWidth: {
        board: '72rem',
      },
    },
  },
  plugins: [],
} satisfies Config
