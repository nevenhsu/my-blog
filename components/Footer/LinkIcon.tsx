import { Box } from '@mantine/core'
import { SocialIcon } from './common'
import type { SocialIconData } from '@/types/socialIcon'

export default function LinkIcon({ data }: { data: Partial<SocialIconData> }) {
  const { href } = data

  const handleOpen = () => {
    if (href) {
      window.open(href, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <Box onClick={handleOpen}>
      <SocialIcon data={data} />
    </Box>
  )
}
