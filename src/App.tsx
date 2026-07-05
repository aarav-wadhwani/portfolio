import { useEffect, useState } from 'react'
import Loader from './components/Loader'
import GridBackground from './components/GridBackground'
import ProbeField from './components/ProbeField'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import SignalTrace from './components/SignalTrace'
import Hero from './components/Hero'
import Legend from './components/Legend'
import ComponentBoards from './components/ComponentBoards'
import PowerRail from './components/PowerRail'
import PartsList from './components/PartsList'
import OutputTerminal from './components/OutputTerminal'

/* No audio anywhere on this site: intentional. A portfolio gets opened at
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
        /* private mode: loader will simply replay next visit */
      }
    }
  }, [firstVisit])

  return (
    <>
      {firstVisit && <Loader onDone={() => setReady(true)} />}
      <GridBackground />
      <ProbeField />
      <CustomCursor />
      <ScrollProgress />
      <main className="relative">
        <SignalTrace />
        {/* Order matters: bio directly under the name; the Power Rail (site
            index) next; skills right after the rail as the spec-sheet bridge
            into the boards, which follow in U1…U8 order. */}
        <div id="site-content" className="relative z-10">
          <Hero ready={ready} />
          <Legend />
          <PowerRail />
          <PartsList />
          <ComponentBoards />
          <OutputTerminal />
        </div>
      </main>
    </>
  )
}
