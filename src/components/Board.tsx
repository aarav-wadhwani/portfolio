import { motion, useReducedMotion } from 'framer-motion'
import type { Board as BoardData, BoardBlock, BoardFigure } from '../content/site'
import { ConvergenceCurve, ForecastCurve } from './BoardVisuals'

/**
 * One component board: input → process → output, connected by short
 * animated traces. The connector shape, reveal direction, and timing vary
 * per board so the pattern never repeats mechanically.
 */
export default function Board({
  board,
  index,
  showTooltips,
}: {
  board: BoardData
  index: number
  showTooltips: boolean
}) {
  const reduced = useReducedMotion()
  const fromX = reduced ? 0 : index % 2 === 0 ? -18 : 18

  const reveal = (delay = 0) => ({
    initial: { opacity: 0, x: fromX },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: 0.55, delay: reduced ? 0 : delay },
  })

  return (
    <section id={board.id} className="px-6 py-24 sm:py-28" aria-label={board.title}>
      <div className="mx-auto max-w-board">
        <motion.header data-solder {...reveal()}>
          <p className="font-mono text-ann uppercase tracking-widest text-muted">
            <span className="text-signal">{board.id}</span> · {board.org}
          </p>
          <h2 className="mt-2 font-sans text-display font-semibold">{board.title}</h2>
          {board.note && (
            <p className="mt-3 font-mono text-ann uppercase text-faint">✳ {board.note}</p>
          )}
        </motion.header>

        {/* input → process → output */}
        <div className="mt-10 grid items-stretch gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:gap-0">
          {board.blocks.map((block, i) => (
            <BlockAndConnector
              key={block.ref}
              block={block}
              board={board}
              blockIndex={i}
              boardIndex={index}
              showTooltips={showTooltips}
              reveal={reveal}
            />
          ))}
        </div>

        {/* figures */}
        {board.figures && <Figures figures={board.figures} emphasis={board.figureEmphasis} />}

        {/* impact + link */}
        <motion.div {...reveal(0.2)} className="mt-12 border-l-2 border-signal/60 pl-5 sm:pl-6">
          <p className="font-mono text-ann uppercase tracking-widest text-faint">IMPACT</p>
          <p className="mt-2 max-w-3xl text-label leading-relaxed text-line/85">{board.impact}</p>
          {board.link && (
            <a
              href={board.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2.5 border border-line/30 px-4 py-2 font-mono text-ann uppercase tracking-widest text-line/90 transition-colors hover:border-signal hover:text-signal focus-visible:border-signal"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <circle cx="4" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.2" />
                <path d="M6.5 6 H12" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              {board.link.label}
              <span aria-hidden>↗</span>
            </a>
          )}
        </motion.div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

function BlockAndConnector({
  block,
  board,
  blockIndex,
  boardIndex,
  showTooltips,
  reveal,
}: {
  block: BoardBlock
  board: BoardData
  blockIndex: number
  boardIndex: number
  showTooltips: boolean
  reveal: (delay?: number) => object
}) {
  const delay = 0.1 + blockIndex * 0.18
  return (
    <>
      {blockIndex > 0 && (
        <Connector
          label={board.connectors[(blockIndex - 1) as 0 | 1]}
          variant={(boardIndex + blockIndex) % 3}
          delay={delay - 0.08}
        />
      )}
      <motion.div
        {...reveal(delay)}
        tabIndex={0}
        data-cursor
        className="group relative border border-line/20 bg-ink/70 p-5 outline-none transition-colors focus-visible:border-signal/70 lg:hover:border-line/45"
        aria-describedby={showTooltips ? `${block.ref}-tip` : undefined}
      >
        <CornerPins />
        <p className="font-mono text-ann uppercase tracking-widest text-faint">
          <span className="text-line/80">{block.role}</span> · {block.ref}
        </p>
        <p className="mt-3 text-label leading-relaxed text-muted">{block.body}</p>
        {block.role === 'PROCESS' && board.visual === 'convergence' && <ConvergenceCurve />}
        {block.role === 'PROCESS' && board.visual === 'forecast' && <ForecastCurve />}

        {/* hover-reveal dimension-line annotation (desktop, fine pointer only) */}
        {showTooltips && (
          <div
            id={`${block.ref}-tip`}
            role="tooltip"
            className="pointer-events-none absolute -top-2 left-1/2 z-20 w-64 -translate-x-1/2 -translate-y-full opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            <div className="border border-signal/40 bg-ink px-3 py-2 font-mono text-ann leading-relaxed text-line/85">
              {block.tooltip}
            </div>
            {/* dimension leader */}
            <div aria-hidden className="mx-auto h-2 w-px bg-signal/50" />
            <div aria-hidden className="mx-auto h-px w-3 bg-signal/50" />
          </div>
        )}
      </motion.div>
    </>
  )
}

/** Short animated trace between blocks; three routing variants keep boards from repeating. */
function Connector({ label, variant, delay }: { label: string; variant: number; delay: number }) {
  const reduced = useReducedMotion()
  const paths = [
    'M 0 30 H 64', // straight run
    'M 0 34 H 18 L 30 22 H 46 L 58 34 H 64', // 45° jog up
    'M 0 26 H 18 L 30 38 H 46 L 58 26 H 64', // 45° jog down
  ]
  const d = paths[variant % paths.length]
  const draw = {
    initial: { pathLength: reduced ? 1 : 0 },
    whileInView: { pathLength: 1 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: 0.6, delay: reduced ? 0 : delay, ease: 'easeInOut' as const },
  }

  return (
    <>
      {/* desktop: horizontal trace */}
      <div className="hidden w-24 flex-col items-center justify-center px-2 lg:flex" aria-hidden>
        <span className="mb-1 text-center font-mono text-ann leading-tight text-faint">{label}</span>
        <svg width="72" height="60" viewBox="0 0 72 60" fill="none" className="overflow-visible">
          <motion.path {...draw} d={d} stroke="#3B82F6" strokeWidth="1.25" strokeLinejoin="round" />
          <motion.path
            d="M 64 26 L 71 30 L 64 34 Z"
            fill="#3B82F6"
            initial={{ opacity: reduced ? 1 : 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: reduced ? 0 : delay + 0.5, duration: 0.2 }}
          />
        </svg>
      </div>
      {/* mobile: short vertical drop */}
      <div className="flex flex-col items-center gap-1 py-1 lg:hidden" aria-hidden>
        <svg width="16" height="36" viewBox="0 0 16 36" fill="none">
          <path d="M 8 0 V 26 M 3 26 L 8 34 L 13 26" stroke="#3B82F6" strokeWidth="1.25" opacity="0.8" />
        </svg>
        <span className="font-mono text-ann text-faint">{label}</span>
      </div>
    </>
  )
}

function CornerPins() {
  const tick = 'absolute h-2 w-2 border-line/40'
  return (
    <>
      <span aria-hidden className={`${tick} -left-px -top-px border-l border-t`} />
      <span aria-hidden className={`${tick} -right-px -top-px border-r border-t`} />
      <span aria-hidden className={`${tick} -bottom-px -left-px border-b border-l`} />
      <span aria-hidden className={`${tick} -bottom-px -right-px border-b border-r`} />
    </>
  )
}

function Figures({ figures, emphasis }: { figures: BoardFigure[]; emphasis?: boolean }) {
  const layout = emphasis
    ? 'grid gap-6 lg:grid-cols-[5fr_3fr] lg:items-start'
    : figures.length === 1
      ? 'mx-auto max-w-3xl'
      : figures.length === 2
        ? 'grid gap-6 sm:grid-cols-2'
        : 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3'

  return (
    <div className={`mt-12 ${layout}`}>
      {figures.map((fig, i) => (
        <motion.figure
          key={fig.src}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, delay: i * 0.12 }}
        >
          <div className="border border-line/20 bg-line/5 p-2">
            <img
              src={fig.src}
              alt={fig.alt}
              loading="lazy"
              decoding="async"
              className={`block w-full ${emphasis && i > 0 ? 'aspect-[3/4] object-cover' : 'h-auto'}`}
            />
          </div>
          <figcaption className="mt-2 font-mono text-ann uppercase text-faint">
            {fig.caption}
          </figcaption>
        </motion.figure>
      ))}
    </div>
  )
}
