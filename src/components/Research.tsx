import { llmStudy, publication } from '../content/site'
import { Fig } from './CaseStudy'
import CountUp from './CountUp'
import Magnetic from './Magnetic'
import Section from './Section'
import Slot from './Slot'

/** NailSense as a feature spread (photo pinned, facts scrolling), then the LLM ranking study. */
export default function Research() {
  const p = publication
  return (
    <Section
      id="research"
      index="03"
      title={
        <>
          Re<span className="accent">search</span>
        </>
      }
      aside={<p>{p.label}.</p>}
    >
      <article className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-20">
        <div data-reveal className="lg:sticky lg:top-28 lg:self-start">
          <figure>
            <div className="zoom rounded-3xl">
              <img
                src={p.figure.src}
                alt={p.figure.alt}
                width={p.figure.width}
                height={p.figure.height}
                loading="lazy"
                decoding="async"
                className="block aspect-[4/5] w-full rounded-3xl object-cover"
              />
            </div>
            <figcaption className="mt-3 text-sm text-slate">{p.figure.caption}</figcaption>
          </figure>
        </div>

        <div>
          <p data-reveal className="inline-flex items-center gap-2 rounded-full border border-ink px-4 py-1.5 text-sm font-medium">
            <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-amber" />
            {p.label}
          </p>
          <h3 data-reveal className="mt-6 text-[clamp(1.75rem,1.1rem+2.4vw,3.25rem)] font-semibold leading-[1.05] tracking-tight">
            {p.title}
          </h3>
          <p data-reveal className="mt-6 text-lg">
            {p.authors.map((a, i) => (
              <span key={a.name}>
                {a.self ? <strong className="font-semibold">{a.name}</strong> : a.name}
                {i < p.authors.length - 1 ? ', ' : '.'}
              </span>
            ))}{' '}
            <span className="text-slate">{p.affiliations}.</span>
          </p>
          <p data-reveal className="mt-3 text-sm text-slate">
            {p.venue} Published {p.published}.
          </p>

          <dl data-reveal className="mt-10 grid grid-cols-3 gap-x-4 sm:gap-x-6">
            {p.results.map((r) => (
              <div key={r.label} className="flex flex-col-reverse justify-end border-t border-ink py-4">
                <dt className="mt-2 text-xs text-slate sm:text-sm">{r.label}</dt>
                <dd className="num whitespace-nowrap text-[clamp(1.125rem,0.5rem+2.4vw,2.625rem)] font-medium leading-none">
                  <CountUp value={r.value} />
                </dd>
              </div>
            ))}
          </dl>

          <ul data-reveal className="mt-8 flex flex-wrap gap-2" aria-label="Hardware">
            {p.specs.map((s) => (
              <li key={s} className="rounded-full border border-rule bg-panel px-4 py-1.5 text-sm">
                {s}
              </li>
            ))}
          </ul>
          <p data-reveal className="mt-3 text-sm text-slate">
            {p.battery}
          </p>
          <p data-reveal className="mt-6 max-w-prose text-lg">
            <span className="font-semibold">Demo applications.</span> {p.demos}
          </p>

          <div data-reveal className="mt-8 flex flex-wrap items-center gap-5">
            <Magnetic href={p.doi} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
              Read the paper on ACM
            </Magnetic>
            <span className="num text-xs text-slate">doi:{p.doiLabel}</span>
          </div>

          <div data-reveal>
            <Slot slot={p.slot} className="mt-10 min-h-[11rem]" />
          </div>
        </div>
      </article>

      <article className="mt-24 grid gap-10 border-t border-ink pt-12 md:mt-32 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-20">
        <div data-reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-sm text-slate">{llmStudy.kind}</p>
          <h3 className="mt-2 text-[clamp(1.75rem,1.1rem+2.4vw,3.25rem)] font-semibold leading-[1.05] tracking-tight">
            {llmStudy.title}
          </h3>
          <p className="mt-6 text-lg">{llmStudy.summary}</p>
          <p className="mt-3 text-lg">{llmStudy.method}</p>
          <p className="mt-6">
            <a href={llmStudy.link.href} className="link text-lg font-medium" target="_blank" rel="noopener noreferrer">
              {llmStudy.link.label}
            </a>
          </p>
        </div>
        <div className="grid gap-6">
          {llmStudy.figures.map((f) => (
            <div key={f.src} data-reveal>
              <Fig figure={f} />
            </div>
          ))}
        </div>
      </article>
    </Section>
  )
}
