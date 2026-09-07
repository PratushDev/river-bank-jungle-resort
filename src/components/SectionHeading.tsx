import type { ReactNode } from 'react'

import { RiverRule } from './RiverRule'

type Props = {
  label?: string
  title: ReactNode
  intro?: string
  align?: 'center' | 'left'
  dark?: boolean
  as?: 'h1' | 'h2'
  /** Right-hand column content — creates the asymmetric editorial split */
  aside?: ReactNode
}

/**
 * Editorial section heading. Default is a left-hung two-column split:
 * kicker + display title on the left, supporting prose on the right.
 */
export function SectionHeading({
  label,
  title,
  intro,
  align = 'left',
  dark = false,
  as = 'h2',
  aside,
}: Props) {
  const Tag = as

  if (align === 'center') {
    return (
      <div className="mb-12 text-center md:mb-16">
        {label && <p className={dark ? 'kicker-light mb-4' : 'kicker mb-4'}>{label}</p>}
        <Tag className={`display text-[clamp(2rem,4.2vw,3.4rem)] ${dark ? '!text-ivory' : ''}`}>{title}</Tag>
        <RiverRule className="mx-auto mt-6" tone={dark ? 'light' : 'gold'} />
        {intro && (
          <p
            className={`mx-auto mt-6 max-w-xl text-[15px] leading-[1.75] ${
              dark ? 'text-ivory/65' : 'text-espresso/65'
            }`}
          >
            {intro}
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="mb-12 grid gap-6 md:mb-16 md:grid-cols-12 md:gap-10">
      <div className="md:col-span-7">
        {label && <p className={dark ? 'kicker-light mb-4' : 'kicker mb-4'}>{label}</p>}
        <Tag className={`display text-[clamp(2rem,4.2vw,3.4rem)] ${dark ? '!text-ivory' : ''}`}>{title}</Tag>
        <RiverRule className="mt-6" tone={dark ? 'light' : 'gold'} />
      </div>
      {(intro || aside) && (
        <div className="md:col-span-5 md:self-end md:pb-2">
          {intro && (
            <p className={`text-[15px] leading-[1.75] ${dark ? 'text-ivory/65' : 'text-espresso/65'}`}>
              {intro}
            </p>
          )}
          {aside}
        </div>
      )}
    </div>
  )
}
