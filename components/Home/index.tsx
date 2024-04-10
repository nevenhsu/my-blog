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
import PostCard from '@/components/PostCard'
import Gallery from './Gallery'
import MyCanvas, { type MyCanvasRef } from '@/components/threejs/MyCanvas'
import { homeQuery } from '@/utils/sanity/queries'
import classes from './index.module.css'
import type { HomeData } from '@/types/home'

type HomeProps = {
  initialData: Partial<HomeData>
  lang: string
}

export default function Home({ initialData, lang }: HomeProps) {
  const ref = useRef(null)
  const canvasRef = useRef<MyCanvasRef>(null)

  const [data] = useQuery<Partial<HomeData>>(initialData, homeQuery, { lang })
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
      {data?.pattern?.image ? (
        <Box
          className={classes.fixed}
          style={{
            zIndex: 0,
            background: `url('${data.pattern.image.url}') repeat`,
            backgroundSize: data.pattern.size,
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
            {data.posts?.map(i => (
              <PostCard key={i._id} data={i} />
            ))}
          </SimpleGrid>

          <Box
            h={{ base: 60, sm: 100 }}
            style={{
              background: 'linear-gradient(#0f0f0f00 0%, #0f0f0f 100%)',
            }}
          />

          <Box
            ref={ref}
            pos="relative"
            style={{ width: '100vw', background: 'var(--mantine-color-body)' }}
          >
            <Box h={{ base: 60, sm: 100 }} />

            {data.galleryTitle ? (
              <Box mb={{ base: 60, sm: 100 }}>
                <Subtitle ta="center">{data.galleryTitle}</Subtitle>
              </Box>
            ) : null}

            {/*   Gallery images  */}
            <Gallery data={data.gallery?.images || []} />

            <Box h={{ base: 60, sm: 100 }} />
          </Box>
        </Box>
      ) : null}
    </Box>
  )
}
