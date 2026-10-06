import { useMemo } from 'react'
import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'
import { useContent } from '../hooks/useContent'
import { sectionMeta } from '../lib/sections'
import layout from './Section.module.css'
import styles from './Stack.module.css'

interface StackProps {
  onOpenProject: (projectId: string) => void
}

const section = sectionMeta('stack')

/** A structured index: tool, what it's for, how often, and which project shows it. */
export function Stack({ onOpenProject }: StackProps) {
  // Text comes from data.json → "stack" (skills). seenIn refers to project ids in "projects".
  const { stack, projects } = useContent()
  const projectTitle = useMemo(() => new Map(projects.map((p) => [p.id, p.title])), [projects])
  const { columns } = stack
  return (
    <section id={section.id} className={`grid ${layout.section}`} tabIndex={-1} aria-labelledby="stack-title">
      <SectionHeader number={section.number} title={stack.title} meta={stack.meta} headingId="stack-title" />

      {stack.groups.length > 0 && (
        <Reveal className={styles.wrap}>
          <table className={styles.table}>
            <caption className="visually-hidden">Tools by area, with comfort level and the projects that use them</caption>
            <thead>
              <tr>
                <th scope="col">{columns.name}</th>
                <th scope="col">{columns.use}</th>
                <th scope="col" className={styles.wide}>
                  {columns.comfort}
                </th>
                <th scope="col" className={styles.wide}>
                  {columns.seenIn}
                </th>
              </tr>
            </thead>
            {stack.groups.map((group, i) => (
              <tbody key={i}>
                {group.area && (
                  <tr className={styles.group}>
                    <th scope="rowgroup" colSpan={4}>
                      {group.area}
                    </th>
                  </tr>
                )}
                {group.items.map((item, j) => (
                  <tr key={j}>
                    <th scope="row" className={styles.name}>
                      {item.name}
                      {item.comfort && <span className={styles.compactComfort}>{item.comfort}</span>}
                    </th>
                    <td className={styles.use}>{item.use}</td>
                    <td className={styles.wide}>
                      {item.comfort && (
                        <span className={styles.comfort} data-level={item.comfort}>
                          {item.comfort}
                        </span>
                      )}
                    </td>
                    <td className={styles.wide}>
                      {item.seenIn.length === 0 ? (
                        <span className={styles.none}>
                          <span aria-hidden="true">—</span>
                          <span className="visually-hidden">None</span>
                        </span>
                      ) : (
                        <ul className={styles.refs}>
                          {item.seenIn.map((id) => (
                            <li key={id}>
                              <button type="button" aria-haspopup="dialog" onClick={() => onOpenProject(id)}>
                                {projectTitle.get(id) ?? id}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </Reveal>
      )}
    </section>
  )
}
