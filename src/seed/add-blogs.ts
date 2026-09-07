/**
 * Add the extra journal posts to an existing database (skips ones already
 * present). Run with: pnpm seed:blogs
 */
import { getPayload } from 'payload'

import config from '../payload.config'
import { seedExtraBlogs } from './extra-blogs'

const run = async () => {
  const payload = await getPayload({ config })
  await seedExtraBlogs(payload)
  payload.logger.info('Extra blogs done.')
  process.exit(0)
}

run().catch((err) => {
  console.error('Adding blogs failed:', err)
  process.exit(1)
})
