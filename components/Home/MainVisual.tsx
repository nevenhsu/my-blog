'use client'

import clsx from 'clsx'
import { MotionSlide } from '@/components/motion'
import { px, Stack, Group, Box, Title, Text, ActionIcon } from '@mantine/core'
import { useAppContext } from '@/stores/AppContext'
import TitlesMotion from './TitlesMotion'
import UnderlineMotion from '@/components/motion/Underline'
import { MyLink } from '@/components/MyLink'
import { Body } from '@/components/Fonts'
import { HiOutlineArrowNarrowDown } from 'react-icons/hi'
import { headerHeight } from '@/theme/config'
import type { HomeData } from '@/types/home'

export default function MainVisual({ data, show }: { data: Partial<HomeData>; show: boolean }) {
  const { state } = useAppContext()
  const { viewportSize, scroll } = state
  const { width, height } = viewportSize
  const matches = width >= Number(px('48em'))

  const o = 1 - (scroll.y / height) * 2
  const opacity = o > 0 ? o : 0

  return (
    <Box
      pos="relative"
      h={{
        base: `calc(100dvh - ${headerHeight.base}px)`,
        sm: `calc(100dvh - ${headerHeight.sm}px)`,
      }}
      px={{ base: 24, sm: 40 }}
    >
      <Stack h="100%" justify="center" align="center">
        <MotionSlide delay={2.5}>
          <Title fw={500} fz={{ base: 24, sm: 52, lg: 64 }}>
            {data.header}
          </Title>
        </MotionSlide>

        {/*   Titles  */}
        <MotionSlide delay={2}>
          <TitlesMotion data={data.titles || []} duration={data.titleDuration || 1} show={show} />
        </MotionSlide>

        {/*   Subtitle  */}
        <MotionSlide delay={2.8}>
          <Title fw={500} fz={{ base: 20, sm: 36, lg: 48 }}>
            {data.subtitle}{' '}
            <MyLink href={data.subtitleBoldHref}>
              <UnderlineMotion stroke={2}>
                <strong>{data.subtitleBold}</strong>
              </UnderlineMotion>
            </MyLink>
          </Title>
        </MotionSlide>
        <Box w={1} h={headerHeight} />
      </Stack>

      {/*   Caption  */}
      <Box pos="absolute" w="100%" left={0} bottom={{ base: 24, sm: 40 }} px={{ base: 24, sm: 40 }}>
        <MotionSlide delay={3.2}>
          <Box pos="relative">
            <Text>
              {data.caption1}
              {matches ? ' ' : <br />}
              {data.caption2}{' '}
              <MyLink href={data.captionBoldHref}>
                <UnderlineMotion>
                  <strong>{data.captionBold}</strong>
                </UnderlineMotion>
              </MyLink>
            </Text>

            {/* Arrow */}
            <Box pos="absolute" right={0} bottom={0}>
              <Group
                className="c-pointer"
                style={{ opacity }}
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              >
                <Body className={clsx({ hide: !matches })}>{data.arrowText}</Body>
                <ActionIcon
                  pos="relative"
                  bottom={2}
                  size={24}
                  c="var(--mantine-color-text)"
                  variant="transparent"
                >
                  <HiOutlineArrowNarrowDown size={24} />
                </ActionIcon>
              </Group>
            </Box>
          </Box>
        </MotionSlide>
      </Box>
    </Box>
  )
}
