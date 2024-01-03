'use client'

import { createTheme } from '@mantine/core'
import { colors } from './colors'

const titleFF = 'var(--font-title)'
const bodyFF = 'var(--font-title)'

export const theme = createTheme({
  focusRing: 'never',
  black: '#000',
  white: '#fff',
  primaryShade: { light: 6, dark: 8 },
  primaryColor: 'dark',
  colors,
  fontFamily: bodyFF,
  headings: {
    fontFamily: titleFF,
    fontWeight: '700',
    sizes: {
      h1: {
        fontSize: 'calc(2.75rem * var(--mantine-scale))', // 44
        lineHeight: '1.3',
      },
      h2: {
        fontSize: 'calc(1.75rem * var(--mantine-scale))', // 28
        lineHeight: '1.25',
      },
      h3: {
        fontSize: 'calc(1.5rem * var(--mantine-scale))', // 24
        lineHeight: '1.25',
      },
      h4: {
        fontSize: 'calc(1.25rem * var(--mantine-scale))', // 20
        lineHeight: '1.25',
      },
      h5: {
        fontSize: 'calc(1.125rem * var(--mantine-scale))', // 18
        lineHeight: '1.25',
      },
      h6: {
        fontSize: 'calc(1rem * var(--mantine-scale))', // 16
        lineHeight: '1.25',
      },
    },
  },
  fontSizes: {
    xs: 'calc(0.75rem * var(--mantine-scale))', // 12
    sm: 'calc(0.875rem * var(--mantine-scale))', // 14
    md: 'calc(1rem * var(--mantine-scale))', // 16
    lg: 'calc(1.125rem * var(--mantine-scale))', // 18
    xl: 'calc(1.25rem * var(--mantine-scale))', // 20
  },
  lineHeights: {
    xs: '1.4',
    sm: '1.45',
    md: '1.55',
    lg: '1.6',
    xl: '1.65',
  },
  radius: {
    xs: 'calc(0.25rem * var(--mantine-scale))',
    sm: 'calc(0.5rem * var(--mantine-scale))',
    md: 'calc(1rem * var(--mantine-scale))',
    lg: 'calc(1.5rem * var(--mantine-scale))',
    xl: 'calc(2rem * var(--mantine-scale))',
  },
  spacing: {
    xs: 'calc(0.5rem * var(--mantine-scale))',
    sm: 'calc(0.75rem * var(--mantine-scale))',
    md: 'calc(1rem * var(--mantine-scale))',
    lg: 'calc(1.5rem * var(--mantine-scale))',
    xl: 'calc(2rem * var(--mantine-scale))',
  },
  breakpoints: {
    xs: '36em', // 576
    sm: '48em', // 768
    md: '62em', // 992
    lg: '75em', // 1200
    xl: '88em', // 1408
  },
  shadows: {
    xs: '0 calc(0.0625rem * var(--mantine-scale)) calc(0.1875rem * var(--mantine-scale)) rgba(0, 0, 0, 0.05), 0 calc(0.0625rem * var(--mantine-scale)) calc(0.125rem * var(--mantine-scale)) rgba(0, 0, 0, 0.1)',
    sm: '0 calc(0.0625rem * var(--mantine-scale)) calc(0.1875rem * var(--mantine-scale)) rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 calc(0.625rem * var(--mantine-scale)) calc(0.9375rem * var(--mantine-scale)) calc(-0.3125rem * var(--mantine-scale)), rgba(0, 0, 0, 0.04) 0 calc(0.4375rem * var(--mantine-scale)) calc(0.4375rem * var(--mantine-scale)) calc(-0.3125rem * var(--mantine-scale))',
    md: '0 calc(0.0625rem * var(--mantine-scale)) calc(0.1875rem * var(--mantine-scale)) rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 calc(1.25rem * var(--mantine-scale)) calc(1.5625rem * var(--mantine-scale)) calc(-0.3125rem * var(--mantine-scale)), rgba(0, 0, 0, 0.04) 0 calc(0.625rem * var(--mantine-scale)) calc(0.625rem * var(--mantine-scale)) calc(-0.3125rem * var(--mantine-scale))',
    lg: '0 calc(0.0625rem * var(--mantine-scale)) calc(0.1875rem * var(--mantine-scale)) rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 calc(1.75rem * var(--mantine-scale)) calc(1.4375rem * var(--mantine-scale)) calc(-0.4375rem * var(--mantine-scale)), rgba(0, 0, 0, 0.04) 0 calc(0.75rem * var(--mantine-scale)) calc(0.75rem * var(--mantine-scale)) calc(-0.4375rem * var(--mantine-scale))',
    xl: '0 calc(0.0625rem * var(--mantine-scale)) calc(0.1875rem * var(--mantine-scale)) rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 calc(2.25rem * var(--mantine-scale)) calc(1.75rem * var(--mantine-scale)) calc(-0.4375rem * var(--mantine-scale)), rgba(0, 0, 0, 0.04) 0 calc(1.0625rem * var(--mantine-scale)) calc(1.0625rem * var(--mantine-scale)) calc(-0.4375rem * var(--mantine-scale))',
  },
  components: {},
})
