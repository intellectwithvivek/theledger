import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Breadcrumb, Container } from '@the_viveksingh/vivek-ui'

import { JsonLd } from '@/components/json-ld'
import { PaginatedGrid } from '@/components/paginated-grid'
import { CATEGORIES, articlesInCategory, getCategory } from '@/data/articles'
import type { CategorySlug } from '@/data/articles'
import { SITE } from '@/data/site'
import { breadcrumbNode, collectionNode, pageMetadata } from '@/lib/seo'
import styles from './page.module.css'

interface RouteParams {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ slug: category.slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { slug } = await params
  const category = getCategory(slug)

  if (!category) return { title: 'Desk not found' }

  const count = articlesInCategory(category.slug).length

  return pageMetadata({
    title: `${category.name} — ${count} stories`,
    description: category.description,
    path: `/category/${category.slug}`,
  })
}

export default async function CategoryPage({ params }: RouteParams) {
  const { slug } = await params
  const category = getCategory(slug)

  if (!category) notFound()

  const articles = articlesInCategory(category.slug as CategorySlug)

  return (
    <Container size="xl" className={styles.page}>
      <JsonLd
        data={collectionNode({
          name: `${category.name} — ${SITE.name}`,
          description: category.description,
          path: `/category/${category.slug}`,
          articles,
        })}
      />
      <JsonLd
        data={breadcrumbNode([
          { name: 'Front page', path: '/' },
          { name: category.name, path: `/category/${category.slug}` },
        ])}
      />

      <Breadcrumb
        size="sm"
        className={styles.crumbs}
        label="You are here"
        items={[
          { label: 'Front page', href: '/' },
          { label: category.name },
        ]}
      />

      <header className={styles.header}>
        <p className="kicker kicker-accent">The {category.name} desk</p>
        <h1 className={styles.title}>{category.name}</h1>
        <p className={styles.description}>{category.description}</p>
        <p className={`kicker ${styles.count}`}>
          {articles.length} {articles.length === 1 ? 'story' : 'stories'}
        </p>
      </header>

      {/* Two per page: each desk carries three stories, so this is what
          makes the Pagination control real rather than decorative. Raise it
          once a desk has more to say. */}
      <PaginatedGrid
        articles={articles}
        perPage={2}
        label={`${category.name} articles`}
      />
    </Container>
  )
}
