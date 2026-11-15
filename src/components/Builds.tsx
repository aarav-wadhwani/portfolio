import { alsoBuilt, builds, earlierWork } from '../content/site'
import Section from './Section'
import Slot from './Slot'

/** Things built outside a job, then earlier roles as compact rows. */
export default function Builds() {
  return (
    <Section
      id="builds"
      index="04"
      tone="panel"
      title={
        <>
          Bu<span className="accent">ilds</span>
        </>
      }
      aside={<p>Things I started or built outside of a job.</p>}
    >
      <div className="grid gap-8 md:grid-cols-2 md:gap-10">
        {builds.map((b, i) => (
          <article key={b.name} data-reveal style={{ ['--d' as string]: i }} className="group flex flex-col">
            {b.figure ? (
              <div className="zoom rounded-3xl">
                <img
                  src={b.figure.src}
                  alt={b.figure.alt}
                  width={b.figure.width}
                  height={b.figure.height}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full rounded-3xl object-cover"
                />
              </div>
            ) : b.slot ? (
              <Slot slot={b.slot} className="aspect-[4/3] rounded-3xl" />
            ) : null}
            <div className="mt-6 flex items-baseline justify-between gap-4 border-t border-ink pt-4">
              <h3 className="text-[clamp(1.5rem,1.1rem+1.6vw,2.5rem)] font-semibold leading-tight tracking-tight">{b.name}</h3>
              <span className="num text-sm text-slate">0{i + 1}</span>
            </div>
            <p className="mt-1 text-sm text-slate">{b.role}</p>
            <p className="mt-4 text-lg">{b.body}</p>
            {b.stack && <p className="mt-3 text-sm text-slate">{b.stack}</p>}
            {b.link && (
              <p className="mt-auto pt-5">
                <a href={b.link.href} className="link text-lg font-medium" target="_blank" rel="noopener noreferrer">
                  {b.link.label}
                </a>
              </p>
            )}
          </article>
        ))}
      </div>

      <p data-reveal className="mt-10 text-base text-slate">
        Also built:{' '}
        {alsoBuilt.map((a, i) => (
          <span key={a.name}>
            <span className="font-medium text-ink">{a.name}</span>. {a.body}
            {i < alsoBuilt.length - 1 ? ' ' : ''}
          </span>
        ))}
      </p>

      <h3 data-reveal className="mt-20 text-2xl font-semibold tracking-tight md:text-3xl">
        Earlier work
      </h3>
      <ul className="mt-6 border-t border-ink">
        {earlierWork.map((w) => (
          <li
            key={w.org}
            data-reveal
            className="grid gap-x-10 gap-y-2 border-b border-rule py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]"
          >
            <p>
              <span className="text-xl font-semibold tracking-tight md:text-2xl">{w.org}</span>
              <span className="mt-1 block text-sm text-slate">
                {w.role} · {w.dates}
              </span>
            </p>
            {w.body && <p className="text-lg">{w.body}</p>}
          </li>
        ))}
      </ul>
    </Section>
  )
}
