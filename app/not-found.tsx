import type { Metadata } from 'next'
import Link from 'next/link'
import { Button, Container } from '@the_viveksingh/vivek-ui'

import { ArticleCard } from '@/components/article-card'
import { mostRead } from '@/data/articles'
import styles from './not-found.module.css'

export const metadata: Metadata = {
  title: 'Page not found',
  // A 404 must not claim the front page as its canonical, which is what it
  // would inherit from the root layout.
  alternates: { canonical: null },
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <Container size="lg" className={styles.page}>
      <p className="kicker kicker-accent">Error 404</p>
      <h1 className={styles.title}>This page went to press without us</h1>
      <p className={styles.copy}>
        The address you followed does not match anything in the archive. It may
        have been a typo, or a link from somewhere that has since moved.
      </p>

      <div className={styles.actions}>
        <Button asChild>
          <Link href="/">Back to the front page</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/built-with">See how this site is built</Link>
        </Button>
      </div>

      <section aria-labelledby="popular" className={styles.suggestions}>
        <h2 id="popular" className={`kicker ${styles.suggestionsTitle}`}>
          Most read instead
        </h2>
        <div className={`colgrid ${styles.grid}`}>
          {mostRead(3).map((article) => (
            <ArticleCard
              key={article.slug}
              article={article}
              compact
              headingLevel={3}
            />
          ))}
        </div>
      </section>
    </Container>
  )
}
