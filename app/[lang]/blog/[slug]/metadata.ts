import { client } from '@/utils/sanity/client'
import { postMetaQuery } from '@/utils/sanity/queries'
import type { PostData } from '@/types/post'
import type { Metadata, ResolvingMetadata } from 'next'

export async function generateMetadata(
  {
    params,
    searchParams,
  }: {
    params: { lang: string; slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug, lang } = params
  const data = await client.fetch<PostData>(postMetaQuery, { slug, lang })

  if (!data) throw new Error('no metadata document')
  const { title, description, mainImage } = data

  const breakpoints = ['xl', 'lg', 'md', 'sm', 'xs', 'base'] as const

  const cover = mainImage?.[breakpoints.find(bp => mainImage[bp]) || 'base']

  const metadata: Metadata = {
    title,
    description,

    openGraph: cover?.asset
      ? {
          title,
          description,
          images: {
            url: cover.asset.url!,
            type: cover.asset.mimeType!,
            width: cover.asset.dimensions!.width,
            height: cover.asset.dimensions!.height,
          },
          type: 'website',
        }
      : {},
  }

  return metadata
}
