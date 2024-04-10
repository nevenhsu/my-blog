'use client'

import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useElementSize } from '@mantine/hooks'
import { useScreenQueryValue } from '@/hooks/useScreenQuery'
import { Box, Group, Stack } from '@mantine/core'
import { MyTitle, Body, Caption } from '@/components/Fonts'
import SanityImage from '@/components/sanity/Image'
import BorderGold from '@/public/images/border-gold.svg'
import BorderGold2 from '@/public/images/border-gold-2.svg'
import classes from './index.module.css'
import type { PostData } from '@/types/post'

export default function PostCard({ data }: { data: Partial<PostData> }) {
  const router = useRouter()
  const { ref, height } = useElementSize()
  const { title, description, slug, mainImage, categories } = data

  const imageAsset = useScreenQueryValue(mainImage, 'asset')

  return (
    <>
      <Box
        ref={ref}
        className={clsx(classes.card, 'c-pointer')}
        onClick={() => (slug ? router.push(`/blog/${slug.current}`) : null)}
      >
        {/*   Background Image  */}
        <Box className={clsx(classes.bgDiv, 'absolute-center', 'pointer-events-none')}>
          {imageAsset ? (
            <Box className={classes.bg}>
              <SanityImage image={imageAsset} style={{ height: '100%' }} />
            </Box>
          ) : null}
        </Box>

        <Stack className={classes.content} px={16} py={24} gap={20}>
          <MyTitle>{title}</MyTitle>

          {imageAsset ? (
            <Box pos="relative">
              <>
                <Box className={classes.imgBox}>
                  <SanityImage image={imageAsset} />
                </Box>
                <BorderGold2
                  className="absolute-center pointer-events-none"
                  width="100%"
                  height="100%"
                />
              </>
            </Box>
          ) : null}

          <Body lineClamp={3}>{description}</Body>

          <Group gap={8}>
            {categories?.map(e => (
              <Caption key={e.title} className={classes.label} bg="blueGray.6">
                {e.title}
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
