import type { ReactNode } from 'react'

import { Link } from '@/i18n/navigation'

type ButtonProps = {
  children: ReactNode
  className?: string
}

/*
 * Action hierarchy:
 *  - TextLink / TextExternal — the default. Small caps with an extending gold
 *    underline. Quiet, editorial; used for nearly everything.
 *  - GoldExternal / GoldLink — the solid gold rectangle, reserved for the few
 *    true booking moments (navbar, hero, final CTA band).
 */

const gold =
  'inline-flex min-h-12 items-center justify-center rounded-none bg-sage-dark px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-ivory transition-all duration-300 hover:bg-forest focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-ivory'

export function GoldLink({ href, children, className = '' }: ButtonProps & { href: string }) {
  return (
    <Link href={href} className={`${gold} ${className}`}>
      {children}
    </Link>
  )
}

export function GoldExternal({ href, children, className = '' }: ButtonProps & { href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${gold} ${className}`}>
      {children}
    </a>
  )
}

export function TextLink({
  href,
  children,
  className = '',
  light = false,
}: ButtonProps & { href: string; light?: boolean }) {
  return (
    <Link href={href} className={`link-line focus-visible:ring-2 focus-visible:ring-sage ${light ? 'link-line-light' : ''} ${className}`}>
      {children}
    </Link>
  )
}

export function TextExternal({
  href,
  children,
  className = '',
  light = false,
}: ButtonProps & { href: string; light?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`link-line focus-visible:ring-2 focus-visible:ring-sage ${light ? 'link-line-light' : ''} ${className}`}
    >
      {children}
    </a>
  )
}

/* Legacy aliases — outline style is retired; these render the text-link style */
export function OutlineLink({
  href,
  children,
  className = '',
  light = false,
}: ButtonProps & { href: string; light?: boolean }) {
  return (
    <TextLink href={href} light={light} className={className}>
      {children}
    </TextLink>
  )
}

export function OutlineExternal({
  href,
  children,
  className = '',
  light = false,
}: ButtonProps & { href: string; light?: boolean }) {
  return (
    <TextExternal href={href} light={light} className={className}>
      {children}
    </TextExternal>
  )
}
