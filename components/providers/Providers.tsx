'use client'

import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import BgTask from '@/components/BgTasks'
import { theme } from '@/theme'
import { resolver } from '@/theme/cssVariables'
import { publicEnv } from '@/utils/env'
import ReduxProvider from '@/stores/ReduxProvider'

export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <>
      <ReduxProvider>
        <MantineProvider
          theme={theme}
          cssVariablesResolver={resolver}
          defaultColorScheme={publicEnv.defaultColorScheme}
        >
          <ModalsProvider>
            <>
              {children}
              <BgTask />
            </>
          </ModalsProvider>
        </MantineProvider>
      </ReduxProvider>
    </>
  )
}
