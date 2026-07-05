import { useEffect, useState } from 'react'
import { boards } from '../content/site'
import Board from './Board'

/**
 * The flagship project sections. All copy and assets live in
 * src/content/site.ts: a ready-to-duplicate TEMPLATE block for adding new
 * boards is at the bottom of the `boards` array there.
 */
export default function ComponentBoards() {
  // Hover-reveal annotations only make sense with a real pointer; on touch
  // the default view stays fully informative instead.
  const [showTooltips, setShowTooltips] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setShowTooltips(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return (
    <div aria-label="Selected projects">
      {boards.map((board, i) => (
        <Board key={board.id} board={board} index={i} showTooltips={showTooltips} />
      ))}
    </div>
  )
}
