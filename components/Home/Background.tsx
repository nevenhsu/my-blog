'use client'

import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import Road from '@/threejs/models/Road'
import CarLight, { type CarLightRef } from '@/threejs/models/CarLight'
import { Stats, Grid } from '@react-three/drei'
import { options } from '@/threejs/config'
import type { HomeData } from '@/types/home'

type BackgroundProps = { data: Partial<HomeData> }
export type BackgroundRef = { speedUp: () => void; speedDown: () => void }

export default forwardRef<BackgroundRef, BackgroundProps>(function Background({ data }, ref) {
  const carLightRRef = useRef<CarLightRef>(null)
  const carLightLRef = useRef<CarLightRef>(null)

  const stateRef = useRef({
    speedUpTarget: 0,
    speedUp: 0,
    timeOffset: 0,
  })

  useImperativeHandle(ref, () => ({
    speedUp() {
      stateRef.current.speedUpTarget = 0.1
      return
    },
    speedDown() {
      stateRef.current.speedUpTarget = 0
      return
    },
  }))

  useFrame(state => {
    stateRef.current.speedUp += lerp(
      stateRef.current.speedUp,
      stateRef.current.speedUpTarget,
      // 10% each frame
      0.1,
      0.00001
    )

    stateRef.current.timeOffset += stateRef.current.speedUp
    const time = state.clock.elapsedTime + stateRef.current.timeOffset

    carLightRRef.current?.updateUniforms([{ key: 'uTime', value: time }])
    carLightLRef.current?.updateUniforms([{ key: 'uTime', value: time }])
  })

  return (
    <>
      <Stats />
      <Grid />
      <axesHelper />
      <Road />
      {/* Left lights */}
      <CarLight
        ref={carLightLRef}
        meshProps={{ position: [-options.roadWidth / 2 - options.islandWidth / 2, 0, 0] }}
        color={0xff102a}
        speed={60}
      />
      {/* Right lights */}
      <CarLight
        ref={carLightRRef}
        meshProps={{ position: [options.roadWidth / 2 + options.islandWidth / 2, 0, 0] }}
        color={0xfafafa}
        speed={-60}
      />
    </>
  )
})

function lerp(current: number, target: number, speed = 0.1, limit = 0.001) {
  let change = (target - current) * speed
  if (Math.abs(change) < limit) {
    change = target - current
  }
  return change
}
