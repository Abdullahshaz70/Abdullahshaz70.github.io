import { useEffect, useRef } from 'react'
import { useContent } from '../hooks/useContent'
import { readoutAt, type TrainingReadout } from '../lib/choreography'
import { TOTAL_STEPS } from '../lib/landscape'
import { scrollState } from '../lib/scrollState'
import styles from './Hud.module.css'

const format = {
  step: (r: TrainingReadout) => `${String(r.step).padStart(4, '0')} / ${TOTAL_STEPS}`,
  loss: (r: TrainingReadout) => r.loss.toFixed(3),
  sigma: (r: TrainingReadout) => r.sigma.toFixed(2),
}

const initial = readoutAt(0.5)

/**
 * Figure caption plus a live readout of the training run. The numbers are
 * written straight to the DOM on scroll, bypassing React renders.
 */
export function Hud() {
  const step = useRef<HTMLSpanElement>(null)
  const loss = useRef<HTMLSpanElement>(null)
  const sigma = useRef<HTMLSpanElement>(null)
  // Caption text comes from data.json → "figure".
  const { figure } = useContent()

  useEffect(() => {
    const render = () => {
      const readout = readoutAt(scrollState.get())
      if (step.current) step.current.textContent = format.step(readout)
      if (loss.current) loss.current.textContent = format.loss(readout)
      if (sigma.current) sigma.current.textContent = format.sigma(readout)
    }
    render()
    return scrollState.subscribe(render)
  }, [])

  return (
    <aside className={styles.hud} aria-label="Figure caption">
      {(figure.label || figure.caption) && (
        <p className={styles.caption}>
          {figure.label && <span className={styles.figLabel}>{figure.label}</span>} {figure.caption}
        </p>
      )}
      <dl className={styles.readout} aria-hidden="true">
        <div>
          <dt>step</dt>
          <dd ref={step}>{format.step(initial)}</dd>
        </div>
        <div>
          <dt>loss</dt>
          <dd ref={loss}>{format.loss(initial)}</dd>
        </div>
        <div>
          <dt>σ</dt>
          <dd ref={sigma}>{format.sigma(initial)}</dd>
        </div>
      </dl>
    </aside>
  )
}
