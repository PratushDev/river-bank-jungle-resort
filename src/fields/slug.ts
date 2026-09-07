import type { Field } from 'payload'

const format = (val: string): string =>
  val
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

/**
 * Slug field that auto-generates from another field (default: title)
 * when left empty, but can be overridden by editors.
 */
export const slugField = (fieldToUse = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  index: true,
  unique: true,
  admin: {
    position: 'sidebar',
    description: 'URL path segment. Leave blank to auto-generate from the title.',
  },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        if (typeof value === 'string' && value.length > 0) return format(value)
        const fallback = data?.[fieldToUse]
        if (typeof fallback === 'string' && fallback.length > 0) return format(fallback)
        return value
      },
    ],
  },
})
