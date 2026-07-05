import { motion, useReducedMotion } from 'framer-motion'
import type { RailItem } from '../content/site'
import { rail } from '../content/site'
import { useActiveBoard } from '../lib/useActiveBoard'

/**
 * The Power Rail: the experience timeline that doubles as the site's index.
 * Every node is a live tap point. Click one and the trace carries you down to
 * that role's component board; as you scroll the boards later, the node whose
 * section is in view stays lit. Hovering a node reveals a one-line preview of
 * what its board covers, and the node itself lights up like a solder joint.
 */
export default function PowerRail() {
  const reduced = useReducedMotion()
  const activeBoard = useActiveBoard()

  return (
    <section id="experience" className="px-6 py-24 sm:py-32" aria-label="Experience and site index">
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
          <p className="mt-3 font-mono text-ann uppercase text-faint">
            THE RAIL IS THE INDEX · SELECT A TAP POINT TO DROP DOWN TO ITS BOARD
          </p>
        </motion.header>

        {/* desktop rail */}
        <div className="relative mt-14 hidden xl:block" role="list">
          <motion.div
            aria-hidden
            className="absolute left-0 right-0 top-[7px] h-px bg-line/25"
            initial={{ scaleX: reduced ? 1 : 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{ transformOrigin: 'left' }}
          />
          <div className="grid grid-cols-5 gap-5">
            {rail.map((item, i) => (
              <motion.div
                key={item.id}
                role="listitem"
                initial={{ opacity: 0, y: reduced ? 0 : 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: reduced ? 0 : 0.15 + i * 0.12 }}
              >
                <RailCard item={item} active={isActive(item, activeBoard)} horizontal />
              </motion.div>
            ))}
          </div>
        </div>

        {/* mobile / narrow rail */}
        <div className="relative mt-12 xl:hidden" role="list">
          <div aria-hidden className="absolute bottom-4 left-[7px] top-2 w-px bg-line/25" />
          <div className="space-y-6">
            {rail.map((item, i) => (
              <motion.div
                key={item.id}
                role="listitem"
                className="relative pl-9"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: reduced ? 0 : i * 0.05 }}
              >
                <RailCard item={item} active={isActive(item, activeBoard)} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function isActive(item: RailItem, activeBoard: string | null): boolean {
  return !!activeBoard && !!item.targets?.some((t) => t.boardId === activeBoard)
}

/**
 * One tap point. The whole card links to the primary board (stretched link);
 * multi-board roles (Macquarie) get one chip per board.
 */
function RailCard({
  item,
  active,
  horizontal = false,
}: {
  item: RailItem
  active: boolean
  horizontal?: boolean
}) {
  const primary = item.targets?.[0]

  return (
    <div className={`group relative ${horizontal ? 'flex h-full flex-col' : ''}`}>
      <Node active={active} incoming={item.incoming} className={horizontal ? '' : 'absolute -left-9 top-2'} />
      <div
        data-cursor={primary ? true : undefined}
        className={`relative flex flex-col border bg-ink/70 p-4 transition-colors duration-200 ${
          horizontal ? 'mt-4 flex-1' : ''
        } ${
          active
            ? 'border-signal/70'
            : 'border-line/15 group-hover:border-signal/50 focus-within:border-signal/50'
        }`}
      >
        {/* stretched primary link: makes the whole card (and its node) clickable */}
        {primary && (
          <a
            href={`#${primary.boardId}`}
            className="absolute inset-0 z-0"
            aria-label={`Jump to board ${primary.label}: ${item.role}, ${item.org}`}
          />
        )}

        <div className="pointer-events-none relative z-10">
          <p className="font-mono text-ann uppercase text-faint">
            {item.dates}
            {item.location ? ` · ${item.location}` : ''}
          </p>
          <h3 className="mt-1.5 text-body font-medium leading-snug">
            {item.role}
            {item.incoming && (
              <span className="ml-2 inline-block translate-y-[-2px] border border-signal/70 px-1.5 py-px font-mono text-ann uppercase text-signal">
                INCOMING
              </span>
            )}
          </h3>
          <p className="mt-1 font-mono text-ann uppercase text-muted">{item.org}</p>

          {/* one-line preview: revealed on hover/focus with a pointer, always
              visible on touch (no hover to reward there) */}
          <p className="mt-3 border-t border-line/10 pt-3 font-mono text-ann leading-relaxed text-muted transition-opacity duration-200 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-within:opacity-100">
            {item.preview}
          </p>
        </div>

        {/* board chips */}
        <div className="relative z-10 mt-auto flex flex-wrap gap-2 pt-3">
          {item.targets ? (
            item.targets.map((t) => (
              <a
                key={t.boardId}
                href={`#${t.boardId}`}
                className="border border-line/25 px-2 py-1 font-mono text-ann uppercase tracking-widest text-line/80 transition-colors hover:border-signal hover:text-signal focus-visible:border-signal"
              >
                {t.label} <span aria-hidden>↓</span>
              </a>
            ))
          ) : (
            <span className="border border-line/10 px-2 py-1 font-mono text-ann uppercase tracking-widest text-faint">
              NO BOARD YET
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

/** Tap-point node: fills and glows when its section is in view; pings on card hover. */
function Node({
  active,
  incoming,
  className = '',
}: {
  active: boolean
  incoming?: boolean
  className?: string
}) {
  return (
    <span aria-hidden className={`relative block h-[15px] w-[15px] ${className}`}>
      <span
        className={`block h-full w-full rounded-full border-2 transition-colors duration-200 ${
          active
            ? 'border-signal bg-signal shadow-[0_0_8px_rgba(59,130,246,0.7)]'
            : incoming
              ? 'border-signal bg-ink'
              : 'border-line/70 bg-ink group-hover:border-signal'
        }`}
      />
      {active ? (
        <span className="absolute inset-[-5px] rounded-full border border-signal/50 motion-safe:animate-ping" />
      ) : (
        <span className="absolute inset-[-5px] hidden rounded-full border border-signal/40 group-hover:block motion-safe:group-hover:animate-ping" />
      )}
    </span>
  )
}
