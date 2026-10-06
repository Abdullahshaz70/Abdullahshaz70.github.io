import { useState } from 'react'
import { domAnimation, LazyMotion, MotionConfig } from 'motion/react'
import { Figure } from './components/Figure'
import { GridGuides } from './components/GridGuides'
import { Hud } from './components/Hud'
import { Nav } from './components/Nav'
import { ProjectSheet } from './components/ProjectSheet'
import { sections } from './content'
import { useContent } from './hooks/useContent'
import { usePrefersReducedMotion } from './hooks/useMediaQuery'
import { useScrollTracking } from './hooks/useScrollTracking'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { Contests } from './sections/Contests'
import { Hero } from './sections/Hero'
import { Stack } from './sections/Stack'
import { Work } from './sections/Work'

/** Hero first, then the numbered sections: the order the scene's keyframes follow. */
const TRACKED_SECTIONS = ['top', ...sections.map((s) => s.id)]

export function App() {
  const reducedMotion = usePrefersReducedMotion()
  const { projects } = useContent()
  const [activeProject, setActiveProject] = useState<string | null>(null)

  useSmoothScroll(!reducedMotion)
  useScrollTracking(TRACKED_SECTIONS)

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Figure />
        <GridGuides />
        <Nav />
        <main id="main" tabIndex={-1}>
          <Hero />
          <About />
          <Work onOpen={setActiveProject} />
          <Contests />
          <Stack onOpenProject={setActiveProject} />
          <Contact />
        </main>
        <Hud />
        <ProjectSheet projects={projects} activeId={activeProject} onSelect={setActiveProject} />
      </MotionConfig>
    </LazyMotion>
  )
}
