'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState, type ReactNode } from 'react'

type Slide = { url: string; alt: string }

type Props = {
  /** Optional property film. The poster remains the no-motion fallback. */
  video?: { url: string; poster: string; title: string }
  /** Single background image (inner pages) */
  image?: Slide
  /** Multiple backgrounds — cinematic crossfade slideshow (home) */
  slides?: Slide[]
  label?: string
  /** Accepts <em> for an italic word — the display face carries the emphasis */
  title: ReactNode
  subtitle?: string
  children?: ReactNode
  /** Full viewport height (home) vs shorter banner (inner pages) */
  size?: 'full' | 'banner'
}

/** How long each slide holds before the next dissolve begins */
const SLIDE_MS = 7000
/** Length of the crossfade itself */
const FADE_S = 3.2

/**
 * Film-style dissolve: a long overlapping blend in which BOTH frames keep
 * drifting — the outgoing image continues its zoom while it fades, the
 * incoming one is already moving as it appears, so no cut is ever felt.
 */
function Crossfade({ slides }: { slides: Slide[] }) {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduced || slides.length < 2) return
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), SLIDE_MS)
    return () => clearInterval(id)
  }, [reduced, slides.length])

  if (reduced) {
    return (
      <Image
        src={slides[0].url}
        alt={slides[0].alt}
        fill
        priority
        sizes="100vw"
        className="img-grade object-cover"
      />
    )
  }

  const holdS = (SLIDE_MS + FADE_S * 1000) / 1000

  return (
    <>
      {slides.map((slide, i) => {
        const active = index === i
        return (
          <motion.div
            key={slide.url}
            className="absolute inset-0"
            initial={false}
            animate={
              active
                ? // Keyframes restart on activation: enter at 1.04, settle-zoom to 1.1.
                  { opacity: 1, scale: [1.04, 1.1] }
                : // Keep drifting forward while dissolving out, then rest at 1.12.
                  { opacity: 0, scale: 1.12 }
            }
            transition={{
              opacity: { duration: FADE_S, ease: [0.4, 0.1, 0.3, 0.9] },
              scale: active
                ? { duration: holdS + 0.5, ease: 'linear' }
                : { duration: FADE_S + 1, ease: 'linear' },
            }}
            style={{ willChange: 'opacity, transform' }}
          >
            <Image
              src={slide.url}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="img-grade object-cover"
            />
          </motion.div>
        )
      })}
    </>
  )
}

export function Hero({ video, image, slides, label, title, subtitle, children, size = 'full' }: Props) {
  const reduced = useReducedMotion()
  const backgroundSlides = slides && slides.length > 0 ? slides : image ? [image] : []

  const fadeUp = (delay: number) => ({
    initial: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: 'easeOut' as const, delay },
  })

  return (
    <section
      className={`relative flex items-center justify-center overflow-hidden bg-espresso ${
        size === 'full' ? 'min-h-svh' : 'min-h-[58svh] pt-24'
      }`}
    >
      <div className="absolute inset-0 overflow-hidden">
        {video ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={video.poster}
            aria-label={video.title}
          >
            <source src={video.url} type="video/mp4" />
          </video>
        ) : backgroundSlides.length > 1 ? (
          <Crossfade slides={backgroundSlides} />
        ) : backgroundSlides[0] ? (
          <div className="animate-kenburns absolute inset-0">
            <Image
              src={backgroundSlides[0].url}
              alt={backgroundSlides[0].alt}
              fill
              priority
              sizes="100vw"
              className="img-grade object-cover"
            />
          </div>
        ) : null}
        {/* Universal scrim: constant base gradient + a soft radial pool of
            shadow behind the text block, so the copy reads over any slide. */}
        <div className="absolute inset-0 bg-gradient-to-b from-forest/70 via-forest/35 to-forest/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_58%_50%_at_50%_46%,rgba(20,38,31,0.5),transparent_72%)]" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-4 py-28 sm:px-6 md:py-32 lg:grid-cols-[minmax(0,1fr)_25rem] lg:items-center lg:gap-16">
        <div className="max-w-3xl text-center lg:text-left">
          {label && (
            <motion.p {...fadeUp(0)} className="kicker-light hero-text-shadow mb-5">
              {label}
            </motion.p>
          )}
          <motion.h1
            {...fadeUp(0.2)}
            className="display hero-text-shadow !text-ivory text-[clamp(2.25rem,5.5vw,4.75rem)] [&_em]:italic [&_em]:text-sage"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              {...fadeUp(0.4)}
              className="hero-text-shadow mt-6 max-w-lg text-[14px] leading-[1.75] text-ivory/85 sm:text-[15px] lg:ml-0"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
        {children && (
          <motion.div
            {...fadeUp(0.6)}
            className="flex w-full flex-col items-center justify-center gap-5 lg:items-stretch"
          >
            {children}
          </motion.div>
        )}
      </div>

    </section>
  )
}
