import type { NewsData } from './news'
import type { SanityArray } from './common'
import type { GalleryDataArray } from './gallery'
import type { LightsData } from './lights'
import type { PatternData } from './pattern'
import type { HrefData } from './href'

export type HomeData = {
  header: string
  titles: string[]
  titleDuration: number
  subtitle: string
  subtitleHref: HrefData
  caption1: string
  caption2: string
  captionHref: string
  newsTitle: string
  arrowText: string
  news: SanityArray<NewsData>
  galleryTitle: string
  gallery: {
    images: GalleryDataArray
  }
  lights: LightsData
  pattern: PatternData
}
