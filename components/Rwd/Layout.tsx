import { Box, type BoxProps } from '@mantine/core'

export default function RwdLayout(props: BoxProps & { children: React.ReactNode }) {
  return (
    <Box
      pos="relative"
      w={{ base: '100%', xl: 1280 }}
      px={{ base: 24, sm: 40 }}
      mx="auto"
      {...props}
    />
  )
}
