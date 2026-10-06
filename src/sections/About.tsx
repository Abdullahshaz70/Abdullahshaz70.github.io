import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'
import { useContent } from '../hooks/useContent'
import { sectionMeta } from '../lib/sections'
import styles from './About.module.css'
import layout from './Section.module.css'

const section = sectionMeta('about')

export function About() {
  // Text comes from data.json → "about". Empty values are not rendered.
  const { about } = useContent()
  return (
    <section id={section.id} className={`grid ${layout.section}`} tabIndex={-1} aria-labelledby="about-title">
      <SectionHeader number={section.number} title={about.title} meta={about.meta} headingId="about-title" />

      {(about.lead || about.body.length > 0) && (
        <Reveal className={styles.text}>
          {about.lead && <p className={styles.lead}>{about.lead}</p>}
          {about.body.map((paragraph, i) => (
            <p key={i} className={styles.body}>
              {paragraph}
            </p>
          ))}
        </Reveal>
      )}

      {about.facts.length > 0 && (
        <Reveal className={styles.factsWrap}>
          <dl className={styles.facts}>
            {about.facts.map((fact, i) => (
              <div key={i}>
                {fact.label && <dt className="label">{fact.label}</dt>}
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      )}
    </section>
  )
}
