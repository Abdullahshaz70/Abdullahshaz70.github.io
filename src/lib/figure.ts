/**
 * Drawing constants shared by the WebGL scene and the static poster, so the
 * two render the same figure.
 */
import { EXTENT, MINIMUM } from './landscape'

/** Height of the axis frame below the surface. */
export const BASE = -0.6
export const MARKER_RADIUS = 0.11
/** Opacity of surface lines over paper, before the edge fade. */
export const LINE_OPACITY = 0.62

/** 1 in the middle of the surface, easing to 0 at its edges. */
export function edgeFade(x: number, z: number): number {
  const edge = Math.max(Math.abs(x), Math.abs(z)) / EXTENT
  return 1 - Math.min(Math.max((edge - 0.7) / 0.3, 0), 1) ** 2
}

/** Line segments of the axis frame: square base, unit ticks on two edges, and a cross at θ*. */
export function axisSegments(): [number, number, number][][] {
  const e = EXTENT
  const tick = 0.18
  const c = 0.2
  const segments: [number, number, number][][] = [
    [[-e, BASE, -e], [e, BASE, -e]],
    [[e, BASE, -e], [e, BASE, e]],
    [[e, BASE, e], [-e, BASE, e]],
    [[-e, BASE, e], [-e, BASE, -e]],
    [[MINIMUM.x - c, BASE, MINIMUM.z - c], [MINIMUM.x + c, BASE, MINIMUM.z + c]],
    [[MINIMUM.x - c, BASE, MINIMUM.z + c], [MINIMUM.x + c, BASE, MINIMUM.z - c]],
  ]
  for (let i = -e + 1; i < e; i++) {
    segments.push([[i, BASE, e], [i, BASE, e + tick]])
    segments.push([[e, BASE, i], [e + tick, BASE, i]])
  }
  return segments
}
