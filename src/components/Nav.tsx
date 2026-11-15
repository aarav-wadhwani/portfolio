import { useEffect, useRef, useState } from 'react'
import { links, nav, positioning } from '../content/site'

const NAV_IDS = nav.map((n) => n.href.slice(1))
// Observe every section so the highlight clears when you are between nav targets.
const SECTION_IDS = [...NAV_IDS, 'builds', 'teaching', 'contact']

/** Sticky top bar. Desktop: inline links with an active-section underline.
 *  Mobile: one menu button that opens a full-width sheet (focus trap, Esc). */
export default function Nav() {
  const [active, setActive] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const sheetRef = useRef<HTMLDivElement>(null)

  // Active section: whichever one crosses the upper-middle band of the viewport.
  useEffect(() => {
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => !!el,
    )
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting) setActive(NAV_IDS.includes(e.target.id) ? e.target.id : null)
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // Mobile sheet: lock scroll, trap focus, close on Esc or when the viewport grows past mobile.
  useEffect(() => {
    if (!open) return
    const desktop = window.matchMedia('(min-width: 768px)')
    const onResize = () => desktop.matches && setOpen(false)
    desktop.addEventListener('change', onResize)
    const sheet = sheetRef.current
    const focusables = () =>
      [buttonRef.current, ...(sheet?.querySelectorAll<HTMLElement>('a[href]') ?? [])].filter(
        (el): el is HTMLElement => !!el,
      )
    sheet?.querySelector<HTMLElement>('a[href]')?.focus()
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
        return
      }
      if (e.key !== 'Tab') return
      const f = focusables()
      const first = f[0]
      const last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', onResize)
    }
  }, [open])

  const linkClass = (id: string) =>
    `inline-flex h-14 items-center border-b-2 px-1 text-sm font-medium transition-colors ${
      active === id ? 'border-amber text-ink' : 'border-transparent text-slate hover:text-ink'
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/95 backdrop-blur">
      <div className="mx-auto flex min-h-14 max-w-page items-center justify-between gap-4 px-6">
        <a href="#top" className="inline-flex min-h-[2.75rem] items-center text-base font-semibold tracking-tight">
          {positioning.name}
        </a>

        {/* desktop links (also the no-JS fallback at every width) */}
        <nav aria-label="Primary" className="nav-links hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={linkClass(item.href.slice(1))}
              aria-current={active === item.href.slice(1) ? 'true' : undefined}
            >
              {item.label}
            </a>
          ))}
          <a href={`mailto:${links.email}`} className="inline-flex h-14 items-center border-b-2 border-transparent text-sm font-medium text-slate hover:text-ink">
            Email
          </a>
          <a href={links.resume} className="btn btn-secondary min-h-[2.25rem] px-3 text-sm">
            Resume <span className="text-slate">(PDF)</span>
          </a>
        </nav>

        <button
          ref={buttonRef}
          type="button"
          className="js-only btn btn-secondary px-3 text-sm md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {open && (
        <div
          ref={sheetRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-x-0 bottom-0 top-14 z-40 overflow-y-auto border-t border-rule bg-paper px-6 pb-10 pt-4 md:hidden"
        >
          <nav aria-label="Primary" className="flex flex-col">
            {[...nav, { href: '#contact', label: 'Contact' }].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-rule py-4 text-xl font-semibold"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-6 flex flex-col gap-3">
            <a href={links.resume} className="btn btn-primary" onClick={() => setOpen(false)}>
              Resume (PDF)
            </a>
            <a href={`mailto:${links.email}`} className="btn btn-secondary" onClick={() => setOpen(false)}>
              Email
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
