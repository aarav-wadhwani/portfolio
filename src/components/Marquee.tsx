import { tape } from '../content/site'

/** A slow tape of real figures. Static and wrapped when motion is off. */
export default function Marquee() {
  const Run = ({ hidden }: { hidden?: boolean }) => (
    <ul aria-hidden={hidden ? 'true' : undefined} className="flex shrink-0 flex-wrap items-center md:flex-nowrap">
      {tape.map((t, i) => (
        <li key={t} className="flex items-center whitespace-nowrap">
          <span className={i % 2 ? 'accent text-2xl md:text-3xl' : 'text-xl font-medium md:text-2xl'}>{t}</span>
          <span aria-hidden className="mx-6 h-2 w-2 rounded-full bg-amber md:mx-9" />
        </li>
      ))}
    </ul>
  )
  return (
    <section aria-label="Highlights" className="marquee overflow-hidden bg-ink py-6 text-paper md:py-8">
      <div className="marquee-track px-5 md:px-0">
        <Run />
        <Run hidden />
      </div>
    </section>
  )
}
