import { motion, useReducedMotion } from 'framer-motion'

/**
 * In-block processing visuals for the Macquarie boards: quant/ML visual
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

/** Board U4: steady quality line, a drift excursion crossing the alert
 *  threshold, and an A/B fork where the fix rolls out. No axis numbers. */
export function MonitorCurve() {
  const reduced = useReducedMotion()
  return (
    <svg viewBox="0 0 240 100" fill="none" className="mt-4 w-full" aria-hidden>
      <Axes />
      {/* alert threshold */}
      <path d="M 12 34 H 228" stroke="rgba(232,232,230,0.22)" strokeWidth="1" strokeDasharray="3 5" />
      {/* observed quality: steady, drifts past threshold, recovers after rollout */}
      <motion.path
        d="M 12 56 L 40 54 L 66 58 L 90 52 L 108 44 L 124 30 L 138 24 L 150 30 L 162 46 L 180 54 L 204 55 L 228 54"
        stroke="#3B82F6"
        strokeWidth="1.5"
        strokeLinejoin="round"
        initial={{ pathLength: reduced ? 1 : 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
      />
      {/* drift flag at the threshold crossing */}
      <motion.g
        initial={{ opacity: reduced ? 1 : 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ delay: 0.9, duration: 0.3 }}
      >
        <circle cx="124" cy="30" r="3.5" stroke="#3B82F6" strokeWidth="1.25" fill="none" />
        <path d="M 124 26 V 14" stroke="#3B82F6" strokeWidth="1" />
      </motion.g>
      {/* A/B rollout fork rejoining */}
      <motion.path
        d="M 150 30 L 162 38 L 180 46"
        stroke="rgba(232,232,230,0.4)"
        strokeWidth="1.25"
        strokeDasharray="4 3"
        initial={{ pathLength: reduced ? 1 : 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ delay: 1.1, duration: 0.5 }}
      />
      <text x="132" y="12" fill="rgba(232,232,230,0.35)" fontSize="7" fontFamily="'JetBrains Mono Variable',monospace" letterSpacing="1">
        DRIFT FLAG
      </text>
      <text x="14" y="99" fill="rgba(232,232,230,0.35)" fontSize="7" fontFamily="'JetBrains Mono Variable',monospace" letterSpacing="1">
        LIVE ── · A/B CANDIDATE ┄┄
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
