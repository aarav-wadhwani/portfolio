import { links, positioning, proof } from '../content/site'
import Ledger from './Ledger'

/** Above the fold: who I am, what I ship, how to reach me, and the ledger. */
export default function Hero() {
  return (
    <div id="top" className="mx-auto max-w-page px-6 pb-14 pt-5 md:pb-20 md:pt-10">
      <div className="grid items-start gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:gap-8 lg:gap-12">
        <div>
          <h1 className="max-w-[22ch] text-balance text-hero font-semibold">
            <span className="sr-only">{positioning.name}: </span>
            {positioning.headline}
          </h1>
          <p className="mt-3 max-w-prose text-base leading-normal text-slate md:mt-4 md:text-md md:leading-relaxed">{positioning.supporting}</p>
          <div className="mt-4 flex flex-wrap gap-3 md:mt-5">
            <a href={links.resume} className="btn btn-primary">
              Resume
            </a>
            <a href={`mailto:${links.email}`} className="btn btn-secondary">
              Email
            </a>
            <a href={links.linkedin} className="btn btn-secondary" rel="noopener noreferrer" target="_blank">
              LinkedIn
            </a>
          </div>
        </div>
        <img
          src={positioning.headshot.src}
          alt={positioning.headshot.alt}
          width={640}
          height={640}
          {...{ fetchpriority: 'high' }}
          className="hidden rounded-lg border border-rule object-cover md:block md:h-36 md:w-36 lg:h-52 lg:w-52"
        />
      </div>

      <Ledger />

      <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate">
        {proof.map((p) => (
          <li key={p} className="flex items-center gap-2">
            <span aria-hidden className="h-1 w-1 rounded-full bg-slate" />
            {p}
          </li>
        ))}
      </ul>
    </div>
  )
}
