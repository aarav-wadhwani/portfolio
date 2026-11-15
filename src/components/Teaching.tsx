import { teaching } from '../content/site'
import Section from './Section'

/** One student's words set large, with the facts and the reason it is here beside them. */
export default function Teaching() {
  const t = teaching
  return (
    <Section
      id="teaching"
      index="05"
      title={
        <>
          Teach<span className="accent">ing</span>
        </>
      }
      aside={
        <p>
          {t.title}. {t.org}, {t.dates}.
        </p>
      }
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:gap-20">
        <div data-reveal>
          <p className="border-t border-ink pt-4">
            <span className="num block whitespace-nowrap text-[clamp(1.75rem,1.1rem+1.5vw,2.625rem)] font-medium leading-none">
              {t.rating.value}
            </span>
            <span className="mt-2 block text-sm text-slate">{t.rating.label}</span>
          </p>
          <p className="mt-8 border-t border-ink pt-4 text-lg">{t.body}</p>
        </div>

        <div>
          <figure data-reveal>
            <blockquote className="accent text-[clamp(1.75rem,1rem+2.7vw,3.5rem)] leading-[1.12]">
              “{t.secondQuote}”
            </blockquote>
            <figcaption className="mt-5 text-sm text-slate">Student evaluation, verbatim</figcaption>
          </figure>
          <details data-reveal className="mt-6 border-t border-rule">
            <summary className="flex min-h-[3rem] cursor-pointer items-center text-base font-medium underline decoration-amber decoration-2 underline-offset-4">
              One more quote
            </summary>
            <blockquote className="max-w-prose pb-4 text-lg">“{t.quote}”</blockquote>
          </details>
          <p data-reveal className="mt-10 max-w-prose border-l-2 border-amber pl-5 text-lg">
            <span className="font-semibold">Why it’s here.</span> {t.why}
          </p>
        </div>
      </div>
    </Section>
  )
}
