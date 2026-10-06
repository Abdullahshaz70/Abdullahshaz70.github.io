import { useLayoutEffect } from 'react'
import { scrollState } from '../lib/scrollState'

/**
 * Converts window scroll into a section float (see scrollState) by locating
 * the viewport centre among the given sections. Measured in a layout effect,
 * so the position is correct before first paint (including a restored scroll
 * position on reload), and re-measured whenever the document resizes or the
 * web fonts finish loading.
 */
export function useScrollTracking(sectionIds: readonly string[]): void {
  useLayoutEffect(() => {
    let active = true
    let bounds: { top: number; height: number }[] = []

    const measure = () => {
      bounds = sectionIds.flatMap((id) => {
        const el = document.getElementById(id)
        if (!el) return []
        const rect = el.getBoundingClientRect()
        return [{ top: rect.top + window.scrollY, height: rect.height }]
      })
      update()
    }

    const update = () => {
      const centre = window.scrollY + window.innerHeight / 2
      let position = 0
      for (let i = 0; i < bounds.length; i++) {
        const { top, height } = bounds[i]
        if (centre < top + height || i === bounds.length - 1) {
          position = i + Math.min(Math.max((centre - top) / height, 0), 1)
          break
        }
      }
      scrollState.set(position)
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(document.body)
    document.fonts.ready.then(() => active && measure())
    window.addEventListener('scroll', update, { passive: true })
    return () => {
      active = false
      observer.disconnect()
      window.removeEventListener('scroll', update)
    }
  }, [sectionIds])
}
