import { useEffect, useState } from 'react'

/**
 * Scroll spy for the component boards: returns the id (U1…U8) of the board
 * section currently most in view, or null between board sections. Drives the
 * Power Rail active state and the scroll readout's section tag.
 */
export function useActiveBoard(): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('section[data-board]'))
    if (sections.length === 0) return

    const ratios = new Map<string, number>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id
          if (entry.isIntersecting) ratios.set(id, entry.intersectionRatio)
          else ratios.delete(id)
        }
        let best: string | null = null
        let bestRatio = 0
        ratios.forEach((ratio, id) => {
          if (ratio >= bestRatio) {
            bestRatio = ratio
            best = id
          }
        })
        setActive(best)
      },
      { threshold: [0, 0.12, 0.25, 0.5, 0.75] },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  return active
}
