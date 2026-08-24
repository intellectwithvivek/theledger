/**
 * Single source of truth for the site's identity, canonical URL and every
 * outbound VivekUI link (each one UTM-tagged by placement).
 *
 * Change `SITE.url` and every canonical, Open Graph URL, sitemap entry and
 * JSON-LD `@id` on the site follows it. Nothing else hard-codes the origin.
 */

export const SITE = {
  name: 'The Ledger',
  tagline: 'Technology, culture, and the numbers underneath.',
  description:
    'The Ledger is a free, open-source Next.js 16 magazine and blog template built with VivekUI — typography-first, server-rendered, and ready to deploy.',
  url: 'https://theledger.vivekkumarsingh.in',
  locale: 'en_IN',
  language: 'en',
  twitter: '@theviveksingh',
  repo: 'https://github.com/intellectwithvivek/theledger',
  repoName: 'intellectwithvivek/theledger',
  cloneCommand: 'git clone https://github.com/intellectwithvivek/theledger.git',
} as const

export const VIVEKUI = {
  docs: 'https://ui.vivekkumarsingh.in/docs',
  components: 'https://ui.vivekkumarsingh.in/docs/components',
  npm: 'https://www.npmjs.com/package/@the_viveksingh/vivek-ui',
  github: 'https://github.com/intellectwithvivek/vivek_UI',
  author: 'https://vivekkumarsingh.in/',
  authorName: 'Vivek Kumar Singh',
  install: 'npm i @the_viveksingh/vivek-ui',
  blurb:
    'Built with ❤️ using VivekUI — 91 React components · 6 SVG charts · zero runtime dependencies. One install, one CSS import, no config.',
} as const

/** UTM campaign slug for this template. */
export const UTM_CAMPAIGN = 'magazine'

type Medium = 'footer' | 'navbar' | 'builtwith' | 'readme' | 'article'

/** Appends the template's UTM triplet to a VivekUI link. */
export function utm(href: string, medium: Medium): string {
  const url = new URL(href)
  url.searchParams.set('utm_source', 'vivekui-template')
  url.searchParams.set('utm_campaign', UTM_CAMPAIGN)
  url.searchParams.set('utm_medium', medium)
  return url.toString()
}

/** Deep link to one component's documentation page, UTM-tagged for /built-with. */
export function componentDocs(slug: string): string {
  return utm(`${VIVEKUI.components}/${slug}`, 'builtwith')
}

/** Charts live under their own docs section, not under /components. */
export function chartDocs(slug: string): string {
  return utm(`${VIVEKUI.docs}/charts/${slug}`, 'builtwith')
}

/** Absolute URL for canonicals, OG tags and JSON-LD. */
export function absolute(path: string): string {
  return new URL(path, SITE.url).toString()
}

/** GitHub's "create a repo from this template" entry point. */
export const REPO_TEMPLATE_URL = `${SITE.repo}/generate`
