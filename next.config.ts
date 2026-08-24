import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    /*
     * Resize at the source CDN rather than through a hosted optimizer.
     *
     * Vercel's image optimization is metered, and when the quota is spent
     * every /_next/image request returns 402 and the site loses all of its
     * photography at once. A free template should not carry a paid
     * dependency in its critical path, so lib/image-loader.ts hands the
     * resizing to Unsplash's own CDN. See that file for the reasoning.
     *
     * Removing these two lines restores the built-in optimizer; the
     * remotePatterns below are already what it needs.
     */
    loader: 'custom',
    loaderFile: './lib/image-loader.ts',

    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'i.pravatar.cc' },
    ],
  },
  // Turbopack is the default bundler in Next.js 16; its options live here.
  turbopack: {},
}

export default nextConfig
