import type { Config } from 'tailwindcss'

/**
 * Custom theme only: the default palette and type scale are replaced, not extended.
 * Direction 1, "The Deployment Ledger": cool daylight, deep navy ink, one amber accent.
 *
 * Contrast (WCAG): ink on paper 16.0:1, slate on paper 7.0:1, slate on panel 7.5:1.
 * Amber is 2.2:1 on white, so it is never used for text: dots, rules and rings only.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      paper: '#F7F8FA',
      panel: '#FFFFFF',
      ink: '#0F1B2D',
      slate: '#4A5568',
      rule: '#DDE2EA',
      amber: '#E8A317',
      // secondary text on ink sections (6.4:1 on ink)
      mist: '#93A0B4',
      // data deltas inside charts only, never decorative
      up: '#12805C',
      down: '#C2410C',
    },
    fontFamily: {
      sans: ['"Schibsted Grotesk Variable"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      // accent words in display headings only
      serif: ['"Instrument Serif"', 'Georgia', 'serif'],
      // numbers, dates and ledger values only
      mono: ['"Martian Mono Variable"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
    },
    // 1.25 scale: 14 / 16 / 17 / 20 / 25 / 31 / 39 / 61
    fontSize: {
      xs: ['0.8125rem', { lineHeight: '1.5' }],
      sm: ['0.875rem', { lineHeight: '1.55' }],
      base: ['1rem', { lineHeight: '1.6' }],
      md: ['1.0625rem', { lineHeight: '1.6' }],
      lg: ['1.25rem', { lineHeight: '1.45' }],
      xl: ['1.5625rem', { lineHeight: '1.3' }],
      '2xl': ['1.9375rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      '3xl': ['2.4375rem', { lineHeight: '1.12', letterSpacing: '-0.015em' }],
      h2: ['clamp(2.5rem, 1.2rem + 5vw, 5.25rem)', { lineHeight: '1', letterSpacing: '-0.035em' }],
      display: ['clamp(2.5rem, 0.9rem + 6.3vw, 6.375rem)', { lineHeight: '0.98', letterSpacing: '-0.04em' }],
      mega: ['clamp(2.75rem, 12.3vw, 13.5rem)', { lineHeight: '0.85', letterSpacing: '-0.05em' }],
    },
    extend: {
      maxWidth: {
        page: '75rem', // 1200px
        wide: '90rem', // 1440px
        prose: '68ch',
      },
      boxShadow: {
        panel: '0 1px 2px rgba(15, 27, 45, 0.04), 0 8px 24px -12px rgba(15, 27, 45, 0.10)',
      },
    },
  },
  plugins: [],
} satisfies Config
