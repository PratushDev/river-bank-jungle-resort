'use client'

import { motion, useReducedMotion } from 'framer-motion'

type Props = {
  className?: string
  /** 'gold' on light sections, 'light' on espresso sections */
  tone?: 'gold' | 'light'
  width?: number
}

/**
 * The signature motif: a meandering river line, drawn from left to right as
 * it scrolls into view. Used where a generic hairline divider would go.
 */
export function RiverRule({ className = '', tone = 'gold', width = 168 }: Props) {
  const reduced = useReducedMotion()
  /* Light sections need the deeper sage to read at all; espresso sections
     need the pale one. Previously both branches returned the same value. */
  const stroke = tone === 'gold' ? 'var(--color-gold-dark)' : 'var(--color-gold)'

  return (
    <svg
      viewBox="0 0 168 12"
      width={width}
      height={12}
      fill="none"
      aria-hidden="true"
      className={className}
      preserveAspectRatio="none"
    >
      <motion.path
        d="M0 8C18 8 22 3 40 3s22 6 40 6 22-6 40-6 26 5 48 5"
        stroke={stroke}
        strokeWidth="1"
        strokeLinecap="round"
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      />
    </svg>
  )
}
