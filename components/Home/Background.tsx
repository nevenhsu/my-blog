'use client'

import _ from 'lodash'
import { useMemo, useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { useAppContext } from '@/stores/AppContext'
import { motion } from 'framer-motion'
import { Box } from '@mantine/core'
import MotionPath from '@/components/motion/MotionPath'
import MotionShape from '@/components/motion/MotionShape'
import { FaCircleDot } from 'react-icons/fa6'
import type { Variants } from 'framer-motion'
import type { HomeData } from '@/types/home'
import type { ColorData } from '@/types/color'
import classes from './index.module.css'

const circleVariants: Variants = {
  initial: {
    width: 0,
    height: 0,
    opacity: 0,
  },
  animate: {
    width: '100vh',
    height: '100vh',
    opacity: 0.75,
    transition: { delay: 1, duration: 0.75 },
  },
  complete: {
    width: '200vh',
    height: '200vh',
    opacity: 0,
    transition: { duration: 0.5 },
  },
}

const circles = [60, 60, 50, 50, 40, 40, 30, 30, 25, 25, 20, 20]
const flash = '#5ee0fc'
const colors = [
  '#2b86c5',
  '#784BA0',
  '#FF3CAC',
  '#75B5E1',
  '#226A9B',
  '#FF0996',
  '#5E3B7D',
  '#442A5B',
  '#194D71',
]

type BackgroundProps = { data: Partial<HomeData> }
export type BackgroundRef = { updateColor: () => void }

export const Background = forwardRef<BackgroundRef, BackgroundProps>(function Background(
  { data },
  ref
) {
  const { state } = useAppContext()
  const { width, height } = state.viewportSize

  const [shapes, setShapes] = useState<Array<{ size: string; colors: string[] }>>([])
  const [dotAnimate, setDotAnimate] = useState('animate')
  const [speed, setSpeed] = useState(10)

  const isMobile = width < 576
  const show = shapes.length > 0 && width > 0

  const { flashColor, primaryColors, secondaryColors } = useMemo(() => {
    const flashColor = data.bgFlash ? toRGBA(data.bgFlash) : flash
    const primaryColors = data.bgColors?.length ? data.bgColors.map(o => toRGBA(o)) : colors
    const secondaryColors = data.bgColorsSecondary?.length
      ? data.bgColorsSecondary.map(o => toRGBA(o))
      : []
    return { flashColor, primaryColors, secondaryColors }
  }, [data])

  useImperativeHandle(ref, () => ({
    updateColor() {
      setShapes(prev => {
        if (_.isEmpty(prev)) return prev
        const i = _.random(0, circles.length - 1)
        const { size, colors } = prev[i]

        const primary = primaryColors.filter(o => o !== colors[0])
        const secondary = secondaryColors.filter(o => o !== colors[1])

        const new1 = _.sample(primary)
        const new2 = _.sample(secondary)
        const newColors = _.compact([new1, new2])

        if (newColors.length === 0) return prev

        return prev.map((o, _i) => (_i === i ? { size, colors: newColors } : o))
      })
    },
  }))

  useEffect(() => {
    if (_.isEmpty(data)) return

    const _circles = circles.map((size, i) => {
      const primary = primaryColors[i % primaryColors.length]
      const secondary = secondaryColors[i % primaryColors.length]
      return {
        size: isMobile ? `${size}vh` : `${size}vw`,
        colors: _.compact([primary, secondary]),
      }
    })

    setShapes(_circles)
  }, [data, primaryColors, secondaryColors, isMobile])

  useEffect(() => {
    if (!show) return

    setTimeout(() => {
      setSpeed(250)
    }, 1000)

    setTimeout(() => {
      setSpeed(100)
    }, 2000)

    setTimeout(() => {
      setSpeed(50)
    }, 6000)
  }, [show])

  return (
    <Box className={classes.bg}>
      {show ? (
        <Box style={{ filter: 'blur(100px)' }}>
          {shapes.map(({ size, colors }, i) => (
            <MotionPath
              key={`shape-${i}`}
              initX={_.floor(width / 2) + _.random(-50, 50)}
              initY={_.floor(height / 2) + _.random(-50, 50)}
              speed={speed}
            >
              <MotionShape size={size} colors={colors} />
            </MotionPath>
          ))}

          {/* Opening Lightning   */}
          <Box className="absolute-center">
            <motion.div
              initial="initial"
              animate={dotAnimate}
              variants={circleVariants}
              onAnimationComplete={definition => {
                if (definition === 'animate') {
                  setDotAnimate('complete')
                }
              }}
              style={{
                backdropFilter: 'brightness(3) contrast(2) saturate(2)',
                WebkitBackdropFilter: 'brightness(3) contrast(2) saturate(2)',
              }}
            >
              <FaCircleDot className="relative-center" size="100%" color={flashColor} />
            </motion.div>
          </Box>
        </Box>
      ) : null}
    </Box>
  )
})

function toRGBA(color: ColorData) {
  return `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
}
