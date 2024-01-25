'use client'

import _ from 'lodash'
import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import useQuery from '@/hooks/useQuery'
import { useAppContext } from '@/stores/AppContext'
import { px, Box, SimpleGrid } from '@mantine/core'
import { MyTitle } from '@/components/Fonts'
import RwdBlock from '@/components/Rwd/Block'
import MainVisual from './MainVisual'
import NewsCard from './NewsCard'
import Gallery from './Gallery'
import { homeQuery } from '@/utils/sanity/queries'
import { urlFor } from '@/utils/sanity/imageUrlBuilder'
import type { HomeData } from '@/types/home'

export default function Home({ initialData }: { initialData: Partial<HomeData> }) {
  const ref = useRef(null)
  const scroll = useScroll({ target: ref })

  const [data] = useQuery<Partial<HomeData>>(initialData, homeQuery)
  const noData = _.isEmpty(data)

  const { state } = useAppContext()
  const { width } = state.viewportSize
  const matches = width >= Number(px('48em'))
  const matchesXl = width >= Number(px('88em'))

  const [show, setShow] = useState(false)

  const rwdTop = matchesXl ? 140 : matches ? 100 : 92
  const y = useTransform(scroll.scrollYProgress, [0, 0.75, 1], [0, 0, -rwdTop - 40])

  useEffect(() => {
    if (noData) return
    setTimeout(() => setShow(true), 2500)
  }, [noData])

  return (
    <>
      {/*   Background   */}
      <Box
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      ></Box>

      {!noData ? (
        <Box>
          {/*   Main  */}
          <MainVisual data={data} show={show} />

          {/*   News  */}
          <RwdBlock id="blog" pb={{ base: 40, sm: 80 }}>
            <MyTitle pos="relative" ta="center">
              {data.newsTitle}
            </MyTitle>
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

          {/*   Gradient Gap  */}
          <Box
            style={{
              position: 'relative',
              background: 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))',
              height: '25vh',
            }}
          />

          <Box
            ref={ref}
            pos="relative"
            style={{ width: '100vw', background: 'var(--mantine-color-body)' }}
          >
            {/*   Pattern  */}
            {data.gallery?.bgPattern ? (
              <Box
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: `url(${urlFor(data.gallery.bgPattern).url()}) repeat`,
                  backgroundSize: data.gallery.bgPatternSize || 'auto',
                  pointerEvents: 'none',
                }}
              />
            ) : null}

            {/*   Gallery Gradient Top  */}
            <Box style={{ position: 'sticky', top: 0, zIndex: 1 }}>
              <motion.div style={{ y }}>
                <motion.div
                  style={{
                    position: 'absolute',
                    top: 0,
                    width: '100%',
                    height: '25vh',
                    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0))',
                  }}
                />
              </motion.div>
            </Box>

            <Box h={{ base: 60, sm: 100 }} />

            {/*   Gallery Title  */}
            <Box
              style={{
                position: 'sticky',
                top: rwdTop,
                zIndex: 1,
                filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.5))',
              }}
            >
              <motion.div style={{ y }}>
                <MyTitle ta="center">{data.galleryTitle}</MyTitle>
              </motion.div>
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
              <Gallery cols={data.gallery?.cols || 2} data={data.gallery?.images || []} />
            </Box>

            <Box h={{ base: 60, sm: 100 }} />

            {/*   Gallery Gradient Bottom */}
            <Box style={{ position: 'sticky', bottom: 0 }}>
              <Box
                style={{
                  position: 'absolute',
                  bottom: 0,
                  width: '100%',
                  height: '25vh',
                  background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0))',
                }}
              />
            </Box>
          </Box>
        </Box>
      ) : null}
    </>
  )
}
