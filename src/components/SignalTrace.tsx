import { useEffect, useState } from 'react'
import { motion, MotionValue, useReducedMotion, useScroll, useTransform } from 'framer-motion'

interface Geometry {
  height: number
  joints: number[] // document-space Y of each [data-solder] connection point
  wide: boolean // desktop: 45°-jogged PCB routing; mobile: single vertical line
}

const X_MAIN_WIDE = 32
const X_JOG = 47 // jog apex, "plugging into" each board
const X_MAIN_NARROW = 18
const JOG = 15 // 45° segment run

/**
 * The one wire carrying current: a page-height trace in the left gutter,
 * drawn by scroll progress. At each section connection it jogs toward the
 * content and passes through a solder joint that pulses as current arrives.
 */
export default function SignalTrace() {
  const [geo, setGeo] = useState<Geometry | null>(null)
  const { scrollYProgress } = useScroll()
  const reduced = useReducedMotion()

  useEffect(() => {
    // Measure the static content wrapper, NOT document.body: this SVG is
    // absolutely positioned and itself extends the scrollable area, so
    // body-based measurement can never shrink back after a resize.
    const content = document.getElementById('site-content')
    if (!content) return
    let frame = 0
    const measure = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const height = content.offsetHeight
        const wide = window.innerWidth >= 1024
        const joints = Array.from(document.querySelectorAll('[data-solder]'))
          .map((el) => Math.round(el.getBoundingClientRect().top + window.scrollY))
          .filter((y) => y > 120 && y < height - 120)
          .sort((a, b) => a - b)
        setGeo({ height, joints, wide })
      })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(content)
    window.addEventListener('load', measure)
    window.addEventListener('resize', measure)
    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
      window.removeEventListener('load', measure)
      window.removeEventListener('resize', measure)
    }
  }, [])

  if (!geo || geo.height === 0) return null

  const xMain = geo.wide ? X_MAIN_WIDE : X_MAIN_NARROW
  let d = `M ${xMain} 0`
  if (geo.wide) {
    for (const y of geo.joints) {
      d +=
        ` L ${xMain} ${y - 2 * JOG}` +
        ` L ${X_JOG} ${y - JOG}` +
        ` L ${X_JOG} ${y + JOG}` +
        ` L ${xMain} ${y + 2 * JOG}`
    }
  }
  d += ` L ${xMain} ${geo.height}`

  const jointX = geo.wide ? X_JOG : xMain
  const gutterWidth = geo.wide ? 64 : 36

  return (
    <svg
      aria-hidden
      className="absolute left-0 top-0 z-0"
      width={gutterWidth}
      height={geo.height}
      viewBox={`0 0 ${gutterWidth} ${geo.height}`}
      fill="none"
    >
      {/* ghost route: the path the signal will take */}
      <path d={d} stroke="rgba(232,232,230,0.10)" strokeWidth="1" />
      {/* live signal, drawn by scroll */}
      <motion.path
        d={d}
        stroke="#3B82F6"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        style={{
          pathLength: reduced ? 1 : scrollYProgress,
          opacity: reduced ? 0.5 : 1,
          filter: 'drop-shadow(0 0 3px rgba(59,130,246,0.55))',
        }}
      />
      {geo.joints.map((y) => (
        <SolderJoint
          key={y}
          x={jointX}
          y={y}
          docHeight={geo.height}
          progress={scrollYProgress}
          reduced={!!reduced}
        />
      ))}
    </svg>
  )
}

/** Brightens and swells briefly as the scroll-drawn current passes through. */
function SolderJoint({
  x,
  y,
  docHeight,
  progress,
  reduced,
}: {
  x: number
  y: number
  docHeight: number
  progress: MotionValue<number>
  reduced: boolean
}) {
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800
  const scrollable = Math.max(1, docHeight - vh)
  const p = Math.min(1, Math.max(0.001, y / scrollable))

  const opacity = useTransform(
    progress,
    [Math.max(0, p - 0.06), p, Math.min(1, p + 0.1)],
    [0.25, 1, 0.5],
  )
  const r = useTransform(progress, [Math.max(0, p - 0.04), p, Math.min(1, p + 0.08)], [2.5, 4.5, 3])

  if (reduced) {
    return <circle cx={x} cy={y} r={3} fill="#3B82F6" opacity={0.5} />
  }
  return (
    <>
      <motion.circle cx={x} cy={y} fill="#3B82F6" style={{ opacity, r }} />
      <motion.circle
        cx={x}
        cy={y}
        r={8}
        stroke="#3B82F6"
        strokeWidth="1"
        fill="none"
        style={{
          opacity: useTransform(progress, [p - 0.02, p, p + 0.05], [0, 0.7, 0]),
        }}
      />
    </>
  )
}
