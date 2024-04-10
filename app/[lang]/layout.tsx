import Script from 'next/script'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { ColorSchemeScript } from '@mantine/core'
import { AppProvider } from '@/stores/AppContext'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import Providers from '@/components/providers/Providers'
import BasicAppShell from '@/components/BasicAppShell'
import { publicEnv } from '@/utils/env'
import { fontVariables } from '@/theme/font'
import { env } from '@/utils/env'

// Ensuring code needed for live previewing drafts are only loaded when needed.
const PreviewProvider = dynamic(() => import('@/components/providers/PreviewProvider'))

// generateMetadata
export * from './metadata'

export const revalidate = 3600 // revalidate at most every hour

export function generateStaticParams() {
  return env.locales.map(lang => ({ lang }))
}

const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  const { isEnabled } = draftMode()
  const messages = useMessages()

  const renderShell = () => {
    return <BasicAppShell>{children}</BasicAppShell>
  }

  return (
    <html lang={lang} className={fontVariables}>
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
        <NextIntlClientProvider locale={lang} messages={messages}>
          <AppProvider isPreview={isEnabled}>
            <Providers>
              {isEnabled ? (
                <PreviewProvider token={env.sanityToken}>{renderShell()}</PreviewProvider>
              ) : (
                <>{renderShell()}</>
              )}
            </Providers>
          </AppProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
