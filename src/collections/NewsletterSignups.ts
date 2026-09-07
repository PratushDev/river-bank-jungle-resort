import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const NewsletterSignups: CollectionConfig = {
  slug: 'newsletter-signups',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'createdAt'],
  },
  access: {
    read: authenticated,
    create: anyone,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
  ],
}
