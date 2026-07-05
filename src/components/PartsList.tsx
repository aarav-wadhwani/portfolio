import { motion } from 'framer-motion'
import { skills } from '../content/site'

/** Skills as a reference table — a bill of materials. */
export default function PartsList() {
  return (
    <section id="skills" className="px-6 py-24 sm:py-32" aria-label="Skills">
      <div className="mx-auto max-w-4xl">
        <motion.header
          data-solder
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-ann uppercase tracking-widest text-muted">
            <span className="text-signal">BOM</span> · PARTS LIST
          </p>
          <h2 className="mt-2 font-sans text-display font-semibold">Skills</h2>
        </motion.header>

        <motion.div
          className="mt-10 border border-line/25"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
        >
          <div className="grid grid-cols-[3.5rem_8rem_1fr] gap-x-4 border-b border-line/25 px-4 py-2.5 font-mono text-ann uppercase tracking-widest text-faint sm:grid-cols-[4.5rem_11rem_1fr] sm:px-6">
            <span>REF</span>
            <span>CATEGORY</span>
            <span>ITEMS</span>
          </div>
          {skills.map((row) => (
            <div
              key={row.ref}
              className="grid grid-cols-[3.5rem_8rem_1fr] gap-x-4 border-b border-line/10 px-4 py-4 last:border-b-0 sm:grid-cols-[4.5rem_11rem_1fr] sm:px-6"
            >
              <span className="font-mono text-ann text-signal">{row.ref}</span>
              <span className="font-mono text-ann uppercase tracking-widest text-muted">
                {row.category}
              </span>
              <div className="space-y-1.5">
                {row.groups.map((g, i) => (
                  <p key={i} className="text-label leading-relaxed text-line/85">
                    {g.items}
                    {g.level && (
                      <span className="ml-2 font-mono text-ann uppercase text-faint">
                        — {g.level}
                      </span>
                    )}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
