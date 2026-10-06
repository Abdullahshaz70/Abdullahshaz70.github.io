/**
 * The loss surface and the optimiser run that the whole page is built around.
 * Pure math, no three.js: shared by the WebGL scene, the SVG fallback and the HUD.
 *
 * Domain is θ = (x, z) ∈ [-EXTENT, EXTENT]². "Noise" σ ∈ [0, 1] stands in for
 * minibatch variance: high early in training, annealed to zero by the end.
 */

export const EXTENT = 5
export const TOTAL_STEPS = 1200
export const LEARNING_RATE = 0.003

/** Global minimum θ*. The noise terms vanish here, so it never moves. */
export const MINIMUM = { x: 1.4, z: -1.1 } as const

function quadratic(x: number, z: number): number {
  const dx = x - MINIMUM.x
  const dz = z - MINIMUM.z
  return dx * dx + 1.6 * dz * dz + 0.5 * dx * dz
}

/** Loss at θ for a given noise level σ. */
export function loss(x: number, z: number, sigma: number): number {
  const q = quadratic(x, z)
  const bowl = 3 * (1 - Math.exp(-q / 45))
  const away = 1 - Math.exp(-q / 5)

  const ripples = 0.18 * Math.sin(0.9 * x + 0.4) * Math.cos(0.7 * z - 0.3) * away
  const jitter =
    (0.22 * Math.sin(2.3 * x + 1.7 * z) * Math.cos(1.9 * z - 0.6 * x) +
      0.12 * Math.sin(4.1 * x - 3.3 * z + 0.5) * Math.sin(3.7 * z)) *
    away

  return bowl + ripples * (0.4 + 0.6 * sigma) + jitter * sigma
}

/** Noise schedule: σ as a function of training progress p ∈ [0, 1]. */
export function sigmaAt(progress: number): number {
  return Math.pow(1 - clamp01(progress), 1.6)
}

/** Deterministic PRNG so the "stochastic" run is identical on every load. */
function mulberry32(seed: number): () => number {
  let a = seed
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * SGD with momentum from a fixed start on the plateau. Returns interleaved
 * (x, z) for steps 0..TOTAL_STEPS.
 *
 * The gradient is taken on the expected loss (jitter damped to 30%) and the
 * variance is injected as a random kick. Taking it on the raw minibatch
 * surface traps the marker in noise pits for half the run.
 */
function runDescent(): Float32Array {
  const path = new Float32Array((TOTAL_STEPS + 1) * 2)
  const rand = mulberry32(7)
  const h = 1e-3
  const momentum = 0.9
  let x = -4.4
  let z = 4.3
  let vx = 0
  let vz = 0

  for (let i = 0; i <= TOTAL_STEPS; i++) {
    path[i * 2] = x
    path[i * 2 + 1] = z
    const sigma = sigmaAt(i / TOTAL_STEPS)
    const expected = 0.3 * sigma
    const gx = (loss(x + h, z, expected) - loss(x - h, z, expected)) / (2 * h)
    const gz = (loss(x, z + h, expected) - loss(x, z - h, expected)) / (2 * h)
    const kick = 2 * sigma
    vx = momentum * vx - LEARNING_RATE * (gx + kick * (rand() - 0.5))
    vz = momentum * vz - LEARNING_RATE * (gz + kick * (rand() - 0.5))
    x = clamp(x + vx, -EXTENT, EXTENT)
    z = clamp(z + vz, -EXTENT, EXTENT)
  }
  return path
}

export const DESCENT_PATH = runDescent()

/** θ at fractional progress p ∈ [0, 1], linearly interpolated between steps. */
export function pointAt(progress: number): { x: number; z: number } {
  const f = clamp01(progress) * TOTAL_STEPS
  const i = Math.min(Math.floor(f), TOTAL_STEPS - 1)
  const t = f - i
  return {
    x: lerp(DESCENT_PATH[i * 2], DESCENT_PATH[i * 2 + 2], t),
    z: lerp(DESCENT_PATH[i * 2 + 1], DESCENT_PATH[i * 2 + 3], t),
  }
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v))
}

export function clamp01(v: number): number {
  return clamp(v, 0, 1)
}
