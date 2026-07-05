import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

/**
 * First-visit loading state: the trace attempting to lock onto signal,
 * echoing the hero's oscilloscope-lock animation. ~1.4s, once per session.
 */
export default function Loader({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true)
  const reduced = useReducedMotion()
  const duration = reduced ? 500 : 1400

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false)
      onDone()
    }, duration)
    return () => clearTimeout(t)
  }, [duration, onDone])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-ink"
          exit={{ opacity: 0, transition: { duration: 0.35 } }}
          aria-label="Loading"
        >
          <svg width="220" height="48" viewBox="0 0 220 48" fill="none" aria-hidden>
            {reduced ? (
              <path d="M0 24 H220" stroke="#3B82F6" strokeWidth="1.5" />
            ) : (
              <>
                <motion.path
                  d="M0 24 L20 24 L26 8 L32 40 L38 14 L44 36 L50 18 L56 32 L62 20 L70 28 L80 24 L220 24"
                  stroke="#3B82F6"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1, opacity: [1, 1, 0.4, 1] }}
                  transition={{
                    pathLength: { duration: 1.0, ease: 'easeInOut' },
                    opacity: { duration: 1.2, times: [0, 0.5, 0.7, 1] },
                  }}
                />
                <motion.circle
                  cx="220"
                  cy="24"
                  r="3"
                  fill="#3B82F6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0, duration: 0.2 }}
                />
              </>
            )}
          </svg>
          <motion.p
            className="font-mono text-ann uppercase text-faint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            ACQUIRING SIGNAL LOCK
            <motion.span
              className="text-signal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduced ? 0.3 : 1.05 }}
            >
              {' '}
              · LOCKED
            </motion.span>
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
