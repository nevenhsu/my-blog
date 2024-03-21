'use client'

import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useElementSize } from '@mantine/hooks'
import { Box, Group, Stack } from '@mantine/core'
import { MyTitle, Body, Caption } from '@/components/Fonts'
import SanityImage from '@/components/sanity/Image'
import BorderGold from '@/public/images/border-gold.svg'
import BorderGold2 from '@/public/images/border-gold-2.svg'
import classes from './index.module.css'
import type { NewsData } from '@/types/news'

export default function NewsCard({ data }: { data: Partial<NewsData> }) {
  const router = useRouter()
  const { ref, height } = useElementSize()
  const { title, subtitle, asset, post } = data

  return (
    <>
      <Box
        ref={ref}
        className={clsx(classes.card, 'c-pointer')}
        onClick={() => (post?.slug ? router.push(`/blog/${post.slug}`) : null)}
      >
        {/*   Background Image  */}
        <Box className={clsx(classes.bgDiv, 'absolute-center', 'pointer-events-none')}>
          {asset ? (
            <Box className={classes.bg}>
              <SanityImage image={asset} style={{ height: '100%' }} />
            </Box>
          ) : null}
        </Box>

        <Stack className={classes.content} px={16} py={24} gap={20}>
          <MyTitle>{title}</MyTitle>

          {asset ? (
            <Box pos="relative">
              <>
                <Box className={classes.imgBox}>
                  <SanityImage image={asset} />
                </Box>
                <BorderGold2
                  className="absolute-center pointer-events-none"
                  width="100%"
                  height="100%"
                />
              </>
            </Box>
          ) : null}

          <Body>{subtitle}</Body>

          <Group gap={8}>
            {post?.categories.map(e => (
              <Caption key={e} className={classes.label} bg="blueGray.6">
                {e}
              </Caption>
            ))}
          </Group>
        </Stack>

        <BorderGold
          className="absolute-center pointer-events-none"
          width="100%"
          style={{ height: Math.floor(height) }}
        />
      </Box>
    </>
  )
}
