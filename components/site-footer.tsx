import { Code, CopyButton, Footer, Text } from '@the_viveksingh/vivek-ui'

import { CATEGORIES } from '@/data/articles'
import { REPO_TEMPLATE_URL, SITE, VIVEKUI, utm } from '@/data/site'
import styles from './site-footer.module.css'

/**
 * The site footer: the template's primary credit, and the fastest route to
 * the source.
 *
 * A server component apart from the two CopyButton islands, so both commands
 * are in the HTML on first paint.
 */
export function SiteFooter() {
  return (
    <Footer
      className={styles.footer}
      navLabel="Footer"
      headingLevel={2}
      columns={[
        {
          title: 'Desks',
          links: CATEGORIES.map((category) => ({
            label: category.name,
            href: `/category/${category.slug}`,
          })),
        },
        {
          title: 'This template',
          links: [
            { label: 'Built with VivekUI', href: '/built-with' },
            { label: 'Source on GitHub', href: SITE.repo, target: '_blank' },
            {
              label: 'Use this template',
              href: REPO_TEMPLATE_URL,
              target: '_blank',
            },
            { label: 'Report an issue', href: `${SITE.repo}/issues`, target: '_blank' },
            { label: 'RSS feed', href: '/feed.xml' },
          ],
        },
        {
          title: 'VivekUI',
          links: [
            {
              label: 'Documentation',
              href: utm(VIVEKUI.docs, 'footer'),
              target: '_blank',
            },
            { label: 'npm package', href: VIVEKUI.npm, target: '_blank' },
            { label: 'GitHub', href: VIVEKUI.github, target: '_blank' },
            {
              label: VIVEKUI.authorName,
              href: utm(VIVEKUI.author, 'footer'),
              target: '_blank',
            },
          ],
        },
      ]}
      brand={
        <div className={styles.brand}>
          <span className={`masthead ${styles.wordmark}`}>The Ledger</span>
          <Text tone="muted" size="sm" className={styles.blurb}>
            {VIVEKUI.blurb}
          </Text>

          {/* Two commands, in the order someone actually runs them: take the
              template, then add the library to their own project. */}
          <div className={styles.commands}>
            <div className={styles.command}>
              <span className="kicker">Clone this template</span>
              <div className={styles.commandRow}>
                <Code className={styles.commandCode}>{SITE.cloneCommand}</Code>
                <CopyButton
                  value={SITE.cloneCommand}
                  variant="outline"
                  size="sm"
                  label="Copy"
                  copiedLabel="Copied"
                  copiedAnnouncement="Clone command copied to clipboard"
                />
              </div>
            </div>

            <div className={styles.command}>
              <span className="kicker">Install the library</span>
              <div className={styles.commandRow}>
                <Code className={styles.commandCode}>{VIVEKUI.install}</Code>
                <CopyButton
                  value={VIVEKUI.install}
                  variant="outline"
                  size="sm"
                  label="Copy"
                  copiedLabel="Copied"
                  copiedAnnouncement="Install command copied to clipboard"
                />
              </div>
            </div>
          </div>
        </div>
      }
      copyright={
        <span className={styles.copyright}>
          <span className="kicker">
            {SITE.name} &middot; a free MIT-licensed template
          </span>
          <span className={styles.credit}>
            Built with{' '}
            <span aria-hidden="true" className={styles.heart}>
              &#10084;&#65039;
            </span>
            <span className={styles.srOnly}>love</span> using{' '}
            <a
              href={utm(VIVEKUI.docs, 'footer')}
              target="_blank"
              rel="noopener noreferrer"
            >
              VivekUI
            </a>{' '}
            by{' '}
            <a
              href={utm(VIVEKUI.author, 'footer')}
              target="_blank"
              rel="noopener noreferrer"
            >
              {VIVEKUI.authorName}
            </a>
          </span>
        </span>
      }
    />
  )
}
