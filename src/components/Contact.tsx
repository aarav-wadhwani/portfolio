import { useEffect, useRef, useState } from 'react'
import { contact, links, positioning } from '../content/site'
import Magnetic from './Magnetic'

/** The close: an amber band with one sentence and one address, over a giant name. */
export default function Contact() {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number>()
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(links.email)
      setCopied(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 2500)
    } catch {
      window.location.href = `mailto:${links.email}`
    }
  }

  return (
    <>
      <section id="contact" aria-labelledby="contact-heading" className="on-amber bg-amber text-ink">
        <div className="mx-auto max-w-wide px-5 py-20 md:px-10 md:py-28">
          <p className="num text-sm">(07)</p>
          <h2 id="contact-heading" data-reveal className="mt-3 max-w-[18ch] text-balance text-h2 font-semibold">
            {contact.heading}
          </h2>
          <p data-reveal className="mt-10 md:mt-14">
            <a
              href={`mailto:${links.email}`}
              className="accent break-all text-[clamp(2rem,1rem+5.4vw,6rem)] leading-none underline decoration-ink decoration-2 underline-offset-[0.14em] hover:decoration-4"
            >
              {links.email}
            </a>
          </p>
          <div data-reveal className="mt-10 flex flex-wrap gap-3">
            <button type="button" onClick={copy} className="js-only btn btn-ink">
              {copied ? 'Copied' : 'Copy email'}
            </button>
            <Magnetic href={links.resume} className="btn btn-outline-ink">
              Resume (PDF)
            </Magnetic>
            <Magnetic href={links.linkedin} className="btn btn-outline-ink" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </Magnetic>
            <Magnetic href={links.github} className="btn btn-outline-ink" target="_blank" rel="noopener noreferrer">
              GitHub
            </Magnetic>
          </div>
          <p aria-live="polite" className="sr-only">
            {copied ? 'Email address copied to clipboard' : ''}
          </p>
        </div>
      </section>
      <footer className="overflow-hidden bg-ink text-paper">
        <div className="mx-auto max-w-wide px-5 pt-10 md:px-10">
          <div className="flex flex-wrap justify-between gap-2 text-sm text-mist">
            <p>© 2026 {positioning.name}</p>
            <p>Last updated {contact.updated}</p>
          </div>
          <p aria-hidden className="mt-6 select-none whitespace-nowrap text-center text-mega font-semibold leading-none md:mt-10">
            <span className="block translate-y-[0.13em]">
              Aarav <span className="accent text-amber">Wadhwani</span>
            </span>
          </p>
        </div>
      </footer>
    </>
  )
}
