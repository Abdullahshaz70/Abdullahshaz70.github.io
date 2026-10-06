import type { MouseEvent } from 'react'
import { sections } from '../content'
import { useActiveSection } from '../hooks/useActiveSection'
import { useContent } from '../hooks/useContent'
import styles from './Nav.module.css'

/**
 * Smooth scrolling intercepts anchor clicks, so move keyboard focus to the
 * target section ourselves; the next Tab then continues from there.
 */
function focusTarget(event: MouseEvent<HTMLAnchorElement>) {
  const id = event.currentTarget.hash.slice(1)
  document.getElementById(id)?.focus({ preventScroll: true })
}

export function Nav() {
  const active = useActiveSection()
  // Labels come from data.json → "nav"; the name from "person". Empty ones are not rendered.
  const { person, nav } = useContent()
  const initials = person.name
    .split(' ')
    .map((part) => part[0])
    .join('')

  return (
    <header className={styles.nav}>
      <div className={`grid ${styles.inner}`}>
        {(person.shortName || initials) && (
          <a className={styles.brand} href="#top" onClick={focusTarget}>
            <span className={styles.full}>{person.shortName || person.name}</span>
            <span className={styles.initials} aria-hidden="true">
              {initials}
            </span>
          </a>
        )}
        <nav className={styles.links} aria-label="Sections">
          <ol>
            {sections.map(
              (section, i) =>
                nav[section.id] && (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      onClick={focusTarget}
                      aria-current={active === i + 1 ? 'location' : undefined}
                    >
                      {nav[section.id]}
                    </a>
                  </li>
                ),
            )}
          </ol>
        </nav>
      </div>
    </header>
  )
}
