import { alsoBuilt, builds, earlierWork } from '../content/site'
import Section from './Section'
import Slot from './Slot'

/** Things built outside a job, then earlier roles as compact rows. */
export default function Builds() {
  return (
    <Section id="builds" title="Builds">
      <div className="grid gap-8 md:grid-cols-2">
        {builds.map((b) => (
          <article key={b.name} className="flex flex-col rounded-lg border border-rule bg-panel p-5 md:p-6">
            {b.figure ? (
              <img
                src={b.figure.src}
                alt={b.figure.alt}
                width={b.figure.width}
                height={b.figure.height}
                loading="lazy"
                decoding="async"
                className="aspect-[16/9] w-full rounded-md border border-rule object-cover"
              />
            ) : b.slot ? (
              <Slot slot={b.slot} className="aspect-[16/9]" />
            ) : null}
            <h3 className="mt-5 text-xl font-semibold">{b.name}</h3>
            <p className="mt-1 text-sm text-slate">{b.role}</p>
            <p className="mt-3 text-base">{b.body}</p>
            {b.stack && <p className="mt-3 text-sm text-slate">{b.stack}</p>}
            {b.link && (
              <p className="mt-auto pt-4">
                <a href={b.link.href} className="link font-medium" target="_blank" rel="noopener noreferrer">
                  {b.link.label}
                </a>
              </p>
            )}
          </article>
        ))}
      </div>

      <p className="mt-6 text-sm text-slate">
        Also built:{' '}
        {alsoBuilt.map((a, i) => (
          <span key={a.name}>
            <span className="font-medium text-ink">{a.name}</span>. {a.body}
            {i < alsoBuilt.length - 1 ? ' ' : ''}
          </span>
        ))}
      </p>

      <h3 className="mt-12 text-lg font-semibold">Earlier work</h3>
      <ul className="mt-3 border-t border-rule">
        {earlierWork.map((w) => (
          <li
            key={w.org}
            className="grid gap-x-8 gap-y-1 border-b border-rule py-4 md:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)]"
          >
            <p>
              <span className="font-semibold">{w.org}</span>
              <span className="block text-sm text-slate">
                {w.role} · <span className="num text-xs">{w.dates}</span>
              </span>
            </p>
            {w.body && <p className="text-base">{w.body}</p>}
          </li>
        ))}
      </ul>
    </Section>
  )
}
