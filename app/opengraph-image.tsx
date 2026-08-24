import { ImageResponse } from 'next/og'

import { ARTICLES } from '@/data/articles'

export const alt =
  'The Ledger — a free, open-source Next.js 16 magazine template built with VivekUI'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** The site-level share card, inherited by every route without its own. */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#fbfaf8',
          color: '#15161a',
          padding: '68px 72px',
          fontFamily: 'serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 22,
            letterSpacing: 5,
            textTransform: 'uppercase',
            fontFamily: 'sans-serif',
            fontWeight: 700,
            color: '#4a4d57',
          }}
        >
          Free &middot; Open source &middot; MIT
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div
            style={{
              display: 'flex',
              fontSize: 150,
              fontWeight: 700,
              letterSpacing: -6,
              lineHeight: 0.9,
            }}
          >
            The Ledger
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 32,
              lineHeight: 1.35,
              color: '#4a4d57',
              maxWidth: 880,
            }}
          >
            A Next.js 16 magazine and blog template. Typography-first,
            server-rendered, {ARTICLES.length} sample articles.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '3px solid #15161a',
            paddingTop: 24,
            fontSize: 24,
            fontFamily: 'sans-serif',
          }}
        >
          <div style={{ display: 'flex', color: '#4a4d57' }}>
            npm i @the_viveksingh/vivek-ui
          </div>
          <div style={{ display: 'flex', color: '#123fc9', fontWeight: 700 }}>
            Built with VivekUI
          </div>
        </div>
      </div>
    ),
    size,
  )
}
