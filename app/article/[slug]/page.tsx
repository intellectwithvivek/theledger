import type { Metadata } from 'next'
import Link from 'next/link'
import NextImage from 'next/image'
import { notFound } from 'next/navigation'
import {
  Badge,
  Breadcrumb,
  Button,
  Container,
  EmptyState,
} from '@the_viveksingh/vivek-ui'

import { ArticleBody } from '@/components/article-body'
import { ArticleCard } from '@/components/article-card'
import { Byline } from '@/components/byline'
import { JsonLd } from '@/components/json-ld'
import { QuickAnswers } from '@/components/quick-answers'
import { ReadingProgress } from '@/components/reading-progress'
import { ShareRow } from '@/components/share-row'
import {
  ARTICLES,
  getArticle,
  getAuthor,
  getCategory,
  relatedArticles,
} from '@/data/articles'
import { SITE, absolute } from '@/data/site'
import { RATIO, photo } from '@/lib/images'
import {
  articleNode,
  breadcrumbNode,
  faqNode,
  pageMetadata,
} from '@/lib/seo'
import styles from './page.module.css'

interface RouteParams {
  params: Promise<{ slug: string }>
}

/** Every article is known at build time, so all twelve prerender. */
export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }))
}

/** An unknown slug is a 404, not an empty page. */
export const dynamicParams = false

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)

  if (!article) return { title: 'Article not found' }

  const author = getAuthor(article.authorId)
  const category = getCategory(article.category)

  return pageMetadata({
    title: article.title,
    description: article.dek,
    path: `/article/${article.slug}`,
    type: 'article',
    publishedTime: article.publishedISO,
    modifiedTime: article.updatedISO ?? article.publishedISO,
    authors: [author.name],
    section: category?.name,
    tags: article.tags,
  })
}

export default async function ArticlePage({ params }: RouteParams) {
  const { slug } = await params
  const article = getArticle(slug)

  if (!article) notFound()

  const author = getAuthor(article.authorId)
  const category = getCategory(article.category)
  const related = relatedArticles(article, 3)
  const url = absolute(`/article/${article.slug}`)

  const crumbs = [
    { name: 'Front page', path: '/' },
    { name: category?.name ?? 'Desk', path: `/category/${article.category}` },
    { name: article.title, path: `/article/${article.slug}` },
  ]

  return (
    <>
      <ReadingProgress />

      <JsonLd data={articleNode(article)} />
      <JsonLd data={breadcrumbNode(crumbs)} />
      {article.faq ? <JsonLd data={faqNode(article.faq)} /> : null}

      <Container size="lg" as="article" className={styles.page}>
        <Breadcrumb
          size="sm"
          className={styles.crumbs}
          label="You are here"
          items={[
            { label: 'Front page', href: '/' },
            {
              label: category?.name ?? 'Desk',
              href: `/category/${article.category}`,
            },
            { label: article.title },
          ]}
        />

        <header className={styles.header}>
          <div className={styles.kickerRow}>
            <Badge variant="solid" tone="primary" className={styles.badge}>
              {category?.name}
            </Badge>
            {article.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="kicker">
                {tag}
              </span>
            ))}
          </div>

          <h1 className={styles.headline}>{article.title}</h1>
          <p className={styles.dek}>{article.dek}</p>
        </header>

        <Byline article={article} author={author} />

        <figure className={styles.hero}>
          <NextImage
            src={photo(article.hero.src, 1600, RATIO.wide)}
            alt={article.hero.alt}
            width={1600}
            height={900}
            sizes="(min-width: 64rem) 60rem, 100vw"
            priority
            className={styles.heroImage}
          />
          <figcaption className={styles.heroCaption}>
            {article.hero.alt}
            <span aria-hidden="true"> &middot; </span>
            <span className="kicker">{article.hero.credit}</span>
          </figcaption>
        </figure>

        <ArticleBody blocks={article.blocks} />

        {article.faq ? (
          <QuickAnswers items={article.faq} name={`faq-${article.slug}`} />
        ) : null}

        <ShareRow url={url} title={article.title} />

        {/* ---- Related ------------------------------------------------ */}
        <section aria-labelledby="related" className={styles.related}>
          <div className={styles.sectionHead}>
            <h2 id="related" className={styles.sectionTitle}>
              Read next
            </h2>
            <Link
              href={`/category/${article.category}`}
              className={styles.moreLink}
            >
              More from {category?.name}
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>

          <div className={`colgrid ${styles.relatedGrid}`}>
            {related.map((item) => (
              <ArticleCard key={item.slug} article={item} headingLevel={3} />
            ))}
          </div>
        </section>

        {/* ---- Comments ----------------------------------------------- */}
        <section aria-labelledby="comments" className={styles.comments}>
          <h2 id="comments" className={styles.sectionTitle}>
            Comments
          </h2>
          <EmptyState
            className={styles.empty}
            headingLevel={3}
            icon={<span aria-hidden="true">&#9998;</span>}
            title="Be the first to write in"
            description={`No letters on this piece yet. ${SITE.name} is a template, so comments are a placeholder — wire this block up to your own backend.`}
            actions={
              <Button variant="outline" size="sm" disabled>
                Write a letter
              </Button>
            }
          />
        </section>
      </Container>
    </>
  )
}
