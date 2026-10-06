import styles from './SectionHeader.module.css'

interface SectionHeaderProps {
  number: string
  title: string
  meta: string
  /** id of the h2, for the section's aria-labelledby. */
  headingId: string
}

/** Title and meta come from data.json; either is left out when empty. */
export function SectionHeader({ number, title, meta, headingId }: SectionHeaderProps) {
  return (
    <header className={styles.header}>
      <span className={styles.number}>{number}</span>
      {title && (
        <h2 id={headingId} className={styles.title}>
          {title}
        </h2>
      )}
      {meta && <span className={`label ${styles.meta}`}>{meta}</span>}
    </header>
  )
}
