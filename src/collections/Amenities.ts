import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const Amenities: CollectionConfig = {
  slug: 'amenities',
  admin: {
    useAsTitle: 'name',
    description: 'Master list of room amenities. Rooms pick from this list.',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
  ],
}
