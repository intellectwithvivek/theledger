'use client'

import { useState } from 'react'
import { Pagination, Text } from '@the_viveksingh/vivek-ui'

import { ArticleCard } from './article-card'
import type { Article } from '@/data/articles'
import styles from './paginated-grid.module.css'

/**
 * A category listing with paging.
 *
 * `Pagination` holds no state of its own — it is fully controlled — so the
 * page number lives here. Changing page moves focus to the grid heading
 * rather than leaving it on a button that may have just been re-labelled,
 * which is the difference between a usable control and one that silently
 * strands a keyboard user at the bottom of the page.
 */
export function PaginatedGrid({
  articles,
  perPage = 6,
  label,
}: {
  articles: Article[]
  perPage?: number
  label: string
}) {
  const [page, setPage] = useState(1)

  const pageCount = Math.max(1, Math.ceil(articles.length / perPage))
  const start = (page - 1) * perPage
  const visible = articles.slice(start, start + perPage)

  return (
    <div className={styles.wrap}>
      <h2 id="listing" tabIndex={-1} className={styles.srOnly}>
        {label}
      </h2>

      <div className={styles.grid}>
        {visible.map((article) => (
          <ArticleCard
            key={article.slug}
            article={article}
            headingLevel={3}
            // Two columns inside the xl container, so a card is ~37rem at
            // desktop widths — far wider than the default card slot.
            sizes="(min-width: 64rem) 38rem, (min-width: 40rem) 45vw, 100vw"
          />
        ))}
      </div>

      <div className={styles.footer}>
        <Text tone="muted" size="sm" className={`tnum ${styles.count}`}>
          Showing {visible.length} of {articles.length}
        </Text>

        {pageCount > 1 ? (
          <Pagination
            page={page}
            pageCount={pageCount}
            onPageChange={(next) => {
              setPage(next)
              document.getElementById('listing')?.focus()
            }}
            showFirstLast={pageCount > 3}
            size="sm"
            labels={{ root: `${label} pages` }}
          />
        ) : null}
      </div>
    </div>
  )
}
