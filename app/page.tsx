import type { Metadata } from 'next'
import Link from 'next/link'
import NextImage from 'next/image'
import {
  Avatar,
  Badge,
  Container,
  Marquee,
  RelativeTime,
} from '@the_viveksingh/vivek-ui'

import { ArticleCard } from '@/components/article-card'
import { DeskStrips } from '@/components/desk-strips'
import { InertMarqueeClone } from '@/components/inert-marquee-clone'
import { JsonLd } from '@/components/json-ld'
import { MostRead } from '@/components/most-read'
import { NewsletterBand } from '@/components/newsletter-band'
import {
  ARTICLES_BY_DATE,
  CATEGORIES,
  type Article,
  articlesInCategory,
  getAuthor,
  getCategory,
  getFeatured,
  tickerHeadlines,
} from '@/data/articles'
import { SITE } from '@/data/site'
import { RATIO, photo } from '@/lib/images'
import { websiteNode } from '@/lib/seo'
import styles from './page.module.css'

export const metadata: Metadata = {
  // `absolute` opts out of the layout's `%s | The Ledger` template so the
  // front page carries the exact title the template is optimised for.
  title: {
    absolute: 'Free Next.js Blog / Magazine Template — The Ledger | VivekUI',
  },
  description: SITE.description,
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': [
        { url: '/feed.xml', title: `${SITE.name} — all articles` },
      ],
    },
  },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'Free Next.js Blog / Magazine Template — The Ledger | VivekUI',
    description: SITE.description,
    siteName: SITE.name,
    locale: SITE.locale,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Next.js Blog / Magazine Template — The Ledger | VivekUI',
    description: SITE.description,
    creator: SITE.twitter,
  },
}

export default function HomePage() {
  const lead = getFeatured()
  const leadAuthor = getAuthor(lead.authorId)
  const leadCategory = getCategory(lead.category)

  // Eight cards under the lead, skipping the lead itself.
  const latest = ARTICLES_BY_DATE.filter((a) => a.slug !== lead.slug).slice(0, 8)

  // Grouped on the server so the Tabs island never receives the full corpus.
  const byCategory: Record<string, Article[]> = Object.fromEntries(
    CATEGORIES.map((c) => [c.slug, articlesInCategory(c.slug).slice(0, 3)]),
  )

  const issueDate = new Date(ARTICLES_BY_DATE[0].publishedISO)

  return (
    <>
      <JsonLd data={websiteNode()} />

      {/* ---- Nameplate ------------------------------------------------
          The signature element: the wordmark set enormous, between two
          rules, with the folio line beneath it. Typography is the
          identity here, so this is the only thing above the fold that
          is allowed to be loud. */}
      <Container size="xl" as="header" className={styles.nameplate}>
        <h1 className={styles.nameplateTitle}>
          <span className="masthead">The Ledger</span>
        </h1>
        <div className={styles.nameplateFolio}>
          <span className="kicker">
            {issueDate.toLocaleDateString('en-GB', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              timeZone: 'UTC',
            })}
          </span>
          <p className={styles.tagline}>{SITE.tagline}</p>
          <span className="kicker">
            {ARTICLES_BY_DATE.length} stories &middot; 4 desks
          </span>
        </div>
      </Container>

      {/* ---- Breaking ticker ------------------------------------------ */}
      <div className={styles.ticker}>
        <Container size="xl" flush>
          <div className={styles.tickerRow}>
            <span className={`kicker ${styles.tickerLabel}`}>Breaking</span>
            <Marquee
              speed={0.6}
              pauseOnHover
              gradient
              gap={8}
              className={styles.marquee}
            >
              {tickerHeadlines().map((article) => (
                <Link
                  key={article.slug}
                  href={`/article/${article.slug}`}
                  className={styles.tickerItem}
                >
                  <span aria-hidden="true" className={styles.tickerDot}>
                    &#9679;
                  </span>
                  {article.title}
                </Link>
              ))}
            </Marquee>
            <InertMarqueeClone />
          </div>
        </Container>
      </div>

      <Container size="xl">
        {/* ---- Lead story --------------------------------------------- */}
        <article className={styles.lead}>
          <Link href={`/article/${lead.slug}`} className={styles.leadArt}>
            <NextImage
              src={photo(lead.hero.src, 1600, RATIO.wide)}
              alt={lead.hero.alt}
              width={1600}
              height={900}
              sizes="(min-width: 64rem) 62rem, 100vw"
              priority
              className={styles.leadImage}
            />
          </Link>

          <div className={styles.leadText}>
            <div className={styles.leadMeta}>
              <Badge variant="solid" tone="primary" className={styles.leadBadge}>
                {leadCategory?.name}
              </Badge>
              <span className="kicker">The lead</span>
            </div>

            <h2 className={styles.leadHeadline}>
              <Link href={`/article/${lead.slug}`} className={styles.leadLink}>
                {lead.title}
              </Link>
            </h2>

            <p className={styles.leadDek}>{lead.dek}</p>

            <div className={styles.leadByline}>
              <Avatar src={leadAuthor.avatar} name={leadAuthor.name} size="sm" />
              <span>
                <span className={styles.leadAuthor}>{leadAuthor.name}</span>
                <span aria-hidden="true"> &middot; </span>
                <RelativeTime date={lead.publishedISO} />
                <span aria-hidden="true"> &middot; </span>
                {lead.readMinutes} min read
              </span>
            </div>
          </div>
        </article>

        {/* ---- Latest + Most read ------------------------------------- */}
        <div className={styles.mainGrid}>
          <section aria-labelledby="latest" className={styles.latest}>
            <div className={styles.sectionHead}>
              <h2 id="latest" className={styles.sectionTitle}>
                Latest
              </h2>
              <span className="kicker">Updated continuously</span>
            </div>

            <div className={styles.latestGrid}>
              {latest.map((article) => (
                <ArticleCard
                  key={article.slug}
                  article={article}
                  headingLevel={3}
                />
              ))}
            </div>
          </section>

          <aside className={styles.rail}>
            <MostRead limit={5} />
          </aside>
        </div>

        {/* ---- The desks ---------------------------------------------- */}
        <DeskStrips categories={[...CATEGORIES]} byCategory={byCategory} />
      </Container>

      <NewsletterBand />
    </>
  )
}
