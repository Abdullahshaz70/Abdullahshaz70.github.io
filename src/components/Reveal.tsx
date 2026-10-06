import type { ReactNode } from 'react'
import { m } from 'motion/react'

interface RevealProps {
  children: ReactNode
  className?: string
}

/**
 * Fades a block up once, the first time it enters the viewport. Under
 * reduced motion, MotionConfig in App drops the translate and keeps the fade.
 */
export function Reveal({ children, className }: RevealProps) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.7, ease: [0.22, 0.8, 0.24, 1] }}
    >
      {children}
    </m.div>
  )
}
