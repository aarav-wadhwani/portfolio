import { llmStudy, publication } from '../content/site'
import { Fig } from './CaseStudy'
import Section from './Section'
import Slot from './Slot'

/** Publication card for NailSense (with DOI and authors), then the LLM ranking study. */
export default function Research() {
  const p = publication
  return (
    <Section id="research" title="Research">
      <article className="rounded-lg border border-rule bg-panel p-6 shadow-panel md:p-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-medium">
              <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-amber" />
              {p.label}
            </p>
            <h3 className="mt-3 text-xl font-semibold md:text-2xl">{p.title}</h3>
            <p className="mt-3 text-base">
              {p.authors.map((a, i) => (
                <span key={a.name}>
                  {a.self ? <strong className="font-semibold">{a.name}</strong> : a.name}
                  {i < p.authors.length - 1 ? ', ' : '.'}
                </span>
              ))}{' '}
              <span className="text-slate">{p.affiliations}.</span>
            </p>
            <p className="mt-2 text-sm text-slate">
              {p.venue} Published {p.published}.
            </p>

            <dl className="mt-6 grid grid-cols-3 gap-4">
              {p.results.map((r) => (
                <div key={r.label} className="flex flex-col-reverse justify-end border-t-2 border-ink pt-3">
                  <dt className="mt-1 text-xs text-slate sm:text-sm">{r.label}</dt>
                  <dd className="num text-lg font-medium sm:text-2xl">{r.value}</dd>
                </div>
              ))}
            </dl>

            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Hardware">
              {p.specs.map((s) => (
                <li key={s} className="rounded border border-rule bg-paper px-2 py-1 text-sm">
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-slate">{p.battery}</p>
            <p className="mt-4 max-w-prose text-base">
              <span className="font-semibold">Demo applications.</span> {p.demos}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a href={p.doi} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                Read the paper on ACM
              </a>
              <span className="num text-xs text-slate">doi:{p.doiLabel}</span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <figure>
              <div className="rounded-md border border-rule bg-panel p-2">
                <img
                  src={p.figure.src}
                  alt={p.figure.alt}
                  width={p.figure.width}
                  height={p.figure.height}
                  loading="lazy"
                  decoding="async"
                  className="block aspect-[4/3] w-full rounded-sm object-cover"
                />
              </div>
              <figcaption className="mt-2 text-xs text-slate">{p.figure.caption}</figcaption>
            </figure>
            <Slot slot={p.slot} className="min-h-[9rem]" />
          </div>
        </div>
      </article>

      <article className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
        <div>
          <p className="text-sm text-slate">{llmStudy.kind}</p>
          <h3 className="mt-1 text-xl font-semibold md:text-2xl">{llmStudy.title}</h3>
          <p className="mt-3 text-base">{llmStudy.summary}</p>
          <p className="mt-3 text-base">{llmStudy.method}</p>
          <p className="mt-5">
            <a href={llmStudy.link.href} className="link font-medium" target="_blank" rel="noopener noreferrer">
              {llmStudy.link.label}
            </a>
          </p>
        </div>
        <div className="grid gap-6">
          {llmStudy.figures.map((f) => (
            <Fig key={f.src} figure={f} />
          ))}
        </div>
      </article>
    </Section>
  )
}
