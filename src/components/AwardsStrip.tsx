import { FadeUp, StaggerGroup, StaggerItem } from './motion'
import { EgretMotif } from './Motifs'
import { RiverRule } from './RiverRule'

/*
 * Guest ratings pulled from the resort's 2026 OTA award badges
 * (Booking.com Traveller Review Awards, Trip.com, Expedia, Hotels.com).
 * Update the numbers here when new award seasons land.
 */
const AWARDS = [
  { score: '9.0', outOf: '/10', platform: 'Booking.com', award: 'Traveller Review Awards 2026' },
  { score: '9.7', outOf: '/10', platform: 'Trip.com', award: 'Amazing · Verified Reviews 2026' },
  { score: '5.0', outOf: '/5', platform: 'Expedia', award: 'Exceptional · Verified Reviews' },
  { score: '10', outOf: '/10', platform: 'Hotels.com', award: 'Exceptional · Guest Rated 2026' },
] as const

export function AwardsStrip() {
  return (
    <section className="grain relative overflow-hidden bg-ivory py-24 md:py-28" aria-label="Guest ratings and awards">
      <EgretMotif className="absolute -right-4 bottom-0 hidden h-64 text-gold opacity-[0.13] lg:block" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <FadeUp className="text-center">
          <p className="kicker mb-4">Recognition</p>
          <h2 className="display text-[clamp(1.9rem,3.6vw,2.9rem)]">
            Rated <em className="italic">exceptional</em> by the people who stayed
          </h2>
          <RiverRule className="mx-auto mt-6" />
        </FadeUp>

        <StaggerGroup className="mt-14 grid grid-cols-2 gap-y-12 md:grid-cols-4">
          {AWARDS.map((a, i) => (
            <StaggerItem
              key={a.platform}
              className={`flex flex-col items-center text-center ${
                i > 0 ? 'md:border-l md:border-espresso/10' : ''
              }`}
            >
              <p className="display leading-none text-[3.4rem] md:text-[3.8rem]">
                {a.score}
                <span className="ml-1 align-top font-serif text-lg text-espresso/45">{a.outOf}</span>
              </p>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-dark">
                {a.platform}
              </p>
              <p className="mt-1.5 max-w-[180px] text-[11px] leading-relaxed tracking-[0.06em] text-espresso/55">
                {a.award}
              </p>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <FadeUp className="mt-12 text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] text-espresso/40">As rated by verified guests · 2026 award season</p>
        </FadeUp>
      </div>
    </section>
  )
}
