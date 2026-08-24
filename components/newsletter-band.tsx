'use client'

import { Newsletter, useToast } from '@the_viveksingh/vivek-ui'

import styles from './newsletter-band.module.css'

/**
 * The subscribe band.
 *
 * `onSubscribe` returns a promise, which is what puts the button into its
 * busy state and makes double submission impossible — the component
 * disables itself until the promise settles rather than trusting the user
 * not to click twice. This template has no backend, so the promise is a
 * deliberate short delay standing in for the network call.
 */
export function NewsletterBand() {
  const { toast } = useToast()

  return (
    <section className={styles.band} aria-labelledby="newsletter-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className="kicker kicker-accent">The Ledger, weekly</p>
          <h2 id="newsletter-title" className={styles.title}>
            One email. Six stories. No tracking pixels.
          </h2>
          <p className={styles.blurb}>
            Saturday mornings, the week&rsquo;s reporting from all four desks,
            plus the charts that did not make it into the pieces.
          </p>
        </div>

        <Newsletter
          className={styles.form}
          layout="stacked"
          label="Email address"
          placeholder="you@example.com"
          buttonLabel="Subscribe"
          note="A demo form — this template has no backend, so nothing is sent anywhere."
          successMessage="You are on the list. Check your inbox on Saturday."
          onSubscribe={async (email) => {
            await new Promise((resolve) => setTimeout(resolve, 600))
            toast({
              tone: 'success',
              title: 'Subscribed',
              description: `${email} has been added to the demo list.`,
            })
          }}
        />
      </div>
    </section>
  )
}
