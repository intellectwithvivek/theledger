'use client'

import { useCallback, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  Badge,
  Button,
  CommandPalette,
  type CommandPaletteItem,
  Kbd,
  Navbar,
  ThemeToggle,
} from '@the_viveksingh/vivek-ui'

import { SITE, VIVEKUI, utm } from '@/data/site'
import styles from './site-navbar.module.css'

/** The GitHub mark, inline so the header pulls in no icon dependency. */
function GitHubMark() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="15"
      height="15"
      aria-hidden="true"
      focusable="false"
      fill="currentColor"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  )
}

export interface NavCategory {
  slug: string
  name: string
}

export interface SearchEntry {
  slug: string
  title: string
  dek: string
  category: string
  author: string
  tags: string[]
}

interface SiteNavbarProps {
  categories: NavCategory[]
  /**
   * The full article index, flattened on the server. Passing it as a prop
   * keeps the article bodies — by far the largest part of the data — out
   * of the client bundle entirely.
   */
  search: SearchEntry[]
}

export function SiteNavbar({ categories, search }: SiteNavbarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const items = useMemo(
    () => [
      {
        heading: 'Articles',
        items: search.map<CommandPaletteItem>((entry) => ({
          id: `/article/${entry.slug}`,
          label: entry.title,
          description: entry.dek,
          keywords: [entry.category, entry.author, ...entry.tags],
        })),
      },
      {
        heading: 'Desks',
        items: categories.map<CommandPaletteItem>((category) => ({
          id: `/category/${category.slug}`,
          label: category.name,
          description: `Every article on the ${category.name} desk`,
          keywords: ['category', 'desk', 'section'],
        })),
      },
      {
        heading: 'This template',
        items: [
          {
            id: '/built-with',
            label: 'Built with VivekUI',
            description: 'Every component on this site, mapped to its docs',
            keywords: ['components', 'docs', 'credits', 'open source'],
          },
          {
            id: '/',
            label: 'Front page',
            description: 'Back to the homepage',
            keywords: ['home', 'index'],
          },
          {
            id: SITE.repo,
            label: 'Clone this template on GitHub',
            description: SITE.cloneCommand,
            keywords: ['clone', 'git', 'github', 'source', 'fork', 'repo'],
          },
        ] satisfies CommandPaletteItem[],
      },
    ],
    [search, categories],
  )

  // Command ids are routes, except the one that leaves the site.
  const onSelect = useCallback(
    (item: CommandPaletteItem) => {
      if (item.id.startsWith('http')) {
        window.open(item.id, '_blank', 'noopener,noreferrer')
        return
      }
      router.push(item.id)
    },
    [router],
  )

  return (
    <>
      {/* The folio strip: the thin line of metadata above the nameplate that
          every printed masthead carries. */}
      <div className={styles.folio}>
        <div className={styles.folioInner}>
          <span className="kicker">Technology &amp; culture</span>
          <span className={`kicker ${styles.folioMiddle}`}>
            Free &amp; open source
          </span>
          <a
            className={`kicker ${styles.folioLink}`}
            href={utm(VIVEKUI.docs, 'navbar')}
            target="_blank"
            rel="noopener noreferrer"
          >
            VivekUI docs
          </a>
        </div>
      </div>

      <Navbar sticky container="xl" className={styles.bar}>
        <Navbar.Brand asChild>
          <Link href="/" aria-label={'The Ledger, front page'}>
            <span className={`masthead ${styles.wordmark}`}>The Ledger</span>
          </Link>
        </Navbar.Brand>

        <Navbar.Links className={styles.links}>
          {categories.map((category) => {
            const href = `/category/${category.slug}`
            return (
              <Navbar.Link
                key={category.slug}
                asChild
                active={pathname === href}
              >
                <Link href={href}>{category.name}</Link>
              </Navbar.Link>
            )
          })}
          <Navbar.Link asChild active={pathname === '/built-with'}>
            <Link href="/built-with">Built with</Link>
          </Navbar.Link>
        </Navbar.Links>

        <Navbar.Actions className={styles.actions}>
          <Button
            variant="ghost"
            size="sm"
            className={styles.search}
            onClick={() => setOpen(true)}
          >
            <span aria-hidden="true">&#9906;</span>
            <span className={styles.searchLabel}>Search</span>
            <Kbd className={styles.searchKbd}>&#8984;K</Kbd>
          </Button>

          {/* The template is the product here, so getting to the source is a
              first-class action rather than something buried in the footer. */}
          <Button asChild variant="outline" size="sm" className={styles.repo}>
            <a
              href={SITE.repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Clone this template on GitHub"
            >
              <GitHubMark />
              <span className={styles.repoLabel}>Clone</span>
            </a>
          </Button>

          <a
            href={utm(VIVEKUI.docs, 'navbar')}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.badgeLink}
          >
            <Badge variant="soft" tone="primary" pill className={styles.badge}>
              &#9889; Built with VivekUI
            </Badge>
          </a>

          <ThemeToggle mode="cycle" size="sm" />
          <Navbar.Toggle />
        </Navbar.Actions>
      </Navbar>

      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        items={items}
        onSelect={onSelect}
        placeholder="Search articles, desks and authors…"
        label="Search The Ledger"
        emptyState="Nothing in the archive matches that."
        footer={
          <span className="kicker">
            {search.length} articles &middot; press Esc to close
          </span>
        }
      />
    </>
  )
}
