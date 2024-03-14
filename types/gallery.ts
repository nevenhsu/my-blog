import type { ImageAssetData } from './image'
import type { SanityArray } from '@/types/common'

export type GalleryData = {
  dimensions: {
    width: number
    height: number
    aspectRatio: number
  }
  title: string
  asset: ImageAssetData
  depth: ImageAssetData
}

export type GalleryDataArray = SanityArray<GalleryData>
