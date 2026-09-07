import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { slugField } from '../fields/slug'

export const Offers: CollectionConfig = {
  slug: 'offers',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'active', 'validFrom', 'validUntil'],
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField(),
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'validFrom',
      type: 'date',
      admin: { position: 'sidebar' },
    },
    {
      name: 'validUntil',
      type: 'date',
      admin: { position: 'sidebar' },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
