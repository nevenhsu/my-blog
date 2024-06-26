import _ from 'lodash'
import { useRef, useMemo, forwardRef } from 'react'
import { TubeGeometry, LineCurve3, Vector3, InstancedBufferAttribute } from 'three'
import { Uniform, Color } from 'three'
import { useMeshHandle, type HandleRef } from '@/components/threejs/hooks/useMeshHandle'
import { fragmentShader, vertexShader } from './shades'
import { options } from '@/components/threejs/config'
import type { MeshProps } from '@react-three/fiber'
import type { Mesh, Vector2, ShaderMaterial } from 'three'

type CarLightProps = {
  meshProps: MeshProps
  fade: Vector2
  color1: Array<string | number>
  color2: Array<string | number>
  side: number // 1: right, -1: left
}

type UniformsKeys = 'uColor' | 'uTravelLength' | 'uTime' | 'uSpeed'

export type CarLightRef = HandleRef<UniformsKeys>

export default forwardRef<CarLightRef, CarLightProps>(function CarLight(
  { meshProps, fade, color1, color2, side },
  ref
) {
  const meshRef = useRef<Mesh<TubeGeometry, ShaderMaterial>>(null)

  useMeshHandle(ref, meshRef)

  // Builds instanced data for the packing
  const objData = useMemo(() => {
    const curve = new LineCurve3(new Vector3(0, 0, 0), new Vector3(0, 0, -1))
    const tube = new TubeGeometry(curve, 40, 1, 8, false)

    const aOffset = []
    const aMetrics = []
    const aColor1 = []
    const aColor2 = []

    const laneWidth = options.roadWidth / options.lanesPerRoad
    const colors1 = color1.map(c => new Color(c))
    const colors2 = color2.map(c => new Color(c))
    const movingSpeed = side > 0 ? options.movingCloserSpeed : options.movingAwaySpeed

    for (let i = 0; i < options.nPairs; i++) {
      const radius = _.random(options.carLightsRadius[0], options.carLightsRadius[1])
      const length = _.random(options.carLightsLength[0], options.carLightsLength[1])
      const speed = _.random(movingSpeed[0], movingSpeed[1])

      // Get lane index
      const carLane = i % 3

      const carWidth =
        _.random(options.carWidthPercentage[0], options.carWidthPercentage[1]) * laneWidth
      const carShiftX = _.random(options.carShiftX[0], options.carShiftX[1]) * laneWidth // Drunk Driving
      const offsetX = carLane * laneWidth - options.roadWidth / 2 + laneWidth / 2 + carShiftX

      const offsetY = _.random(options.carFloorSeparation[0], options.carFloorSeparation[1])

      const offsetZ = -_.random(options.length)

      aOffset.push(offsetX - carWidth / 2)
      aOffset.push(offsetY)
      aOffset.push(offsetZ)

      aOffset.push(offsetX + carWidth / 2)
      aOffset.push(offsetY)
      aOffset.push(offsetZ)

      aMetrics.push(radius)
      aMetrics.push(length)
      aMetrics.push(speed)

      aMetrics.push(radius)
      aMetrics.push(length)
      aMetrics.push(speed)

      const c1 = _.sample(colors1) || colors1[0]
      aColor1.push(c1.r)
      aColor1.push(c1.g)
      aColor1.push(c1.b)

      aColor1.push(c1.r)
      aColor1.push(c1.g)
      aColor1.push(c1.b)

      const c2 = _.sample(colors2) || colors2[0]
      aColor2.push(c2.r)
      aColor2.push(c2.g)
      aColor2.push(c2.b)

      aColor2.push(c2.r)
      aColor2.push(c2.g)
      aColor2.push(c2.b)
    }

    return {
      index: tube.index,
      attributes: {
        aOffset: new InstancedBufferAttribute(new Float32Array(aOffset), 3, false),
        aMetrics: new InstancedBufferAttribute(new Float32Array(aMetrics), 3, false),
        aColor1: new InstancedBufferAttribute(new Float32Array(aColor1), 3, false),
        aColor2: new InstancedBufferAttribute(new Float32Array(aColor2), 3, false),
        ...tube.attributes,
      },
    }
  }, [])

  const uniforms = useMemo(() => {
    return {
      uTravelLength: new Uniform(options.length),
      uTime: new Uniform(0),
      uFade: new Uniform(fade),
      uTransitionSpeed: new Uniform(0.5),
      ...options.distortion.uniforms,
    }
  }, [])

  return (
    <mesh ref={meshRef} frustumCulled={false} {...meshProps}>
      <instancedBufferGeometry instanceCount={options.lightPairsPerRoadWay * 2} {...objData} />

      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
    </mesh>
  )
})
