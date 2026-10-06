import { useCallback, useEffect, useMemo, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { CAMERA_FOV, poseAt } from '../lib/choreography'
import { scrollState } from '../lib/scrollState'
import { CameraRig } from './CameraRig'
import { Descent } from './Descent'
import { readPalette } from './palette'
import { Surface } from './Surface'

interface SceneProps {
  compact: boolean
  /** Called once, after the first complete frame has been presented. */
  onReady: () => void
  /** Called if this device can't produce that frame in time; the caller shows the poster. */
  onTooSlow: () => void
  /** Warm-up milestones for the preloader's counter, as fractions of the scene stage. */
  onProgress: (fraction: number) => void
}

/**
 * Budget for shader compilation plus the first frame, measured after layout
 * has settled. The chunk is already loaded by then, so this measures the
 * device, not the network.
 */
const WARMUP_BUDGET_MS = 2500

/** Resolves once web fonts and the window load event are done, i.e. layout is final. */
async function layoutSettled(): Promise<void> {
  await document.fonts.ready
  if (document.readyState !== 'complete') {
    await new Promise((resolve) => window.addEventListener('load', resolve, { once: true }))
  }
}

/** After going live, the canvas renders on demand: once per scroll update, never while idle. */
function RenderOnScroll() {
  const invalidate = useThree((state) => state.invalidate)
  useEffect(() => scrollState.subscribe(() => invalidate()), [invalidate])
  return null
}

interface WarmupProps {
  onDone: () => void
  onTooSlow: () => void
  onProgress: (fraction: number) => void
}

/**
 * Runs while the canvas is on frameloop "never", so nothing is drawn early:
 * waits for final layout, compiles every shader, renders exactly one frame
 * for the current scroll position, and reports done once that frame is on
 * screen.
 *
 * With KHR_parallel_shader_compile, compilation happens off the main thread.
 * Without it, compileAsync would only add a warning, so compile synchronously;
 * the cost is the same as an uncompiled first frame, but it lands here,
 * while the canvas is still invisible.
 */
function Warmup({ onDone, onTooSlow, onProgress }: WarmupProps) {
  const gl = useThree((state) => state.gl)
  const scene = useThree((state) => state.scene)
  const camera = useThree((state) => state.camera)
  const advance = useThree((state) => state.advance)

  useEffect(() => {
    let cancelled = false
    let watchdog = 0

    const giveUp = () => {
      if (cancelled) return
      cancelled = true
      onTooSlow()
    }

    const run = async () => {
      await layoutSettled()
      if (cancelled) return
      onProgress(0.6)
      watchdog = window.setTimeout(giveUp, WARMUP_BUDGET_MS)
      if (gl.extensions.has('KHR_parallel_shader_compile')) await gl.compileAsync(scene, camera)
      else gl.compile(scene, camera)
      if (cancelled) return
      onProgress(0.9)
      // Runs every useFrame subscriber (camera pose, surface heights, trail) and renders.
      advance(performance.now())
      requestAnimationFrame(() => {
        if (cancelled) return
        window.clearTimeout(watchdog)
        onDone()
      })
    }
    run().catch(giveUp)

    return () => {
      cancelled = true
      window.clearTimeout(watchdog)
    }
  }, [gl, scene, camera, advance, onDone, onTooSlow, onProgress])

  return null
}

export default function Scene({ compact, onReady, onTooSlow, onProgress }: SceneProps) {
  const palette = useMemo(() => readPalette(), [])
  const [live, setLive] = useState(false)

  // Fixed for the session: no adaptive quality, so nothing visibly re-renders at a new resolution.
  const dpr = Math.min(window.devicePixelRatio, compact ? 1.25 : 1.75)
  // Start the camera where the first frame needs it, not at three's default.
  const [initialPose] = useState(() => poseAt(scrollState.get(), compact))

  const handleDone = useCallback(() => {
    setLive(true)
    onReady()
  }, [onReady])

  return (
    <Canvas
      frameloop={live ? 'demand' : 'never'}
      flat
      dpr={dpr}
      camera={{ fov: CAMERA_FOV, near: 0.1, far: 100, position: initialPose.camera }}
      gl={{ antialias: true, alpha: false, powerPreference: compact ? 'low-power' : 'high-performance' }}
    >
      <color attach="background" args={[palette.paper]} />
      {live ? <RenderOnScroll /> : <Warmup onDone={handleDone} onTooSlow={onTooSlow} onProgress={onProgress} />}
      <CameraRig compact={compact} />
      <Surface resolution={compact ? 44 : 84} ink={palette.ink} paper={palette.paper} />
      <Descent ink={palette.ink} accent={palette.accent} />
    </Canvas>
  )
}
