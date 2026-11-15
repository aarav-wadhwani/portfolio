import { useEffect, useRef } from 'react'
import { motionOK } from '../lib/motion'

/**
 * Hero backdrop: a price-tape line that keeps drawing itself, the way a desk
 * screen does. Purely decorative. It pauses off screen, and is a single static
 * frame under reduced motion. The pointer's height nudges where the line drifts.
 */
export default function Tape() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const STEP = 9 // px between samples
    const HEAD = 0.9 // the live head sits near the right edge, clear of the copy
    let w = 0
    let h = 0
    let pts: number[] = []
    let value = 0.5
    let drift = 0
    let target = 0.5
    let offset = 0
    let frame = 0
    let running = false
    let last = 0

    const next = () => {
      drift = drift * 0.86 + (Math.random() - 0.5) * 0.05
      value += drift + (target - value) * 0.012
      value = Math.min(0.92, Math.max(0.08, value))
      return value
    }

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.ceil((w * HEAD) / STEP) + 2
      while (pts.length < n) pts.push(next())
      pts = pts.slice(-n)
      draw()
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      // faint ledger rules
      ctx.strokeStyle = 'rgba(15, 27, 45, 0.06)'
      ctx.lineWidth = 1
      for (let i = 1; i < 5; i++) {
        const y = Math.round((h * i) / 5) + 0.5
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }
      const headX = w * HEAD
      const x0 = headX - (pts.length - 1) * STEP - offset
      const Y = (v: number) => h * (0.12 + v * 0.76)

      // area under the line
      const grad = ctx.createLinearGradient(0, 0, 0, h)
      grad.addColorStop(0, 'rgba(232, 163, 23, 0.16)')
      grad.addColorStop(1, 'rgba(232, 163, 23, 0)')
      ctx.beginPath()
      pts.forEach((v, i) => (i ? ctx.lineTo(x0 + i * STEP, Y(v)) : ctx.moveTo(x0, Y(v))))
      ctx.lineTo(x0 + (pts.length - 1) * STEP, h)
      ctx.lineTo(x0, h)
      ctx.closePath()
      ctx.fillStyle = grad
      ctx.fill()

      // the line, fading in from the left edge
      const fade = ctx.createLinearGradient(0, 0, headX, 0)
      fade.addColorStop(0, 'rgba(15, 27, 45, 0)')
      fade.addColorStop(0.35, 'rgba(15, 27, 45, 0.22)')
      fade.addColorStop(1, 'rgba(15, 27, 45, 0.5)')
      ctx.beginPath()
      pts.forEach((v, i) => (i ? ctx.lineTo(x0 + i * STEP, Y(v)) : ctx.moveTo(x0, Y(v))))
      ctx.strokeStyle = fade
      ctx.lineWidth = 1.5
      ctx.lineJoin = 'round'
      ctx.stroke()

      // live head
      const hx = x0 + (pts.length - 1) * STEP
      const hy = Y(pts[pts.length - 1])
      ctx.setLineDash([3, 5])
      ctx.strokeStyle = 'rgba(15, 27, 45, 0.18)'
      ctx.beginPath()
      ctx.moveTo(hx, hy)
      ctx.lineTo(w, hy)
      ctx.stroke()
      ctx.setLineDash([])
      ctx.fillStyle = 'rgba(232, 163, 23, 0.25)'
      ctx.beginPath()
      ctx.arc(hx, hy, 10, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#E8A317'
      ctx.beginPath()
      ctx.arc(hx, hy, 4.5, 0, Math.PI * 2)
      ctx.fill()
    }

    // Phones draw at half rate: the tape is ambience, not worth main-thread time there.
    const minFrame = window.matchMedia('(pointer: coarse)').matches ? 32 : 0
    const tick = (now: number) => {
      if (!running) return
      if (last && now - last < minFrame) {
        frame = requestAnimationFrame(tick)
        return
      }
      const dt = Math.min(64, now - (last || now))
      last = now
      offset += dt * 0.028
      while (offset >= STEP) {
        offset -= STEP
        pts.push(next())
        pts.shift()
      }
      draw()
      frame = requestAnimationFrame(tick)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    if (!motionOK()) return () => ro.disconnect()

    // Start only once the page has settled, so the tape never competes with first load.
    let settled = false
    let visible = false
    const start = () => {
      if (settled && visible && !running) {
        running = true
        last = 0
        frame = requestAnimationFrame(tick)
      }
    }
    const settle = window.setTimeout(() => {
      settled = true
      start()
    }, 1600)
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible) start()
      else {
        running = false
        cancelAnimationFrame(frame)
      }
    })
    io.observe(canvas)
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      target = Math.min(0.85, Math.max(0.15, (e.clientY - r.top) / Math.max(1, r.height)))
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    return () => {
      running = false
      cancelAnimationFrame(frame)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      window.clearTimeout(settle)
    }
  }, [])

  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] w-full opacity-70 md:h-[46%] md:opacity-100" />
}
