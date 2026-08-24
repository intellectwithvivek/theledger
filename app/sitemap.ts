import type { MetadataRoute } from 'next'

import { ARTICLES_BY_DATE, CATEGORIES } from '@/data/articles'
import { absolute } from '@/data/site'

/**
 * Every route on the site, with a real `lastModified`.
 *
 * The dates come from the content rather than from build time, so a rebuild
 * that changes nothing does not tell crawlers that everything changed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const newest = ARTICLES_BY_DATE[0]
  const lastPublished = new Date(
    newest.updatedISO ?? newest.publishedISO,
  )

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absolute('/'),
      lastModified: lastPublished,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: absolute('/built-with'),
      lastModified: lastPublished,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((category) => {
    const newestInDesk = ARTICLES_BY_DATE.find((a) => a.category === category.slug)
    return {
      url: absolute(`/category/${category.slug}`),
      lastModified: new Date(
        newestInDesk?.updatedISO ?? newestInDesk?.publishedISO ?? lastPublished,
      ),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }
  })

  const articleRoutes: MetadataRoute.Sitemap = ARTICLES_BY_DATE.map(
    (article) => ({
      url: absolute(`/article/${article.slug}`),
      lastModified: new Date(article.updatedISO ?? article.publishedISO),
      changeFrequency: 'monthly' as const,
      priority: article.featured ? 0.9 : 0.6,
    }),
  )

  return [...staticRoutes, ...categoryRoutes, ...articleRoutes]
}
