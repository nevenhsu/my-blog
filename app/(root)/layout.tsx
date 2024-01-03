import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import BasicAppShell from '@/components/BasicAppShell'
import { env } from '@/utils/env'

// Ensuring code needed for live previewing drafts are only loaded when needed.
const PreviewProvider = dynamic(() => import('@/components/providers/PreviewProvider'))

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = draftMode()

  const renderShell = () => {
    return <BasicAppShell>{children}</BasicAppShell>
  }

  return (
    <>
      {isEnabled ? (
        <PreviewProvider token={env.sanityToken}>{renderShell()}</PreviewProvider>
      ) : (
        <>{renderShell()}</>
      )}
    </>
  )
}
