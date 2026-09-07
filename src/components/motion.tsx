import type { ReactNode } from 'react'

type WrapperProps = {
  children: ReactNode
  className?: string
  /** Retained for call-site compatibility; CSS staggers by child position. */
  delay?: number
}

const cx = (...parts: (string | undefined)[]) => parts.filter(Boolean).join(' ')

/**
 * Section/content scroll-reveal.
 *
 * These were framer-motion components, which made every page that used them
 * a client bundle and — worse — server-rendered the content at opacity 0,
 * so nothing was visible until the library had downloaded and hydrated.
 * They are now plain server components: the reveal lives entirely in CSS
 * (see `.reveal` in globals.css) and is applied only where scroll-driven
 * animation is supported, so the content ships visible.
 */
export function FadeUp({ children, className }: WrapperProps) {
  return <div className={cx('reveal', className)}>{children}</div>
}

/** Parent for card grids — children reveal in sequence via nth-child ranges. */
export function StaggerGroup({ children, className }: WrapperProps) {
  return <div className={cx('reveal-group', className)}>{children}</div>
}

export function StaggerItem({ children, className }: WrapperProps) {
  return <div className={className}>{children}</div>
}

/** Gentle scale on hover — CSS transition, no JS. */
export function ScaleOnHover({ children, className }: WrapperProps) {
  return (
    <div className={cx('transition-transform duration-300 hover:scale-[1.03]', className)}>
      {children}
    </div>
  )
}
