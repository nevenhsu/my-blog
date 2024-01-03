import type { PortableTextBlock } from 'sanity'
import type { ImageAssetData } from './image'
import type { CommendData } from './commend'
import type { SanityArray } from './common'

export type AboutData = {
  title: string
  subtitle1: string
  subtitle2: string
  body: PortableTextBlock[]
  mainImage: {
    asset: ImageAssetData
  }
  commendsTitle: string
  commends: SanityArray<CommendData>
  duration: number
}
