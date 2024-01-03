import { Box, Popover } from '@mantine/core'
import { Subtitle } from '@/components/Fonts'
import SanityImage from '@/components/sanity/Image'
import { SocialIcon, TitleGroup, CopyName } from './common'
import type { SocialIconData } from '@/types/socialIcon'

export default function PopoverIcon({ data }: { data: SocialIconData }) {
  const { username, href, noPopup } = data
  const { asset } = data.qrcode || {}

  const handleOpen = () => {
    if (href) {
      window.open(href, '_blank', 'noopener,noreferrer')
    }
  }

  if (!asset || noPopup) {
    return (
      <Box onClick={handleOpen}>
        <SocialIcon data={data} />
      </Box>
    )
  }

  return (
    <Popover
      width={280}
      position="top"
      withArrow
      shadow="md"
      radius={24}
      styles={{
        dropdown: { padding: 24, background: '#000' },
      }}
    >
      <Popover.Target>
        <SocialIcon data={data} />
      </Popover.Target>
      <Popover.Dropdown>
        <Box ta="center">
          <TitleGroup data={data} />

          <Box w={160} h={160} my={24} mx="auto">
            <SanityImage image={asset} />
          </Box>

          <Subtitle mb={4}>{username}</Subtitle>

          <CopyName data={data} />
        </Box>
      </Popover.Dropdown>
    </Popover>
  )
}
