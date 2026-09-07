import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Amenities } from './collections/Amenities'
import { Rooms } from './collections/Rooms'
import { DiningVenues } from './collections/DiningVenues'
import { Experiences } from './collections/Experiences'
import { Offers } from './collections/Offers'
import { BlogPosts } from './collections/BlogPosts'
import { Testimonials } from './collections/Testimonials'
import { FAQs } from './collections/FAQs'
import { GalleryImages } from './collections/GalleryImages'
import { FormSubmissions } from './collections/FormSubmissions'
import { NewsletterSignups } from './collections/NewsletterSignups'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Amenities,
    Rooms,
    DiningVenues,
    Experiences,
    Offers,
    BlogPosts,
    Testimonials,
    FAQs,
    GalleryImages,
    FormSubmissions,
    NewsletterSignups,
  ],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [],
})
