'use client'

import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { Stack, Box, Title, Text } from '@mantine/core'
import SanityImage from '@/components/sanity/Image'
import type { NewsData } from '@/types/news'
import classes from './index.module.css'

export default function NewsCard({ data }: { data: Partial<NewsData> }) {
  const router = useRouter()
  const { title, subtitle, asset, post } = data

  return (
    <>
      <Stack
        className={clsx(classes.card, 'c-pointer')}
        onClick={() => (post?.slug ? router.push(`/blog/${post.slug}`) : null)}
      >
        <Box px={40} py={32}>
          <Title fz={{ base: 20, lg: 24 }} mb={12}>
            {title}
          </Title>
          <Text fz={{ base: 16, lg: 18 }}>{subtitle}</Text>
        </Box>
        {asset ? <SanityImage image={asset} /> : null}
      </Stack>
    </>
  )
}
