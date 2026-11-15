import { about, positioning, skills } from '../content/site'
import Section from './Section'

export default function About() {
  return (
    <Section id="about" title="About">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div className="max-w-prose space-y-4 text-base md:text-md">
          <img
            src={positioning.headshot.src}
            alt={positioning.headshot.alt}
            width={640}
            height={640}
            loading="lazy"
            decoding="async"
            className="h-24 w-24 rounded-lg border border-rule object-cover md:hidden"
          />
          <p>{about.body}</p>
          <p>{about.next}</p>
        </div>
        <dl className="border-t border-rule">
          {about.education.map((e) => (
            <div key={e.label} className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-4 border-b border-rule py-3">
              <dt className="text-sm text-slate">{e.label}</dt>
              <dd className="text-base">{e.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <h3 className="mt-12 text-lg font-semibold">Skills</h3>
      <dl className="mt-3 grid gap-x-8 gap-y-6 md:grid-cols-3">
        {skills.map((s) => (
          <div key={s.group} className="border-t-2 border-ink pt-3">
            <dt className="text-base font-semibold">{s.group}</dt>
            <dd className="mt-2 text-sm text-slate">{s.items}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
