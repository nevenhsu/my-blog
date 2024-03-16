'use client'

import clsx from 'clsx'
import { Stack, AspectRatio, Box } from '@mantine/core'
import Fake3d from '@/components/Fake3d'
import { MyTitle } from '@/components/Fonts'
import { urlFor } from '@/utils/sanity/imageUrlBuilder'
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
  const { image, depth, dimensions } = data
  return (
    <Box pos="relative">
      <AspectRatio ratio={dimensions.aspectRatio}>
        <Fake3d uid={data.title} imageUrl={urlFor(image).url()} depthUrl={urlFor(depth).url()} />
      </AspectRatio>
      <MyTitle
        className={clsx('absolute-center', classes.galleryTitle)}
        fw={200}
        w={{ base: '75%', sm: '50%', lg: '40%' }}
        py={10}
      >
        {data.title}
      </MyTitle>
    </Box>
  )
}
