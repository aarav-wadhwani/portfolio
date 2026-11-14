import Nav from './components/Nav'
import Hero from './components/Hero'
import HowIWork from './components/HowIWork'
import Research from './components/Research'
import Builds from './components/Builds'
import Teaching from './components/Teaching'
import About from './components/About'
import Contact from './components/Contact'

/* Deliberately quiet: no loader, no custom cursor, no scroll-triggered
   reveals. All content is in the prerendered HTML at first paint. */
export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-panel"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
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
