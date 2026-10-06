import Lenis from 'lenis'

/**
 * A single Lenis instance for the page. Module-level rather than React state
 * because nothing needs to re-render when it starts or stops.
 */
let lenis: Lenis | null = null

export function startSmoothScroll(): () => void {
  lenis = new Lenis({ autoRaf: true, lerp: 0.12, anchors: true })
  return () => {
    lenis?.destroy()
    lenis = null
  }
}

/** Freeze page scrolling, e.g. while a modal is open. No-op without Lenis. */
export function pauseSmoothScroll(): void {
  lenis?.stop()
}

export function resumeSmoothScroll(): void {
  lenis?.start()
}
