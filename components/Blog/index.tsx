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
import { Box, Stack, Title, Space } from '@mantine/core'
import { Body } from '@/components/Fonts'
import RwdLayout from '@/components/Rwd/Layout'
import SanityImage from '@/components/sanity/Image'
import MyPassword from './MyPassword'
import { headerHeight } from '@/theme/config'
import type { PostData } from '@/types/post'
import classes from './index.module.css'

type BlogProps = {
  slug: string
  initialData: Partial<PostData>
}

export default function Blog({ slug, initialData }: BlogProps) {
  usePasswordUrl(slug)

  const [data] = useQuery<Partial<PostData>>(initialData, postQuery, { slug })
  const { title, description, content, mainImage, background } = data
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
      <Box pos="relative" ta="center">
        {/*   Background   */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
          <Box
            className={clsx('absolute-horizontal', classes.bg, { hide: !title })}
            top={{ base: `-${headerHeight.base}px`, sm: `-${headerHeight.sm}px` }}
            h={{
              base: `calc(100% + ${headerHeight.base}px)`,
              sm: `calc(100% + ${headerHeight.sm}px)`,
            }}
            style={{ w: '100vw', pointerEvents: 'none', background }}
          />
        </motion.div>

        <Space h={{ base: 48, sm: 80, lg: 40 }} />

        {/*   Title   */}
        <MotionSlide delay={2}>
          <Title fz={{ base: 20, sm: 28, lg: 44 }} mb={8}>
            {title}
          </Title>
        </MotionSlide>

        <MotionSlide delay={2.25}>
          <Body mb={40}>{description}</Body>
        </MotionSlide>

        {/*   Image   */}
        <Box style={{ overflow: 'hidden' }}>
          <MotionBlur delay={1}>
            <Box className={classes.image}>
              {imageAsset ? <SanityImage image={imageAsset} /> : null}
            </Box>
          </MotionBlur>
        </Box>
      </Box>

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
