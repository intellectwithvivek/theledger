import Link from 'next/link'
import NextImage from 'next/image'
import { Badge, Card, RelativeTime, Text } from '@the_viveksingh/vivek-ui'

import { type Article, getAuthor, getCategory } from '@/data/articles'
import { RATIO, photo } from '@/lib/images'
import styles from './article-card.module.css'

interface ArticleCardProps {
  article: Article
  /** Drop the thumbnail — used in the dense strips under each desk. */
  compact?: boolean
  /** Heading level, so a card never breaks the outline of its page. */
  headingLevel?: 2 | 3 | 4
}

/**
 * One article in a listing.
 *
 * The headline carries the only link, stretched over the whole card with
 * CSS. That keeps a single tab stop per card and one clear accessible name,
 * where wrapping the card in an anchor would swallow the image alt text and
 * the byline into it.
 */
export function ArticleCard({
  article,
  compact = false,
  headingLevel = 3,
}: ArticleCardProps) {
  const author = getAuthor(article.authorId)
  const category = getCategory(article.category)
  const Heading = `h${headingLevel}` as 'h2' | 'h3' | 'h4'

  return (
    <Card
      variant="ghost"
      padding="none"
      className={`${styles.card} ${compact ? styles.compact : ''}`}
    >
      {!compact ? (
        <NextImage
          src={photo(article.hero.src, 720, RATIO.card)}
          alt={article.hero.alt}
          width={720}
          height={Math.round(720 / RATIO.card)}
          sizes="(min-width: 64rem) 22rem, (min-width: 40rem) 45vw, 100vw"
          className={styles.thumb}
        />
      ) : null}

      <div className={styles.meta}>
        <Badge variant="soft" tone="primary" size="sm" className={styles.badge}>
          {category?.name}
        </Badge>
        <span className="kicker">{article.readMinutes} min</span>
      </div>

      <Heading className={styles.headline}>
        <Link href={`/article/${article.slug}`} className={styles.link}>
          {article.title}
        </Link>
      </Heading>

      <Text tone="muted" size="sm" className={styles.dek} lineClamp={3}>
        {article.dek}
      </Text>

      <p className={styles.byline}>
        <span className={styles.author}>{author.name}</span>
        <span aria-hidden="true"> &middot; </span>
        <RelativeTime date={article.publishedISO} />
      </p>
    </Card>
  )
}
