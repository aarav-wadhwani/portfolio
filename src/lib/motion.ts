import { useEffect, type RefObject } from 'react'
import Lenis from 'lenis'

/** True when JavaScript is running and the visitor has not asked for reduced motion. */
export const motionOK = () =>
  typeof document !== 'undefined' && document.documentElement.classList.contains('motion')

const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches

/**
 * Page-level motion: reveal-on-scroll, smooth wheel scrolling, and the scroll
 * progress variable. Everything here is a no-op under reduced motion.
 */
export function usePageMotion() {
  useEffect(() => {
    const root = document.documentElement

    // scroll progress drives the top bar; cheap and passive
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const max = root.scrollHeight - window.innerHeight
        root.style.setProperty('--progress', max > 0 ? String(window.scrollY / max) : '0')
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    if (!motionOK()) return () => window.removeEventListener('scroll', onScroll)

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          e.target.classList.add('is-in')
          io.unobserve(e.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )
    document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el))

    // Smooth wheel scrolling on desktop only; touch keeps native momentum.
    let lenis: Lenis | undefined
    if (finePointer()) {
      lenis = new Lenis({ autoRaf: true, anchors: { offset: -88 }, lerp: 0.11 })
      ;(window as unknown as { __lenis?: Lenis }).__lenis = lenis
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
      io.disconnect()
      lenis?.destroy()
    }
  }, [])
}

/** The element leans toward the pointer while hovered. Fine pointers only. */
export function useMagnetic(ref: RefObject<HTMLElement>, strength = 0.28) {
  useEffect(() => {
    const el = ref.current
    if (!el || !motionOK() || !finePointer()) return
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - (r.left + r.width / 2)) * strength
      const y = (e.clientY - (r.top + r.height / 2)) * strength
      el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`
    }
    const leave = () => {
      el.style.transform = ''
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [ref, strength])
}

/** Pause or resume smooth scrolling (used while the mobile menu is open). */
export function setScrollLocked(locked: boolean) {
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis
  if (locked) lenis?.stop()
  else lenis?.start()
  document.body.style.overflow = locked ? 'hidden' : ''
}
