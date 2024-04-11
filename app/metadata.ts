import { client } from '@/utils/sanity/client'
import { metadataQuery } from '@/utils/sanity/queries'
import type { MetadataData } from '@/types/metadataData'
import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: {}
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const data = await client.fetch<MetadataData>(metadataQuery)

  if (!data) throw new Error('no metadata document')
  const { title, description, author, keywords, cover, svg, png } = data

  const metadata: Metadata = {
    title,
    description,
    authors: { name: author },

    openGraph: {
      title,
      description,
      images: {
        url: cover.url,
        type: cover.mimeType,
        width: cover.dimensions.width,
        height: cover.dimensions.height,
      },
      type: 'website',
    },

    keywords,

    icons: {
      icon: [
        { type: 'image/svg+xml', url: svg.url },
        { type: 'image/png', url: png.url },
      ],
    },
  }

  return metadata
}
