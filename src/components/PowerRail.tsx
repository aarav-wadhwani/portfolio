import { motion, useReducedMotion } from 'framer-motion'
import { experience } from '../content/site'

/**
 * Experience as a labeled power rail: horizontal on desktop, vertical on
 * mobile, one node per role, most recent first.
 */
export default function PowerRail() {
  const reduced = useReducedMotion()

  return (
    <section id="experience" className="px-6 py-24 sm:py-32" aria-label="Experience">
      <div className="mx-auto max-w-board">
        <motion.header
          data-solder
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-ann uppercase tracking-widest text-muted">
            <span className="text-signal">VCC</span> · POWER RAIL
          </p>
          <h2 className="mt-2 font-sans text-display font-semibold">Experience</h2>
        </motion.header>

        {/* desktop rail */}
        <div className="relative mt-14 hidden xl:block" role="list">
          <motion.div
            aria-hidden
            className="absolute left-0 right-0 top-[5px] h-px bg-line/25"
            initial={{ scaleX: reduced ? 1 : 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{ transformOrigin: 'left' }}
          />
          <div className="grid grid-cols-5 gap-6">
            {experience.map((role, i) => (
              <motion.div
                key={role.id}
                role="listitem"
                initial={{ opacity: 0, y: reduced ? 0 : 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: reduced ? 0 : 0.15 + i * 0.12 }}
              >
                <RailNode role={role} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* mobile / narrow rail */}
        <div className="relative mt-12 xl:hidden" role="list">
          <div aria-hidden className="absolute bottom-2 left-[5px] top-1 w-px bg-line/25" />
          <div className="space-y-10">
            {experience.map((role, i) => (
              <motion.div
                key={role.id}
                role="listitem"
                className="relative pl-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: reduced ? 0 : i * 0.05 }}
              >
                <Node incoming={role.incoming} className="absolute left-0 top-1" />
                <RoleCard role={role} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function RailNode({ role }: { role: (typeof experience)[number] }) {
  return (
    <div>
      <Node incoming={role.incoming} />
      <div className="mt-4">
        <RoleCard role={role} />
      </div>
    </div>
  )
}

function Node({ incoming, className = '' }: { incoming?: boolean; className?: string }) {
  return (
    <span aria-hidden className={`block h-[11px] w-[11px] ${className}`}>
      <span
        className={`block h-full w-full rounded-full border-2 ${
          incoming ? 'border-signal bg-ink' : 'border-line/70 bg-ink'
        }`}
      />
    </span>
  )
}

function RoleCard({ role }: { role: (typeof experience)[number] }) {
  return (
    <div>
      <p className="font-mono text-ann uppercase text-faint">
        {role.dates}
        {role.location ? ` · ${role.location}` : ''}
      </p>
      <h3 className="mt-1.5 text-body font-medium leading-snug">
        {role.role}
        {role.incoming && (
          <span className="ml-2 inline-block translate-y-[-2px] border border-signal/70 px-1.5 py-px font-mono text-ann uppercase text-signal">
            INCOMING
          </span>
        )}
      </h3>
      <p className="mt-1 font-mono text-ann uppercase text-muted">{role.org}</p>
      <p className="mt-2.5 text-label leading-relaxed text-muted">{role.body}</p>
    </div>
  )
}
