import type { Metadata } from 'next'

import { SITE_NAME, SITE_URL } from './constants'

type BuildMetadataArgs = {
  /** Page name without the site suffix, e.g. "Rooms & Suites" */
  title: string
  /** ~155 character description */
  description: string
  /** Path starting with /, without locale prefix, e.g. "/rooms" */
  path: string
  /** Absolute or site-relative OG image URL */
  image?: string
  imageAlt?: string
  type?: 'website' | 'article'
  publishedTime?: string
  /** Set true for the home page to use the full brand title */
  isHome?: boolean
}

const absolute = (url: string): string => (url.startsWith('http') ? url : `${SITE_URL}${url}`)

export function buildMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  type = 'website',
  publishedTime,
  isHome = false,
}: BuildMetadataArgs): Metadata {
  const fullTitle = isHome ? title : `${title} | ${SITE_NAME}`
  const canonical = `${SITE_URL}${path === '/' ? '' : path}` || SITE_URL
  const ogImage = image ? absolute(image) : `${SITE_URL}/og-default.jpg`

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical,
      languages: {
        en: canonical,
        'ne-NP': `${SITE_URL}/np${path === '/' ? '' : path}`,
        'x-default': canonical,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: 'en_US',
      type,
      ...(publishedTime ? { publishedTime } : {}),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: imageAlt ?? title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
    other: {
      'theme-color': '#7f9a76',
    },
  }
}
