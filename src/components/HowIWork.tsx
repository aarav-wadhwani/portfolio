import { howIWork } from '../content/site'
import Section from './Section'

/** The forward deployed loop, four ordered steps, one line of evidence each. */
export default function HowIWork() {
  return (
    <Section
      id="how"
      title="How I work"
      lede="The same four steps, whether the team is a trading desk or a deal team."
    >
      <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {howIWork.map((step, i) => (
          <li key={step.title} className="border-t-2 border-ink pt-4">
            <p className="num text-sm text-slate" aria-hidden>
              0{i + 1}
            </p>
            <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
            <p className="mt-2 text-base">{step.body}</p>
            <p className="mt-4 border-l-2 border-amber pl-3 text-sm text-slate">{step.evidence}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
