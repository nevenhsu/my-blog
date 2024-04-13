import type { PortableTextBlock } from 'sanity'
import type { ImageAssetData } from './image'
import type { MemberData } from './member'
import type { SanityArray } from './common'

export type AboutData = {
  title: string
  subtitle1: string
  subtitle2: string
  body: PortableTextBlock[]
  mainImage: {
    asset: ImageAssetData
  }
  membersTitle: string
  members: SanityArray<MemberData>
  duration: number
}
