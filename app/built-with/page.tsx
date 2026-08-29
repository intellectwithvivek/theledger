import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Badge,
  Breadcrumb,
  Button,
  Code,
  Container,
  CopyButton,
  FAQ,
  Table,
} from '@the_viveksingh/vivek-ui'

import { JsonLd } from '@/components/json-ld'
import {
  REPO_TEMPLATE_URL,
  SITE,
  VIVEKUI,
  chartDocs,
  componentDocs,
  utm,
} from '@/data/site'
import { breadcrumbNode, faqNode, pageMetadata } from '@/lib/seo'
import styles from './page.module.css'

export const metadata: Metadata = pageMetadata({
  title: 'Built with VivekUI',
  description:
    'Every section of The Ledger mapped to the VivekUI component that renders it, with a deep link to each component’s documentation.',
  path: '/built-with',
})

/**
 * Section → component, in the order a reader meets them.
 *
 * `area` is where it appears on the site, `slug` is the docs page. Charts
 * live under /docs/charts rather than /docs/components, so they carry a
 * flag rather than being special-cased at the call site.
 */
const INVENTORY: {
  area: string
  component: string
  slug: string
  chart?: boolean
  note: string
}[] = [
  {
    area: 'Sticky top bar',
    component: 'Navbar',
    slug: 'navbar',
    note: 'Brand, links, actions and the mobile sheet, with the toggle wired to aria-controls.',
  },
  {
    area: 'Search (⌘K)',
    component: 'CommandPalette',
    slug: 'command-palette',
    note: 'Full combobox/listbox ARIA model over all twelve articles, four desks and this page.',
  },
  {
    area: 'Light / dark switch',
    component: 'ThemeToggle',
    slug: 'theme-toggle',
    note: 'Three states, named for the action rather than the current theme.',
  },
  {
    area: 'Theme persistence',
    component: 'ThemeProvider',
    slug: 'theme-provider',
    note: 'Plus the exported themeScript, inlined in head so there is no flash of the wrong theme.',
  },
  {
    area: 'Breaking ticker',
    component: 'Marquee',
    slug: 'marquee',
    note: 'Zero JavaScript. Stops on hover, on focus within, and entirely under reduced motion.',
  },
  {
    area: 'Desk labels',
    component: 'Badge',
    slug: 'badge',
    note: 'Soft and solid variants mark the desk on every card and headline.',
  },
  {
    area: 'Bylines',
    component: 'Avatar',
    slug: 'avatar',
    note: 'Author portraits, with initials as the fallback when an image fails.',
  },
  {
    area: 'Timestamps',
    component: 'RelativeTime',
    slug: 'relative-time',
    note: 'Renders the absolute date on the server and switches to "3 days ago" after mount.',
  },
  {
    area: 'Article listings',
    component: 'Card',
    slug: 'card',
    note: 'The eight-card Latest grid, the desk strips and the Read next rail.',
  },
  {
    area: 'Most read — 7-day trend',
    component: 'Sparkline',
    slug: 'sparkline',
    chart: true,
    note: 'One per entry. Pure SVG, no client boundary, with a visually hidden data table.',
  },
  {
    area: 'Desk tabs',
    component: 'Tabs',
    slug: 'tabs',
    note: 'Manual activation, so arrowing across the desks does not swap the panel four times.',
  },
  {
    area: 'Subscribe band',
    component: 'Newsletter',
    slug: 'newsletter',
    note: 'A real label, a promise-driven busy state, and the result announced politely.',
  },
  {
    area: 'Reading progress',
    component: 'Progress',
    slug: 'progress',
    note: 'Pinned to the top of the viewport, driven by a passive rAF-throttled scroll listener.',
  },
  {
    area: 'Trail on every article',
    component: 'Breadcrumb',
    slug: 'breadcrumb',
    note: 'Matched by BreadcrumbList structured data emitted from the same array.',
  },
  {
    area: 'Article body',
    component: 'Prose',
    slug: 'prose',
    note: 'Headings, pull quotes, figures, code and charts — all server rendered.',
  },
  {
    area: 'Data story — developers over time',
    component: 'LineChart',
    slug: 'line-chart',
    chart: true,
    note: 'Two series, told apart by colour, dash pattern and marker shape.',
  },
  {
    area: 'Data story — frameworks by usage',
    component: 'BarChart',
    slug: 'bar-chart',
    chart: true,
    note: 'Value axis always includes zero. Values printed at the end of each bar.',
  },
  {
    area: 'Code samples in copy',
    component: 'Code',
    slug: 'code',
    note: 'Inline spans and fenced blocks inside the reading column.',
  },
  {
    area: 'Share row',
    component: 'CopyButton',
    slug: 'copy-button',
    note: 'Clipboard with a legacy fallback, a visible error state and a polite announcement.',
  },
  {
    area: 'Share intents',
    component: 'ButtonGroup',
    slug: 'button-group',
    note: 'X and LinkedIn as real anchors, so cmd-click and "copy link address" both work.',
  },
  {
    area: 'Toasts on copy and subscribe',
    component: 'Toast',
    slug: 'toast',
    note: 'Two live regions mounted empty with the provider, so the first message is never dropped.',
  },
  {
    area: 'Quick answers',
    component: 'FAQ',
    slug: 'faq',
    note: 'Native details/summary. Opens with no JavaScript and expands for in-page find.',
  },
  {
    area: 'Comments placeholder',
    component: 'EmptyState',
    slug: 'empty-state',
    note: 'The "nothing here yet" block, with the action that would fix it.',
  },
  {
    area: 'Category paging',
    component: 'Pagination',
    slug: 'pagination',
    note: 'Fully controlled, with real accessible names on the icon-only jump buttons.',
  },
  {
    area: 'This table',
    component: 'Table',
    slug: 'table',
    note: 'Scrolls inside its own wrapper rather than making the page scroll sideways.',
  },
  {
    area: 'Page width',
    component: 'Container',
    slug: 'container',
    note: 'Every route is wrapped in one, at lg or xl.',
  },
  {
    area: 'Buttons and links',
    component: 'Button',
    slug: 'button',
    note: 'asChild renders next/link, so a link that looks like a button is still an anchor.',
  },
  {
    area: 'Secondary copy',
    component: 'Text',
    slug: 'text',
    note: 'Muted deks and counts, with line clamping in the card grid.',
  },
  {
    area: 'Shortcut hint',
    component: 'Kbd',
    slug: 'kbd',
    note: 'The ⌘K legend in the search button.',
  },
  {
    area: 'Site footer',
    component: 'Footer',
    slug: 'footer',
    note: 'One named nav around all three link columns, plus the install command.',
  },
]

