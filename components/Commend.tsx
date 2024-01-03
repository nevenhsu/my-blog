import { Box, Group } from '@mantine/core'
import { Caption, Body } from '@/components/Fonts'
import SanityImage from '@/components/sanity/Image'
import type { CommendData } from '@/types/commend'

export default function Commend({ data }: { data: Partial<CommendData> }) {
  const { avatar } = data
  const { name, bio, image } = avatar || {}
  return (
    <Box>
      <Group mb={24} gap={12}>
        <Box
          w={40}
          h={40}
          style={{
            borderRadius: 999,
            overflow: 'hidden',
          }}
        >
          {image?.asset ? <SanityImage image={image.asset} /> : null}
        </Box>
        <Box>
          <Caption fw="bold">{name}</Caption>
          <Caption>{bio}</Caption>
        </Box>
      </Group>
      <Box mb={24}>
        <Body>{data.content}</Body>
      </Box>
    </Box>
  )
}
