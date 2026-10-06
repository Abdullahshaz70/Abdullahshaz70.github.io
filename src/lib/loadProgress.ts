/**
 * Real loading progress for the preloader. The page loads in three stages, in
 * this order, and each reports how far along it actually is:
 *
 *   data    data.json                                  10%
 *   assets  fonts and images used on the page          30%
 *   scene   three.js scene: code, shaders, first frame 60%
 *
 * Overall progress only reaches 1 when every stage has finished. A stage that
 * fails or is skipped reports 1 too, so the page always opens.
 */

const WEIGHTS = { data: 10, assets: 30, scene: 60 } as const
const TOTAL = WEIGHTS.data + WEIGHTS.assets + WEIGHTS.scene

export type LoadStage = keyof typeof WEIGHTS

const done: Record<LoadStage, number> = { data: 0, assets: 0, scene: 0 }
const listeners = new Set<() => void>()

export const loadProgress = {
  /** Reports a stage's completion, 0 → 1. Progress never moves backwards. */
  report(stage: LoadStage, fraction: number): void {
    const value = Math.min(Math.max(fraction, 0), 1)
    if (value <= done[stage]) return
    done[stage] = value
    listeners.forEach((listener) => listener())
  },
  /** Overall progress, 0 → 1. Exactly 1 only when every stage has reported 1. */
  value(): number {
    const sum = (Object.keys(WEIGHTS) as LoadStage[]).reduce((acc, stage) => acc + WEIGHTS[stage] * done[stage], 0)
    return sum / TOTAL
  },
  subscribe(listener: () => void): () => void {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
}

let resolveAssets: () => void = () => {}

/**
 * Resolves once fonts and images are in. The 3D scene waits for this before
 * it starts downloading, so it loads last and doesn't compete for bandwidth.
 */
export const assetsReady = new Promise<void>((resolve) => (resolveAssets = resolve))

export function markAssetsReady(): void {
  loadProgress.report('assets', 1)
  resolveAssets()
}

/** Rejects if `promise` hasn't settled within `ms`, so a stalled request can be skipped. */
export function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = window.setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms)
    promise.then(
      (value) => {
        window.clearTimeout(timer)
        resolve(value)
      },
      (error: unknown) => {
        window.clearTimeout(timer)
        reject(error)
      },
    )
  })
}
