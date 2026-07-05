import { useState } from 'react'
import { useMotionValueEvent, useScroll } from 'framer-motion'

const CELLS = 10

/**
 * Corner-anchored oscilloscope channel readout showing progress through
 * "the run". Purely informative; hidden from assistive tech.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const [pct, setPct] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setPct(Math.min(100, Math.max(0, Math.round(v * 100))))
  })

  const filled = Math.round((pct / 100) * CELLS)

  return (
    <div
      aria-hidden
      className="fixed bottom-4 right-4 z-40 hidden select-none items-center gap-2 border border-trace bg-ink/80 px-2.5 py-1.5 font-mono text-ann text-faint backdrop-blur-sm sm:flex"
    >
      <span className="text-signal">CH1</span>
      <span className="flex gap-[2px]">
        {Array.from({ length: CELLS }, (_, i) => (
          <span
            key={i}
            className={`inline-block h-2.5 w-[3px] ${i < filled ? 'bg-signal' : 'bg-trace'}`}
          />
        ))}
      </span>
      <span className="tabular-nums">{String(pct).padStart(3, '0')}%</span>
    </div>
  )
}
