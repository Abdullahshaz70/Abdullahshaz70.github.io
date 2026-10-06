import { StrictMode } from 'react'
import { flushSync } from 'react-dom'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/schibsted-grotesk/wght.css'
import '@fontsource-variable/newsreader/wght.css'
import '@fontsource/ibm-plex-mono/latin-400.css'
import 'lenis/dist/lenis.css'
import './styles/global.css'
import { App } from './App'
import type { SiteContent } from './content'
import { ContentContext } from './hooks/useContent'
import { runPreloader } from './lib/preloader'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Missing #root element')
const root = createRoot(rootElement)

/** Browser tab title and search description, from data.json → person. */
function applyDocumentMeta({ person }: SiteContent) {
  if (person.name) document.title = person.name
  if (person.title) document.querySelector('meta[name="description"]')?.setAttribute('content', person.title)
}

// Loads data.json first, then renders the page underneath the preloader.
// flushSync commits it immediately, so the preloader can find its fonts and images.
runPreloader((content) => {
  applyDocumentMeta(content)
  flushSync(() =>
    root.render(
      <StrictMode>
        <ContentContext.Provider value={content}>
          <App />
        </ContentContext.Provider>
      </StrictMode>,
    ),
  )
})
