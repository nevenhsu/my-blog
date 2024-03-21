'use client'

import _ from 'lodash'
import useQuery from '@/hooks/useQuery'
import { postsQuery } from '@/utils/sanity/queries'
import { Box, Stack } from '@mantine/core'
import { BlogCard } from '@/components/BlogCard'
import RwdLayout from '@/components/Rwd/Layout'
import classes from './index.module.css'
import type { PostData } from '@/types/post'

type BlogListProps = {
  initialData: Array<PostData>
}

export default function BlogList({ initialData }: BlogListProps) {
  const [data] = useQuery<Array<PostData>>(initialData, postsQuery)

  return (
    <RwdLayout w={{ base: '100%', lg: 992 }}>
      {/*  Pattern Background   */}
      <Box
        className={classes.fixed}
        style={{
          background: `url('/images/dots.png') repeat`,
          backgroundSize: '64px',
          opacity: 0.1,
        }}
      />

      <Box h={32} />

      <Stack gap={24}>
        {_.map(data, (post, i) => (
          <BlogCard key={post.slug.current} data={post} />
        ))}
      </Stack>

      <Box h={{ base: 60, sm: 100 }} />
    </RwdLayout>
  )
}
