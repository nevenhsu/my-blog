import { draftMode } from 'next/headers'
import { AppShell, AppShellMain } from '@mantine/core'
import Header from './Header'
import Footer from '@/components/Footer'
import { getFooterData } from '@/utils/sanity/queries'
import { headerHeight } from '@/theme/config'

export default async function BasicAppShell({ children }: { children: React.ReactNode }) {
  const { isEnabled } = draftMode()
  const footerData = isEnabled ? {} : await getFooterData()

  return (
    <AppShell
      header={{ height: headerHeight }}
      withBorder={false}
      zIndex={202}
      styles={{
        header: { background: 'transparent' },
      }}
    >
      <Header />

      <AppShellMain>
        {children}
        <Footer initialData={footerData} />
      </AppShellMain>
    </AppShell>
  )
}
