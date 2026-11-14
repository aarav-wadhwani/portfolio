import { teaching } from '../content/site'
import Section from './Section'

/** One panel: what it is, the ratings, one quote (a second on expand), and why it is here. */
export default function Teaching() {
  const t = teaching
  return (
    <Section id="teaching" title="Teaching">
      <div className="grid gap-8 rounded-lg border border-rule bg-panel p-6 md:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
        <div>
          <h3 className="text-xl font-semibold">{t.title}</h3>
          <p className="mt-1 text-sm text-slate">
            {t.org} · <span className="num text-xs">{t.dates}</span>
          </p>
          <p className="mt-4 text-base">{t.body}</p>
          <p className="mt-5 border-t-2 border-ink pt-3">
            <span className="num block text-xl font-medium">{t.rating.value}</span>
            <span className="text-sm text-slate">{t.rating.label}</span>
          </p>
        </div>
        <div>
          <figure>
            <blockquote className="border-l-2 border-amber pl-4 text-base">“{t.quote}”</blockquote>
            <figcaption className="mt-2 pl-4 text-sm text-slate">Student evaluation, verbatim</figcaption>
          </figure>
          <details className="mt-4 pl-4">
            <summary className="cursor-pointer text-sm font-medium">One more</summary>
            <blockquote className="mt-2 text-base">“{t.secondQuote}”</blockquote>
          </details>
          <p className="mt-6 max-w-prose text-base">
            <span className="font-semibold">Why it’s here.</span> {t.why}
          </p>
        </div>
      </div>
    </Section>
  )
}
