'use client'

import clsx from 'clsx'
import { useState, useEffect } from 'react'
import { Box } from '@mantine/core'
import SanityImage from '@/components/sanity/Image'
import Lottie from 'lottie-react'
import type { ImageAssetData } from '@/types/image'
import type { LottieData } from '@/types/lottie'

type LottieImageProps = {
  value: { asset?: ImageAssetData; lottie?: LottieData; hidden?: boolean }
}

export function LottieImage({ value }: LottieImageProps) {
  const { asset, lottie, hidden } = value
  const [animationData, setAnimationData] = useState<object>()

  useEffect(() => {
    const url = lottie?.url
    if (url) {
      fetch(url)
        .then(res => res.json())
        .then(json => {
          setAnimationData(json)
        })
        .catch(console.error)
    }
  }, [lottie?.url])

  return (
    <Box pos="relative" w="100%" h="auto">
      {asset ? (
        <SanityImage
          image={asset}
          style={{ visibility: hidden && animationData ? 'hidden' : 'unset' }}
        />
      ) : null}
      {animationData ? (
        <Box className={clsx({ 'absolute-center': Boolean(asset) })} w="100%" h="auto">
          <Lottie animationData={animationData} loop />
        </Box>
      ) : null}
    </Box>
  )
}
