import groq from 'groq'
import { client } from '@/utils/sanity/client'
import type { ImageData } from '@/types/image'
import type { HomeData } from '@/types/home'
import type { FooterData } from '@/types/footer'
import type { SanitySlug } from '@/types/common'
import type { AboutData } from '@/types/about'

const assetQuery = groq`
asset {
  ...,
  "lqip": @->metadata.lqip
},
lottie {
  ...,
  "url": @.asset->url,
}
`

const avatarQuery = groq`
avatar -> {
  ...,
  image {
    ${assetQuery}
  }
}
`

const imageQuery = groq`
*[_id == $id][0] 
`

export async function getImageData(id: string) {
  try {
    const data = await client.fetch<ImageData>(imageQuery, { id })
    return data
  } catch (err) {
    console.error(err)
  }
}

export const homeQuery = groq`
*[_type=='home'][0]
{
  ...,
  news[] {
    ...,
    post {
      ...,
      "slug": @->slug.current,
      "categories": @->categories[]->title,
    },
    ${assetQuery}
  },
  gallery {
    ...,
    images[] {
      ...,
      "dimensions": lottieImage.asset->metadata.dimensions,
      lottieImage {
        ...,
        ${assetQuery}
      }
    }
  }
}
`

export async function getHomeData(): Promise<Partial<HomeData>> {
  try {
    const data = await client.fetch<HomeData>(homeQuery)
    return data
  } catch (err) {
    console.error(err)
    return {}
  }
}

export const footerQuery = groq`
*[_type=='footer'][0] {
  ...,
  links[] {
    ...,
    qrcode {
      ...,
      ${assetQuery}
    }
  }
}
`

export async function getFooterData(): Promise<Partial<FooterData>> {
  try {
    const data = await client.fetch<FooterData>(footerQuery)
    return data
  } catch (err) {
    console.error(err)
    return {}
  }
}

export const slugQuery = groq`
*[_type=='post']
{
  slug
}
`

export async function getSlugData() {
  try {
    const data = await client.fetch<Array<SanitySlug>>(slugQuery)
    return data
  } catch (err) {
    console.error(err)
    return []
  }
}

const contentRef = groq`
_type == 'space' => @->,
_type == 'image' => {
  ...,
  ${assetQuery}
},
_type == 'block' => {
  ...,
  markDefs[] {
    ...,
    _type == 'internalLink' => {
      ...,
      "slug": @.reference->slug.current,
    }
  }
}
`

const getBlockRef = (type: string) => groq`
_type == '${type}' => {
  ...,
  blockContent[] {
    ...,
    ${contentRef}
  }
}
`

const blockContent = groq`
{
  ...,
  ${contentRef},
  
  _type == 'rwd' => @-> {
    ...,
    items[] {
      ...,
      ${contentRef},
      ${getBlockRef('content')},
      ${getBlockRef('titleCard')},
      ${getBlockRef('contentCard')}
    }
  }
}
`

const postDataQuery = groq`
  ...,
  categories[]->,
  mainImage {
    ...,
    base { ..., ${assetQuery} },
    xs { ..., ${assetQuery} },
    sm { ..., ${assetQuery} },
    md { ..., ${assetQuery} },
    lg { ..., ${assetQuery} },
    xl { ..., ${assetQuery} }
  },
  ${avatarQuery},
`

export const postQuery = groq`
*[_type=='post' && slug.current == $slug][0]
{ 
  ${postDataQuery}
  content[] ${blockContent},
}
`

export async function getPostData(slug: string) {
  try {
    const data = await client.fetch(postQuery, { slug })
    return data
  } catch (err) {
    console.error(err)
    return {}
  }
}

export const postsQuery = groq`
*[_type=='post'] | order(publishedAt desc)
{ 
  ${postDataQuery} 
  "content": null
}
`

export async function getPostsData() {
  try {
    const data = await client.fetch(postsQuery)
    return data
  } catch (err) {
    console.error(err)
    return {}
  }
}

export const aboutQuery = groq`
*[_type=='about'][0]
{
  ...,
  mainImage {
    ...,
    ${assetQuery}
  },
  commends[] -> {
    ...,
    ${avatarQuery}
  },
  body[] ${blockContent}
}
`

export async function getAboutData() {
  try {
    const data = await client.fetch<AboutData>(aboutQuery)
    return data
  } catch (err) {
    console.error(err)
    return {}
  }
}

export const devQuery = groq`
*[_type=='dev'][0] {
  ...,
  content[] ${blockContent}
}
`

export async function getDevData() {
  try {
    const data = await client.fetch<any>(devQuery)
    return data
  } catch (err) {
    console.error(err)
    return {}
  }
}
