import type { ReactNode } from 'react'

const tones = {
  paper: 'bg-paper text-ink',
  panel: 'bg-panel text-ink',
  ink: 'bg-ink text-paper',
}

/** Shared section shell: an index number, an oversized heading, one rhythm. */
export default function Section({
  id,
  index,
  title,
  aside,
  tone = 'paper',
  children,
}: {
  id: string
  index: string
  title: ReactNode
  aside?: ReactNode
  tone?: keyof typeof tones
  children: ReactNode
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={tones[tone]}>
      <div className="mx-auto max-w-wide px-5 py-20 md:px-10 md:py-28">
        <div data-reveal className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] md:items-end">
          <div>
            <p className={`num text-sm ${tone === 'ink' ? 'text-mist' : 'text-slate'}`}>({index})</p>
            <h2 id={`${id}-heading`} className="mt-3 text-h2 font-semibold">
              {title}
            </h2>
          </div>
          {aside && <div className={`text-base md:text-lg ${tone === 'ink' ? 'text-mist' : 'text-slate'}`}>{aside}</div>}
        </div>
        <div className="mt-12 md:mt-16">{children}</div>
      </div>
    </section>
  )
}
