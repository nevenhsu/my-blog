import type { ImageAssetData } from './image'
import type { RectData } from './rect'
import type { SanityArray } from '@/types/common'
import type { LottieData } from '@/types/lottie'

export type GalleryData = {
  dimensions: {
    width: number
    height: number
    aspectRatio: number
  }
  asset: ImageAssetData
  lottie?: LottieData
  rwd?: {
    base?: RectData
    xs?: RectData
    sm?: RectData
    md?: RectData
    lg?: RectData
    xl?: RectData
  }
  hidden?: boolean
}

export type GalleryDataArray = SanityArray<GalleryData>
