import { setRequestLocale } from 'next-intl/server'

import { Card } from '@/components/Card'
import { Hero } from '@/components/Hero'
import { JsonLd } from '@/components/JsonLd'
import { SectionHeading } from '@/components/SectionHeading'
import { StaggerGroup, StaggerItem } from '@/components/motion'
import { getRooms } from '@/lib/data'
import { PLACEHOLDER } from '@/lib/images'
import { breadcrumbSchema } from '@/lib/jsonld'
import { resolveMedia } from '@/lib/media'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 3600

export const metadata = buildMetadata({
  title: 'Rooms & Suites',
  description:
    'Deluxe rooms, super deluxe rooms and villas with private plunge pools at River Bank Jungle Resort, Patihani, Chitwan — AC, balconies, marble floors and jungle views.',
  path: '/rooms',
})

export default async function RoomsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const rooms = await getRooms()
  const fallbacks = [PLACEHOLDER.room, PLACEHOLDER.roomAlt, PLACEHOLDER.villa]

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Rooms & Suites', path: '/rooms' },
        ])}
      />
      <Hero
        size="banner"
        image={{ url: PLACEHOLDER.room, alt: 'A softly lit resort bedroom with a balcony facing the jungle' }}
        label="Stay"
        title="Rooms & Suites"
        subtitle="Every room faces the river or the gardens — cool marble underfoot, the Terai at the window."
      />

      <section className="grain bg-ivory py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            label="Choose Your Space"
            title="From Deluxe Rooms to Private Plunge Pools"
          />
          <StaggerGroup className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room, i) => (
              <StaggerItem key={room.id}>
                <Card
                  image={
                    resolveMedia(room.gallery?.[0]?.image, 'card') ?? {
                      url: fallbacks[i % fallbacks.length],
                      alt: room.title,
                      width: 1600,
                      height: 1067,
                    }
                  }
                  title={room.title}
                  description={room.shortDescription}
                  href={`/rooms/${room.slug}`}
                  meta={
                    room.priceFrom?.amount
                      ? `From ${room.priceFrom.currency ?? 'USD'} ${room.priceFrom.amount} per night`
                      : undefined
                  }
                />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </>
  )
}
