import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { slugField } from '../fields/slug'

export const DiningVenues: CollectionConfig = {
  slug: 'dining-venues',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'order'],
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField(),
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'cuisine',
      type: 'text',
      admin: {
        description: 'e.g. Nepali, Indian, Japanese, Continental',
      },
    },
    {
      name: 'hours',
      type: 'text',
      admin: {
        description: 'e.g. 6:30 AM – 10:30 PM',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
  ],
}
