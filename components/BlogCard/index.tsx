'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { useScreenQueryValue } from '@/hooks/useScreenQuery'
import { Box, Grid, Stack } from '@mantine/core'
import { MyTitle, Body } from '@/components/Fonts'
import BlogInfo from './BlogInfo'
import SanityImage from '@/components/sanity/Image'
import BorderGold from '@/public/images/border-gold.svg'
import BorderGold2 from '@/public/images/border-gold-2.svg'
import type { PostData } from '@/types/post'
import classes from './index.module.css'

export function BlogCard({ data }: { data: Partial<PostData> }) {
  const { mainImage, slug } = data

  const imageAsset = useScreenQueryValue(mainImage, 'asset')

  return (
    <Link href={slug ? `/blog/${slug.current}` : ''}>
      <Box className={classes.card}>
        <Box
          className={clsx(classes.bgDiv, 'absolute-center', 'pointer-events-none')}
          style={{
            background: 'var(--mantine-color-body)',
            opacity: 0.6,
          }}
        />

        {/*   Background Image  */}
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
              <Stack pr={{ base: 16, sm: 24 }} gap={20}>
                <BlogInfo data={data} />
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
                  height="100%"
                />
              </Box>
            </Grid.Col>
          </Grid>
          <BorderGold className="absolute-center pointer-events-none" width="100%" height="100%" />
        </Box>
      </Box>
    </Link>
  )
}
