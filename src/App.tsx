import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Ledger from './components/Ledger'
import HowIWork from './components/HowIWork'
import Research from './components/Research'
import Builds from './components/Builds'
import Teaching from './components/Teaching'
import About from './components/About'
import Contact from './components/Contact'
import { usePageMotion } from './lib/motion'

/* All content is in the prerendered HTML. Motion is layered on top by the
   `motion` class, which is only set when JavaScript runs and the visitor has
   not asked for reduced motion. */
export default function App() {
  usePageMotion()
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-panel"
      >
        Skip to content
      </a>
      <div aria-hidden className="progress fixed inset-x-0 top-0 z-50 h-[3px] bg-amber" />
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <Ledger />
        <HowIWork />
        <Research />
        <Builds />
        <Teaching />
        <About />
        <Contact />
      </main>
    </>
  )
}
