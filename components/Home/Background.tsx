'use client'

import { forwardRef, useImperativeHandle } from 'react'
import { useAppContext } from '@/stores/AppContext'
import { Box } from '@mantine/core'
import type { HomeData } from '@/types/home'
import classes from './index.module.css'

type BackgroundProps = { data: Partial<HomeData> }
export type BackgroundRef = { onClick: () => void }

export const Background = forwardRef<BackgroundRef, BackgroundProps>(function Background(
  { data },
  ref
) {
  const { state } = useAppContext()
  const { width, height } = state.viewportSize

  useImperativeHandle(ref, () => ({
    onClick() {
      return
    },
  }))

  return <Box className={classes.bg}></Box>
})
