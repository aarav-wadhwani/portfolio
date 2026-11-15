import { useEffect, useRef, useState } from 'react'
import { links, nav, positioning } from '../content/site'
import { setScrollLocked } from '../lib/motion'

const NAV_IDS = nav.map((n) => n.href.slice(1))
// Observe every section so the highlight clears when you are between nav targets.
const SECTION_IDS = [...NAV_IDS, 'builds', 'teaching', 'contact']

/**
 * Floating pill nav. It slides away while you scroll down and returns the
 * moment you scroll up or tab into it. Mobile: one menu button that opens a
 * full-screen ink sheet (focus trap, Esc to close).
 */
export default function Nav() {
  const [active, setActive] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const sheetRef = useRef<HTMLDivElement>(null)

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

  // Hide on scroll down, show on scroll up.
  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      if (Math.abs(y - lastY) < 6) return
      setHidden(y > lastY && y > 240)
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
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
    setScrollLocked(true)

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
      setScrollLocked(false)
      document.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', onResize)
    }
  }, [open])

  const linkClass = (id: string) =>
    `relative inline-flex h-11 items-center px-3 text-sm font-medium transition-colors after:absolute after:inset-x-3 after:bottom-2 after:h-0.5 after:origin-left after:bg-amber after:transition-transform after:duration-300 ${
      active === id ? 'text-ink after:scale-x-100' : 'text-slate after:scale-x-0 hover:text-ink hover:after:scale-x-100'
    }`

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 px-3 pt-3 transition-transform duration-500 focus-within:translate-y-0 md:px-6 ${
        hidden && !open ? '-translate-y-[120%]' : ''
      }`}
    >
      <div className="mx-auto flex min-h-14 max-w-wide items-center justify-between gap-4 rounded-full border border-rule bg-panel/85 py-1 pl-5 pr-2 shadow-panel backdrop-blur-md">
        <a href="#top" className="inline-flex min-h-[2.75rem] items-center text-base font-semibold tracking-tight">
          {positioning.name}
        </a>

        {/* desktop links (also the no-JS fallback at every width) */}
        <nav aria-label="Primary" className="nav-links hidden items-center gap-1 md:flex">
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
          <a href={`mailto:${links.email}`} className={linkClass('email')}>
            Email
          </a>
          <a href={links.resume} className="btn btn-primary ml-2 min-h-[2.75rem] px-5 text-sm">
            Resume <span className="opacity-70">(PDF)</span>
          </a>
        </nav>

        <button
          ref={buttonRef}
          type="button"
          className="js-only btn btn-primary min-h-[2.75rem] px-5 text-sm md:hidden"
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
          className="fixed inset-0 -z-10 flex flex-col overflow-y-auto bg-ink px-6 pb-10 pt-28 text-paper md:hidden"
        >
          <nav aria-label="Primary" className="flex flex-col">
            {[...nav, { href: '#contact', label: 'Contact' }].map((item, n) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 border-b border-paper/20 py-4 text-3xl font-semibold tracking-tight"
              >
                <span className="num text-xs text-mist">0{n + 1}</span>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-3 pt-8">
            <a href={links.resume} className="btn border-amber bg-amber text-ink" onClick={() => setOpen(false)}>
              Resume (PDF)
            </a>
            <a href={`mailto:${links.email}`} className="btn border-paper text-paper" onClick={() => setOpen(false)}>
              Email
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
