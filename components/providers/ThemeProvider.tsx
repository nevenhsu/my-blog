'use client'

import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { theme } from '@/theme'
import { resolver } from '@/theme/cssVariables'
import { publicEnv } from '@/utils/env'

export default function ThemeProvider({ children }: React.PropsWithChildren) {
  return (
    <MantineProvider
      theme={theme}
      cssVariablesResolver={resolver}
      defaultColorScheme={publicEnv.defaultColorScheme}
    >
      <ModalsProvider>{children}</ModalsProvider>
    </MantineProvider>
  )
}
