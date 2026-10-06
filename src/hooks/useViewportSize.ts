import { useSyncExternalStore } from 'react'

function subscribe(onChange: () => void) {
  window.addEventListener('resize', onChange)
  return () => window.removeEventListener('resize', onChange)
}

// A string snapshot is a stable primitive, so unchanged sizes don't re-render.
const snapshot = () => `${document.documentElement.clientWidth}x${window.innerHeight}`

/** Size of the layout viewport (the area a `position: fixed; inset: 0` box fills). */
export function useViewportSize(): { width: number; height: number } {
  const [width, height] = useSyncExternalStore(subscribe, snapshot).split('x').map(Number)
  return { width, height }
}
