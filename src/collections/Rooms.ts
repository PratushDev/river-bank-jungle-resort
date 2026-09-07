import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { slugField } from '../fields/slug'

export const Rooms: CollectionConfig = {
  slug: 'rooms',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'priceFrom', 'order'],
    description: 'Rooms & suites. Lower "order" appears first.',
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
      admin: {
        description: 'One or two sentences shown on room cards and in search results.',
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'features',
      type: 'array',
      admin: {
        description: 'Key facts, e.g. Size — 378 sq.ft, Occupancy — 2 adults + 1 child.',
      },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
      ],
    },
    {
      name: 'amenities',
      type: 'relationship',
      relationTo: 'amenities',
      hasMany: true,
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
      name: 'priceFrom',
      type: 'group',
      admin: {
        description: 'Optional "from" price shown on cards. Leave amount empty to hide.',
      },
      fields: [
        { name: 'amount', type: 'number', min: 0 },
        {
          name: 'currency',
          type: 'select',
          defaultValue: 'USD',
          options: [
            { label: 'USD', value: 'USD' },
            { label: 'NPR', value: 'NPR' },
          ],
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
