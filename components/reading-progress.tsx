'use client'

import { useEffect, useState } from 'react'
import { Progress } from '@the_viveksingh/vivek-ui'

import styles from './reading-progress.module.css'

/**
 * The thin bar pinned to the top of the viewport that tracks how far down
 * the article you are.
 *
 * Scroll position is read inside a `requestAnimationFrame` callback rather
 * than directly in the listener, so a fast scroll coalesces into one read
 * and one paint per frame instead of dozens. The listener is passive, which
 * tells the browser it will never call `preventDefault` and so scrolling is
 * never blocked waiting on this.
 */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0

    const measure = () => {
      frame = 0
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - window.innerHeight
      // A page shorter than the viewport has nothing to track.
      setProgress(scrollable <= 0 ? 0 : (window.scrollY / scrollable) * 100)
    }

    const onScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame !== 0) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className={styles.wrap}>
      <Progress
        value={progress}
        max={100}
        size="sm"
        label="Reading progress"
        className={styles.bar}
      />
    </div>
  )
}
