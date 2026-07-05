import { useEffect, useState } from 'react'
import Loader from './components/Loader'
import GridBackground from './components/GridBackground'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import SignalTrace from './components/SignalTrace'
import Hero from './components/Hero'
import Legend from './components/Legend'
import ComponentBoards from './components/ComponentBoards'
import PowerRail from './components/PowerRail'
import PartsList from './components/PartsList'
import OutputTerminal from './components/OutputTerminal'

/* No audio anywhere on this site — intentional. A portfolio gets opened at
   recruiters' desks; autoplay sound is a bigger risk than reward. */

export default function App() {
  // The loader plays once per browser session; afterwards the hero starts immediately.
  const [firstVisit] = useState(() => {
    try {
      return sessionStorage.getItem('aw-signal-lock') === null
    } catch {
      return true
    }
  })
  const [ready, setReady] = useState(!firstVisit)

  useEffect(() => {
    if (firstVisit) {
      try {
        sessionStorage.setItem('aw-signal-lock', '1')
      } catch {
        /* private mode — loader will simply replay next visit */
      }
    }
  }, [firstVisit])

  return (
    <>
      {firstVisit && <Loader onDone={() => setReady(true)} />}
      <GridBackground />
      <CustomCursor />
      <ScrollProgress />
      <main className="relative">
        <SignalTrace />
        <div id="site-content" className="relative z-10">
          <Hero ready={ready} />
          <Legend />
          <ComponentBoards />
          <PowerRail />
          <PartsList />
          <OutputTerminal />
        </div>
      </main>
    </>
  )
}
