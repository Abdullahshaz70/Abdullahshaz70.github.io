import { useEffect, useMemo, useRef, type ComponentRef } from 'react'
import { Line } from '@react-three/drei'
import { BufferAttribute, BufferGeometry, type Color, type InterleavedBufferAttribute, type LineSegments, type Mesh } from 'three'
import { axisSegments, BASE, MARKER_RADIUS } from '../lib/figure'
import { DESCENT_PATH, loss, pointAt, sigmaAt, TOTAL_STEPS } from '../lib/landscape'
import { useTrainingFrame } from './useTrainingFrame'

interface DescentProps {
  ink: Color
  accent: Color
}

const TRAIL_LIFT = 0.025

function buildAxes(): BufferGeometry {
  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(new Float32Array(axisSegments().flat(2)), 3))
  return geometry
}

function buildDropline(): BufferGeometry {
  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(new Float32Array(6), 3))
  return geometry
}

/** Flat x,y,z list for drei's Line. y is overwritten on every update. */
function buildTrailPoints(): number[] {
  const points: number[] = []
  for (let i = 0; i <= TOTAL_STEPS; i++) points.push(DESCENT_PATH[i * 2], 0, DESCENT_PATH[i * 2 + 1])
  return points
}

/** The optimiser: a marker on the surface, its trail so far, and a dropline to the base. */
export function Descent({ ink, accent }: DescentProps) {
  const trail = useRef<ComponentRef<typeof Line>>(null)
  const marker = useRef<Mesh>(null)
  const dropline = useRef<LineSegments>(null)
  const axes = useMemo(() => buildAxes(), [])
  const drop = useMemo(() => buildDropline(), [])
  const trailPoints = useMemo(() => buildTrailPoints(), [])

  useEffect(
    () => () => {
      axes.dispose()
      drop.dispose()
    },
    [axes, drop],
  )

  useTrainingFrame((progress) => {
    const sigma = sigmaAt(progress)
    const { x, z } = pointAt(progress)
    const y = loss(x, z, sigma)

    marker.current?.position.set(x, y + MARKER_RADIUS, z)

    if (dropline.current) {
      const ends = dropline.current.geometry.getAttribute('position') as BufferAttribute
      ends.setXYZ(0, x, y, z)
      ends.setXYZ(1, x, BASE, z)
      ends.needsUpdate = true
    }

    const line = trail.current
    if (!line) return
    // LineGeometry keeps one [start, end] pair per segment in a shared interleaved
    // buffer. Writing heights in place avoids reallocating GPU buffers per frame.
    const { data } = line.geometry.getAttribute('instanceStart') as InterleavedBufferAttribute
    const segments = data.array as Float32Array
    for (let o = 0; o < segments.length; o += 6) {
      segments[o + 1] = loss(segments[o], segments[o + 2], sigma) + TRAIL_LIFT
      segments[o + 4] = loss(segments[o + 3], segments[o + 5], sigma) + TRAIL_LIFT
    }
    data.needsUpdate = true
    line.geometry.instanceCount = Math.floor(progress * TOTAL_STEPS)
  })

  return (
    <group>
      <Line ref={trail} points={trailPoints} color={accent} lineWidth={2} />
      <mesh ref={marker}>
        <sphereGeometry args={[MARKER_RADIUS, 20, 12]} />
        <meshBasicMaterial color={accent} />
      </mesh>
      <lineSegments ref={dropline} geometry={drop}>
        <lineBasicMaterial color={ink} transparent opacity={0.5} />
      </lineSegments>
      <lineSegments geometry={axes}>
        <lineBasicMaterial color={ink} transparent opacity={0.35} />
      </lineSegments>
    </group>
  )
}
