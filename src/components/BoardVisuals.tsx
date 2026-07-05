import { motion, useReducedMotion } from 'framer-motion'

/**
 * In-block processing visuals for the Macquarie boards — quant/ML visual
 * grammar (convergence curve, bucket re-weighting, actual-vs-forecast)
 * instead of a generic schematic block. Deliberately no axis numbers:
 * the shape is the point, not a value.
 */

function Axes() {
  return (
    <path
      d="M 10 8 V 86 H 230"
      stroke="rgba(232,232,230,0.18)"
      strokeWidth="1"
      fill="none"
    />
  )
}

/** Board U1: stylized backtest/convergence curve + biweekly bucket re-weighting bars. */
export function ConvergenceCurve() {
  const reduced = useReducedMotion()
  const weights = [0.35, 0.8, 0.5, 1, 0.42, 0.68, 0.25, 0.58]
  return (
    <svg viewBox="0 0 240 100" fill="none" className="mt-4 w-full" aria-hidden>
      <Axes />
      {/* loss/convergence curve: noisy start, settles flat */}
      <motion.path
        d="M 12 16 L 24 30 L 34 20 L 46 42 L 58 34 L 70 52 L 84 48 L 98 62 L 114 58 L 130 68 L 150 66 L 170 70 L 200 71 L 228 72"
        stroke="#3B82F6"
        strokeWidth="1.5"
        strokeLinejoin="round"
        initial={{ pathLength: reduced ? 1 : 0, opacity: reduced ? 0.9 : 1 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
      />
      {/* bucket weights re-ranking */}
      {weights.map((w, i) => (
        <motion.rect
          key={i}
          x={128 + i * 13}
          width="7"
          y={86 - w * 26}
          height={w * 26}
          fill="rgba(232,232,230,0.28)"
          initial={{ scaleY: reduced ? 1 : 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ delay: 0.9 + i * 0.07, duration: 0.35 }}
          style={{ transformOrigin: '0 86px' }}
        />
      ))}
      <text x="128" y="99" fill="rgba(232,232,230,0.35)" fontSize="7" fontFamily="'JetBrains Mono Variable',monospace" letterSpacing="1">
        BUCKET WEIGHTS · 2W
      </text>
    </svg>
  )
}

/** Board U2: stylized actual-vs-forecast lines converging over time. */
export function ForecastCurve() {
  const reduced = useReducedMotion()
  return (
    <svg viewBox="0 0 240 100" fill="none" className="mt-4 w-full" aria-hidden>
      <Axes />
      {/* actual (ground truth, lagged) */}
      <motion.path
        d="M 12 62 L 36 54 L 60 66 L 84 48 L 108 56 L 132 40 L 156 48 L 180 34 L 204 40 L 228 30"
        stroke="rgba(232,232,230,0.5)"
        strokeWidth="1.5"
        strokeLinejoin="round"
        initial={{ pathLength: reduced ? 1 : 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      />
      {/* forecast: starts wide of actual, converges onto it */}
      <motion.path
        d="M 12 78 L 36 66 L 60 74 L 84 55 L 108 60 L 132 42 L 156 49 L 180 35 L 204 40.5 L 228 30.5"
        stroke="#3B82F6"
        strokeWidth="1.5"
        strokeDasharray="5 4"
        strokeLinejoin="round"
        initial={{ pathLength: reduced ? 1 : 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.4, ease: 'easeOut', delay: 0.35 }}
      />
      <text x="14" y="99" fill="rgba(232,232,230,0.35)" fontSize="7" fontFamily="'JetBrains Mono Variable',monospace" letterSpacing="1">
        ACTUAL ── · FORECAST ┄┄ (T−2 MO)
      </text>
    </svg>
  )
}
