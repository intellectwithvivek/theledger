'use client'

import { useEffect } from 'react'

/**
 * Removes the Marquee's duplicated content from the tab order.
 *
 * VivekUI's `Marquee` renders a second, `aria-hidden` copy of its children
 * so the loop has no visible seam — the right call, and the copy is properly
 * hidden from screen readers. But `aria-hidden` does not remove anything
 * from the tab order, so the copied headline links are still focusable: a
 * keyboard user tabs into content that assistive technology has been told
 * does not exist. axe reports this as `aria-hidden-focus`, and it is a real
 * WCAG 4.1.2 problem, not a lint nit.
 *
 * `inert` is the only thing that fixes it — it takes the subtree out of both
 * the tab order and the accessibility tree at once, and there is no CSS
 * equivalent. Hence this island: it renders nothing, runs once, and lets the
 * ticker itself stay a server component with its links intact.
 *
 * Scoped to `.vk-marquee` so it can never touch anything else that happens
 * to be `aria-hidden`.
 */
export function InertMarqueeClone() {
  useEffect(() => {
    for (const el of document.querySelectorAll<HTMLElement>(
      '.vk-marquee [aria-hidden="true"]',
    )) {
      el.setAttribute('inert', '')
    }
  }, [])

  return null
}
