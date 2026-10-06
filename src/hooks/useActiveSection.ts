import { useSyncExternalStore } from 'react'
import { scrollState } from '../lib/scrollState'

/**
 * Index of the section under the viewport centre (0 is the hero). Re-renders
 * only when the index changes, not on every scroll event.
 */
export function useActiveSection(): number {
  return useSyncExternalStore(scrollState.subscribe, () => Math.floor(scrollState.get()))
}
