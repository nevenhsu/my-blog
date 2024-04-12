import { Group } from '@mantine/core'
import { Caption } from '@/components/Fonts'
import { formatDate } from '@/utils/helper'
import type { PostData } from '@/types/post'

export default function BlogInfo({ data }: { data: Partial<PostData> }) {
  const { publishedAt, readTime = 5 } = data
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
