'use client'

import clsx from 'clsx'
import { useAppContext } from '@/stores/AppContext'
import { Stack, Box } from '@mantine/core'
import { MyTitle } from '@/components/Fonts'
import { LottieImage } from '@/components/sanity/LottieImage'
import MyCarousel from '@/components/Carousel'
import classes from './index.module.css'
import type { GalleryDataArray, GalleryData } from '@/types/gallery'

export default function Gallery({ data }: { data: GalleryDataArray }) {
  const {
    state: { viewportSize },
  } = useAppContext()
  const isMobile = viewportSize.width < 576

  if (isMobile) {
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

  return (
    <>
      <MyCarousel duration={10} slideSize="50%" withControls={false}>
        {data.map((d, i) => (
          <GalleryImage key={d._key} data={d} />
        ))}
      </MyCarousel>
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
        w="60%"
        py={{ base: 10, sm: 16 }}
      >
        {data.title}
      </MyTitle>
    </Box>
  )
}
