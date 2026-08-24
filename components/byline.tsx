import { Avatar, Card, RelativeTime, Text } from '@the_viveksingh/vivek-ui'

import type { Article, Author } from '@/data/articles'
import styles from './byline.module.css'

/**
 * The author card under an article headline.
 *
 * The published date is a real `<time datetime>` twice over: once as the
 * absolute date a reader can cite, and once through `RelativeTime`, which
 * renders the absolute value on the server and swaps to "3 days ago" after
 * mount — so the markup is identical on both sides of hydration and the
 * page still shows a usable timestamp with JavaScript disabled.
 */
export function Byline({
  article,
  author,
}: {
  article: Article
  author: Author
}) {
  const published = new Date(article.publishedISO)

  return (
    <Card variant="ghost" padding="none" className={styles.byline}>
      <Avatar src={author.avatar} name={author.name} size="lg" />

      <div className={styles.detail}>
        <p className={styles.name}>
          By <span className={styles.strong}>{author.name}</span>
          <span className={styles.role}>{author.role}</span>
        </p>

        <Text tone="muted" size="sm" className={styles.bio}>
          {author.bio}
        </Text>

        <p className={styles.stamp}>
          <time dateTime={article.publishedISO}>
            {published.toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              timeZone: 'UTC',
            })}
          </time>
          <span aria-hidden="true"> &middot; </span>
          <RelativeTime date={article.publishedISO} />
          <span aria-hidden="true"> &middot; </span>
          {article.readMinutes} min read
          {article.updatedISO ? (
            <>
              <span aria-hidden="true"> &middot; </span>
              <span>
                Updated <RelativeTime date={article.updatedISO} />
              </span>
            </>
          ) : null}
        </p>
      </div>
    </Card>
  )
}
