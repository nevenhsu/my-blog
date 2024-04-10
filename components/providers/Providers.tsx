'use client'

import ReduxProvider from '@/stores/ReduxProvider'
import ThemeProvider from './ThemeProvider'
import BgTask from '@/components/BgTasks'

export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <>
      <ReduxProvider>
        <ThemeProvider>
          <>
            {children}
            <BgTask />
          </>
        </ThemeProvider>
      </ReduxProvider>
    </>
  )
}
