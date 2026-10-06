import { useMemo } from 'react'
import { CAMERA_FOV, poseAt, progressAt } from '../lib/choreography'
import { axisSegments, BASE, edgeFade, LINE_OPACITY, MARKER_RADIUS } from '../lib/figure'
import { DESCENT_PATH, EXTENT, loss, pointAt, sigmaAt, TOTAL_STEPS } from '../lib/landscape'
import { createProjector, projectedSize } from '../lib/projection'
import { useViewportSize } from '../hooks/useViewportSize'

interface PosterProps {
  compact: boolean
}

/** The poster shows the opening composition: the hero's camera and step 0. */
const POSITION = 0.5
/** Vertices per side. Coarser than the WebGL surface; at poster scale the difference doesn't read. */
const RESOLUTION = 40
const TRAIL_STRIDE = 4

const fmt = (n: number) => n.toFixed(1)

/**
 * Hidden-line drawing by the painter's algorithm: each grid cell is a
 * paper-filled quad, drawn far to near, so nearer cells cover the lines
 * behind them exactly as the depth buffer does in the WebGL scene.
 */
function draw(width: number, height: number, compact: boolean) {
  const pose = poseAt(POSITION, compact)
  const progress = progressAt(POSITION)
  const sigma = sigmaAt(progress)
  const project = createProjector(pose, CAMERA_FOV, width, height)
  const coord = (i: number) => -EXTENT + (2 * EXTENT * i) / (RESOLUTION - 1)

  const grid = Array.from({ length: RESOLUTION }, (_, row) =>
    Array.from({ length: RESOLUTION }, (_, col) => {
      const x = coord(col)
      const z = coord(row)
      return { ...project([x, loss(x, z, sigma), z]), fade: edgeFade(x, z) }
    }),
  )

  const cells = []
  for (let row = 0; row < RESOLUTION - 1; row++) {
    for (let col = 0; col < RESOLUTION - 1; col++) {
      const corners = [grid[row][col], grid[row][col + 1], grid[row + 1][col + 1], grid[row + 1][col]]
      const depth = corners.reduce((sum, p) => sum + p.depth, 0) / 4
      const fade = corners.reduce((sum, p) => sum + p.fade, 0) / 4
      const d = `M${corners.map((p) => `${fmt(p.x)} ${fmt(p.y)}`).join('L')}Z`
      cells.push({ d, depth, ink: Math.round(LINE_OPACITY * fade * 100) })
    }
  }
  cells.sort((a, b) => b.depth - a.depth)

  const axes = axisSegments()
    .map(([a, b]) => {
      const p = project(a)
      const q = project(b)
      return `M${fmt(p.x)} ${fmt(p.y)}L${fmt(q.x)} ${fmt(q.y)}`
    })
    .join('')

  const trail: string[] = []
  for (let i = 0; i <= progress * TOTAL_STEPS; i += TRAIL_STRIDE) {
    const x = DESCENT_PATH[i * 2]
    const z = DESCENT_PATH[i * 2 + 1]
    const p = project([x, loss(x, z, sigma), z])
    trail.push(`${fmt(p.x)} ${fmt(p.y)}`)
  }

  const { x, z } = pointAt(progress)
  const y = loss(x, z, sigma)
  const marker = project([x, y + MARKER_RADIUS, z])
  const surfacePoint = project([x, y, z])
  const basePoint = project([x, BASE, z])

  return {
    cells,
    axes,
    trail: trail.length > 1 ? `M${trail.join('L')}` : null,
    marker: { x: marker.x, y: marker.y, r: projectedSize(MARKER_RADIUS, marker.depth, CAMERA_FOV, height) },
    drop: `M${fmt(surfacePoint.x)} ${fmt(surfacePoint.y)}L${fmt(basePoint.x)} ${fmt(basePoint.y)}`,
  }
}

/**
 * A static drawing of the scene's opening frame, computed from the same loss
 * surface and camera choreography as the WebGL version. Used without WebGL,
 * on low-end devices, and for visitors who prefer reduced motion.
 */
export function Poster({ compact }: PosterProps) {
  const { width, height } = useViewportSize()
  const figure = useMemo(() => draw(width, height, compact), [width, height, compact])

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} strokeWidth={1} fill="none">
      <path d={figure.axes} stroke="color-mix(in srgb, var(--ink) 35%, var(--paper))" />
      {figure.cells.map((cell, i) => (
        <path
          key={i}
          d={cell.d}
          fill="var(--paper)"
          stroke={`color-mix(in srgb, var(--ink) ${cell.ink}%, var(--paper))`}
          strokeLinejoin="round"
        />
      ))}
      {figure.trail && <path d={figure.trail} stroke="var(--accent)" strokeWidth={2} />}
      <path d={figure.drop} stroke="color-mix(in srgb, var(--ink) 50%, var(--paper))" />
      <circle cx={figure.marker.x} cy={figure.marker.y} r={figure.marker.r} fill="var(--accent)" />
    </svg>
  )
}
