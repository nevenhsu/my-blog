'use client'

import clsx from 'clsx'
import { useScreenQueryValue } from '@/hooks/useScreenQuery'
import { useElementSize } from '@mantine/hooks'
import { Box, Grid, Group, Stack } from '@mantine/core'
import { Caption, MyTitle, Body } from '@/components/Fonts'
import SanityImage from '@/components/sanity/Image'
import { formatDate } from '@/utils/helper'
import BorderGold from '@/public/images/border-gold.svg'
import BorderGold2 from '@/public/images/border-gold-2.svg'
import type { PostData } from '@/types/post'
import classes from './index.module.css'

export function BlogCard({ data }: { data: Partial<PostData> }) {
  const { publishedAt, mainImage, readTime = 5 } = data

  const imageAsset = useScreenQueryValue(mainImage, 'asset')
  const { ref, height } = useElementSize()

  return (
    <Box ref={ref} className={clsx(classes.card, 'c-pointer')}>
      <Box className={clsx(classes.bgDiv, 'absolute-center', 'pointer-events-none')}>
        {imageAsset ? (
          <Box className={classes.bg}>
            <SanityImage image={imageAsset} style={{ height: '100%' }} />
          </Box>
        ) : null}
      </Box>

      <Box className={classes.content}>
        <Grid columns={6} gutter={0}>
          <Grid.Col span={4}>
            <Stack pr={{ base: 16, sm: 24 }}>
              <Group c="dimmed" gap={8}>
                {publishedAt ? (
                  <>
                    <Caption>{formatDate(publishedAt)}</Caption>
                    <Caption>·</Caption>
                  </>
                ) : null}
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
