import { ARTICLES_BY_DATE, getAuthor, getCategory } from '@/data/articles'
import { SITE, absolute } from '@/data/site'

/**
 * RSS 2.0 for the whole newsroom.
 *
 * A magazine without a feed is a magazine nobody can follow, and feed
 * readers are still one of the few distribution channels that no platform
 * owns. It is also read by answer engines and crawlers as a clean, dated
 * index of the site, which is why it is linked from `<head>` as an
 * alternate representation rather than only from the footer.
 *
 * Statically generated: everything it needs is known at build time.
 */
export const dynamic = 'force-static'

/** Escapes the five XML predefined entities. */
function xml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export function GET() {
  const self = absolute('/feed.xml')
  const updated = new Date(
    ARTICLES_BY_DATE[0].updatedISO ?? ARTICLES_BY_DATE[0].publishedISO,
  ).toUTCString()

  const items = ARTICLES_BY_DATE.map((article) => {
    const url = absolute(`/article/${article.slug}`)
    const author = getAuthor(article.authorId)
    const category = getCategory(article.category)

    return [
      '    <item>',
      `      <title>${xml(article.title)}</title>`,
      `      <link>${xml(url)}</link>`,
      `      <guid isPermaLink="true">${xml(url)}</guid>`,
      `      <pubDate>${new Date(article.publishedISO).toUTCString()}</pubDate>`,
      `      <description>${xml(article.dek)}</description>`,
      `      <dc:creator>${xml(author.name)}</dc:creator>`,
      category ? `      <category>${xml(category.name)}</category>` : '',
      ...article.tags.map((tag) => `      <category>${xml(tag)}</category>`),
      '    </item>',
    ]
      .filter(Boolean)
      .join('\n')
  }).join('\n')

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${xml(SITE.name)}</title>
    <link>${xml(SITE.url)}</link>
    <description>${xml(SITE.description)}</description>
    <language>${xml(SITE.language)}</language>
    <lastBuildDate>${updated}</lastBuildDate>
    <generator>Next.js</generator>
    <atom:link href="${xml(self)}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`

  return new Response(body, {
    headers: {
      'content-type': 'application/rss+xml; charset=utf-8',
      'cache-control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
