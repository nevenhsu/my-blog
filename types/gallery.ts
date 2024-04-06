import type { LottieImageData } from './lottieImage'
import type { SanityArray } from '@/types/common'

export type GalleryData = {
  title: string
  lottieImage: LottieImageData
  dimensions: {
    width: number
    height: number
    aspectRatio: number
  }
}

export type GalleryDataArray = SanityArray<GalleryData>
