import { about, positioning, skills } from '../content/site'
import Section from './Section'

export default function About() {
  return (
    <Section
      id="about"
      index="06"
      tone="panel"
      title={
        <>
          Ab<span className="accent">out</span>
        </>
      }
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:gap-20">
        <div data-reveal className="zoom w-40 rounded-3xl lg:w-full">
          <img
            src={positioning.headshot.src}
            alt={positioning.headshot.alt}
            width={640}
            height={640}
            loading="lazy"
            decoding="async"
            className="aspect-square w-full rounded-3xl object-cover"
          />
        </div>
        <div>
          <p data-reveal className="text-[clamp(1.5rem,1rem+1.9vw,2.75rem)] font-medium leading-[1.15] tracking-tight">
            {about.body}
          </p>
          <p data-reveal className="mt-6 max-w-prose text-lg text-slate">
            {about.next}
          </p>
          <dl data-reveal className="mt-10 grid gap-x-10 border-t border-ink sm:grid-cols-2">
            {about.education.map((e) => (
              <div key={e.label} className="border-b border-rule py-4">
                <dt className="text-sm text-slate">{e.label}</dt>
                <dd className="mt-1 text-lg">{e.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <h3 data-reveal className="mt-20 text-2xl font-semibold tracking-tight md:text-3xl">
        Skills
      </h3>
      <dl className="mt-6 grid gap-x-10 gap-y-8 md:grid-cols-3">
        {skills.map((s, i) => (
          <div key={s.group} data-reveal style={{ ['--d' as string]: i }} className="border-t border-ink pt-4">
            <dt className="text-xl font-semibold tracking-tight">{s.group}</dt>
            <dd className="mt-3 text-base text-slate">{s.items}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
