import type { GalleryDataArray } from './gallery'
import type { LightsData } from './lights'
import type { PatternData } from './pattern'
import type { HrefData } from './href'
import type { PostData } from './post'

export type HomeData = {
  header: string
  titles: string[]
  titleDuration: number
  subtitle: string
  subtitleHref: HrefData
  caption1: string
  caption2: string
  captionHref: HrefData
  newsTitle: string
  arrowText: string
  posts: Array<Omit<PostData, 'content'> & { _id: string }>
  galleryTitle: string
  gallery: {
    images: GalleryDataArray
  }
  lights: LightsData
  pattern: PatternData
}
