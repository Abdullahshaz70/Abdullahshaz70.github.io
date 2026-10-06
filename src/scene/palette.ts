import { Color } from 'three'

export interface Palette {
  paper: Color
  ink: Color
  accent: Color
}

/** Reads the CSS custom properties so the canvas and the page share one palette. */
export function readPalette(): Palette {
  const style = getComputedStyle(document.documentElement)
  const read = (name: string) => new Color(style.getPropertyValue(name).trim())
  return { paper: read('--paper'), ink: read('--ink'), accent: read('--accent') }
}