const SITE_FAQ = [
  {
    question: 'Is this template really free?',
    answer:
      'Yes. The template is MIT licensed and VivekUI itself is MIT licensed and free, with no paid tier, no account and no usage limits. Clone it, change the words, ship it commercially if you like.',
  },
  {
    question: 'Do I have to keep the "Built with VivekUI" credit?',
    answer:
      'No. The credit in the navbar and footer is removable and nothing breaks when you delete it. A star on the GitHub repository is appreciated instead, but it is not required by the licence.',
  },
  {
    question: 'Does VivekUI need Tailwind or a config file?',
    answer:
      'Neither. It is one npm install and one CSS import. There is no PostCSS plugin, no Babel plugin, no CLI, no code generation and no required provider — the ThemeProvider on this site is opt-in because the site offers a dark mode.',
  },
  {
    question: 'Are the articles here server rendered?',
    answer:
      'Almost entirely. Article bodies, the charts inside them, the Most read sparklines, the cards, the footer and the FAQ are all server components. The client bundle covers only what genuinely needs state: the command palette, the theme toggle, the reading-progress bar, the copy button, pagination and the subscribe form.',
  },
  {
    question: 'How do I change the accent colour or the fonts?',
    answer:
      'Every value in VivekUI is a CSS custom property. app/globals.css re-points a handful of --vk-* tokens for the blue accent and the square corners; the two typefaces are loaded with next/font and wired to the same tokens. Nothing is overridden with an importance flag.',
  },
]

