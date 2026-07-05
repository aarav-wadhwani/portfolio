/**
 * Fixed schematic grid + a whisper of grain over the graphite ground.
 * Pure flat #0A0A0B reads slightly cheap; ~2.5% noise reads like paper texture.
 */
const NOISE_URI = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0'/></filter><rect width='240' height='240' filter='url(%23n)'/></svg>`,
)}")`

export default function GridBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      {/* schematic grid, tinted with the live-signal blue: fine 24px minor
          lines plus a coarser 96px major grid for depth */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(59,130,246,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.055) 1px, transparent 1px), linear-gradient(rgba(59,130,246,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.09) 1px, transparent 1px)',
          backgroundSize: '24px 24px, 24px 24px, 96px 96px, 96px 96px',
        }}
      />
      {/* grain */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: NOISE_URI, backgroundSize: '240px 240px' }}
      />
    </div>
  )
}
