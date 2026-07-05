import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { skills } from '../content/site'
import HeaderTrace from './HeaderTrace'

/**
 * Skills as a bill of materials, drawn as actual components: three IC
 * packages with pin stubs, a signal-strength meter per language, and
 * connector-pill chips for methods and tools. Scannable first, schematic
 * second, decorative never.
 */
export default function PartsList() {
  const reduced = useReducedMotion()

  return (
    <section id="skills" className="px-6 py-24 sm:py-28" aria-label="Skills">
      <div className="mx-auto max-w-board">
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
          <HeaderTrace />
        </motion.header>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {/* L1: languages with proficiency meters */}
          <Module refDes={skills.languages.ref} category={skills.languages.category} index={0}>
            <ul className="space-y-3.5">
              {skills.languages.items.map((s, i) => (
                <motion.li
                  key={s.name}
                  className="flex items-center justify-between gap-3"
                  initial={{ opacity: 0, x: reduced ? 0 : -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: reduced ? 0 : 0.15 + i * 0.06, duration: 0.35 }}
                >
                  <span className="text-label text-line/90">{s.name}</span>
                  <span className="flex items-center gap-2.5">
                    <Meter level={s.level} delay={0.25 + i * 0.06} />
                    <span className="w-[5.2rem] text-right font-mono text-ann uppercase text-faint">
                      {LEVEL_LABELS[s.level]}
                    </span>
                  </span>
                </motion.li>
              ))}
            </ul>
          </Module>

          {/* M1: modeling chips */}
          <Module refDes={skills.modeling.ref} category={skills.modeling.category} index={1}>
            <ChipGrid items={skills.modeling.items} />
          </Module>

          {/* T1: data & tools chips */}
          <Module refDes={skills.tools.ref} category={skills.tools.category} index={2}>
            <ChipGrid items={skills.tools.items} />
          </Module>
        </div>
      </div>
    </section>
  )
}

const LEVEL_LABELS: Record<1 | 2 | 3, string> = {
  1: 'FAMILIAR',
  2: 'MODERATE',
  3: 'PROFICIENT',
}

/** IC-package frame: header strip, pin stubs on both sides (one live pin,
 *  echoing the favicon), and a blue energize on hover. */
function Module({
  refDes,
  category,
  index,
  children,
}: {
  refDes: string
  category: string
  index: number
  children: ReactNode
}) {
  const reduced = useReducedMotion()
  const stubBase = 'absolute h-px w-[9px] transition-colors duration-300'
  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay: reduced ? 0 : index * 0.14 }}
      className="group/mod relative flex flex-col border border-line/25 bg-ink/70 transition-all duration-300 hover:border-signal/60 hover:shadow-[0_0_28px_rgba(59,130,246,0.12)]"
    >
      {/* pin stubs; the first left pin carries current */}
      {[18, 50, 82].map((top, i) => (
        <span key={`l${top}`} aria-hidden>
          <span
            className={`${stubBase} -left-[9px] ${
              i === 0 ? 'bg-signal/80' : 'bg-line/40 group-hover/mod:bg-signal/70'
            }`}
            style={{ top: `${top}%` }}
          />
          <span
            className={`${stubBase} -right-[9px] bg-line/40 group-hover/mod:bg-signal/70`}
            style={{ top: `${top}%` }}
          />
        </span>
      ))}

      <div className="flex items-center justify-between border-b border-line/25 px-5 py-3">
        <span className="font-mono text-ann tracking-widest text-signal">{refDes}</span>
        <span className="font-mono text-ann uppercase tracking-widest text-muted">{category}</span>
      </div>
      <div className="flex-1 p-5">{children}</div>
    </motion.div>
  )
}

/** Three-bar signal-strength meter; filled bars rise in as it scrolls into view. */
function Meter({ level, delay }: { level: 1 | 2 | 3; delay: number }) {
  const reduced = useReducedMotion()
  const heights = ['h-[7px]', 'h-[11px]', 'h-[15px]']
  return (
    <span className="flex items-end gap-[3px]" aria-label={`${LEVEL_LABELS[level]} proficiency`}>
      {heights.map((h, i) => (
        <motion.span
          key={i}
          className={`w-[5px] origin-bottom ${h} ${
            i < level ? 'bg-signal shadow-[0_0_6px_rgba(59,130,246,0.45)]' : 'bg-trace'
          }`}
          initial={{ scaleY: reduced ? 1 : 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ delay: reduced ? 0 : delay + i * 0.08, duration: 0.3, ease: 'easeOut' }}
        />
      ))}
    </span>
  )
}

/** Skills as connector pills: a pin dot, a mono label, and a live hover state. */
function ChipGrid({ items }: { items: string[] }) {
  const reduced = useReducedMotion()
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <motion.li
          key={item}
          initial={{ opacity: 0, y: reduced ? 0 : 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ delay: reduced ? 0 : 0.15 + i * 0.05, duration: 0.3 }}
        >
          <span
            data-cursor
            className="inline-flex items-center gap-2 border border-line/25 px-2.5 py-1.5 font-mono text-ann text-line/85 transition-all duration-200 hover:-translate-y-px hover:border-signal hover:text-signal hover:shadow-[0_0_12px_rgba(59,130,246,0.3)]"
          >
            <span aria-hidden className="h-1 w-1 rounded-full bg-signal/70" />
            {item}
          </span>
        </motion.li>
      ))}
    </ul>
  )
}
