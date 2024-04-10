import { Group } from '@mantine/core'
import { Caption } from '@/components/Fonts'
import { formatDate } from '@/utils/helper'

type BlogInfoProps = {
  publishedAt?: string
  readTime: number
}

export default function BlogInfo({ publishedAt, readTime }: BlogInfoProps) {
  return (
    <>
      <Group c="dimmed" gap={8}>
        {publishedAt ? (
          <>
            <Caption>{formatDate(publishedAt)}</Caption>
            <Caption>·</Caption>
          </>
        ) : null}
        <Caption>{`${readTime} min read`}</Caption>
      </Group>
    </>
  )
}
