import { motion, useReducedMotion } from 'framer-motion'
import { hero } from '../content/site'

/** Deterministic pseudo-random walk for the pre-lock noise traces. */
function noisePath(seed: number, amplitude: number, width = 680, mid = 80): string {
  let s = seed
  const rand = () => {
    s = (s * 1103515245 + 12345) % 2147483648
    return s / 2147483648 - 0.5
  }
  let d = `M 0 ${mid}`
  for (let x = 16; x <= width; x += 16) {
    d += ` L ${x} ${(mid + rand() * 2 * amplitude).toFixed(1)}`
  }
  return d
}

const NOISE_HEAVY = noisePath(7, 44)
const NOISE_LIGHT = noisePath(23, 14)
// clean locked signal: flat line with one crisp pulse
const LOCKED = 'M 0 80 H 280 L 300 80 L 316 44 L 364 44 L 380 80 H 680'

/**
 * Cold open. A jagged trace draws itself in like an oscilloscope finding
 * signal lock (~1.5s), steadies, then the name solders onto a label plate.
 */
export default function Hero({ ready }: { ready: boolean }) {
  const reduced = useReducedMotion()
  const labelDelay = reduced ? 0.1 : 1.7

  return (
    <section
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-6"
      aria-label="Introduction"
    >
      {/* oscilloscope lock */}
      <div className="w-full max-w-2xl">
        <svg
          viewBox="0 0 680 160"
          fill="none"
          className="w-full"
          aria-hidden
          style={{ overflow: 'visible' }}
        >
          {ready && !reduced && (
            <>
              <motion.path
                d={NOISE_HEAVY}
                stroke="#3B82F6"
                strokeWidth="1.5"
                initial={{ pathLength: 0, opacity: 1 }}
                animate={{ pathLength: 1, opacity: [1, 1, 0] }}
                transition={{
                  pathLength: { duration: 0.8, ease: 'linear' },
                  opacity: { duration: 1.2, times: [0, 0.7, 1] },
                }}
              />
              <motion.path
                d={NOISE_LIGHT}
                stroke="#3B82F6"
                strokeWidth="1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0, 1, 0] }}
                transition={{ duration: 1.55, times: [0, 0.5, 0.75, 1] }}
              />
              <motion.path
                d={LOCKED}
                stroke="#3B82F6"
                strokeWidth="1.5"
                strokeLinejoin="round"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.45, duration: 0.3 }}
                style={{ filter: 'drop-shadow(0 0 4px rgba(59,130,246,0.5))' }}
              />
              {/* lock flash at the pulse */}
              <motion.path
                d={LOCKED}
                stroke="#3B82F6"
                strokeWidth="4"
                strokeLinejoin="round"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.35, 0] }}
                transition={{ delay: 1.5, duration: 0.5 }}
                style={{ filter: 'blur(4px)' }}
              />
            </>
          )}
          {ready && reduced && (
            <motion.path
              d={LOCKED}
              stroke="#3B82F6"
              strokeWidth="1.5"
              strokeLinejoin="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            />
          )}
          {/* graticule ticks */}
          <path d="M 0 156 H 680" stroke="rgba(232,232,230,0.12)" strokeWidth="1" />
          {Array.from({ length: 18 }, (_, i) => (
            <path
              key={i}
              d={`M ${i * 40} 152 V 160`}
              stroke="rgba(232,232,230,0.18)"
              strokeWidth="1"
            />
          ))}
        </svg>
      </div>

      {/* label plate */}
      <motion.div
        className="mt-10 w-full max-w-2xl border border-line/25 px-6 py-6 sm:px-8"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: labelDelay, duration: 0.5 }}
      >
        <motion.p
          className="font-mono text-ann uppercase text-signal"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ delay: labelDelay + 0.15, duration: 0.4 }}
        >
          {hero.refTag}
        </motion.p>
        <h1 className="mt-3 font-sans text-display font-semibold" aria-label={hero.name}>
          {hero.name.split('').map((ch, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="inline-block"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8, filter: 'blur(5px)' }}
              animate={
                ready
                  ? reduced
                    ? { opacity: 1 }
                    : { opacity: 1, y: 0, filter: 'blur(0px)' }
                  : {}
              }
              transition={{ delay: labelDelay + 0.2 + i * 0.035, duration: 0.35 }}
            >
              {ch === ' ' ? ' ' : ch}
            </motion.span>
          ))}
        </h1>
        <motion.p
          className="mt-3 font-mono text-ann uppercase text-muted"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ delay: labelDelay + 0.75, duration: 0.4 }}
        >
          {hero.role}
        </motion.p>
        <motion.p
          className="mt-4 max-w-xl text-body text-muted"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ delay: labelDelay + 0.9, duration: 0.5 }}
        >
          {hero.tagline}
        </motion.p>
      </motion.div>

      {/* scroll affordance: connector arrow */}
      <motion.a
        href="#legend"
        className="group absolute bottom-8 flex flex-col items-center gap-2 font-mono text-ann uppercase text-faint transition-colors hover:text-signal focus-visible:text-signal"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: labelDelay + 1.2, duration: 0.6 }}
      >
        <span>{hero.scrollCue}</span>
        <motion.svg
          width="16"
          height="34"
          viewBox="0 0 16 34"
          fill="none"
          aria-hidden
          animate={reduced ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <circle cx="8" cy="4" r="3" stroke="currentColor" strokeWidth="1.25" />
          <path d="M8 7 V22 M2 22 L8 30 L14 22" stroke="currentColor" strokeWidth="1.25" />
        </motion.svg>
      </motion.a>
    </section>
  )
}
