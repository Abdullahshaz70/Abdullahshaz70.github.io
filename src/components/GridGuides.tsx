import styles from './GridGuides.module.css'

const COLUMNS = 12

/** Hairline column guides: the page grid, made visible. Purely presentational. */
export function GridGuides() {
  return (
    <div className={styles.guides} aria-hidden="true">
      <div className="grid">
        {Array.from({ length: COLUMNS }, (_, i) => (
          <span key={i} />
        ))}
      </div>
    </div>
  )
}
