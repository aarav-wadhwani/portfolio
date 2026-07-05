import { motion } from 'framer-motion'
import { contact } from '../content/site'

/**
 * The visual payoff: fully resolved, no noise — the calmest section on the
 * page. CTAs styled as labeled connector ports.
 */
export default function OutputTerminal() {
  return (
    <section id="output" className="relative px-6 pb-16 pt-28 sm:pt-40" aria-label="Contact">
      {/* quiet the grid: the signal has resolved */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(180deg, transparent 0%, #0A0A0B 55%)' }}
      />
      <div data-solder className="relative mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono text-ann uppercase tracking-widest text-signal">
            {contact.refTag}
          </p>
          <h2 className="mt-3 font-sans text-display font-semibold">{contact.heading}</h2>
          <p className="mx-auto mt-4 max-w-md text-body text-muted">{contact.body}</p>
        </motion.div>

        <motion.ul
          className="mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {contact.ports.map((port) => (
            <li key={port.id}>
              <a
                href={port.href}
                {...(port.download ? { download: '' } : {})}
                {...(port.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex items-center gap-3 border border-line/30 px-5 py-3 font-mono text-label text-line/90 transition-colors hover:border-signal hover:text-signal focus-visible:border-signal"
              >
                {/* connector pin */}
                <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden>
                  <rect x="0.6" y="2.6" width="8" height="6.8" rx="1" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M9 6 H17" stroke="currentColor" strokeWidth="1.2" />
                  <circle cx="17" cy="6" r="1" fill="currentColor" />
                </svg>
                <span className="text-left leading-tight">
                  {port.label}
                  {'detail' in port && port.detail && (
                    <span className="block text-ann text-faint transition-colors group-hover:text-signal/70">
                      {port.detail}
                    </span>
                  )}
                </span>
                <span aria-hidden className="text-ann text-faint transition-colors group-hover:text-signal/70">
                  {port.download ? '↓' : port.external ? '↗' : '→'}
                </span>
              </a>
            </li>
          ))}
        </motion.ul>
      </div>

      <footer className="relative mx-auto mt-24 max-w-board border-t border-line/15 pt-6">
        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-ann uppercase text-faint">
          <p>© 2026 AARAV WADHWANI</p>
          <p aria-hidden>END OF TRACE ── ●</p>
          <p>DRAWN AS ONE CONTINUOUS SIGNAL · REV A</p>
        </div>
      </footer>
    </section>
  )
}
