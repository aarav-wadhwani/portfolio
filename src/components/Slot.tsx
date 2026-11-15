import type { AssetSlot } from '../content/site'

/** A clearly labeled empty slot for an asset that has not been supplied yet. */
export default function Slot({ slot, className = '' }: { slot: AssetSlot; className?: string }) {
  return (
    <div
      data-placeholder
      className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate/40 bg-paper px-5 py-8 text-center ${className}`}
    >
      <p className="text-sm font-medium text-ink">{slot.label}</p>
      <p className="mt-1 text-xs text-slate">{slot.detail}</p>
    </div>
  )
}
