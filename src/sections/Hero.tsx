import { useContent } from '../hooks/useContent'
import { sectionMeta } from '../lib/sections'
import styles from './Hero.module.css'

export function Hero() {
  // Text comes from data.json → "person" and "hero". Empty values are not rendered.
  const { person, hero } = useContent()
  const [first, ...rest] = person.name.split(' ')
  return (
    <section id="top" className={`grid ${styles.hero}`} tabIndex={-1} aria-labelledby="hero-title">
      {person.name && (
        <h1 id="hero-title" className={styles.name}>
          <span>{first}</span>
          {rest.length > 0 && <span className={styles.indent}>{rest.join(' ')}</span>}
        </h1>
      )}

      {hero.positioning && <p className={styles.positioning}>{hero.positioning}</p>}

      {hero.scrollCue && (
        <a className={`label ${styles.cue}`} href={`#${sectionMeta('about').id}`}>
          <span className={styles.tick} aria-hidden="true" />
          {hero.scrollCue}
        </a>
      )}

      {hero.meta.length > 0 && (
        <dl className={styles.meta}>
          {hero.meta.map((fact, i) => (
            <div key={i}>
              {fact.label && <dt className="label">{fact.label}</dt>}
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  )
}
