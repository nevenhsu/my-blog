'use client'

import { useState, useEffect } from 'react'
import { motion, animate, useTransform, useMotionValue } from 'framer-motion'
import { Box, Title } from '@mantine/core'

type TitlesMotionProps = {
  data: string[]
  duration: number
  show: boolean
}

const fontSize = { base: 50, sm: 96, lg: 160 } as const

export default function TitlesMotion({ data, duration, show }: TitlesMotionProps) {
  const [curr, setCurr] = useState(0)

  const onComplete = () => {
    setCurr(state => (state + 1) % data.length)
  }

  return (
    <Box pos="relative">
      <Title
        fz={fontSize}
        style={{
          opacity: 0,
          visibility: 'hidden',
          pointerEvents: 'none',
        }}
      >
        hide
      </Title>
      {data.map((o, i) => (
        <Box key={`${o}-${i}`} className="absolute-horizontal" top={0}>
          <TitleMotion
            show={show}
            text={o}
            init={i === 0 ? 30 : i + 1 === data.length ? 100 : 0}
            index={i}
            currIndex={curr}
            total={data.length}
            duration={duration}
            onComplete={onComplete}
          />
        </Box>
      ))}
    </Box>
  )
}

type TitleMotionProps = {
  show: boolean
  text: string
  init: number
  index: number
  currIndex: number
  total: number
  duration: number
  onComplete: () => void
}

function TitleMotion({
  show,
  text,
  init,
  index,
  currIndex,
  total,
  duration,
  onComplete,
}: TitleMotionProps) {
  const isCurr = index === currIndex
  const isPrev = (index + 1) % total === currIndex

  const x = useMotionValue(init)
  const maskImage = useTransform(
    x,
    [0, 25, 50, 75, 100],
    [
      // top, bottom
      'linear-gradient(#00000000 100%, #00000000 100%)', // init
      'linear-gradient(#00000000 20%, #000000 100%)',
      'linear-gradient(#000000 0%, #000000 100%)', // show
      'linear-gradient(#000000 0%, #00000000 90%)',
      'linear-gradient(#00000000 0%, #00000000 0%)', // hide
    ]
  )
  const y = useTransform(x, [0, 25, 50, 75, 100], [24, 0, 0, -12, -24])

  useEffect(() => {
    if (!show) return

    if (isCurr) {
      animate(x, 50, { duration: duration * 2, onComplete })
    } else if (isPrev) {
      animate(x, 100, {
        duration,
        onComplete: () => {
          animate(x, 0, { duration: 0 })
        },
      })
    }
  }, [x, isCurr, isPrev, show, duration])

  return (
    <motion.div style={{ y, maskImage, WebkitMaskImage: maskImage }}>
      <Title fz={fontSize}>{text}</Title>
    </motion.div>
  )
}
