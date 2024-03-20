'use client'

import _ from 'lodash'
import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import useQuery from '@/hooks/useQuery'
import { useAppContext } from '@/stores/AppContext'
import { Box, SimpleGrid } from '@mantine/core'
import { Subtitle } from '@/components/Fonts'
import RwdBlock from '@/components/Rwd/Block'
import MainVisual from './MainVisual'
import NewsCard from '@/components/NewsCard'
import Gallery from './Gallery'
import MyCanvas, { type MyCanvasRef } from '@/components/threejs/MyCanvas'
import { homeQuery } from '@/utils/sanity/queries'
import { urlFor } from '@/utils/sanity/imageUrlBuilder'
import classes from './index.module.css'
import type { HomeData } from '@/types/home'

export default function Home({ initialData }: { initialData: Partial<HomeData> }) {
  const ref = useRef(null)
  const canvasRef = useRef<MyCanvasRef>(null)

  const [data] = useQuery<Partial<HomeData>>(initialData, homeQuery)
  const noData = _.isEmpty(data)
  const [show, setShow] = useState(false)
  const { viewportSize } = useAppContext().state

  const { scrollY } = useScroll()
  const filterValue = useTransform(scrollY, [0, viewportSize.height], [1, 0.25])

  useEffect(() => {
    if (noData) return
    setTimeout(() => setShow(true), 2500)
  }, [noData])

  return (
    <Box
      onMouseDown={() => canvasRef.current?.speedUp()}
      onMouseUp={() => canvasRef.current?.speedDown()}
      onTouchStart={() => canvasRef.current?.speedUp()}
      onTouchEnd={() => canvasRef.current?.speedDown()}
    >
      <Box className={classes.fixed}>
        <motion.div
          initial={{ opacity: 0, y: '100vh' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 3 }}
        >
          <motion.div
            style={{
              filter: `saturate(${filterValue.get()}) brightness(${filterValue.get()})`,
            }}
          >
            <MyCanvas ref={canvasRef} />
          </motion.div>
        </motion.div>
      </Box>

      {/*  Pattern Background   */}
      {data.pattern?.image ? (
        <Box
          className={classes.fixed}
          style={{
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

          <Box
            h={{ base: 60, sm: 100 }}
            style={{
              background: 'linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)',
            }}
          />

          <Box
            ref={ref}
            pos="relative"
            style={{ width: '100vw', background: 'var(--mantine-color-body)' }}
          >
            {/*  Pattern Background   */}
            {data.pattern?.image ? (
              <Box
                className={classes.fixed}
                style={{
                  zIndex: 0,
                  background: `url(${urlFor(data.pattern?.image).url()}) repeat`,
                  backgroundSize: data.pattern.size || 'auto',
                  opacity: 0.1,
                }}
              />
            ) : null}

            <Box h={{ base: 60, sm: 100 }} />

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
    </Box>
  )
}
