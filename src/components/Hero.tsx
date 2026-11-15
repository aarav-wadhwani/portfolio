import { useEffect, useState, type CSSProperties } from 'react'
import { headlineLines, links, pillars, positioning } from '../content/site'
import Magnetic from './Magnetic'
import Tape from './Tape'

const i = (n: number) => ({ '--i': n }) as CSSProperties

/** Seattle wall-clock time. Client only, so the prerendered HTML never goes stale. */
function LocalTime() {
  const [time, setTime] = useState<string | null>(null)
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      timeZone: 'America/Los_Angeles',
    })
    const update = () => setTime(fmt.format(new Date()))
    update()
    const id = window.setInterval(update, 30_000)
    return () => window.clearInterval(id)
  }, [])
  return time ? <span className="num text-xs"> · {time}</span> : null
}

/** Full-viewport opener: the claim, the proof in one sentence, three ways in. */
export default function Hero() {
  return (
    <div id="top" className="relative isolate overflow-hidden">
      <Tape />
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-wide flex-col px-5 pb-8 pt-24 md:px-10 md:pb-10 md:pt-28">
        <p data-load style={i(0)} className="flex items-center justify-between gap-4 text-sm text-slate">
          <span>
            Seattle, WA
            <LocalTime />
          </span>
          <span className="flex items-center gap-2">
            <span aria-hidden className="relative flex h-2.5 w-2.5">
              <span className="absolute inset-0 rounded-full bg-amber motion-safe:animate-ping" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-amber" />
            </span>
            Open to 2027 roles
          </span>
        </p>

        <h1 aria-label={`${positioning.name}: ${positioning.headline}`} className="mt-6 text-display font-semibold md:mt-8">
          {headlineLines.map((line, li) => (
            <span key={li} aria-hidden className="hl-line">
              <span style={i(li)}>
                {line.map((seg, si) => (
                  <span key={si} className={seg.accent ? 'accent' : undefined}>
                    {seg.text}
                  </span>
                ))}
                {li === 0 && (
                  <img
                    src={positioning.headshot.src}
                    alt=""
                    width={640}
                    height={640}
                    {...{ fetchpriority: 'high' }}
                    className="ml-[0.22em] hidden h-[0.74em] md:inline-block w-[1.5em] -translate-y-[0.06em] rounded-full object-cover align-middle"
                  />
                )}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-7 grid gap-6 md:mt-8 md:grid-cols-[minmax(0,34rem)_auto] md:items-end md:justify-between">
          <div data-load style={i(1)} className="order-2 flex flex-wrap gap-3">
            <Magnetic href={links.resume} className="btn btn-primary">
              Resume
            </Magnetic>
            <Magnetic href={`mailto:${links.email}`} className="btn btn-secondary">
              Email
            </Magnetic>
            <Magnetic href={links.linkedin} className="btn btn-secondary" rel="noopener noreferrer" target="_blank">
              LinkedIn
            </Magnetic>
          </div>
          <p data-load style={i(2)} className="order-1 text-base text-ink md:text-lg">
            {positioning.supporting}
          </p>
        </div>

        <ul data-load style={i(3)} className="mt-auto grid gap-x-8 pt-8 md:grid-cols-3">
          {pillars.map((p, n) => (
            <li key={p.href}>
              <a
                href={p.href}
                className="group flex h-full items-start justify-between gap-4 border-t border-ink py-4 transition-colors md:py-5"
              >
                <span>
                  <span className="num text-xs text-slate">0{n + 1}</span>
                  <span className="ml-3 text-sm text-slate">{p.label}</span>
                  <span className="mt-1 block text-xl font-semibold md:text-2xl">{p.title}</span>
                  <span className="mt-0.5 hidden text-sm text-slate md:block">{p.body}</span>
                </span>
                <Arrow className="mt-1 h-6 w-6 shrink-0 transition-transform duration-500 group-hover:translate-y-1" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
      <path d="M12 4v15M5.5 12.5 12 19l6.5-6.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
