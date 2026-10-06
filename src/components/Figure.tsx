import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { useCompactLayout, usePrefersReducedMotion } from '../hooks/useMediaQuery'
import { assetsReady, loadProgress, withTimeout } from '../lib/loadProgress'
import { detectGraphicsTier } from '../lib/webgl'
import { ErrorBoundary } from './ErrorBoundary'
import styles from './Figure.module.css'
import { Poster } from './Poster'

// Decided once, when the main bundle runs: the device's graphics tier.
const GRAPHICS_TIER = detectGraphicsTier()

/** If the scene code hasn't downloaded by then, skip it and show the poster. */
const SCENE_TIMEOUT_MS = 20_000

// three.js lives in its own chunk and loads last: the preloader releases it
// once fonts and images are in (lib/preloader.ts). Downloading it is the
// first half of the preloader's scene stage.
const loadScene = async () => {
  await assetsReady
  const module = await withTimeout(import('../scene/Scene'), SCENE_TIMEOUT_MS)
  loadProgress.report('scene', 0.5)
  return module
}
const Scene = lazy(loadScene)
const reportSceneProgress = (fraction: number) => loadProgress.report('scene', fraction)

/**
 * `warming`: canvas mounted but invisible while it compiles and renders its first frame.
 * `live`: that frame is on screen; the canvas fades in.
 * `poster`: the 3D attempt failed or was too slow; the static poster fades in instead.
 */
type Stage = 'warming' | 'live' | 'poster'

/**
 * The fixed backdrop figure. The container is paper-coloured and full-size
 * from the first paint, so the canvas fades in over the colour of its own
 * first frame; nothing shifts and nothing appears half-drawn.
 */
export function Figure() {
  const compact = useCompactLayout()
  const reducedMotion = usePrefersReducedMotion()
  const [stage, setStage] = useState<Stage>('warming')

  const goLive = useCallback(() => setStage('live'), [])
  const fallBack = useCallback(() => setStage('poster'), [])

  // Decided before first paint, so these visitors see the poster immediately, with no fade.
  const posterFromStart = reducedMotion || GRAPHICS_TIER !== 'full'

  // The preloader's scene stage is finished once the figure is live, or replaced by the poster.
  const settled = posterFromStart || stage !== 'warming'
  useEffect(() => {
    if (settled) loadProgress.report('scene', 1)
  }, [settled])

  return (
    <div className={styles.figure} aria-hidden="true">
      {posterFromStart || stage === 'poster' ? (
        <div className={styles.stage} data-enter={posterFromStart ? undefined : 'fade'}>
          <Poster compact={compact} />
        </div>
      ) : (
        <>
          <div className={styles.stage} data-enter="gate" data-visible={stage === 'live' || undefined}>
            <ErrorBoundary fallback={null} onError={fallBack}>
              <Suspense fallback={null}>
                <Scene compact={compact} onReady={goLive} onTooSlow={fallBack} onProgress={reportSceneProgress} />
              </Suspense>
            </ErrorBoundary>
          </div>
          {stage === 'warming' && <p className={styles.status}>Drawing figure…</p>}
        </>
      )}
    </div>
  )
}
