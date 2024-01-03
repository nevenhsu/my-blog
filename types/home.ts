import type { ColorData } from './color'
import type { NewsData } from './news'
import type { SanityArray, SanityReference } from './common'
import type { GalleryDataArray } from './gallery'

export type HomeData = {
  header: string
  titles: string[]
  titleDuration: number
  subtitle: string
  subtitleBold: string
  subtitleBoldHref: string
  caption1: string
  caption2: string
  captionBold: string
  captionBoldHref: string
  bgFlash: ColorData
  bgColors: SanityArray<ColorData>
  bgColorsSecondary: SanityArray<ColorData>
  newsTitle: string
  arrowText: string
  news: SanityArray<NewsData>
  galleryTitle: string
  gallery: {
    cols: number
    images: GalleryDataArray
    bgPattern: SanityReference
    bgPatternSize: string
  }
}
