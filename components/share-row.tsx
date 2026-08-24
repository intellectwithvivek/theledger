'use client'

import { Button, ButtonGroup, CopyButton, useToast } from '@the_viveksingh/vivek-ui'

import styles from './share-row.module.css'

interface ShareRowProps {
  /** Absolute URL — a share intent cannot use a relative one. */
  url: string
  title: string
}

/**
 * Copy-link plus the two share intents.
 *
 * The intent links are real anchors rather than buttons with click
 * handlers, so middle-click, cmd-click and "copy link address" all behave
 * the way a reader expects.
 */
export function ShareRow({ url, title }: ShareRowProps) {
  const { toast } = useToast()

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  return (
    <div className={styles.row}>
      <span className="kicker">Share</span>

      <div className={styles.controls}>
        <CopyButton
          value={url}
          variant="outline"
          size="sm"
          label="Copy link"
          copiedLabel="Link copied"
          copiedAnnouncement="Article link copied to clipboard"
          onCopy={() =>
            toast({
              tone: 'success',
              title: 'Link copied',
              description: 'The article URL is on your clipboard.',
            })
          }
          onCopyError={() =>
            toast({
              tone: 'danger',
              title: 'Could not copy',
              description: 'Your browser blocked clipboard access.',
            })
          }
        />

        <ButtonGroup attached label="Share this article">
          <Button asChild variant="outline" size="sm">
            <a
              href={`https://x.com/intent/post?text=${encodedTitle}&url=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Post on X
            </a>
          </Button>
          <Button asChild variant="outline" size="sm">
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
}
