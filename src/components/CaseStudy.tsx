import type { CaseStudy as CaseStudyData, Figure } from '../content/site'
import { ConvergenceChart, ForecastChart, IndagoFlow } from './Charts'
import Slot from './Slot'

/**
 * One case study in the Input, Process, Output frame, with an impact line.
 * Generalizes the old Board component: every field is optional except the
 * three blocks, so new cases only need an entry in site.ts.
 */
export default function CaseStudy({ study }: { study: CaseStudyData }) {
  const hasAside = study.visual === 'convergence' || study.visual === 'forecast'

  return (
    <div className="border-t border-rule bg-paper px-5 py-7 md:px-8 md:py-9">
      <h4 className="text-xl font-semibold">{study.title}</h4>
      <p className="mt-1 text-sm text-slate">
        {study.role}, {study.org}
        {study.location ? `, ${study.location}` : ''} · <span className="num text-xs">{study.dates}</span>
      </p>
      {study.note && <p className="mt-4 border-l-2 border-amber pl-3 text-sm">{study.note}</p>}

      <div className="mt-6 grid gap-x-8 gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_minmax(0,1fr)]">
        {study.blocks.map((b) => (
          <div key={b.label} className="border-t-2 border-ink pt-3">
            <h5 className="text-sm font-semibold">{b.label}</h5>
            {b.body && <p className="mt-2 text-base text-ink">{b.body}</p>}
            {b.points && (
              <ul className="mt-2 space-y-2.5 text-base">
                {b.points.map((pt) => (
                  <li key={pt} className="relative pl-4">
                    <span aria-hidden className="absolute left-0 top-[0.7em] h-1 w-1 rounded-full bg-slate" />
                    {pt}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {study.visual === 'indago-flow' && (
        <div className="mt-8">
          <IndagoFlow />
        </div>
      )}

      {study.catalog && (
        <div className="mt-8">
          <h5 className="text-sm font-semibold">{study.catalog.heading}</h5>
          <dl className="mt-3 grid gap-x-8 gap-y-4 md:grid-cols-2">
            {study.catalog.items.map((it) => (
              <div key={it.name} className="border-t border-rule pt-3">
                <dt className="text-base font-semibold">{it.name}</dt>
                <dd className="mt-1 text-sm text-slate">{it.does}</dd>
              </div>
            ))}
          </dl>
          {study.catalog.more && <p className="mt-4 text-sm text-slate">{study.catalog.more}</p>}
        </div>
      )}

      <div className={`mt-8 grid gap-6 ${hasAside ? 'lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start' : ''}`}>
        <div>
          {study.metric && (
            <p className="mb-4">
              <span className="num text-2xl font-medium">{study.metric.value}</span>{' '}
              <span className="text-base text-slate">{study.metric.label}</span>
            </p>
          )}
          <h5 className="text-sm font-semibold">Impact</h5>
          <p className="mt-1 max-w-prose text-base">{study.impact}</p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tools and methods">
            {study.tags.map((t) => (
              <li key={t} className="rounded border border-rule bg-panel px-2 py-0.5 text-xs text-slate">
                {t}
              </li>
            ))}
          </ul>
          {study.links && (
            <p className="mt-5 flex flex-wrap gap-4 text-sm">
              {study.links.map((l) => (
                <a key={l.href} href={l.href} className="link font-medium">
                  {l.label}
                </a>
              ))}
            </p>
          )}
        </div>
        {study.visual === 'convergence' && <ConvergenceChart />}
        {study.visual === 'forecast' && <ForecastChart />}
      </div>

      {study.figures && (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {study.figures.map((f) => (
            <Fig key={f.src} figure={f} />
          ))}
        </div>
      )}
      {study.slot && <Slot slot={study.slot} className="mt-8" />}
    </div>
  )
}

/** Image on a white matte so plots and photos sit naturally on the light page. */
export function Fig({ figure, className = '' }: { figure: Figure; className?: string }) {
  return (
    <figure className={className}>
      <div className="rounded-md border border-rule bg-panel p-3">
        <img
          src={figure.src}
          alt={figure.alt}
          width={figure.width}
          height={figure.height}
          loading="lazy"
          decoding="async"
          className="block h-auto w-full rounded-sm"
        />
      </div>
      <figcaption className="mt-2 text-xs text-slate">{figure.caption}</figcaption>
    </figure>
  )
}