export default function BuiltWithPage() {
  return (
    <Container size="lg" className={styles.page}>
      <JsonLd
        data={breadcrumbNode([
          { name: 'Front page', path: '/' },
          { name: 'Built with VivekUI', path: '/built-with' },
        ])}
      />
      <JsonLd data={faqNode(SITE_FAQ)} />

      <Breadcrumb
        size="sm"
        className={styles.crumbs}
        label="You are here"
        items={[{ label: 'Front page', href: '/' }, { label: 'Built with' }]}
      />

      <header className={styles.header}>
        <Badge variant="soft" tone="primary" pill className={styles.badge}>
          &#9889; Colophon
        </Badge>
        <h1 className={styles.title}>Built with VivekUI</h1>
        <p className={styles.lede}>
          This entire website is built with VivekUI, a free React component
          library with zero runtime dependencies.
        </p>
        <p className={styles.sub}>
          No Tailwind, no shadcn, no MUI, no config file. Ninety-one components
          and six SVG charts arrive from one package, and the only styling this
          template writes itself is a stylesheet that re-points a few custom
          properties for the blue accent and the two typefaces.
        </p>

        <div className={styles.install}>
          <Code block className={styles.installCode}>
            {VIVEKUI.install}
          </Code>
          <CopyButton
            value={VIVEKUI.install}
            label="Copy install"
            copiedLabel="Copied"
            copiedAnnouncement="Install command copied to clipboard"
          />
        </div>

        <div className={styles.install}>
          <Code block className={styles.installCode}>
            {SITE.cloneCommand}
          </Code>
          <CopyButton
            value={SITE.cloneCommand}
            variant="outline"
            label="Copy clone"
            copiedLabel="Copied"
            copiedAnnouncement="Clone command copied to clipboard"
          />
        </div>

        <div className={styles.ctas}>
          <Button asChild size="lg">
            <a
              href={utm(VIVEKUI.docs, 'builtwith')}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read the docs
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href={VIVEKUI.github} target="_blank" rel="noopener noreferrer">
              Star on GitHub
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a
              href={REPO_TEMPLATE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Use this template
            </a>
          </Button>
        </div>
        <p className={`kicker ${styles.repo}`}>
          Repository:{' '}
          <a href={SITE.repo} target="_blank" rel="noopener noreferrer">
            {SITE.repoName}
          </a>{' '}
          &middot; MIT licensed &middot; credit removable
        </p>
      </header>

      {/* ---- The inventory --------------------------------------------- */}
      <section aria-labelledby="inventory" className={styles.section}>
        <h2 id="inventory" className={styles.sectionTitle}>
          Section by section
        </h2>
        <p className={styles.sectionCopy}>
          Every row is a live part of this site. Follow a component name to its
          documentation page, which carries a rendered example, the code in
          TypeScript and JavaScript, and a props table generated from the
          package&rsquo;s own type declarations.
        </p>

        <Table
          size="sm"
          striped
          hoverable
          className={styles.table}
          containerProps={{ className: styles.tableWrap }}
        >
          <Table.Caption visuallyHidden>
            Sections of The Ledger and the VivekUI component that renders each
            one
          </Table.Caption>
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell scope="col">Section</Table.HeaderCell>
              <Table.HeaderCell scope="col">Component</Table.HeaderCell>
              <Table.HeaderCell scope="col">What it handles</Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {INVENTORY.map((row) => (
              <Table.Row key={`${row.component}-${row.area}`}>
                <Table.Cell label="Section">{row.area}</Table.Cell>
                <Table.Cell label="Component">
                  <a
                    className={styles.docLink}
                    href={
                      row.chart ? chartDocs(row.slug) : componentDocs(row.slug)
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {row.component}
                  </a>
                </Table.Cell>
                <Table.Cell label="What it handles">{row.note}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </section>

      {/* ---- The point ------------------------------------------------- */}
      <section aria-labelledby="one-package" className={styles.section}>
        <h2 id="one-package" className={styles.sectionTitle}>
          One package, mostly on the server
        </h2>
        <div className={styles.notes}>
          <p>
            The two charts inside the data story, the sparkline beside every
            most-read entry, the <strong>Prose</strong> that sets the article
            body and the reading-progress bar all ship in the same install.
            There is no charting library here, no markdown pipeline and no
            second design system.
          </p>
          <p>
            Almost all of it renders on the server. The charts are plain SVG
            with nothing measured, so a reader receives a complete article
            &mdash; figures included &mdash; in the first HTML response, which
            is exactly what a crawler wants too. JavaScript is spent only where
            state genuinely exists: the command palette, the theme toggle, the
            progress bar, the copy button, pagination and the subscribe form.
          </p>
          <p>
            The credit in the navbar and the footer is removable and nothing
            breaks when it goes. A star on{' '}
            <a href={VIVEKUI.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>{' '}
            is appreciated instead.
          </p>
        </div>
      </section>

      <FAQ
        className={styles.faq}
        eyebrow="Questions"
        title="About this template"
        description="What people ask before cloning it."
        headingLevel={2}
        name="built-with-faq"
        defaultOpenIndex={0}
        items={SITE_FAQ.map((item) => ({ id: item.question, ...item }))}
      />

      <p className={styles.back}>
        <Link href="/">&larr; Back to the front page</Link>
      </p>
    </Container>
  )
}
