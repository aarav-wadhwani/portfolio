import type { ReactNode } from 'react'

/**
 * Small illustrative charts for the Macquarie cases. They show the shape of
 * the method, not desk data: no axis numbers, and each carries a one-sentence
 * text alternative. Static by design (nothing animates on scroll).
 */

const INK = '#0F1B2D'
const SLATE = '#4A5568'
const RULE = '#DDE2EA'
const AMBER = '#E8A317'

function Frame({
  label,
  caption,
  xLabel,
  children,
}: {
  label: string
  caption: string
  xLabel: string
  children: ReactNode
}) {
  return (
    <figure className="rounded-md border border-rule bg-panel p-4">
      <svg viewBox="0 0 320 122" role="img" aria-label={label} className="w-full">
        <path d="M 12 8 V 104 H 312" stroke={RULE} strokeWidth="1.5" fill="none" />
        {children}
        <text x="312" y="117" textAnchor="end" fontSize="9" fill={SLATE}>
          {xLabel}
        </text>
      </svg>
      <figcaption className="mt-2 text-xs text-slate">{caption}</figcaption>
    </figure>
  )
}

/** Copper Scorecard: validation error settling, with signal families re-weighted. */
export function ConvergenceChart() {
  const weights = [0.35, 0.8, 0.5, 1, 0.42, 0.68, 0.25, 0.58]
  return (
    <Frame
      label="Illustrative chart: validation error falls and flattens across rolling windows, beside eight bars showing signal family weights being re-ranked."
      caption="Illustrative shape, not desk data. Line: error settling across rolling windows. Bars: the eight family weights at one biweekly re-rank."
      xLabel="rolling windows, then family weights"
    >
      <path
        d="M 16 20 L 32 38 L 46 26 L 62 52 L 78 44 L 94 64 L 112 60 L 130 76 L 150 72 L 172 82 L 196 80 L 220 84"
        stroke={INK}
        strokeWidth="2"
        strokeLinejoin="round"
        fill="none"
      />
      {weights.map((w, i) => (
        <rect
          key={i}
          x={236 + i * 9.5}
          y={104 - w * 44}
          width="6"
          height={w * 44}
          fill={i === 3 ? AMBER : SLATE}
          opacity={i === 3 ? 1 : 0.55}
        />
      ))}
    </Frame>
  )
}

/** Livestock nowcast: forecast converging on the lagged official series. */
export function ForecastChart() {
  return (
    <Frame
      label="Illustrative chart: a dashed forecast line starts apart from the official series and converges onto it, extending about two months past where official data ends."
      caption="Illustrative shape, not desk data. Solid: lagged official series. Dashed: nowcast. Amber: where official data ends."
      xLabel="months"
    >
      <path
        d="M 16 78 L 46 68 L 76 82 L 106 60 L 136 70 L 166 50 L 196 60 L 226 44"
        stroke={INK}
        strokeWidth="2"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M 16 94 L 46 80 L 76 90 L 106 67 L 136 74 L 166 52 L 196 61 L 226 44.5 L 262 50 L 300 34"
        stroke={SLATE}
        strokeWidth="2"
        strokeDasharray="5 4"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M 226 12 V 104" stroke={AMBER} strokeWidth="1.5" />
      <circle cx="226" cy="44" r="3.5" fill={AMBER} />
    </Frame>
  )
}

/** Indago: how a request reaches the team. Plain HTML so it reflows and reads aloud well. */
export function IndagoFlow() {
  const stages = [
    { title: 'Where the work lives', items: ['DealCloud', 'Outlook and SharePoint', 'Deal data rooms', 'Snowflake'] },
    { title: 'Connectors', items: ['DealCloud connector (built)', 'Microsoft 365 connector (configured)'] },
    { title: 'Claude skills', items: ['10+ BD skills', 'Deal wiki: ingest, query, update', 'Deal memo and LP reporting'] },
    { title: 'The team', items: ['BD and deal team, in Claude chat'] },
  ]
  return (
    <figure>
      <ol
        aria-label="How a request flows: systems of record, then connectors, then Claude skills, then the team"
        className="grid gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] md:items-stretch"
      >
        {stages.map((s, i) => (
          <li key={s.title} className="contents">
            <div
              className={`rounded-md border bg-panel p-4 ${
                i === 2 ? 'border-ink shadow-[inset_0_3px_0_#E8A317]' : 'border-rule'
              }`}
            >
              <p className="text-sm font-semibold">{s.title}</p>
              <ul className="mt-2 space-y-1 text-sm text-slate">
                {s.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
            {i < stages.length - 1 && (
              <span aria-hidden className="flex items-center justify-center text-lg text-slate">
                <span className="md:hidden">↓</span>
                <span className="hidden md:inline">→</span>
              </span>
            )}
          </li>
        ))}
      </ol>
      <figcaption className="mt-2 text-xs text-slate">
        Sources, connectors, Claude skills, team. Everything runs in Claude chat.
      </figcaption>
    </figure>
  )
}
