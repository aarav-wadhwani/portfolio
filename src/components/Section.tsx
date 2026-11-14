import type { ReactNode } from 'react'

/** Shared section shell: one rhythm, one heading style, left aligned. */
export default function Section({
  id,
  title,
  lede,
  children,
}: {
  id: string
  title: string
  lede?: string
  children: ReactNode
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="border-t border-rule">
      <div className="mx-auto max-w-page px-6 py-14 md:py-20">
        <h2 id={`${id}-heading`} className="text-2xl font-semibold md:text-3xl">
          {title}
        </h2>
        {lede && <p className="mt-3 max-w-prose text-base text-slate md:text-md">{lede}</p>}
        <div className="mt-8 md:mt-10">{children}</div>
      </div>
    </section>
  )
}
