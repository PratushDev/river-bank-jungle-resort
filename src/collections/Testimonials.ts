import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'guestName',
    defaultColumns: ['guestName', 'country', 'source', 'rating'],
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'guestName',
      type: 'text',
      required: true,
    },
    {
      name: 'country',
      type: 'text',
    },
    {
      name: 'source',
      type: 'select',
      required: true,
      options: [
        { label: 'TripAdvisor', value: 'tripadvisor' },
        { label: 'Booking.com', value: 'booking' },
        { label: 'Expedia', value: 'expedia' },
        { label: 'Trip.com', value: 'tripcom' },
      ],
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      required: true,
      defaultValue: 5,
    },
    {
      name: 'sourceUrl',
      type: 'text',
      admin: {
        description: 'Link to the original review (optional).',
      },
    },
  ],
}
