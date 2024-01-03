'use client'

import _ from 'lodash'
import { useRef, useState, useEffect, useCallback } from 'react'
import { Box } from '@mantine/core'
import { useAppContext } from '@/stores/AppContext'
import { motion, useMotionValue, useAnimate, useMotionValueEvent } from 'framer-motion'
import { getRandomPoints, getPath } from './utils'
import type { BoxProps } from '@mantine/core'
import type { MotionType, Point } from './utils'

export type MotionPathProps = {
  speed?: number
  initX?: number
  initY?: number
  offsetX?: number
  offsetY?: number
  type?: MotionType
  smoothing?: number
  boxProps?: BoxProps
  children?: React.ReactNode
}

export default function MotionPath(props: MotionPathProps) {
  const {
    children,
    type,
    speed = 25,
    initX = 0,
    initY = 0,
    offsetX = 10,
    offsetY = 10,
    smoothing = 0.3,
    boxProps = {},
  } = props

  const initRef = useRef(false)
  const pointRef = useRef({ x: initX, y: initY })

  const { state } = useAppContext()
  const { width, height } = state.viewportSize

  const [path, setPath] = useState('')
  const [scope, animate] = useAnimate<SVGPathElement>()
  const x = useMotionValue(initX)
  const y = useMotionValue(initY)
  const pathLength = useMotionValue(0)

  const softBezier = useCallback(() => {
    const start: Point = [pointRef.current.x, pointRef.current.y]
    const points: Point[] = [
      start,
      ...getRandomPoints(start, width, height, offsetX, offsetY, type),
    ]
    // set next start point
    const lastPoint = _.last(points)
    if (lastPoint) {
      pointRef.current.x = lastPoint[0]
      pointRef.current.y = lastPoint[1]
    }
    return getPath(points, smoothing)
  }, [width, height, offsetX, offsetY, smoothing, type])

  // subscribe
  useMotionValueEvent(pathLength, 'change', latest => {
    const el = scope.current
    const totalLength = el.getTotalLength()
    const progress = latest / 100
    const latestPoint = el.getPointAtLength(progress * totalLength)
    x.set(latestPoint.x)
    y.set(latestPoint.y)
  })

  useEffect(() => {
    // for init
    if (initRef.current) {
      return
    }

    if (width && height) {
      initRef.current = true
      setPath(softBezier())
    }
  }, [width, height])

  useEffect(() => {
    if (!path) return

    if (pathLength.get() === 100) {
      pathLength.set(0) // restart
    }

    const totalLength = scope.current.getTotalLength()
    const currentLength = (totalLength * (100 - pathLength.get())) / 100
    const duration = _.floor(currentLength / speed)

    const controls = animate(pathLength, 100, {
      duration,
      ease: 'linear',
      onComplete: () => {
        setPath(softBezier())
      },
    })

    return controls.pause
  }, [path, speed])

  return (
    <Box pos="absolute" left={0} top={0} w="100%" h="100%" {...boxProps}>
      <motion.svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
        <motion.path
          ref={scope}
          d={path}
          stroke="#1f88eb"
          strokeWidth={0}
          fill="none"
          pathLength={pathLength}
        />
      </motion.svg>

      <Box pos="absolute" left={0} top={0}>
        <motion.div style={{ x, y }}>
          <Box pos="absolute" style={{ transform: 'translate(-50%, -50%)' }}>
            {children}
          </Box>
        </motion.div>
      </Box>
    </Box>
  )
}
