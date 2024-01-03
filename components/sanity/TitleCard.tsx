import { Box, Divider } from '@mantine/core'
import Card from '@/components/Card'
import { MyTitle } from '@/components/Fonts'
import { MyPortableText } from '@/components/common'
import type { TitleCardData } from '@/types/titleCard'
import classes from './index.module.css'

export function TitleCard({ data }: { data: Partial<TitleCardData> }) {
  const { title, blockContent } = data || {}
  return (
    <Card className={classes.blockItem} style={{ borderRadius: '40px' }}>
      <MyTitle px={40} py={32}>
        {title}
      </MyTitle>
      <Divider />
      <Box px={40} py={32} pb={8}>
        <MyPortableText content={blockContent || []} />
      </Box>
    </Card>
  )
}
