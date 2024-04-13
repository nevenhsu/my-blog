'use client'

import { MotionSlide, MotionBlur } from '@/components/motion'
import { Box, Title } from '@mantine/core'
import { MyTitle } from '@/components/Fonts'
import RwdLayout from '@/components/Rwd/Layout'
import RwdBlock from '@/components/Rwd/Block'
import RwdSimpleGrid from '@/components/Rwd/SimpleGrid'
import SanityImage from '@/components/sanity/Image'
import { MyPortableText } from '@/components/PortableText'
import { Member } from '@/components/sanity/Member'
import MyCarousel from '@/components/Carousel'
import useQuery from '@/hooks/useQuery'
import { aboutQuery } from '@/utils/sanity/queries'
import { useMediaQuery } from '@mantine/hooks'
import type { AboutData } from '@/types/about'
import classes from './index.module.css'

type AboutProps = {
  initialData: Partial<AboutData>
  lang: string
}

export default function About({ initialData, lang }: AboutProps) {
  const matches = useMediaQuery('(min-width: 48em)')
  const [data] = useQuery<Partial<AboutData>>(initialData, aboutQuery, { lang })

  const renderMembers = () =>
    data.members?.map((o, i) => <Member key={`${o._key}-${i}`} data={o} />)

  if (!data) return null

  return (
    <RwdLayout
      style={{
        width: '100vw',
        overflowX: 'hidden',
      }}
    >
      <>
        <RwdBlock w={{ base: '100%', sm: '66.67%', lg: 968 }} mx="auto" pt={{ base: 40, sm: 100 }}>
          <Box pos="relative" mb={{ base: 160, sm: 80 }}>
            {/*   Image  */}
            {data.mainImage ? (
              <MotionBlur direction="left">
                <Box className={classes.cover} maw={{ base: '100%', sm: '40vw', lg: '33vw' }}>
                  <SanityImage image={data.mainImage.asset} />
                </Box>
              </MotionBlur>
            ) : null}

            {/*   Title  */}
            <Box pos="absolute" bottom={{ base: -96, sm: 4 }} left={0}>
              <MotionSlide delay={1}>
                <Title fz={{ base: 48, sm: 64, lg: 96 }} mb={{ base: 16, sm: 24 }}>
                  {data.title}
                </Title>
              </MotionSlide>
              <MotionSlide delay={1.25}>
                <Title fz={{ base: 20, sm: 28, lg: 44 }}>{data.subtitle1}</Title>
              </MotionSlide>
              <MotionSlide delay={1.5}>
                <Title fz={{ base: 20, sm: 28, lg: 44 }}>{data.subtitle2}</Title>
              </MotionSlide>
            </Box>
          </Box>

          {/*   Content  */}
          <Box w={{ base: '100%', sm: '50vw' }} maw={580}>
            {data.body ? (
              <MotionSlide delay={1.75}>
                <MyPortableText content={data.body} />
              </MotionSlide>
            ) : null}
          </Box>
        </RwdBlock>

        {data.members?.length ? (
          <RwdBlock>
            <MyTitle ta="center" mb={{ base: 40, sm: 100, lg: 80 }}>
              {data.membersTitle}
            </MyTitle>

            <Box>
              {matches ? (
                <Box w="100%" maw={1200} mx="auto">
                  <RwdSimpleGrid cols={{ base: 2, lg: 3 }}>{renderMembers()}</RwdSimpleGrid>
                </Box>
              ) : (
                <MyCarousel duration={data.duration || 10} withControls={false}>
                  {renderMembers()}
                </MyCarousel>
              )}
            </Box>
          </RwdBlock>
        ) : null}
      </>
    </RwdLayout>
  )
}
