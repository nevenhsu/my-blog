import type { SanityReference } from './common'
import type { ImageAssetData } from './image'

export type NewsData = {
  title: string
  subtitle: string
  asset: ImageAssetData
  post: SanityReference & { slug: string }
}
