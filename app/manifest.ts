import type { MetadataRoute } from 'next'

import { SITE } from '@/data/site'

/**
 * Web app manifest.
 *
 * Not a bid to be an installable app — it is here because the name, colours
 * and icon are what a browser uses when someone pins the site, and because
 * Lighthouse and several crawlers read it as part of the site's identity.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} — free Next.js magazine template`,
    short_name: SITE.name,
    description: SITE.description,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#123fc9',
    lang: SITE.language,
    categories: ['news', 'magazines', 'technology'],
    icons: [
      {
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
    ],
  }
}
