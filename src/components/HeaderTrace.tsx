import { motion, useReducedMotion } from 'framer-motion'

/**
 * Small live-blue rule under section headings: a trace with a resistor
 * squiggle that draws itself in and terminates in a solder dot. One shared
 * motif keeps every section feeling wired into the same circuit.
 */
export default function HeaderTrace({ className = '' }: { className?: string }) {
  const reduced = useReducedMotion()
  return (
    <svg
      width="104"
      height="12"
      viewBox="0 0 104 12"
      fill="none"
      aria-hidden
      className={`mt-4 overflow-visible ${className}`}
    >
      <motion.path
        d="M 0 6 H 34 L 39 1 L 46 11 L 53 1 L 60 11 L 65 6 H 92"
        stroke="#3B82F6"
        strokeWidth="1.5"
        strokeLinejoin="round"
        initial={{ pathLength: reduced ? 1 : 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: reduced ? 0 : 0.9, ease: 'easeOut' }}
      />
      <motion.circle
        cx="99"
        cy="6"
        r="2.5"
        fill="#3B82F6"
        initial={{ opacity: 0, scale: reduced ? 1 : 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ delay: reduced ? 0 : 0.85, duration: 0.25 }}
        style={{ filter: 'drop-shadow(0 0 3px rgba(59,130,246,0.6))' }}
      />
    </svg>
  )
}
