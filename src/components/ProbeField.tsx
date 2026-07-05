import { useEffect, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

/**
 * A faint blue field that trails the pointer, like the glow around a live
 * probe tip: the page reads as energized wherever the visitor points.
 * Fine-pointer devices only; disabled under prefers-reduced-motion.
 * Transform-only, so it never triggers layout.
 */
export default function ProbeField() {
  const [enabled, setEnabled] = useState(false)
  const reduced = useReducedMotion()

  const mx = useMotionValue(-800)
  const my = useMotionValue(-800)
  // deliberately lazy spring: the field drifts after the probe
  const sx = useSpring(mx, { stiffness: 90, damping: 26, mass: 0.9 })
  const sy = useSpring(my, { stiffness: 90, damping: 26, mass: 0.9 })

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setEnabled(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!enabled || reduced) return
    const move = (e: PointerEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [enabled, reduced, mx, my])

  if (!enabled || reduced) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[1]"
      style={{ x: sx, y: sy }}
    >
      <div
        className="-ml-[360px] -mt-[360px] h-[720px] w-[720px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(59,130,246,0.085) 0%, rgba(59,130,246,0.035) 32%, transparent 62%)',
        }}
      />
    </motion.div>
  )
}
