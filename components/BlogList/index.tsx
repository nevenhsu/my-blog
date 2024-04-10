'use client'

import _ from 'lodash'
import useQuery from '@/hooks/useQuery'
import { useAppContext } from '@/stores/AppContext'
import { postsQuery } from '@/utils/sanity/queries'
import { Box, Stack } from '@mantine/core'
import { BlogCard } from '@/components/BlogCard'
import PostCard from '@/components/PostCard'
import RwdLayout from '@/components/Rwd/Layout'
import classes from './index.module.css'
import type { PostData } from '@/types/post'

type BlogListProps = {
  initialData: Array<PostData>
  lang: string
}

export default function BlogList({ initialData, lang }: BlogListProps) {
  const [data] = useQuery<Array<PostData>>(initialData, postsQuery, { lang })

  const {
    state: { viewportSize },
  } = useAppContext()

  const isMobile = viewportSize.width < 576

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

      <Box h={40} />

      <Stack gap={24}>
        {_.map(data, (post, i) => (
          <>
            {isMobile ? (
              <PostCard key={post.slug.current} data={post} />
            ) : (
              <BlogCard key={post.slug.current} data={post} />
            )}
          </>
        ))}
      </Stack>

      <Box h={{ base: 60, sm: 100 }} />
    </RwdLayout>
  )
}
