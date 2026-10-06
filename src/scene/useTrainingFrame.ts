import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { progressAt } from '../lib/choreography'
import { scrollState } from '../lib/scrollState'

/**
 * Calls `apply` on a rendered frame only when training progress has changed
 * since the last call, so camera-only frames (e.g. resize) skip geometry work.
 */
export function useTrainingFrame(apply: (progress: number) => void): void {
  const last = useRef(Number.NaN)
  useFrame(() => {
    const progress = progressAt(scrollState.get())
    if (progress === last.current) return
    last.current = progress
    apply(progress)
  })
}
