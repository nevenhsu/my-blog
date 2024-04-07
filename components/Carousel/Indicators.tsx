'use client'

import clsx from 'clsx'
import { useEffect, useCallback } from 'react'
import { motion, useAnimate, useMotionValue } from 'framer-motion'
import { Group, Box } from '@mantine/core'
import { type Embla } from '@mantine/carousel'
import classes from './index.module.css'

type IndicatorsProps = {
  num: number
  selectedIndex: number
  duration: number
  paused: boolean
  embla?: Embla
}

export default function Indicators({
  embla,
  num,
  selectedIndex,
  paused,
  duration,
}: IndicatorsProps) {
  const handleComplete = useCallback(() => {
    if (embla) {
      embla.scrollNext()
    }
  }, [embla])

  return (
    <Group mt={40} gap={8} justify="center">
      {Array.from({ length: num }).map((_, i) => {
        const isCurr = i === selectedIndex
        return (
          <Box
            key={`box-${i}`}
            pos="relative"
            style={{
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            <motion.div
              style={{
                position: 'relative',
                background: 'var(--mantine-color-text)',
                borderRadius: 4,
                overflow: 'hidden',
                opacity: 0.3,
                height: 8,
                width: 8,
              }}
              animate={{ width: isCurr ? 24 : 8 }}
            />
            <DotProgress
              duration={duration}
              pause={paused}
              isCurr={isCurr}
              onComplete={handleComplete}
            />
          </Box>
        )
      })}
    </Group>
  )
}

type DotProgressProps = {
  duration: number
  isCurr: boolean
  pause: boolean
  onComplete: () => void
}

function DotProgress({ duration, isCurr, pause, onComplete }: DotProgressProps) {
  const [scope, animate] = useAnimate()
  const width = useMotionValue(0)

  useEffect(() => {
    const options = isCurr ? { duration, onComplete } : { duration: 0 }
    const controls = animate(width, isCurr ? 24 : 0, options)

    if (pause && isCurr) {
      controls.pause()
    }

    return () => {
      controls.stop()
    }
  }, [width, isCurr, duration, pause, onComplete])

  return (
    <motion.div
      ref={scope}
      className={clsx(classes.progress, { [classes.paused]: pause })}
      style={{
        position: 'absolute',
        background: 'var(--mantine-color-text)',
        borderRadius: 4,
        overflow: 'hidden',
        top: 0,
        left: 0,
        height: 8,
        width,
      }}
    />
  )
}
