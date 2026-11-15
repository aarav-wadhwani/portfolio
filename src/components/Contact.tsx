import { useEffect, useRef, useState } from 'react'
import { contact, links, positioning } from '../content/site'

/** Contact: one sentence on what I want, then every way to reach me. */
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
      <section id="contact" aria-labelledby="contact-heading" className="border-t border-rule bg-panel">
        <div className="mx-auto max-w-page px-6 py-14 md:py-20">
          <h2 id="contact-heading" className="max-w-[26ch] text-balance text-2xl font-semibold md:text-3xl">
            {contact.heading}
          </h2>
          <p className="mt-5 text-lg">
            <a href={`mailto:${links.email}`} className="link font-medium">
              {links.email}
            </a>
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={copy} className="js-only btn btn-primary">
              {copied ? 'Copied' : 'Copy email'}
            </button>
            <a href={links.resume} className="btn btn-secondary">
              Resume (PDF)
            </a>
            <a href={links.linkedin} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={links.github} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
          <p aria-live="polite" className="sr-only">
            {copied ? 'Email address copied to clipboard' : ''}
          </p>
        </div>
      </section>
      <footer className="border-t border-rule">
        <div className="mx-auto flex max-w-page flex-wrap justify-between gap-2 px-6 py-6 text-sm text-slate">
          <p>© 2026 {positioning.name}</p>
          <p>
            Last updated {contact.updated}
          </p>
        </div>
      </footer>
    </>
  )
}
