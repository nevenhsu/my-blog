'use client'

import _ from 'lodash'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import Road, { type RoadRef } from '@/threejs/models/Road'
import CarLight, { type CarLightRef } from '@/threejs/models/CarLight'
import { Stats, Grid } from '@react-three/drei'
import { options } from '@/threejs/config'
import type { HomeData } from '@/types/home'

type BackgroundProps = { data: Partial<HomeData> }
export type BackgroundRef = { speedUp: () => void; speedDown: () => void }

export default forwardRef<BackgroundRef, BackgroundProps>(function Background({ data }, ref) {
  const carLightRRef = useRef<CarLightRef>(null)
  const carLightLRef = useRef<CarLightRef>(null)
  const roadRef = useRef<RoadRef>(null)

  const stateRef = useRef({
    speedUpTarget: 0,
    speedUp: 0,
    timeOffset: 0,
  })

  useImperativeHandle(ref, () => ({
    speedUp() {
      stateRef.current.speedUpTarget = 4
      return
    },
    speedDown() {
      stateRef.current.speedUpTarget = 0
      return
    },
  }))

  useFrame((state, delta) => {
    let { speedUp, speedUpTarget, timeOffset } = stateRef.current
    const coefficient = -60 * Math.log2(1 - 0.1)
    const lerpT = Math.exp(-coefficient * delta)

    speedUp += lerp(speedUp, speedUpTarget, lerpT, 0.00001)
    timeOffset += speedUp * delta
    const time = state.clock.elapsedTime + timeOffset

    carLightRRef.current?.updateUniforms([{ key: 'uTime', value: time }])
    carLightLRef.current?.updateUniforms([{ key: 'uTime', value: time }])
    roadRef.current?.updateUniforms([{ key: 'uTime', value: time }])

    // Update state
    stateRef.current = { speedUp, speedUpTarget, timeOffset }
  })

  return (
    <>
      <Stats />
      <Grid />
      <axesHelper />
      <Road ref={roadRef} />
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
