'use client'

import _ from 'lodash'
import { useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useAppContext } from '@/stores/AppContext'
import { FaCircle } from 'react-icons/fa'

export type MotionShapeProps = {
  size: number | string
  colors: string[]
}

export default function MotionShape({ size, colors }: MotionShapeProps) {
  const { scrollY } = useScroll()
  const { viewportSize } = useAppContext().state

  const inputY = useMemo(() => {
    return _.times(colors.length, String).map((o, i) =>
      i == 0 ? viewportSize.height / 4 : i * viewportSize.height
    )
  }, [colors.length, viewportSize.height])

  const color = useTransform(scrollY, inputY, colors)

  return (
    <motion.div
      initial={{ width: 0, height: 0 }}
      animate={{ width: size, height: size }}
      transition={{ duration: 2 }}
      style={{
        color,
        opacity: 0.8,
        transition: 'color 0.2s',
      }}
    >
      <FaCircle size="100%" className="relative-center" />
    </motion.div>
  )
}
