import { useEffect, useMemo, useRef } from 'react'
import { BufferAttribute, BufferGeometry, DoubleSide, type Color, type LineSegments, type Mesh } from 'three'
import { edgeFade, LINE_OPACITY } from '../lib/figure'
import { EXTENT, loss, sigmaAt } from '../lib/landscape'
import { useTrainingFrame } from './useTrainingFrame'

interface SurfaceProps {
  /** Vertices per side. */
  resolution: number
  ink: Color
  paper: Color
}

function coord(i: number, resolution: number): number {
  return -EXTENT + (2 * EXTENT * i) / (resolution - 1)
}

/**
 * Two geometries share one position buffer: a paper-coloured mesh that hides
 * lines behind it, and the grid lines themselves. Heights are rewritten on
 * the CPU whenever σ changes, which is at most ~7k evaluations of a few sines.
 */
function buildSurface(resolution: number, ink: Color) {
  const count = resolution * resolution
  const positions = new BufferAttribute(new Float32Array(count * 3), 3)
  const colors = new Float32Array(count * 4)

  for (let row = 0; row < resolution; row++) {
    for (let col = 0; col < resolution; col++) {
      const v = row * resolution + col
      const x = coord(col, resolution)
      const z = coord(row, resolution)
      positions.setXYZ(v, x, 0, z)
      // Fade toward the edges so the surface reads as a window onto a larger landscape.
      colors.set([ink.r, ink.g, ink.b, LINE_OPACITY * edgeFade(x, z)], v * 4)
    }
  }

  const segments: number[] = []
  const triangles: number[] = []
  for (let row = 0; row < resolution; row++) {
    for (let col = 0; col < resolution; col++) {
      const v = row * resolution + col
      if (col < resolution - 1) segments.push(v, v + 1)
      if (row < resolution - 1) segments.push(v, v + resolution)
      if (col < resolution - 1 && row < resolution - 1) {
        triangles.push(v, v + resolution, v + 1, v + 1, v + resolution, v + resolution + 1)
      }
    }
  }

  const lines = new BufferGeometry()
  lines.setAttribute('position', positions)
  lines.setAttribute('color', new BufferAttribute(colors, 4))
  lines.setIndex(segments)

  const faces = new BufferGeometry()
  faces.setAttribute('position', positions)
  faces.setIndex(triangles)

  return { lines, faces }
}

export function Surface({ resolution, ink, paper }: SurfaceProps) {
  const surface = useMemo(() => buildSurface(resolution, ink), [resolution, ink])

  useEffect(
    () => () => {
      surface.lines.dispose()
      surface.faces.dispose()
    },
    [surface],
  )

  const faces = useRef<Mesh>(null)
  const lines = useRef<LineSegments>(null)

  useTrainingFrame((progress) => {
    if (!faces.current || !lines.current) return
    const sigma = sigmaAt(progress)
    const positions = lines.current.geometry.getAttribute('position') as BufferAttribute
    for (let v = 0; v < positions.count; v++) {
      positions.setY(v, loss(positions.getX(v), positions.getZ(v), sigma))
    }
    positions.needsUpdate = true
    lines.current.geometry.computeBoundingSphere()
    faces.current.geometry.computeBoundingSphere()
  })

  return (
    <group>
      <mesh ref={faces} geometry={surface.faces}>
        <meshBasicMaterial color={paper} side={DoubleSide} polygonOffset polygonOffsetFactor={1} polygonOffsetUnits={1} />
      </mesh>
      <lineSegments ref={lines} geometry={surface.lines}>
        <lineBasicMaterial vertexColors transparent depthWrite={false} />
      </lineSegments>
    </group>
  )
}
