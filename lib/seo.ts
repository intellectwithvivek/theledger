import type { Metadata } from 'next'

import { SITE, absolute } from '@/data/site'
import {
  type Article,
  type Author,
  getAuthor,
  getCategory,
} from '@/data/articles'

/* ------------------------------------------------------------------ *
 * Structured data
 *
 * Every builder returns a plain object. The `<JsonLd>` component in
 * components/json-ld.tsx serialises it into a single script tag, so the
 * shape of the graph stays testable and nothing here touches the DOM.
 * ------------------------------------------------------------------ */

/** The publisher node, referenced by every article rather than inlined. */
export function organisationNode() {
  return {
    '@type': 'Organization',
    '@id': absolute('/#organisation'),
    name: SITE.name,
    url: SITE.url,
    logo: {
      '@type': 'ImageObject',
      url: absolute('/opengraph-image'),
      width: 1200,
      height: 630,
    },
  }
}

export function personNode(author: Author) {
  return {
    '@type': 'Person',
    '@id': absolute(`/#author-${author.id}`),
    name: author.name,
    description: author.bio,
    image: author.avatar,
    jobTitle: author.role,
  }
}

/** WebSite + SearchAction. Rendered once, on the homepage. */
export function websiteNode() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': absolute('/#website'),
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    inLanguage: SITE.language,
    publisher: organisationNode(),
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: absolute('/?q={search_term_string}'),
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function articleNode(article: Article) {
  const author = getAuthor(article.authorId)
  const category = getCategory(article.category)
  const url = absolute(`/article/${article.slug}`)

  return {
    '@context': 'https://schema.org',
    // A magazine feature is a NewsArticle; the BlogPosting type is kept
    // alongside it because both vocabularies are consumed in the wild.
    '@type': ['NewsArticle', 'BlogPosting'],
    '@id': `${url}#article`,
    headline: article.title,
    description: article.dek,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    image: [absolute(`/article/${article.slug}/opengraph-image`)],
    datePublished: article.publishedISO,
    dateModified: article.updatedISO ?? article.publishedISO,
    author: personNode(author),
    publisher: organisationNode(),
    articleSection: category?.name,
    keywords: article.tags.join(', '),
    wordCount: countWords(article),
    timeRequired: `PT${article.readMinutes}M`,
    inLanguage: SITE.language,
    isAccessibleForFree: true,
  }
}

export interface Crumb {
  name: string
  path: string
}

export function breadcrumbNode(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absolute(crumb.path),
    })),
  }
}

/**
 * A desk page: a `CollectionPage` whose `mainEntity` is the ordered list of
 * articles on it. The `ItemList` is what lets a crawler understand the page
 * as an index rather than as twelve loose links.
 */
export function collectionNode(options: {
  name: string
  description: string
  path: string
  articles: Article[]
}) {
  const url = absolute(options.path)

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${url}#collection`,
    url,
    name: options.name,
    description: options.description,
    inLanguage: SITE.language,
    isPartOf: { '@id': absolute('/#website') },
    publisher: organisationNode(),
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: options.articles.length,
      itemListOrder: 'https://schema.org/ItemListOrderDescending',
      itemListElement: options.articles.map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: absolute(`/article/${article.slug}`),
        name: article.title,
      })),
    },
  }
}

export function faqNode(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

/* ------------------------------------------------------------------ *
 * Metadata helpers
 * ------------------------------------------------------------------ */

/**
 * The OG/Twitter/canonical block every route needs, in one call.
 * `path` is always site-relative; `metadataBase` resolves it.
 */
export function pageMetadata(options: {
  title: string
  description: string
  path: string
  /** Set for articles so crawlers get the article-shaped OG type. */
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  section?: string
  tags?: string[]
  /**
   * Omit on an article, where a colocated `opengraph-image.tsx` in the same
   * segment supplies the card. Anywhere else this falls back to the
   * site-level card, because a route that declares its own `openGraph`
   * replaces the parent's wholesale — inherited images included — and would
   * otherwise ship with no `og:image` at all.
   */
  images?: string[]
}): Metadata {
  const {
    title,
    description,
    path,
    type = 'website',
    publishedTime,
    modifiedTime,
    authors,
    section,
    tags,
    images,
  } = options

  const card = images ?? (type === 'article' ? undefined : ['/opengraph-image'])

  return {
    title,
    description,
    alternates: {
      canonical: path,
      // Child routes replace the layout's `alternates` wholesale, so the
      // feed has to be restated here or it vanishes everywhere but the
      // front page.
      types: {
        'application/rss+xml': [
          { url: '/feed.xml', title: `${SITE.name} — all articles` },
        ],
      },
    },
    openGraph: {
      type,
      url: path,
      title,
      description,
      siteName: SITE.name,
      locale: SITE.locale,
      ...(card ? { images: card } : {}),
      ...(type === 'article'
        ? { publishedTime, modifiedTime, authors, section, tags }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: SITE.twitter,
      ...(card ? { images: card } : {}),
    },
  }
}

/** Rough word count over an article's text-bearing blocks. */
export function countWords(article: Article): number {
  let text = `${article.title} ${article.dek}`
  for (const block of article.blocks) {
    if (block.kind === 'p' || block.kind === 'h2' || block.kind === 'quote') {
      text += ` ${block.text}`
    } else if (block.kind === 'list') {
      text += ` ${block.items.join(' ')}`
    }
  }
  return text.split(/\s+/).filter(Boolean).length
}
