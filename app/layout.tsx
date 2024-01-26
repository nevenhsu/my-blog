import './globals.css'
import '@/utils/console'

import Script from 'next/script'
import { draftMode } from 'next/headers'
import { AppProvider } from '@/stores/AppContext'
import Providers from '@/components/providers/Providers'
import { ColorSchemeScript } from '@mantine/core'
import { publicEnv } from '@/utils/env'
import { fontVariables } from '@/theme/font'
import type { Metadata, Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 2,
}

const title = "Neven's Website"
const description = 'Create delightful experiences with Neven X.'
const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS

export const metadata: Metadata = {
  title,
  description,
  authors: { name: 'Neven Xu' },

  openGraph: {
    title,
    description,
    images: {
      url: new URL('/cover.png', publicEnv.baseUrl).href,
      type: 'image/png',
      width: 1200,
      height: 800,
    },
    type: 'website',
  },
  keywords: ['ux', 'ui', 'design', 'portfolio', 'website'],

  icons: {
    icon: [
      { type: 'image/svg+xml', url: new URL('/favicon.svg', publicEnv.baseUrl).href },
      { type: 'image/png', url: new URL('/favicon.png', publicEnv.baseUrl).href },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = draftMode()

  return (
    <html lang="en" className={fontVariables}>
      <head>
        <Script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}></Script>
        <Script id="google-analytics">
          {gaId
            ? `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${gaId}');
            `
            : null}
        </Script>
        <ColorSchemeScript defaultColorScheme={publicEnv.defaultColorScheme} />
      </head>
      <body
        style={{
          width: '100vw',
          overflowX: 'hidden',
        }}
      >
        <AppProvider isPreview={isEnabled}>
          <Providers>{children}</Providers>
        </AppProvider>
      </body>
    </html>
  )
}
