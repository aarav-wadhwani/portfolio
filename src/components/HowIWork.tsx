import { useEffect, useRef, useState } from 'react'
import { howIWork } from '../content/site'

/**
 * The forward deployed loop on an ink band. The heading stays pinned while the
 * four steps scroll past, and the step nearest the middle of the screen lights up.
 */
export default function HowIWork() {
  // -1 means "no tracking yet": every step is fully lit (also the no-JS state).
  const [active, setActive] = useState(-1)
  const steps = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i))
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    steps.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  const shown = Math.max(0, active)

  return (
    <section id="how" aria-labelledby="how-heading" className="bg-ink text-paper">
      <div className="mx-auto grid max-w-wide gap-12 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="num text-sm text-mist">(02)</p>
          <h2 id="how-heading" className="mt-3 text-h2 font-semibold">
            How I <span className="accent">work</span>
          </h2>
          <p aria-hidden className="js-only mt-10 hidden items-baseline gap-3 lg:flex">
            <span className="num text-[5.5rem] font-medium leading-none text-amber">0{shown + 1}</span>
            <span className="num text-sm text-mist">/ 0{howIWork.length}</span>
          </p>
          <div aria-hidden className="js-only mt-6 hidden h-px w-full bg-paper/20 lg:block">
            <div
              className="h-px origin-left bg-amber transition-transform duration-700"
              style={{ transform: `scaleX(${(shown + 1) / howIWork.length})` }}
            />
          </div>
        </div>

        <ol>
          {howIWork.map((step, i) => {
            const dim = active >= 0 && i !== active
            return (
              <li
                key={step.title}
                ref={(el) => {
                  steps.current[i] = el
                }}
                data-i={i}
                className="border-t border-paper/20 py-10 last:border-b md:py-12"
              >
                <p className={`num text-sm transition-colors duration-500 ${dim ? 'text-mist' : 'text-amber'}`} aria-hidden>
                  0{i + 1}
                </p>
                <h3
                  className={`mt-3 text-[clamp(1.75rem,1rem+2.6vw,3.25rem)] font-semibold leading-[1.05] tracking-tight transition-colors duration-500 ${
                    dim ? 'text-mist' : 'text-paper'
                  }`}
                >
                  {step.title}
                </h3>
                <p className={`mt-4 max-w-xl text-lg transition-colors duration-500 ${dim ? 'text-mist' : 'text-paper'}`}>
                  {step.body}
                </p>
                <p className="mt-5 max-w-xl border-l-2 border-amber pl-4 text-base text-mist">{step.evidence}</p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
