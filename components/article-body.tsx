import { Fragment, type ReactNode } from 'react'
import NextImage from 'next/image'
import { Code, Prose } from '@the_viveksingh/vivek-ui'
import { BarChart, LineChart } from '@the_viveksingh/vivek-ui/charts'

import type { Block } from '@/data/articles'
import { RATIO, photo } from '@/lib/images'
import styles from './article-body.module.css'

/**
 * Renders an article's block list into `Prose`.
 *
 * The whole thing is a server component — including the charts, which are
 * pure SVG with no client boundary — so a reader receives the complete
 * article, figures and all, in the first HTML response. Nothing here calls
 * `dangerouslySetInnerHTML`: the body is structured data, not markup, so a
 * chart can be a real component sitting between two paragraphs.
 */
export function ArticleBody({ blocks }: { blocks: Block[] }) {
  const figures = numberFigures(blocks)

  return (
    <Prose as="div" size="lg" className={`dropcap ${styles.body}`}>
      {blocks.map((block, index) => (
        <Fragment key={index}>{renderBlock(block, figures[index])}</Fragment>
      ))}
    </Prose>
  )
}

/**
 * Assigns a running figure number to every chart, counted across the body
 * rather than derived from the block index — so "Figure 2" is the second
 * chart in the piece, not the second block.
 */
function numberFigures(blocks: Block[]): number[] {
  let n = 0
  return blocks.map((block) =>
    block.kind === 'lineChart' || block.kind === 'barChart' ? ++n : 0,
  )
}

function renderBlock(block: Block, figure: number): ReactNode {
  switch (block.kind) {
    case 'p':
      return <p>{inline(block.text)}</p>

    case 'h2':
      return <h2>{block.text}</h2>

    case 'list':
      return (
        <ul className={styles.list}>
          {block.items.map((item, i) => (
            <li key={i}>{inline(item)}</li>
          ))}
        </ul>
      )

    case 'quote':
      return (
        <blockquote className={styles.pullquote}>
          <p>{block.text}</p>
          {block.cite ? <cite className="kicker">{block.cite}</cite> : null}
        </blockquote>
      )

    case 'image':
      return (
        <figure className={styles.figure}>
          <NextImage
            src={photo(block.src, 1400, RATIO.wide)}
            alt={block.alt}
            width={1400}
            height={Math.round(1400 / RATIO.wide)}
            sizes="(min-width: 56rem) 46rem, 100vw"
            className={styles.figureImage}
          />
          <figcaption className={styles.caption}>{block.caption}</figcaption>
        </figure>
      )

    case 'code':
      return (
        <figure className={styles.codeFigure}>
          <Code block className={styles.code}>
            {block.code}
          </Code>
          {block.caption ? (
            <figcaption className={styles.caption}>{block.caption}</figcaption>
          ) : null}
        </figure>
      )

    case 'lineChart':
      return (
        <figure className={styles.chartFigure}>
          <LineChart
            title={block.title}
            description={block.description}
            xLabel={block.xLabel}
            yLabel={block.yLabel}
            series={block.series}
            height={280}
            curve="smooth"
            showGrid
            showAxes
            showLegend={block.series.length > 1}
            /* A figure in an article: the legend is a key, not a control. 1.0 turns
               interactive legends on by default, which suits a dashboard, not this. */
            interactiveLegend={false}
            className={styles.chart}
          />
          <figcaption className={styles.caption}>
            <span className="kicker kicker-accent">Figure {figure}</span>{' '}
            {block.caption}
          </figcaption>
        </figure>
      )

    case 'barChart':
      return (
        <figure className={styles.chartFigure}>
          <BarChart
            title={block.title}
            description={block.description}
            xLabel={block.xLabel}
            yLabel={block.yLabel}
            data={block.data}
            height={280}
            showGrid
            showAxes
            showValues
            barRadius={2}
            className={styles.chart}
          />
          <figcaption className={styles.caption}>
            <span className="kicker kicker-accent">Figure {figure}</span>{' '}
            {block.caption}
          </figcaption>
        </figure>
      )
  }
}

/**
 * Turns `backtick` spans in copy into real `<code>` elements.
 *
 * Deliberately the only inline syntax supported. A body block is data, not
 * a markup dialect, and the moment this grows a second rule it becomes a
 * parser nobody asked for.
 */
function inline(text: string): ReactNode {
  if (!text.includes('`')) return text

  return text.split(/(`[^`]+`)/g).map((part, i) =>
    part.startsWith('`') && part.endsWith('`') && part.length > 2 ? (
      <Code key={i}>{part.slice(1, -1)}</Code>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  )
}
