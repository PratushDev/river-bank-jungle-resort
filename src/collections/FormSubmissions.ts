import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['formType', 'name', 'email', 'createdAt'],
    description: 'Contact and event enquiries submitted from the website.',
  },
  access: {
    read: authenticated,
    create: anyone,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'formType',
      type: 'select',
      required: true,
      options: [
        { label: 'Contact', value: 'contact' },
        { label: 'Events Enquiry', value: 'events' },
      ],
    },
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { name: 'subject', type: 'text' },
    { name: 'eventDate', type: 'date' },
    { name: 'guests', type: 'number' },
    { name: 'message', type: 'textarea', required: true },
  ],
}
