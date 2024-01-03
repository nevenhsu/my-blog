'use client'

import useQuery from '@/hooks/useQuery'
import { devQuery } from '@/utils/sanity/queries'
import { MyPortableText } from '@/components/PortableText'
import type { PortableTextBlock } from 'sanity'
import Lottie from 'lottie-react'
import animationData from '@/public/assets/coll11.json'

export default function Dev() {
  const [data] = useQuery<
    Partial<{
      content: PortableTextBlock[]
    }>
  >({}, devQuery)

  const { content = [] } = data

  return (
    <>
      <MyPortableText content={content} />
    </>
  )
}
