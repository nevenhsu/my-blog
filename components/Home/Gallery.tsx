'use client'

import clsx from 'clsx'
import { Stack, Box } from '@mantine/core'
import { MyTitle } from '@/components/Fonts'
import { LottieImage } from '@/components/sanity/LottieImage'
import classes from './index.module.css'
import type { GalleryDataArray, GalleryData } from '@/types/gallery'

export default function Gallery({ data }: { data: GalleryDataArray }) {
  return (
    <>
      <Stack h={`calc(100% - (30 * ${data.length})px)`}>
        {data.map((d, i) => (
          <GalleryImage key={d._key} data={d} />
        ))}
      </Stack>
    </>
  )
}

function GalleryImage({ data }: { data: GalleryData }) {
  const { lottieImage } = data

  return (
    <Box pos="relative">
      <Box w={{ base: '100%', sm: '75%' }} mx="auto">
        <LottieImage value={lottieImage} />
      </Box>
      <MyTitle
        className={clsx('absolute-center', classes.galleryTitle)}
        fw={200}
        w={{ base: '75%', sm: '50%', lg: '40%' }}
        py={{ base: 10, sm: 20 }}
      >
        {data.title}
      </MyTitle>
    </Box>
  )
}
