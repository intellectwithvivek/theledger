'use client'

import type { ImageLoaderProps } from 'next/image'

/**
 * Resize images at the source CDN instead of through a hosted optimizer.
 *
 * Why this exists: Vercel's built-in image optimization is a metered
 * feature. When the quota runs out every `/_next/image` request answers
 * `402 OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED` and the entire site loses
 * its photography at once — which is exactly what happened in production.
 *
 * A free, open-source template must not have a paid dependency in its
 * critical path, so the resizing is handed to the CDN already serving the
 * bytes. Unsplash takes `w`, `h`, `q` and `auto=format` as query
 * parameters and returns AVIF/WebP to browsers that accept them, which is
 * the same job the optimizer was doing — at no cost, with no quota, and
 * working identically on Vercel, Netlify, a static export or a VPS.
 *
 * Responsive behaviour is unchanged: `next/image` still builds the srcset
 * and still calls this once per candidate width, so a phone downloads a
 * phone-sized file.
 */
export default function cdnImageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  // Anything that is not an Unsplash URL is served as authored. Avatars
  // come from i.pravatar.cc at a fixed size and have no resize API, and a
  // local /public asset needs no rewriting at all.
  if (!src.startsWith('https://images.unsplash.com/')) return src

  const url = new URL(src)

  // The source URL already carries the crop this image was composed for.
  // Scaling `w` without scaling `h` would silently change the aspect ratio
  // and re-crop the photograph, so the original ratio is carried over.
  const authoredWidth = Number(url.searchParams.get('w'))
  const authoredHeight = Number(url.searchParams.get('h'))

  url.searchParams.set('w', String(width))
  if (authoredWidth > 0 && authoredHeight > 0) {
    url.searchParams.set(
      'h',
      String(Math.round((width * authoredHeight) / authoredWidth)),
    )
  }
  url.searchParams.set('q', String(quality ?? 70))
  url.searchParams.set('auto', 'format')
  url.searchParams.set('fit', 'crop')

  return url.toString()
}
