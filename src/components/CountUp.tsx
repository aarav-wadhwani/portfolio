/**
 * A headline figure such as "8.91 mm" or "71%". It rises out of a mask when
 * it scrolls into view. It deliberately does not count up from zero: every
 * frame of this site should show the true value, never an intermediate one.
 */
export default function CountUp({ value, className = '' }: { value: string; className?: string }) {
  return (
    <span data-reveal="rise" className={`inline-block ${className}`}>
      {value}
    </span>
  )
}
