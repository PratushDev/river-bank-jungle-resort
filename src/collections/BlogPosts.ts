import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { slugField } from '../fields/slug'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'category', 'publishedDate'],
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  defaultSort: '-publishedDate',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField(),
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Shown on blog cards and used as the meta description (~155 characters).',
      },
    },
    {
      name: 'body',
      type: 'richText',
      required: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'author',
      type: 'text',
      defaultValue: 'River Bank Jungle Resort',
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Travel Guide', value: 'travel-guide' },
        { label: 'Wildlife', value: 'wildlife' },
        { label: 'Culture', value: 'culture' },
        { label: 'Resort News', value: 'resort-news' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'relatedRooms',
      type: 'relationship',
      relationTo: 'rooms',
      hasMany: true,
      admin: {
        description: 'Rooms to cross-link from this article (internal linking for SEO).',
      },
    },
    {
      name: 'relatedExperiences',
      type: 'relationship',
      relationTo: 'experiences',
      hasMany: true,
      admin: {
        description: 'Experiences to cross-link from this article.',
      },
    },
  ],
}
