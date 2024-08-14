import type { CSSVariablesResolver } from '@mantine/core'

export const resolver: CSSVariablesResolver = theme => ({
  variables: {},
  light: {},
  dark: {
    '--body-second': 'var(--mantine-color-blueGray-5)',
    '--divider-color': 'var(--body-second)',
    '--table-border-color': 'var(--body-second)',
    '--mantine-color-body': theme.black,
    '--mantine-color-text': theme.white,
    '--mantine-color-dimmed': 'var(--mantine-color-blueGray-2)',
    '--mantine-color-error': '#F6465D',
    '--text-color': 'var(--mantine-color-white)',
  },
})
