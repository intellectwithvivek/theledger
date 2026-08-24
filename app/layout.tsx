import type { Metadata, Viewport } from 'next'
import { Fraunces, Newsreader } from 'next/font/google'
import { ThemeProvider, ToastProvider, themeScript } from '@the_viveksingh/vivek-ui'

import '@the_viveksingh/vivek-ui/styles.css'
import '@the_viveksingh/vivek-ui/charts.css'
import './globals.css'

import { SiteFooter } from '@/components/site-footer'
import { SiteNavbar } from '@/components/site-navbar'
import { CATEGORIES, searchIndex } from '@/data/articles'
import { SITE } from '@/data/site'

/* The display face. Fraunces carries the masthead and every headline; its
   SOFT and WONK axes are requested explicitly because globals.css sets
   them, and next/font only ships the axes you ask for. */
const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
  axes: ['SOFT', 'WONK', 'opsz'],
})

/* The reading face, used inside Prose and nowhere else. */
const newsreader = Newsreader({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-newsreader',
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Free Next.js Blog / Magazine Template — The Ledger | VivekUI',
    template: '%s | The Ledger',
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: 'Vivek Kumar Singh', url: 'https://vivekkumarsingh.in/' }],
  creator: 'Vivek Kumar Singh',
  publisher: SITE.name,
  keywords: [
    'free nextjs blog magazine template',
    'nextjs 16 template',
    'react magazine template',
    'open source blog template',
    'VivekUI',
    'typography-first blog',
  ],
  category: 'technology',
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': [
        { url: '/feed.xml', title: `${SITE.name} — all articles` },
      ],
    },
  },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: SITE.locale,
    url: '/',
  },
  twitter: { card: 'summary_large_image', creator: SITE.twitter },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0b' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${newsreader.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Synchronous and blocking, on purpose: it sets data-theme before
            the first paint, which is the only way to avoid a flash of the
            wrong theme. React cannot do this — the server does not know
            what the visitor chose. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider defaultTheme="system">
          <ToastProvider position="bottom-end">
            <a className="skip-link" href="#main">
              Skip to content
            </a>
            <SiteNavbar categories={[...CATEGORIES]} search={searchIndex()} />
            <main id="main">{children}</main>
            <SiteFooter />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
