'use client'

import { SimpleGrid, Box } from '@mantine/core'
import useRwd from '@/hooks/useRwd'
import { LottieImage } from '@/components/common'
import type { GalleryDataArray, GalleryData } from '@/types/gallery'

export default function Gallery({ data, cols }: { cols: number; data: GalleryDataArray }) {
  return (
    <>
      <SimpleGrid cols={cols}>
        {data.map(d => (
          <GalleryImage key={d._key} data={d} />
        ))}
      </SimpleGrid>
    </>
  )
}

function GalleryImage({ data }: { data: GalleryData }) {
  const results = useRwd({ x: 'left', y: 'top', width: 'w', height: 'h' }, data.rwd, {
    width: '100%',
  })

  return (
    <Box pos="relative" {...results}>
      <LottieImage value={data} />
    </Box>
  )
}
