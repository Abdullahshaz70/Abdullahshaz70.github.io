/**
 * One keyframe per page section: where the camera sits and how far training
 * has progressed. Camera moves are eased so it settles while a section is in
 * view; training progress is linear so the step counter tracks scroll evenly.
 */
import { clamp, lerp, loss, pointAt, sigmaAt, TOTAL_STEPS } from './landscape'

type Vec3 = readonly [number, number, number]

interface Keyframe {
  camera: Vec3
  target: Vec3
  /** Training progress, 0 → 1. */
  progress: number
  /** Horizontal framing offset as a fraction of viewport width (desktop only). */
  shift: number
}

const KEYFRAMES: readonly Keyframe[] = [
  { camera: [16, 12, 18], target: [0, 0.6, 0], progress: 0, shift: 0.25 }, // hero
  { camera: [22, 8, 6], target: [-0.5, 0.8, 0.5], progress: 0.18, shift: 0.25 }, // about
  { camera: [10, 15, -17], target: [0, 0.5, 0], progress: 0.4, shift: 0.24 }, // work
  { camera: [-18, 11, -10], target: [0.5, 0.4, -0.5], progress: 0.62, shift: 0.22 }, // contests
  { camera: [-13, 18, 12], target: [1, 0.2, -0.5], progress: 0.82, shift: 0.24 }, // stack
  { camera: [5, 21, 13], target: [1.4, 0, -1.1], progress: 1, shift: 0.27 }, // contact
]

export interface CameraPose {
  camera: [number, number, number]
  target: [number, number, number]
  /** Horizontal framing offset as a fraction of viewport width. */
  shift: number
}

/** Vertical field of view in degrees, shared by the WebGL camera and the poster. */
export const CAMERA_FOV = 30

/** Narrow screens: the figure sits behind the text, centred and pulled back to fit. */
const COMPACT_PULLBACK = 2.3

function smootherstep(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10)
}

function locate(position: number): { a: Keyframe; b: Keyframe; t: number } {
  const u = clamp(position - 0.5, 0, KEYFRAMES.length - 1)
  const i = Math.min(Math.floor(u), KEYFRAMES.length - 2)
  return { a: KEYFRAMES[i], b: KEYFRAMES[i + 1], t: u - i }
}

const mix = (a: Vec3, b: Vec3, t: number): [number, number, number] => [
  lerp(a[0], b[0], t),
  lerp(a[1], b[1], t),
  lerp(a[2], b[2], t),
]

/**
 * Camera pose for a section float, framed for the layout. The WebGL camera
 * and the static poster both use this, so they always show the same composition.
 */
export function poseAt(position: number, compact: boolean): CameraPose {
  const { a, b, t } = locate(position)
  const e = smootherstep(t)
  const camera = mix(a.camera, b.camera, e)
  const target = mix(a.target, b.target, e)
  if (!compact) return { camera, target, shift: lerp(a.shift, b.shift, e) }
  return {
    camera: [0, 1, 2].map((i) => target[i] + (camera[i] - target[i]) * COMPACT_PULLBACK) as [number, number, number],
    target,
    shift: 0,
  }
}

export function progressAt(position: number): number {
  const { a, b, t } = locate(position)
  return lerp(a.progress, b.progress, t)
}

export interface TrainingReadout {
  step: number
  loss: number
  sigma: number
}

export function readoutAt(position: number): TrainingReadout {
  const progress = progressAt(position)
  const sigma = sigmaAt(progress)
  const { x, z } = pointAt(progress)
  return { step: Math.round(progress * TOTAL_STEPS), loss: loss(x, z, sigma), sigma }
}
