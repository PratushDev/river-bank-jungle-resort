import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const GalleryImages: CollectionConfig = {
  slug: 'gallery-images',
  admin: {
    useAsTitle: 'caption',
    defaultColumns: ['caption', 'category', 'order'],
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
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'resort',
      options: [
        { label: 'Resort', value: 'resort' },
        { label: 'Rooms', value: 'rooms' },
        { label: 'Dining', value: 'dining' },
        { label: 'Wildlife', value: 'wildlife' },
        { label: 'Experiences', value: 'experiences' },
        { label: 'Culture', value: 'culture' },
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
