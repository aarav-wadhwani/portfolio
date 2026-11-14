import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { deployments } from '../content/site'
import CaseStudy from './CaseStudy'

const COLS =
  'md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.85fr)_minmax(0,2fr)_6.5rem_1.25rem] md:gap-x-6'

/**
 * The signature element: a ledger of real deployments. Each row is a button
 * that expands in place into the full case study. One row open at a time.
 * `#indago` (or any row id) in the URL opens that row. Without JavaScript,
 * every case study renders open (see index.css).
 */
export default function Ledger() {
  const [openId, setOpenId] = useState<string | null>(null)
  const buttons = useRef<(HTMLButtonElement | null)[]>([])

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

  const toggle = useCallback((id: string) => {
    setOpenId((cur) => {
      const next = cur === id ? null : id
      // keep the URL shareable without adding history entries or jumping the page
      window.history.replaceState(null, '', next ? `#${next}` : window.location.pathname)
      return next
    })
  }, [])

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

  return (
    <section id="work" aria-labelledby="work-heading" className="mt-9">
      <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <h2 id="work-heading" className="text-lg font-semibold">
          Deployments
        </h2>
        <p className="js-only text-sm text-slate">Select a row to open the case study</p>
      </div>

      <div className="mt-3 overflow-hidden rounded-lg border border-rule bg-panel shadow-panel">
        <div aria-hidden className={`hidden px-5 py-2 text-xs text-slate md:grid ${COLS}`}>
          <span>Client</span>
          <span>Team</span>
          <span>What shipped</span>
          <span>Status</span>
          <span />
        </div>

        {deployments.map((d, i) => {
          const open = openId === d.id
          return (
            <div
              key={d.id}
              id={d.id}
              className="ledger-row border-t border-rule [&:nth-child(2)]:border-t-0 md:[&:nth-child(2)]:border-t"
              style={{ '--i': i } as CSSProperties}
            >
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
                  className={`grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 px-5 py-3.5 text-left transition-colors ${COLS} ${
                    open ? 'bg-paper shadow-[inset_3px_0_0_#E8A317]' : 'hover:bg-paper'
                  }`}
                >
                  <span className="col-start-1 row-start-1">
                    <span className="block text-base font-semibold md:text-md">{d.client}</span>
                    <span className="num block text-xs text-slate">{d.dates}</span>
                  </span>
                  <span className="col-span-2 row-start-3 text-sm text-slate md:col-span-1 md:col-start-2 md:row-start-1 md:text-base">
                    {d.team}
                  </span>
                  <span className="col-span-2 row-start-2 text-base md:col-span-1 md:col-start-3 md:row-start-1">
                    {d.shipped}
                  </span>
                  <span className="col-start-2 row-start-1 flex items-center gap-2 text-sm md:col-start-4">
                    <span
                      aria-hidden
                      className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                        d.status.live ? 'bg-amber' : 'border-2 border-slate'
                      }`}
                    />
                    {d.status.label}
                  </span>
                  <svg
                    aria-hidden
                    viewBox="0 0 20 20"
                    className={`js-only hidden h-5 w-5 text-slate transition-transform md:col-start-5 md:block ${
                      open ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                  >
                    <path d="M5 7.5 10 12.5 15 7.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
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
    </section>
  )
}
