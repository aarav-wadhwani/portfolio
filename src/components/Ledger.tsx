import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { deployments, publication } from '../content/site'
import { motionOK } from '../lib/motion'
import CaseStudy from './CaseStudy'
import { ConvergenceChart, ForecastChart } from './Charts'
import Section from './Section'

const COLS = 'lg:grid-cols-[2.5rem_minmax(0,1.15fr)_minmax(0,1fr)_7rem_3.5rem] lg:gap-x-8'

/**
 * The signature element: a ledger of real deployments, set large. Rows invert
 * to ink on hover while a preview card trails the pointer; clicking a row
 * expands the full case study in place. One row open at a time.
 * `#indago` (or any row id) in the URL opens that row. Without JavaScript,
 * every case study renders open (see index.css).
 */
export default function Ledger() {
  const [openId, setOpenId] = useState<string | null>(null)
  const [hoverId, setHoverId] = useState<string | null>(null)
  const buttons = useRef<(HTMLButtonElement | null)[]>([])
  const preview = useRef<HTMLDivElement>(null)
  const pointer = useRef({ x: 0, y: 0, cx: 0, cy: 0, frame: 0 })

  // Deep links: open the row named in the hash, now and on later changes.
  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.slice(1)
      if (deployments.some((d) => d.id === id)) setOpenId(id)
    }
    fromHash()
    window.addEventListener('hashchange', fromHash)
    return () => window.removeEventListener('hashchange', fromHash)
  }, [])

  const toggle = useCallback(
    (id: string) => {
      const next = openId === id ? null : id
      setOpenId(next)
      // keep the URL shareable without adding history entries or jumping the page
      window.history.replaceState(
        null,
        '',
        next ? `#${next}` : window.location.pathname + window.location.search,
      )
    },
    [openId],
  )

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = deployments.length - 1
    const target =
      e.key === 'ArrowDown' ? Math.min(i + 1, last)
      : e.key === 'ArrowUp' ? Math.max(i - 1, 0)
      : e.key === 'Home' ? 0
      : e.key === 'End' ? last
      : null
    if (target === null) return
    e.preventDefault()
    buttons.current[target]?.focus()
  }

  // The preview card eases toward the pointer instead of snapping to it.
  const onPointerMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse' || !motionOK()) return
    const p = pointer.current
    p.x = e.clientX
    p.y = e.clientY
    if (p.frame) return
    const step = () => {
      p.cx += (p.x - p.cx) * 0.14
      p.cy += (p.y - p.cy) * 0.14
      if (preview.current) {
        const tilt = Math.max(-8, Math.min(8, (p.x - p.cx) * 0.06))
        // anchored by its bottom-left corner, so it floats above the pointer and never covers the hovered row
        preview.current.style.transform = `translate3d(${p.cx + 32}px, ${p.cy - 28}px, 0) rotate(${tilt.toFixed(2)}deg)`
      }
      p.frame = Math.abs(p.x - p.cx) + Math.abs(p.y - p.cy) > 0.5 ? requestAnimationFrame(step) : 0
    }
    p.frame = requestAnimationFrame(step)
  }
  useEffect(() => () => cancelAnimationFrame(pointer.current.frame), [])

  const showPreview = hoverId !== null && hoverId !== openId

  return (
    <Section
      id="work"
      index="01"
      title={
        <>
          Deploy<span className="accent">ments</span>
          <sup className="num ml-3 align-top text-base font-normal text-slate">04</sup>
        </>
      }
      aside={<p>Four places my work shipped. Select one to open the case study.</p>}
    >
      <div onPointerMove={onPointerMove} onPointerLeave={() => setHoverId(null)} className="border-b border-ink">
        <div aria-hidden className={`hidden px-4 pb-3 text-sm text-slate lg:grid ${COLS}`}>
          <span />
          <span>Client</span>
          <span>What shipped</span>
          <span>Status</span>
          <span />
        </div>

        {deployments.map((d, i) => {
          const open = openId === d.id
          return (
            <div key={d.id} id={d.id} data-reveal style={{ ['--d' as string]: i }} className="ledger-row border-t border-ink">
              <h3>
                <button
                  ref={(el) => {
                    buttons.current[i] = el
                  }}
                  type="button"
                  id={`${d.id}-button`}
                  aria-expanded={open}
                  aria-controls={`${d.id}-panel`}
                  onClick={() => toggle(d.id)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  onPointerEnter={(e) => e.pointerType === 'mouse' && setHoverId(d.id)}
                  className={`group grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 px-4 py-5 text-left transition-[background-color,color,padding] duration-500 ease-out lg:py-7 ${COLS} ${
                    open ? 'bg-ink text-paper' : 'hover:bg-ink hover:text-paper lg:hover:pl-8'
                  }`}
                >
                  <span aria-hidden className={`num hidden text-sm lg:block ${open ? 'text-amber' : 'text-slate group-hover:text-amber'}`}>
                    0{i + 1}
                  </span>
                  <span className="col-start-1 row-start-1 lg:col-start-2">
                    <span className="block text-[clamp(1.5rem,1rem+2.3vw,3.25rem)] font-semibold leading-[1.05] tracking-tight">
                      {d.client}
                    </span>
                    <span className={`mt-1 hidden text-sm lg:block ${open ? 'text-mist' : 'text-slate group-hover:text-mist'}`}>
                      {d.team} · {d.dates}
                    </span>
                  </span>
                  <span className="col-span-2 row-start-2 text-base lg:col-span-1 lg:col-start-3 lg:row-start-1 lg:text-xl">
                    {d.shipped}
                    <span className={`mt-1 block text-sm lg:hidden ${open ? 'text-mist' : 'text-slate group-hover:text-mist'}`}>
                      {d.team} · {d.dates}
                    </span>
                  </span>
                  <span className="col-start-2 row-start-1 flex items-center gap-2 self-start pt-1.5 text-sm lg:col-start-4 lg:self-center lg:pt-0">
                    <span
                      aria-hidden
                      className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                        d.status.live ? 'bg-amber' : 'border-2 border-current'
                      }`}
                    />
                    {d.status.label}
                  </span>
                  <span
                    aria-hidden
                    className={`js-only hidden h-12 w-12 items-center justify-center justify-self-end rounded-full border transition-[transform,background-color,border-color,color] duration-500 lg:col-start-5 lg:flex ${
                      open
                        ? 'rotate-180 border-amber bg-amber text-ink'
                        : 'border-current group-hover:border-amber group-hover:bg-amber group-hover:text-ink'
                    }`}
                  >
                    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75">
                      <path d="M10 4v12M4.5 10.5 10 16l5.5-5.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
              </h3>
              <div
                id={`${d.id}-panel`}
                role="region"
                aria-labelledby={`${d.id}-button`}
                className="ledger-panel"
                data-open={open}
              >
                <div>
                  <CaseStudy study={d.caseStudy} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Preview card that trails the pointer over closed rows (decorative, mouse only). */}
      <div
        ref={preview}
        aria-hidden
        className="js-only pointer-events-none fixed left-0 top-0 z-30 hidden w-[21rem] will-change-transform lg:block"
      >
        <div
          className={`origin-bottom-left -translate-y-full overflow-hidden rounded-2xl border border-rule bg-panel shadow-[0_30px_70px_-20px_rgba(15,27,45,0.45)] transition-[opacity,scale] duration-300 ${
            showPreview ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
          }`}
        >
          {hoverId && <Preview id={hoverId} />}
        </div>
      </div>
    </Section>
  )
}

/** What the hover card shows for each row. Every value here is already on the page. */
function Preview({ id }: { id: string }) {
  if (id === 'copper') return <div className="p-3"><ConvergenceChart bare /></div>
  if (id === 'livestock') return <div className="p-3"><ForecastChart bare /></div>
  if (id === 'nailsense')
    return (
      <img src={publication.figure.src} alt="" width={900} height={1200} className="block aspect-[4/3] w-full object-cover" />
    )
  const skills = deployments[0].caseStudy.catalog?.items ?? []
  return (
    <div className="bg-ink p-5 text-paper">
      <p className="text-sm text-mist">Claude skills in the case study</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {skills.map((s) => (
          <li key={s.name} className="rounded-full border border-paper/30 px-3 py-1 text-sm">
            {s.name}
          </li>
        ))}
        <li className="rounded-full bg-amber px-3 py-1 text-sm font-medium text-ink">10+ total</li>
      </ul>
    </div>
  )
}
