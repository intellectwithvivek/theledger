import type { MetadataRoute } from 'next'

import { SITE } from '@/data/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Nothing here is private; the disallow only keeps Next's build
        // assets out of the index, where they are noise.
        disallow: ['/_next/'],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  }
}
