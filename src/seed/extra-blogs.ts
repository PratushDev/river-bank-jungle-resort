import fs from 'fs'
import path from 'path'
import type { Payload } from 'payload'

import { heading, listItems, paragraph, richText } from './lexical'

/**
 * Five additional journal posts. Idempotent per-slug, so it can run against
 * a live database (pnpm seed:blogs) and is also called from the main seed.
 */
export async function seedExtraBlogs(payload: Payload): Promise<void> {
  /** Reuse an already-uploaded placeholder media doc, or create it from public/placeholders. */
  async function mediaByKey(key: string, alt: string): Promise<string | undefined> {
    const existing = await payload.find({
      collection: 'media',
      where: { filename: { like: key } },
      limit: 1,
    })
    if (existing.docs[0]) return String(existing.docs[0].id)
    try {
      const buf = fs.readFileSync(path.resolve(process.cwd(), 'public', 'placeholders', `${key}.jpg`))
      const doc = await payload.create({
        collection: 'media',
        data: { alt },
        file: { data: buf, name: `${key}.jpg`, mimetype: 'image/jpeg', size: buf.length },
      })
      return String(doc.id)
    } catch {
      return undefined
    }
  }

  async function experienceIds(titles: string[]): Promise<string[]> {
    const { docs } = await payload.find({
      collection: 'experiences',
      where: { title: { in: titles } },
      limit: 20,
    })
    return docs.map((d) => String(d.id))
  }

  async function roomIds(slugs: string[]): Promise<string[]> {
    const { docs } = await payload.find({
      collection: 'rooms',
      where: { slug: { in: slugs } },
      limit: 10,
    })
    return docs.map((d) => String(d.id))
  }

  const posts = [
    {
      title: 'Sauraha vs Patihani: Where to Stay in Chitwan',
      slug: 'sauraha-vs-patihani-where-to-stay-in-chitwan',
      excerpt:
        'Most visitors default to busy Sauraha — but the quiet Patihani side of Chitwan National Park offers the same safaris without the crowds. An honest comparison.',
      publishedDate: '2026-08-03T00:00:00.000Z',
      category: 'travel-guide' as const,
      imageKey: 'village',
      imageAlt: 'Quiet lane through a Tharu village near Patihani in morning mist',
      relatedRoomSlugs: ['deluxe-room', 'villa-with-private-plunge-pool'],
      relatedExperienceTitles: ['Village Tour', 'Sundowner on the Riverbank'],
      body: richText(
        paragraph(
          'Search for Chitwan hotels and nearly every result lands in Sauraha — the park’s busy eastern gateway, with its strip of guesthouses, souvenir shops and tour desks. It works, but it is not the only way to do Chitwan, and for many travellers it is not the best one.',
        ),
        heading('The Case for Sauraha'),
        paragraph(
          'Sauraha earns its popularity: the widest choice of budget rooms, walk-in tour operators on every corner, and an evening scene of riverside bars. If you are backpacking on a tight budget and want to organise everything on arrival, it delivers.',
        ),
        heading('The Case for Patihani'),
        paragraph(
          'Patihani, on the park’s quieter northwestern side, is a Tharu farming village where the Rapti still feels like a working river. Lodges here sit directly on the bank — no road, no strip, no crowd between you and the water. You hear peafowl at dawn instead of tour buses. The same jeep safaris, canoe trips and jungle walks run from this side, with your lodge arranging permits and guides.',
        ),
        heading('The Honest Trade-offs'),
        listItems([
          'Nightlife: Sauraha has bars and restaurants; Patihani evenings are bonfires and river sunsets',
          'Crowds: Sauraha’s river frontage gets busy at sunset; Patihani’s is often yours alone',
          'Wildlife at the door: rhinos regularly cross near Patihani’s quieter banks',
          'Logistics: both are ~25–35 minutes from Bharatpur Airport; both arrange full safari programmes',
        ]),
        paragraph(
          'Our take is unsurprising — River Bank Jungle Resort sits on the Patihani riverbank precisely because this is the Chitwan we wanted to share: the park at full volume, the tourism turned down.',
        ),
      ),
    },
    {
      title: 'One-Horned Rhinos of Chitwan: Where and When to See Them',
      slug: 'one-horned-rhinos-of-chitwan',
      excerpt:
        'Chitwan holds nearly 700 greater one-horned rhinoceros — the world’s second-largest population. Where they graze, when to look, and how to watch them safely.',
      publishedDate: '2026-06-30T00:00:00.000Z',
      category: 'wildlife' as const,
      imageKey: 'rhino',
      imageAlt: 'Greater one-horned rhinoceros grazing in Chitwan grassland',
      relatedRoomSlugs: [],
      relatedExperienceTitles: ['Jeep Safari', 'Jungle Walk', 'Canoe Safari'],
      body: richText(
        paragraph(
          'The greater one-horned rhinoceros is Chitwan’s signature animal and one of Asia’s great conservation comebacks: from around 100 animals in the 1960s to nearly 700 in the park today, the world’s second-largest population after Kaziranga.',
        ),
        heading('Where They Are'),
        paragraph(
          'Rhinos are grazers, so think grass and water: the floodplain grasslands along the Rapti, the oxbow lakes, and the riverbanks at dawn and dusk when they come down to drink and wallow. Guests at riverside lodges regularly spot them from the breakfast table — no jeep required.',
        ),
        heading('When to Look'),
        listItems([
          'February–April: grasses are cut and burned, visibility is at its best',
          'Early morning and late afternoon: peak activity at the water',
          'Hot-season middays: wallowing in mud pools and river shallows',
          'Monsoon: still present, but tall grass makes sightings harder',
        ]),
        heading('Watching Them Safely'),
        paragraph(
          'A rhino can outrun you. Keep distance, stay quiet, never get between a mother and calf, and follow your naturalist’s instructions — on foot they will read the animal’s mood long before you do. From a jeep or canoe, sightings are relaxed; on jungle walks, guides keep a respectful margin and an escape route.',
        ),
        paragraph(
          'Every safari fee contributes to the park protection that made this recovery possible — seeing a rhino here is not just a photograph, it is the receipt for fifty years of conservation work.',
        ),
      ),
    },
    {
      title: "A Birdwatcher's Guide to Chitwan",
      slug: 'birdwatchers-guide-to-chitwan',
      excerpt:
        'With more than 540 recorded species, Chitwan is one of Asia’s great birding destinations. The seasons, the hotspots and the species worth waking early for.',
      publishedDate: '2026-06-10T00:00:00.000Z',
      category: 'wildlife' as const,
      imageKey: 'bird',
      imageAlt: 'Kingfisher in flight over the Rapti River',
      relatedRoomSlugs: [],
      relatedExperienceTitles: ['Bird Watching', 'Canoe Safari'],
      body: richText(
        paragraph(
          'Tigers get the headlines, but ask a naturalist what makes Chitwan special and many will answer with a number: more than 540 bird species recorded in and around the park — hornbills to herons, paradise flycatchers to Bengal floricans.',
        ),
        heading('The Seasons'),
        paragraph(
          'Winter (November–February) is prime time, when resident species are joined by migratory waterfowl from Tibet and Siberia crowding the rivers and oxbow lakes. March–May brings breeding plumage and constant song; even the monsoon has its rewards, with storks and egrets working the flooded paddies.',
        ),
        heading('Five to Wake Early For'),
        listItems([
          'Great hornbill — huge, improbable, unforgettable in flight',
          'White-throated kingfisher — the electric-blue regular of the riverbank',
          'Lesser adjutant stork — a prehistoric silhouette on the sandbars',
          'Paradise flycatcher — ribbon-tailed and dazzling in the sal forest',
          'Bengal florican — one of the world’s rarest bustards, in the grasslands',
        ]),
        heading('How to Bird Here'),
        paragraph(
          'A canoe drift is the gentlest hide you will ever use — silent, low, and eye-level with the bank. Pair it with a dawn walk along the river and a guide who knows the calls; bring binoculars, and ask the lodge for the bird checklist at breakfast.',
        ),
      ),
    },
    {
      title: 'Tharu Culture in Chitwan: Dance, Food and Village Life',
      slug: 'tharu-culture-in-chitwan',
      excerpt:
        'The Tharu people have farmed the Terai beside Chitwan’s wildlife for centuries. Their stick dance, their kitchens and how to visit their villages respectfully.',
      publishedDate: '2026-05-18T00:00:00.000Z',
      category: 'culture' as const,
      imageKey: 'culture',
      imageAlt: 'Tharu dancers performing the traditional stick dance',
      relatedRoomSlugs: [],
      relatedExperienceTitles: ['Tharu Cultural Dance', 'Village Tour'],
      body: richText(
        paragraph(
          'Long before Chitwan was a national park, it was Tharu country. This indigenous Terai community developed a way of life alongside rhinos, tigers and malaria that kept outsiders away for centuries — and their culture remains the human heart of any visit here.',
        ),
        heading('The Stick Dance'),
        paragraph(
          'The lathi naach — stick dance — is the performance most guests meet first: drummers set a driving rhythm while dancers clash staves in whirling, precise patterns once meant to drive off wild animals and evil spirits. Ask whether performers come from the local community; in Patihani, ours do, and the fees go directly to them.',
        ),
        heading('The Kitchen'),
        paragraph(
          'Tharu food is Terai food: freshwater fish, snails and crab from the rivers, rice in a dozen forms, and dhikri — steamed rice-flour dumplings served with fiery chutney. Anadi rice, a sticky heritage variety grown almost nowhere else, appears in both dumplings and the local rice beer.',
        ),
        heading('Visiting a Village Well'),
        listItems([
          'Go with a local guide who can introduce you — a village is a home, not an exhibit',
          'Ask before photographing people, especially elders',
          'Buy crafts and snacks directly from the makers',
          'Learn one greeting; the smiles it earns are worth ten photographs',
        ]),
      ),
    },
    {
      title: 'Getting to Chitwan from Kathmandu and Pokhara',
      slug: 'getting-to-chitwan-from-kathmandu-and-pokhara',
      excerpt:
        'Fly 25 minutes or drive 5–6 hours? Every route to Chitwan compared — flights to Bharatpur, the highway drive, tourist buses and what airport pickup looks like.',
      publishedDate: '2026-04-22T00:00:00.000Z',
      category: 'travel-guide' as const,
      imageKey: 'river',
      imageAlt: 'Boatman poling a dugout canoe on the Rapti River at golden hour',
      relatedRoomSlugs: ['super-deluxe-room'],
      relatedExperienceTitles: [],
      body: richText(
        paragraph(
          'Chitwan sits in Nepal’s lowland Terai, roughly 165 km southwest of Kathmandu — close on the map, further in practice, thanks to hill roads. Here is how the options actually compare.',
        ),
        heading('By Air: 25 Minutes'),
        paragraph(
          'Buddha Air and Yeti Airlines fly Kathmandu–Bharatpur several times daily; the hop takes about 25 minutes and often serves Himalayan views on the right side. From Bharatpur Airport it is roughly 25 km — a 30-minute drive — to the Patihani side of the park. Lodges arrange pickup; share your flight number when you book.',
        ),
        heading('By Road: 5–6 Hours'),
        paragraph(
          'The drive from Kathmandu or Pokhara takes five to six hours in normal conditions, following river valleys most of the way. A private car lets you stop at the Trishuli rafting beaches and viewpoint teahouses; tourist buses run daily from both cities to Sauraha and Bharatpur and are the budget standby.',
        ),
        heading('Which to Choose'),
        listItems([
          'Short on time or prone to car-sickness: fly — it turns a travel day into a safari afternoon',
          'Want scenery and flexibility: private car, with a lunch stop on the Trishuli',
          'Tight budget: tourist bus, booked a day ahead in season',
          'Combining Kathmandu + Pokhara + Chitwan: the classic triangle works in either direction by road',
        ]),
        paragraph(
          'However you arrive, aim to reach the resort by mid-afternoon — in time for tea on the riverbank and the first sundowner as the buffalo cross the shallows.',
        ),
      ),
    },
  ]

  for (const post of posts) {
    const exists = await payload.find({
      collection: 'blog-posts',
      where: { slug: { equals: post.slug } },
      limit: 1,
    })
    if (exists.docs.length > 0) {
      payload.logger.info(`  blog exists, skipping: ${post.slug}`)
      continue
    }

    const [coverImage, relatedRooms, relatedExperiences] = await Promise.all([
      mediaByKey(post.imageKey, post.imageAlt),
      roomIds(post.relatedRoomSlugs),
      experienceIds(post.relatedExperienceTitles),
    ])

    await payload.create({
      collection: 'blog-posts',
      data: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        publishedDate: post.publishedDate,
        category: post.category,
        author: 'River Bank Jungle Resort',
        coverImage,
        body: post.body,
        relatedRooms,
        relatedExperiences,
      },
    })
    payload.logger.info(`  blog added: ${post.slug}`)
  }
}
