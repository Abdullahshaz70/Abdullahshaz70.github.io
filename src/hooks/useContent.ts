import { createContext, useContext } from 'react'
import type { SiteContent } from '../content'

/** Holds the content loaded from data.json. Provided once, in main.tsx. */
export const ContentContext = createContext<SiteContent | null>(null)

export function useContent(): SiteContent {
  const content = useContext(ContentContext)
  if (!content) throw new Error('useContent must be used inside ContentContext.Provider')
  return content
}
