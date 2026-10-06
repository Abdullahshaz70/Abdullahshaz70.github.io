import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'
import { useContent } from '../hooks/useContent'
import { sectionMeta } from '../lib/sections'
import layout from './Section.module.css'
import styles from './Work.module.css'

interface WorkProps {
  onOpen: (projectId: string) => void
}

const section = sectionMeta('work')

/** An index of projects. Each row opens the full write-up in the project sheet. */
export function Work({ onOpen }: WorkProps) {
  // Text comes from data.json → "work" and "projects". Empty values are not rendered.
  const { work, projects } = useContent()
  return (
    <section id={section.id} className={`grid ${layout.section}`} tabIndex={-1} aria-labelledby="work-title">
      <SectionHeader number={section.number} title={work.title} meta={work.meta} headingId="work-title" />

      {projects.length > 0 && (
        <Reveal className={styles.listWrap}>
          <ol className={styles.list}>
            {projects.map((project, i) => (
              <li key={`${i}-${project.id}`} className={styles.row}>
                <span className={`label ${styles.index}`}>{String(i + 1).padStart(2, '0')}</span>
                <h3 className={styles.title}>
                  <button type="button" className={styles.open} aria-haspopup="dialog" onClick={() => onOpen(project.id)}>
                    {project.title}
                  </button>
                </h3>
                {project.problem && <p className={styles.problem}>{project.problem}</p>}
                {(project.kind || project.year) && (
                  <p className={`label ${styles.meta}`}>
                    {project.kind && <span>{project.kind}</span>}
                    {project.year && <span className="figures">{project.year}</span>}
                  </p>
                )}
                {work.openLabel && (
                  <span className={`label ${styles.cta}`} aria-hidden="true">
                    {work.openLabel} →
                  </span>
                )}
              </li>
            ))}
          </ol>
        </Reveal>
      )}
    </section>
  )
}
