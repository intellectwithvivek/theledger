import Link from 'next/link'
import { Sparkline } from '@the_viveksingh/vivek-ui/charts'

import { getCategory, mostRead, totalViews } from '@/data/articles'
import styles from './most-read.module.css'

/**
 * The numbered "Most read" rail.
 *
 * Each entry carries a seven-day view sparkline. `Sparkline` is pure SVG
 * with no client boundary, so the whole rail — charts included — is server
 * rendered and costs nothing in JavaScript.
 */
export function MostRead({ limit = 5 }: { limit?: number }) {
  const articles = mostRead(limit)
  // Formatting is done here, not in the chart, so the string is identical
  // on the server and in the browser and hydration cannot disagree.
  const format = (value: number) => `${Math.round(value).toLocaleString('en-IN')} views`

  return (
    <section aria-labelledby="most-read" className={styles.rail}>
      <h2 id="most-read" className={`kicker ${styles.title}`}>
        Most read this week
      </h2>

      <ol className={styles.list}>
        {articles.map((article, index) => (
          <li key={article.slug} className={styles.item}>
            <span aria-hidden="true" className={styles.rank}>
              {index + 1}
            </span>

            <div className={styles.body}>
              <h3 className={styles.headline}>
                <Link href={`/article/${article.slug}`} className={styles.link}>
                  {article.title}
                </Link>
              </h3>

              <p className={styles.meta}>
                <span className="kicker kicker-accent">
                  {getCategory(article.category)?.name}
                </span>
                <span className={`tnum ${styles.views}`}>
                  {totalViews(article).toLocaleString('en-IN')} views
                </span>
              </p>
            </div>

            <Sparkline
              data={article.views7d}
              width={96}
              height={30}
              strokeWidth={1.5}
              stroke="var(--vk-color-primary)"
              curve="smooth"
              showLastPoint
              fill
              className={styles.spark}
              title={`Seven-day view trend for ${article.title}`}
              description="Daily page views over the last seven days, oldest first."
              xLabel="Day"
              yLabel="Views"
              formatValue={format}
            />
          </li>
        ))}
      </ol>
    </section>
  )
}
