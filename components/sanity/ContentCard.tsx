import Card from '@/components/Card'
import { MyPortableText } from '@/components/common'
import type { ContentCardData } from '@/types/contendCard'
import classes from './index.module.css'

export function ContentCard({ data }: { data: Partial<ContentCardData> }) {
  const { blockContent } = data || {}
  return (
    <Card className={classes.blockItem} px={40} py={32} pb={8}>
      <MyPortableText content={blockContent || []} />
    </Card>
  )
}
