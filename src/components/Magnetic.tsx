import { useRef, type AnchorHTMLAttributes } from 'react'
import { useMagnetic } from '../lib/motion'

/** A link that leans toward the pointer. Behaves like a plain link otherwise. */
export default function Magnetic(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const ref = useRef<HTMLAnchorElement>(null)
  useMagnetic(ref)
  return <a ref={ref} {...props} />
}
