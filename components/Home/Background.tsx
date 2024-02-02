'use client'

import _ from 'lodash'
import { Vector2, Vector3 } from 'three'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import Road, { type RoadRef } from '@/threejs/models/Road'
import CarLight, { type CarLightRef } from '@/threejs/models/CarLight'
import LightsSticks, { type LightsSticksRef } from '@/threejs/models/LightsSticks'
import { Stats } from '@react-three/drei'
import { options } from '@/threejs/config'
import { isPerspectiveCamera } from '@/threejs/utils/helpers'
import type { HomeData } from '@/types/home'

type BackgroundProps = { data: Partial<HomeData> }
export type BackgroundRef = { speedUp: () => void; speedDown: () => void }

export default forwardRef<BackgroundRef, BackgroundProps>(function Background({ data }, ref) {
  const carLightRRef = useRef<CarLightRef>(null)
  const carLightLRef = useRef<CarLightRef>(null)
  const roadRRef = useRef<RoadRef>(null)
  const roadLRef = useRef<RoadRef>(null)
  const islandRef = useRef<RoadRef>(null)
  const sticksRef = useRef<LightsSticksRef>(null)

  const { camera } = useThree()

  const stateRef = useRef({
    speedUpTarget: 0,
    speedUp: 0,
    timeOffset: 0,
    fovTarget: options.fov,
    fov: options.fov,
  })

  useImperativeHandle(ref, () => ({
    speedUp() {
      stateRef.current.speedUpTarget = options.speedUp
      stateRef.current.fovTarget = options.fovSpeedUp
      return
    },
    speedDown() {
      stateRef.current.speedUpTarget = 0
      stateRef.current.fovTarget = options.fov
      return
    },
  }))

  useFrame((state, delta) => {
    let { speedUp, speedUpTarget, timeOffset, fovTarget } = stateRef.current
    const coefficient = -60 * Math.log2(1 - 0.1)
    const lerpT = Math.exp(-coefficient * delta)

    speedUp += lerp(speedUp, speedUpTarget, lerpT, 0.00001)
    timeOffset += speedUp * delta
    const time = state.clock.elapsedTime + timeOffset

    carLightRRef.current?.updateUniforms([{ key: 'uTime', value: time }])
    carLightLRef.current?.updateUniforms([{ key: 'uTime', value: time }])
    islandRef.current?.updateUniforms([{ key: 'uTime', value: time }])
    roadRRef.current?.updateUniforms([{ key: 'uTime', value: time }])
    roadLRef.current?.updateUniforms([{ key: 'uTime', value: time }])
    sticksRef.current?.updateUniforms([{ key: 'uTime', value: time }])

    let updateCamera = false
    if (isPerspectiveCamera(camera)) {
      const fovChange = lerp(camera.fov, fovTarget, lerpT)
      if (fovChange) {
        camera.fov += fovChange * delta * 6
        updateCamera = true
      }
    }

    if (options.distortion.getJS) {
      const distortion = options.distortion.getJS(0.025, time)

      camera.lookAt(
        new Vector3(
          camera.position.x + distortion.x,
          camera.position.y + distortion.y,
          camera.position.z + distortion.z
        )
      )
      updateCamera = true
    }

    if (updateCamera) {
      camera.updateProjectionMatrix()
    }

    // Update state
    stateRef.current = { ...stateRef.current, speedUp, speedUpTarget, timeOffset }
  })

  return (
    <>
      <Stats />
      {/* Right Road */}
      <Road ref={roadRRef} side={1} isRoad />
      {/* Left Road */}
      <Road ref={roadLRef} side={-1} isRoad />
      {/* Island */}
      <Road ref={islandRef} side={0} isRoad={false} />

      {/* light Sticks */}
      <LightsSticks
        ref={sticksRef}
        meshProps={{ position: [-(options.roadWidth + options.islandWidth / 2), 0, 0] }}
      />
      {/* Left lights */}
      <CarLight
        ref={carLightLRef}
        meshProps={{ position: [-options.roadWidth / 2 - options.islandWidth / 2, 0, 0] }}
        fade={new Vector2(0, 1 - options.carLightsFade)}
        color={options.colors.leftCars}
      />
      {/* Right lights */}
      <CarLight
        ref={carLightRRef}
        meshProps={{ position: [options.roadWidth / 2 + options.islandWidth / 2, 0, 0] }}
        fade={new Vector2(1, 0 + options.carLightsFade)}
        color={options.colors.rightCars}
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
