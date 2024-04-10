'use client'

import _ from 'lodash'
import clsx from 'clsx'
import { useState, useEffect } from 'react'
import useQuery from '@/hooks/useQuery'
import { useAppSelector } from '@/hooks/redux'
import { usePasswordUrl } from '@/hooks/usePasswordUrl'
import { postQuery } from '@/utils/sanity/queries'
import { useScreenQueryValue } from '@/hooks/useScreenQuery'
import { motion } from 'framer-motion'
import { MotionSlide, MotionBlur } from '@/components/motion'
import { MyPortableText } from '@/components/PortableText'
import { Box, Stack, Space } from '@mantine/core'
import { MyTitle } from '@/components/Fonts'
import BlogInfo from '@/components/BlogCard/BlogInfo'
import RwdLayout from '@/components/Rwd/Layout'
import SanityImage from '@/components/sanity/Image'
import MyPassword from './MyPassword'
import { headerHeight } from '@/theme/config'
import type { PostData } from '@/types/post'
import classes from './index.module.css'

type BlogProps = {
  slug: string
  lang: string
  initialData: Partial<PostData>
}

export default function Blog({ slug, lang, initialData }: BlogProps) {
  usePasswordUrl(slug)

  const [data] = useQuery<Partial<PostData>>(initialData, postQuery, { slug, lang })
  const { title, content, mainImage, publishedAt, readTime = 5 } = data
  const { locked, password = '' } = data
  const show = !_.isEmpty(data)

  const [isInit, setInit] = useState(false)

  const { [slug]: postData } = useAppSelector(state => state.post.data)
  const input = postData?.password || ''
  const isLocked = Boolean(locked && input !== password)

  const imageAsset = useScreenQueryValue(mainImage, 'asset')

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setInit(true)
      }, 2000)
    }
  }, [show])

  if (!show) return null

  if (isLocked) {
    return (
      <Box
        pos="relative"
        h={{
          base: `calc(100dvh - ${headerHeight.base}px)`,
          sm: `calc(100dvh - ${headerHeight.sm}px)`,
        }}
      >
        <Stack h="100%" justify="center" align="center">
          <MotionSlide>
            <MyPassword slug={slug} data={data} />
          </MotionSlide>
          <Box w={1} h={headerHeight} />
        </Stack>
      </Box>
    )
  }

  return (
    <>
      <Box pos="relative" h="30vh" style={{ pointerEvents: 'none' }}>
        {/*   Background   */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
          <Box
            className={clsx('absolute-horizontal', classes.bg, { hide: !title })}
            top={{ base: `-${headerHeight.base}px`, sm: `-${headerHeight.sm}px` }}
            h={{
              base: `calc(100% + ${headerHeight.base}px)`,
              sm: `calc(100% + ${headerHeight.sm}px)`,
            }}
            w="100vw"
          >
            {/*   Cover   */}
            <Box className={clsx('absolute-center', classes.cover)}>
              <MotionBlur delay={1}>
                <Box>
                  {imageAsset ? (
                    <SanityImage image={imageAsset} style={{ height: '100%' }} />
                  ) : null}
                </Box>
              </MotionBlur>
            </Box>
          </Box>
        </motion.div>
      </Box>

      {/*   Title   */}

      <Space h={{ base: 40, sm: 80 }} />

      <RwdLayout mb={20}>
        <MotionSlide delay={2}>
          <Box w={{ base: '100%', sm: '66.66%', lg: '60%' }} mx="auto">
            <Stack gap={24}>
              <BlogInfo publishedAt={publishedAt} readTime={readTime} />
              <MyTitle>{title}</MyTitle>
            </Stack>
          </Box>
        </MotionSlide>
      </RwdLayout>

      {/*   Content   */}
      <Box
        style={{
          width: '100vw',
          overflowX: 'hidden',
        }}
      >
        <RwdLayout>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: isInit ? 0 : 2 }}
          >
            <Box pos="relative" py={{ base: 40, sm: 60, lg: 80 }}>
              <Box w={{ base: '100%', sm: '66.66%', lg: '60%' }} mx="auto">
                <MyPortableText content={content || []} />
              </Box>
            </Box>
          </motion.div>
        </RwdLayout>
      </Box>
    </>
  )
}
