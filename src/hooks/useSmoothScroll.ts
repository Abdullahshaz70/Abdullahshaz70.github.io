import { useEffect } from 'react'
import { startSmoothScroll } from '../lib/smoothScroll'

/** Enables Lenis smooth scrolling unless the visitor prefers reduced motion. */
export function useSmoothScroll(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) return
    return startSmoothScroll()
  }, [enabled])
}
