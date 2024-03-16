'use client'

import { Stack, Box } from '@mantine/core'
import type { GalleryDataArray, GalleryData } from '@/types/gallery'

export default function Gallery({ data }: { data: GalleryDataArray }) {
  return (
    <>
      <Stack>
        {data.map(d => (
          <GalleryImage key={d._key} data={d} />
        ))}
      </Stack>
    </>
  )
}

function GalleryImage({ data }: { data: GalleryData }) {
  return <Box pos="relative"></Box>
}
