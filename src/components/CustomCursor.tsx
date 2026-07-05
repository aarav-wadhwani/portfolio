import { useEffect, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

/**
 * Oscilloscope-probe cursor: a crosshair marker shown over interactive
 * elements (links, buttons, [data-cursor]) on fine-pointer devices.
 * Native cursor is suppressed for those elements in index.css.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [active, setActive] = useState(false)
  const reduced = useReducedMotion()

  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)
  const sx = useSpring(mx, { stiffness: 900, damping: 55, mass: 0.4 })
  const sy = useSpring(my, { stiffness: 900, damping: 55, mass: 0.4 })

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setEnabled(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const move = (e: PointerEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
    }
    const over = (e: PointerEvent) => {
      const t = e.target as Element | null
      setActive(!!t?.closest?.('a, button, [data-cursor]'))
    }
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
    }
  }, [enabled, mx, my])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90]"
      style={{ x: reduced ? mx : sx, y: reduced ? my : sy }}
    >
      <motion.svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        className="-ml-[18px] -mt-[18px]"
        initial={false}
        animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.6 }}
        transition={{ duration: 0.15 }}
      >
        <circle cx="18" cy="18" r="7" stroke="#3B82F6" strokeWidth="1.25" />
        <path d="M18 0 V9 M18 27 V36 M0 18 H9 M27 18 H36" stroke="#3B82F6" strokeWidth="1.25" />
        <circle cx="18" cy="18" r="1.5" fill="#3B82F6" />
      </motion.svg>
    </motion.div>
  )
}
