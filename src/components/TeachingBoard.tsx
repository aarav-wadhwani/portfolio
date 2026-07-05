import { motion, useReducedMotion } from 'framer-motion'
import type { Board as BoardData } from '../content/site'
import { teaching } from '../content/site'

/**
 * Board U5, Teaching Assistant for EE 201. Deliberately the most human board
 * on the site: it isn't a data pipeline, so instead of forcing the
 * input/process/output diagram it reads as a lab checkoff sheet, on the same
 * grid, monospace, and line-art system as everything else.
 */
export default function TeachingBoard({ board, index }: { board: BoardData; index: number }) {
  const reduced = useReducedMotion()
  const fromX = reduced ? 0 : index % 2 === 0 ? -18 : 18

  const reveal = (delay = 0) => ({
    initial: { opacity: 0, x: fromX },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: '-100px' as const },
    transition: { duration: 0.55, delay: reduced ? 0 : delay },
  })

  return (
    <section id={board.id} data-board className="px-6 py-24 sm:py-28" aria-label={board.title}>
      <div className="mx-auto max-w-board">
        <motion.header data-solder {...reveal()}>
          <p className="font-mono text-ann uppercase tracking-widest text-muted">
            <span className="text-signal">{board.id}</span> · {board.org}
          </p>
          <h2 className="mt-2 font-sans text-display font-semibold">{board.title}</h2>
        </motion.header>

        {/* the checkoff sheet */}
        <motion.div {...reveal(0.12)} className="mt-10 border border-line/25">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line/25 px-5 py-3 sm:px-7">
            <p className="font-mono text-ann uppercase tracking-widest text-signal">
              {teaching.sheetTitle}
            </p>
            <p className="font-mono text-ann uppercase text-faint">{teaching.sheetMeta}</p>
          </div>

          <div className="px-5 py-8 sm:px-7 sm:py-10">
            <p className="max-w-3xl text-body leading-relaxed text-line/90">{teaching.context}</p>

            <div className="mt-10 grid gap-10 lg:grid-cols-[16rem_1fr] lg:gap-14">
              {/* skills checklist */}
              <div>
                <p className="font-mono text-ann uppercase tracking-widest text-faint">
                  CHECKOFF ITEMS
                </p>
                <ul className="mt-4 space-y-3">
                  {teaching.checklist.map((item, i) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckMark delay={0.3 + i * 0.15} />
                      <span className="text-label text-line/85">{item}</span>
                    </li>
                  ))}
                </ul>
                {/* ratings stamp */}
                <motion.div
                  initial={{ opacity: 0, scale: reduced ? 1 : 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: reduced ? 0 : 1.1, duration: 0.35 }}
                  className="mt-8 inline-block border-2 border-signal/70 px-4 py-3"
                >
                  <p className="font-mono text-body font-medium tabular-nums text-signal">
                    {teaching.ratings.headline}
                  </p>
                  <p className="mt-1 max-w-[13rem] font-mono text-ann uppercase leading-relaxed text-muted">
                    {teaching.ratings.detail}
                  </p>
                </motion.div>
              </div>

              {/* method + debug log */}
              <div className="space-y-8">
                {[teaching.method, teaching.debug].map((entry, i) => (
                  <motion.div key={entry.key} {...reveal(0.2 + i * 0.12)}>
                    <p className="font-mono text-ann uppercase tracking-widest text-faint">
                      {entry.key}
                    </p>
                    <p className="mt-2 text-label leading-relaxed text-muted">{entry.body}</p>
                  </motion.div>
                ))}

                {/* testimonials */}
                <div className="grid gap-4 xl:grid-cols-[3fr_2fr]">
                  {teaching.testimonials.map((t, i) => (
                    <motion.blockquote
                      key={i}
                      {...reveal(0.35 + i * 0.12)}
                      className="border border-line/20 bg-ink/70 p-5"
                    >
                      <p className="font-mono text-ann uppercase tracking-widest text-signal/80">
                        {t.tag}
                      </p>
                      <p className="mt-3 text-label leading-relaxed text-line/80">“{t.quote}”</p>
                    </motion.blockquote>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* closing line, the connective tissue back to the rest of the site */}
        <motion.div {...reveal(0.2)} className="mt-12 border-l-2 border-signal/60 pl-5 sm:pl-6">
          <p className="font-mono text-ann uppercase tracking-widest text-faint">WHY IT’S HERE</p>
          <p className="mt-2 max-w-3xl text-label leading-relaxed text-line/85">
            {teaching.closing}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

/** Hand-drawn-precision checkbox: the box is printed, the check gets drawn in. */
function CheckMark({ delay }: { delay: number }) {
  const reduced = useReducedMotion()
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden className="shrink-0">
      <rect x="1" y="1" width="16" height="16" stroke="rgba(232,232,230,0.4)" strokeWidth="1.25" />
      <motion.path
        d="M 4.5 9.5 L 8 13 L 14 4.5"
        stroke="#3B82F6"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: reduced ? 1 : 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ delay: reduced ? 0 : delay, duration: 0.3, ease: 'easeOut' }}
      />
    </svg>
  )
}
