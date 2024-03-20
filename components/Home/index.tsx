'use client'

import _ from 'lodash'
import { useRef, useState, useEffect } from 'react'
import useQuery from '@/hooks/useQuery'
import { Box, SimpleGrid } from '@mantine/core'
import { Subtitle } from '@/components/Fonts'
import RwdBlock from '@/components/Rwd/Block'
import MainVisual from './MainVisual'
import NewsCard from '@/components/NewsCard'
import Gallery from './Gallery'
import { homeQuery } from '@/utils/sanity/queries'
import { urlFor } from '@/utils/sanity/imageUrlBuilder'
import type { HomeData } from '@/types/home'

export default function Home({ initialData }: { initialData: Partial<HomeData> }) {
  const ref = useRef(null)

  const [data] = useQuery<Partial<HomeData>>(initialData, homeQuery)
  const noData = _.isEmpty(data)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (noData) return
    setTimeout(() => setShow(true), 2500)
  }, [noData])

  return (
    <>
      {/*  Pattern Background   */}
      {data.pattern?.image ? (
        <Box
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none',
            zIndex: -1,
            background: `url(${urlFor(data.pattern?.image).url()}) repeat`,
            backgroundSize: data.pattern.size || 'auto',
            opacity: 0.1,
          }}
        />
      ) : null}

      {!noData ? (
        <Box>
          {/*   Main  */}
          <MainVisual data={data} show={show} />

          {/*   News  */}
          <RwdBlock id="blog" pb={{ base: 40, sm: 80 }}>
            <Subtitle pos="relative" ta="center">
              {data.newsTitle}
            </Subtitle>
          </RwdBlock>

          <SimpleGrid
            spacing={40}
            cols={{ base: 1, sm: 2 }}
            w={{ base: '100%', lg: 1200 }}
            px={{ base: 24, sm: 40 }}
            mx="auto"
          >
            {data.news?.map(i => (
              <NewsCard key={i._key} data={i} />
            ))}
          </SimpleGrid>

          <Box ref={ref} pos="relative" style={{ width: '100vw' }}>
            <Box h={{ base: 60, sm: 100 }} />

            {/*   Gallery Title  */}
            <Box>
              <Subtitle ta="center">{data.galleryTitle}</Subtitle>
            </Box>

            <Box h={{ base: 60, sm: 100 }} />

            {/*   Gallery images  */}
            <Box
              w={{ base: '100vw', lg: 1280 }}
              px={{ base: 0, sm: 40 }}
              pb={40}
              mx="auto"
              style={{ overflow: 'hidden' }}
            >
              <Gallery data={data.gallery?.images || []} />
            </Box>

            <Box h={{ base: 60, sm: 100 }} />
          </Box>
        </Box>
      ) : null}
    </>
  )
}
