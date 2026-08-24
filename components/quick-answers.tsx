import { FAQ } from '@the_viveksingh/vivek-ui'

import type { FaqEntry } from '@/data/articles'
import styles from './quick-answers.module.css'

/**
 * The "Quick answers" block that closes some articles.
 *
 * `FAQ` is built on native `<details>`/`<summary>`, so it opens with no
 * JavaScript, is keyboard-operable for free, and — the part that matters
 * for a magazine — browsers expand a closed item to reveal an in-page find
 * match. The matching FAQPage structured data is emitted by the page, from
 * the same array, so the two can never drift apart.
 */
export function QuickAnswers({
  items,
  name,
}: {
  items: FaqEntry[]
  name: string
}) {
  return (
    <FAQ
      className={styles.faq}
      eyebrow="Quick answers"
      title="The short version"
      description="The questions readers send us about this piece, answered in a sentence or three."
      headingLevel={2}
      name={name}
      defaultOpen={0}
      items={items.map((item) => ({
        id: item.question,
        question: item.question,
        answer: item.answer,
      }))}
    />
  )
}
