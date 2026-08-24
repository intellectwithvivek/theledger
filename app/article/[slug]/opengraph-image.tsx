import { ImageResponse } from 'next/og'

import { ARTICLES, getArticle, getAuthor, getCategory } from '@/data/articles'

export const alt = 'An article in The Ledger'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** One card per article, all generated at build time. */
export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }))
}

/**
 * The share card.
 *
 * Typographic, like the site: a rule, the desk, the headline, the byline.
 * No photograph — the hero images are quiet by design and would only fight
 * the headline at this size. Satori supports a subset of CSS and lays out
 * with flexbox only, so every container here declares `display: flex`.
 */
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = getArticle(slug)

  if (!article) {
    return new ImageResponse(<Fallback />, size)
  }

  const author = getAuthor(article.authorId)
  const category = getCategory(article.category)
  const published = new Date(article.publishedISO).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })

  // The headline is the whole design, so its size follows its length.
  const headlineSize =
    article.title.length > 58 ? 60 : article.title.length > 40 ? 70 : 82

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#fbfaf8',
          color: '#15161a',
          padding: '64px 72px',
          fontFamily: 'serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '3px solid #15161a',
            paddingBottom: 22,
          }}
        >
          <div style={{ display: 'flex', fontSize: 40, fontWeight: 700 }}>
            The Ledger
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 20,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: '#123fc9',
              fontFamily: 'sans-serif',
              fontWeight: 700,
            }}
          >
            {category?.name ?? 'Feature'}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          <div
            style={{
              display: 'flex',
              fontSize: headlineSize,
              fontWeight: 700,
              lineHeight: 1.06,
              letterSpacing: -2,
              maxWidth: 1000,
            }}
          >
            {article.title}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 26,
              lineHeight: 1.35,
              color: '#4a4d57',
              maxWidth: 900,
            }}
          >
            {truncate(article.dek, 130)}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid #c9c7c2',
            paddingTop: 22,
            fontSize: 22,
            fontFamily: 'sans-serif',
            color: '#4a4d57',
          }}
        >
          <div style={{ display: 'flex' }}>
            {author.name} &middot; {published} &middot; {article.readMinutes} min
            read
          </div>
          <div style={{ display: 'flex', color: '#123fc9', fontWeight: 700 }}>
            Built with VivekUI
          </div>
        </div>
      </div>
    ),
    size,
  )
}

/** Used only if a slug slips through without a matching article. */
function Fallback() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fbfaf8',
        color: '#15161a',
        fontSize: 80,
        fontWeight: 700,
        fontFamily: 'serif',
      }}
    >
      The Ledger
    </div>
  )
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text
  return `${text.slice(0, text.lastIndexOf(' ', max))}…`
}
