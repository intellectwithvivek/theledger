/**
 * Unsplash serves arbitrary sizes from query parameters, so we ask it for a
 * sensible ceiling and let next/image resize from there. Without `fit=crop`
 * plus explicit dimensions the CDN returns the original, which for some of
 * these photographs is several thousand pixels wide.
 */
export function photo(src: string, width = 1600, ratio = 16 / 9): string {
  const height = Math.round(width / ratio)
  const url = new URL(src)
  url.searchParams.set('auto', 'format')
  url.searchParams.set('fit', 'crop')
  url.searchParams.set('w', String(width))
  url.searchParams.set('h', String(height))
  url.searchParams.set('q', '70')
  return url.toString()
}

/** Aspect ratios used across the site, named so the intent is readable. */
export const RATIO = {
  /** Lead art and inline figures. */
  wide: 16 / 9,
  /** Card thumbnails — a little squarer so the grid stays dense. */
  card: 3 / 2,
  /** The open-graph card. */
  social: 1200 / 630,
} as const
