import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { slugField } from '../fields/slug'

export const Experiences: CollectionConfig = {
  slug: 'experiences',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'duration', 'order'],
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
        description: 'A unique one-paragraph description for this experience.',
      },
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'duration',
      type: 'text',
      admin: {
        description: 'e.g. 3–4 hours, Half day',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
  ],
}
