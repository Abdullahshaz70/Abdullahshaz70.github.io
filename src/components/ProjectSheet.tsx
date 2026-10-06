import { useEffect, useRef } from 'react'
import { AnimatePresence, m } from 'motion/react'
import type { Project } from '../content'
import { externalLinkProps } from '../lib/links'
import { pauseSmoothScroll, resumeSmoothScroll } from '../lib/smoothScroll'
import styles from './ProjectSheet.module.css'

interface ProjectSheetProps {
  projects: Project[]
  activeId: string | null
  onSelect: (id: string | null) => void
}

/**
 * Detail view for one project, in a native modal <dialog>: focus trapping,
 * Esc handling and focus return come from the browser. The dialog stays open
 * through the exit animation and closes when it finishes.
 */
export function ProjectSheet({ projects, activeId, onSelect }: ProjectSheetProps) {
  const dialog = useRef<HTMLDialogElement>(null)
  const scroller = useRef<HTMLElement>(null)

  const index = projects.findIndex((p) => p.id === activeId)
  const project = index >= 0 ? projects[index] : null
  const next = projects[(index + 1) % projects.length]

  useEffect(() => {
    const el = dialog.current
    if (!el || !project) return
    if (!el.open) {
      el.showModal()
      pauseSmoothScroll()
    }
    scroller.current?.scrollTo(0, 0)
  }, [project])

  const close = () => onSelect(null)

  return (
    <dialog
      ref={dialog}
      className={styles.dialog}
      aria-labelledby="sheet-title"
      data-lenis-prevent
      data-closing={project ? undefined : ''}
      onCancel={(event) => {
        event.preventDefault()
        close()
      }}
      onClose={resumeSmoothScroll}
      onClick={(event) => {
        if (event.target === event.currentTarget) close()
      }}
    >
      <AnimatePresence onExitComplete={() => dialog.current?.close()}>
        {project && (
          <m.article
            key="sheet"
            ref={scroller}
            className={styles.sheet}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.22, 0.8, 0.24, 1] }}
          >
            <header className={styles.top}>
              <p className="label figures">
                Project {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
              </p>
              <button type="button" className={styles.close} onClick={close}>
                Close <span className={styles.key}>Esc</span>
              </button>
            </header>

            <h2 id="sheet-title" className={styles.title}>
              {project.title}
            </h2>
            {/* Each block below is hidden when its field in data.json is empty. */}
            {project.problem && <p className={styles.problem}>{project.problem}</p>}

            {(project.kind || project.year || project.role) && (
              <dl className={styles.facts}>
                {project.kind && (
                  <div>
                    <dt className="label">Kind</dt>
                    <dd>{project.kind}</dd>
                  </div>
                )}
                {project.year && (
                  <div>
                    <dt className="label">Year</dt>
                    <dd>{project.year}</dd>
                  </div>
                )}
                {project.role && (
                  <div>
                    <dt className="label">Role</dt>
                    <dd>{project.role}</dd>
                  </div>
                )}
              </dl>
            )}

            {project.approach && (
              <section className={styles.block} aria-labelledby="sheet-approach">
                <h3 id="sheet-approach" className="label">
                  Approach
                </h3>
                <p>{project.approach}</p>
              </section>
            )}

            {project.outcome.length > 0 && (
              <section className={styles.block} aria-labelledby="sheet-outcome">
                <h3 id="sheet-outcome" className="label">
                  Outcome
                </h3>
                <ul className={styles.metrics}>
                  {project.outcome.map((metric, i) => (
                    <li key={i}>
                      <span className={styles.value}>{metric.value}</span>
                      <span className={styles.metricLabel}>{metric.label}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {project.stack.length > 0 && (
              <section className={styles.block} aria-labelledby="sheet-stack">
                <h3 id="sheet-stack" className="label">
                  Stack
                </h3>
                <ul className={styles.stack}>
                  {project.stack.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            {project.links.length > 0 && (
              <section className={styles.block} aria-labelledby="sheet-links">
                <h3 id="sheet-links" className="label">
                  Links
                </h3>
                <ul className={styles.links}>
                  {project.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.href}
                        {...externalLinkProps(link.href)}
                      >
                        {link.label} <span aria-hidden="true">↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {projects.length > 1 && (
              <footer className={styles.footer}>
                <button type="button" className={styles.next} onClick={() => onSelect(next.id)}>
                  <span className="label">Next project</span>
                  <span className={styles.nextTitle}>
                    {next.title} <span aria-hidden="true">→</span>
                  </span>
                </button>
              </footer>
            )}
          </m.article>
        )}
      </AnimatePresence>
    </dialog>
  )
}
