'use client'

import _ from 'lodash'
import clsx from 'clsx'
import useQuery from '@/hooks/useQuery'
import { useScreenQueryValue } from '@/hooks/useScreenQuery'
import { useElementSize } from '@mantine/hooks'
import { postsQuery } from '@/utils/sanity/queries'
import RwdLayout from '@/components/Rwd/Layout'
import { Box, Grid, Group, Stack } from '@mantine/core'
import { Caption, MyTitle, Body } from '@/components/Fonts'
import SanityImage from '@/components/sanity/Image'
import BorderGold from '@/public/images/border-gold.svg'
import BorderGold2 from '@/public/images/border-gold-2.svg'
import type { PostData } from '@/types/post'
import classes from './index.module.css'

type BlogListProps = {
  initialData: any
}

export default function BlogList({ initialData }: BlogListProps) {
  const [data] = useQuery<Array<PostData>>(initialData, postsQuery)

  return (
    <RwdLayout>
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

function BlogCard({ data }: { data: Partial<PostData> }) {
  const { publishedAt, mainImage, readTime = 5 } = data

  const imageAsset = useScreenQueryValue(mainImage, 'asset')
  const { ref, height } = useElementSize()

  return (
    <Box ref={ref} className={clsx(classes.card, 'c-pointer')}>
      {imageAsset ? (
        <Box className={clsx('absolute-center', 'pointer-events-none', classes.bg)}>
          <SanityImage image={imageAsset} style={{ height: '100%' }} />
        </Box>
      ) : null}

      <Box className={classes.content}>
        <Grid columns={6} gutter={0}>
          <Grid.Col span={4}>
            <Stack pr={16}>
              <Group>
                <Caption>3</Caption>
                <Caption>{`${readTime} min read`}</Caption>
              </Group>
              <MyTitle>{data.title}</MyTitle>
              <Body lineClamp={2}>{data.description}</Body>
            </Stack>
          </Grid.Col>
          <Grid.Col span={2}>
            <Box pos="relative" className={classes.image}>
              {imageAsset ? <SanityImage image={imageAsset} /> : null}
              <BorderGold2
                className="absolute-center pointer-events-none"
                width="100%"
                style={{ height: Math.floor(height) - 32 }}
              />
            </Box>
          </Grid.Col>
        </Grid>
        <BorderGold
          className="absolute-center pointer-events-none"
          width="100%"
          style={{ height: Math.floor(height) }}
        />
      </Box>
    </Box>
  )
}
