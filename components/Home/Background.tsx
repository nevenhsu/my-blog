'use client'

import { forwardRef, useImperativeHandle } from 'react'
import { useAppContext } from '@/stores/AppContext'
import { Canvas } from '@react-three/fiber'
import Road from '@/threejs/models/Road'
import CarLight from '@/threejs/models/CarLight'
import { Stats, Grid, CameraControls } from '@react-three/drei'
import { options } from '@/threejs/config'
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
    <Canvas camera={{ position: [0, 7, 4], rotation: [0, 0, 0] }}>
      <Stats />
      <Grid />
      <axesHelper />
      <Road />
      {/* Left lights */}
      <CarLight
        meshProps={{ position: [-options.roadWidth / 2 - options.islandWidth / 2, 0, 0] }}
        color={0xff102a}
      />
      {/* Right lights */}
      <CarLight
        meshProps={{ position: [options.roadWidth / 2 + options.islandWidth / 2, 0, 0] }}
        color={0xfafafa}
      />
      {/* <CameraControls /> */}
    </Canvas>
  )
})
