'use client'

import { forwardRef, useImperativeHandle } from 'react'
import { useAppContext } from '@/stores/AppContext'
import { Box } from '@mantine/core'
import { Canvas } from '@react-three/fiber'
import Road from '@/threejs/models/Road'
import { Stats, OrbitControls } from '@react-three/drei'
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

  return (
    <Canvas camera={{ position: [0, 10, -5], fov: 75, far: 10000 }}>
      <Stats />
      <OrbitControls />
      <Road />
    </Canvas>
  )
})
