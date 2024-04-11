import { Box } from '@mantine/core'
import Dev from '@/components/Dev'

export default function DevPage() {
  return (
    <Box
      style={{
        width: '100vw',
        height: '100vh',
        overflowX: 'hidden',
      }}
    >
      <Dev />
    </Box>
  )
}
