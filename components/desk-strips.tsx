'use client'

import Link from 'next/link'
import { Tabs } from '@the_viveksingh/vivek-ui'

import { ArticleCard } from './article-card'
import type { Article, Category } from '@/data/articles'
import styles from './desk-strips.module.css'

interface DeskStripsProps {
  categories: Category[]
  /** Pre-grouped on the server so the client never filters the full corpus. */
  byCategory: Record<string, Article[]>
}

/**
 * The four desks, one tab each.
 *
 * Activation is manual rather than automatic: arrowing across four tabs
 * with automatic activation would swap the panel four times, which is
 * noisy for a screen-reader user and pointless here. Arrows move focus,
 * Enter or Space commits.
 */
export function DeskStrips({ categories, byCategory }: DeskStripsProps) {
  const first = categories[0]?.slug
  if (!first) return null

  return (
    <section aria-labelledby="desks" className={styles.section}>
      <div className={styles.head}>
        <h2 id="desks" className={styles.title}>
          The desks
        </h2>
        <p className={`kicker ${styles.hint}`}>Four beats, twelve stories</p>
      </div>

      <Tabs
        defaultValue={first}
        variant="line"
        activationMode="manual"
        className={styles.tabs}
      >
        <Tabs.List aria-label="Browse by desk" className={styles.tablist}>
          {categories.map((category) => (
            <Tabs.Tab
              key={category.slug}
              value={category.slug}
              className={styles.tab}
            >
              {category.name}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        <Tabs.Panels>
          {categories.map((category) => (
            <Tabs.Panel
              key={category.slug}
              value={category.slug}
              className={styles.panel}
            >
              <p className={styles.description}>{category.description}</p>

              <div className={`colgrid ${styles.strip}`}>
                {(byCategory[category.slug] ?? []).map((article) => (
                  <ArticleCard
                    key={article.slug}
                    article={article}
                    compact
                    headingLevel={3}
                  />
                ))}
              </div>

              <Link
                href={`/category/${category.slug}`}
                className={styles.more}
              >
                All {category.name} stories
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </Tabs.Panel>
          ))}
        </Tabs.Panels>
      </Tabs>
    </section>
  )
}
