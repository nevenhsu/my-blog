import { Box, Popover } from '@mantine/core'
import { Body } from '@/components/Fonts'
import SanityImage from '@/components/sanity/Image'
import LinkIcon from './LinkIcon'
import { SocialIcon, TitleGroup, CopyName } from './common'
import type { SocialIconData } from '@/types/socialIcon'

export default function PopoverIcon({ data }: { data: SocialIconData }) {
  const { username, noPopup } = data
  const { asset } = data.qrcode || {}

  if (!asset || noPopup) {
    return <LinkIcon data={data} />
  }

  return (
    <Popover
      width={280}
      position="top"
      withArrow
      shadow="md"
      radius={24}
      styles={{
        dropdown: { padding: 24, background: 'var(--mantine-color-black)' },
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

          <Body mb={4}>{username}</Body>

          <CopyName data={data} />
        </Box>
      </Popover.Dropdown>
    </Popover>
  )
}
