'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

type WrapperProps = {
  children: ReactNode
  className?: string
  delay?: number
}

/** Section/content scroll-reveal: fades up gently and only once. */
export function FadeUp({ children, className, delay = 0 }: WrapperProps) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  )
}

const groupVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' },
  },
}

/** Parent for card grids — staggers each <StaggerItem> child by 0.1s. */
export function StaggerGroup({ children, className }: WrapperProps) {
  const reduced = useReducedMotion()

  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      variants={groupVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: WrapperProps) {
  const reduced = useReducedMotion()

  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  )
}

/** Gentle scale on hover — use for standalone elements (cards use CSS group-hover). */
export function ScaleOnHover({ children, className }: WrapperProps) {
  const reduced = useReducedMotion()

  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div className={className} whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
      {children}
    </motion.div>
  )
}
