/**
 * Scroll position expressed in sections, read every frame by the scene and HUD.
 * Kept outside React so scrolling never triggers a re-render.
 *
 * `position` is a section float: 0.5 means the viewport centre sits at the
 * middle of the first section (the hero), 1.5 the middle of the second, etc.
 */

type Listener = () => void

let position = 0.5
const listeners = new Set<Listener>()

export const scrollState = {
  get(): number {
    return position
  },
  set(next: number): void {
    if (next === position) return
    position = next
    listeners.forEach((listener) => listener())
  },
  subscribe(listener: Listener): () => void {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
}
