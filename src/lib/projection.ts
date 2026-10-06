/**
 * A pure-TypeScript stand-in for three's PerspectiveCamera with lookAt and
 * filmOffset, so the static poster can draw exactly what the WebGL camera
 * sees without loading three.js.
 */
import type { CameraPose } from './choreography'

type Vec3 = readonly [number, number, number]

const sub = (a: Vec3, b: Vec3): [number, number, number] => [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
const dot = (a: Vec3, b: Vec3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
const cross = (a: Vec3, b: Vec3): [number, number, number] => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
]
const normalize = (a: Vec3): [number, number, number] => {
  const l = Math.hypot(a[0], a[1], a[2])
  return [a[0] / l, a[1] / l, a[2] / l]
}

export interface Projected {
  /** Screen position in CSS pixels, origin top-left. */
  x: number
  y: number
  /** Distance along the view direction; larger is farther. */
  depth: number
}

export type Projector = (point: Vec3) => Projected

/**
 * Builds a projector for a pose and viewport. `shift` moves the image right by
 * that fraction of the width, matching the film offset set in CameraRig.
 */
export function createProjector(pose: CameraPose, fovDegrees: number, width: number, height: number): Projector {
  const forward = normalize(sub(pose.target, pose.camera))
  const right = normalize(cross(forward, [0, 1, 0]))
  const up = cross(right, forward)
  const tanHalf = Math.tan((fovDegrees * Math.PI) / 360)
  const aspect = width / height

  return (point) => {
    const v = sub(point, pose.camera)
    const depth = dot(v, forward)
    const ndcX = dot(v, right) / depth / (tanHalf * aspect) + 2 * pose.shift
    const ndcY = dot(v, up) / depth / tanHalf
    return { x: ((ndcX + 1) / 2) * width, y: ((1 - ndcY) / 2) * height, depth }
  }
}

/** Pixel size of a world-space length seen at `depth`. */
export function projectedSize(length: number, depth: number, fovDegrees: number, height: number): number {
  return (length / depth / Math.tan((fovDegrees * Math.PI) / 360)) * (height / 2)
}
