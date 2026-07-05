import { motion, useReducedMotion } from 'framer-motion'
import { legend } from '../content/site'

/** Bio as a schematic legend / spec box, title block included. */
export default function Legend() {
  const reduced = useReducedMotion()
  const reveal = (delay = 0) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 14 },
    whileInView: reduced ? { opacity: 1 } : { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.5, delay },
  })

  return (
    <section id="legend" className="px-6 py-28 sm:py-36" aria-label="About">
      <div data-solder className="mx-auto max-w-4xl">
        <motion.div {...reveal()} className="border border-line/25">
          {/* title block, engineering-drawing style */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line/25 px-5 py-3 sm:px-7">
            <h2 className="font-mono text-ann uppercase tracking-widest text-signal">
              {legend.refTag}
            </h2>
            <p className="font-mono text-ann uppercase text-faint">{legend.docTag}</p>
          </div>

          <div className="grid gap-8 px-5 py-8 sm:grid-cols-[176px_1fr] sm:gap-10 sm:px-7 sm:py-10">
            {/* legend entry: headshot */}
            <motion.figure {...reveal(0.1)} className="max-w-[176px]">
              <div className="relative border border-signal/70 p-1">
                <img
                  src={legend.headshot.src}
                  alt={legend.headshot.alt}
                  width={640}
                  height={640}
                  className="block aspect-square w-full object-cover grayscale-[25%]"
                />
                {/* corner ticks */}
                <span aria-hidden className="absolute -left-px -top-px h-2.5 w-2.5 border-l-2 border-t-2 border-signal" />
                <span aria-hidden className="absolute -bottom-px -right-px h-2.5 w-2.5 border-b-2 border-r-2 border-signal" />
              </div>
              <figcaption className="mt-2 font-mono text-ann uppercase text-faint">
                {legend.headshot.caption}
              </figcaption>
            </motion.figure>

            {/* spec rows */}
            <dl className="space-y-6">
              {legend.rows.map((row, i) => (
                <motion.div key={row.key} {...reveal(0.15 + i * 0.1)}>
                  <dt className="font-mono text-ann uppercase tracking-widest text-faint">
                    {row.key}
                  </dt>
                  <dd className="mt-1.5 text-body leading-relaxed text-line/90">{row.body}</dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
