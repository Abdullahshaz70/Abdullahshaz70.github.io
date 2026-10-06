import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'
import { useContent } from '../hooks/useContent'
import { sectionMeta } from '../lib/sections'
import styles from './Contests.module.css'
import layout from './Section.module.css'

const section = sectionMeta('contests')

export function Contests() {
  // Text comes from data.json → "contests". Empty values are not rendered.
  const { contests } = useContent()
  return (
    <section id={section.id} className={`grid ${layout.section}`} tabIndex={-1} aria-labelledby="contests-title">
      <SectionHeader number={section.number} title={contests.title} meta={contests.meta} headingId="contests-title" />

      {contests.intro && (
        <Reveal className={styles.intro}>
          <p>{contests.intro}</p>
        </Reveal>
      )}

      {contests.summary.length > 0 && (
        <Reveal className={styles.summaryWrap}>
          <dl className={styles.summary}>
            {contests.summary.map((fact, i) => (
              <div key={i}>
                {fact.label && <dt className="label">{fact.label}</dt>}
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      )}

      {contests.platforms.length > 0 && (
        <Reveal className={styles.tableWrap}>
          <table className={styles.table}>
            <caption className="visually-hidden">Ratings by platform</caption>
            <thead>
              <tr>
                <th scope="col">Platform</th>
                <th scope="col" className={styles.optional}>
                  Handle
                </th>
                <th scope="col" className={styles.num}>
                  Rating
                </th>
                <th scope="col" className={`${styles.num} ${styles.optional}`}>
                  Peak
                </th>
                <th scope="col">Standing</th>
              </tr>
            </thead>
            <tbody>
              {contests.platforms.map((platform, i) => (
                <tr key={i}>
                  <th scope="row">{platform.name}</th>
                  <td className={styles.optional}>
                    {platform.href ? <a href={platform.href}>{platform.handle}</a> : platform.handle}
                  </td>
                  <td className={styles.num}>{platform.rating}</td>
                  <td className={`${styles.num} ${styles.peak} ${styles.optional}`}>{platform.peak}</td>
                  <td>{platform.standing}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      )}

      {contests.problems.length > 0 && (
        <Reveal className={styles.problemsWrap}>
          {contests.problemsTitle && <h3 className={styles.problemsTitle}>{contests.problemsTitle}</h3>}
          <ol className={styles.problems}>
            {contests.problems.map((problem, i) => (
              <li key={i}>
                <p className="label">{problem.source}</p>
                <div>
                  <h4 className={styles.problemTitle}>{problem.title}</h4>
                  {problem.note && <p className={styles.note}>{problem.note}</p>}
                </div>
                {problem.tags.length > 0 && (
                  <ul className={styles.tags} aria-label="Tags">
                    {problem.tags.map((tag, j) => (
                      <li key={j}>{tag}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </Reveal>
      )}
    </section>
  )
}
