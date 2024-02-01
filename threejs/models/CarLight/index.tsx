import { useRef, useMemo, forwardRef, useImperativeHandle } from 'react'
import { TubeGeometry, LineCurve3, Vector3, InstancedBufferAttribute } from 'three'
import { Uniform, Color } from 'three'
import { fragmentShader, vertexShader } from './shades'
import { options } from '@/threejs/config'
import type { MeshProps } from '@react-three/fiber'
import type { Mesh, ColorRepresentation, ShaderMaterial } from 'three'

type CarLightProps = {
  meshProps: MeshProps
  color?: ColorRepresentation
  speed?: number
}

type UniformsKeys = 'uColor' | 'uTravelLength' | 'uTime' | 'uSpeed'

export type CarLightRef = {
  updateUniforms: (values: Array<{ key: UniformsKeys; value: any }>) => void
}

export default forwardRef<CarLightRef, CarLightProps>(function CarLight(
  { meshProps, color = 0xfafafa, speed = 60 },
  ref
) {
  const meshRef = useRef<Mesh<TubeGeometry, ShaderMaterial>>(null)

  useImperativeHandle(ref, () => ({
    updateUniforms(values) {
      values.map(({ key, value }) => {
        if (meshRef.current) {
          meshRef.current.material.uniforms[key].value = value
        }
      })
    },
  }))

  // Builds instanced data for the packing
  const objData = useMemo(() => {
    const curve = new LineCurve3(new Vector3(0, 0, 0), new Vector3(0, 0, -1))
    const tube = new TubeGeometry(curve, 25, 1, 8, false)

    const aOffset = []
    const aMetrics = []

    const sectionWidth = options.roadWidth / options.roadSections

    for (let i = 0; i < options.nPairs; i++) {
      const radius = Math.random() * 0.1 + 0.1
      const length = Math.random() * options.length * 0.08 + options.length * 0.02
      // 1a. Get it's lane index
      // Instead of random, keep lights per lane consistent
      const section = i % 3

      // 1b. Get its lane's centered position
      const sectionX = section * sectionWidth - options.roadWidth / 2 + sectionWidth / 2
      const carWidth = 0.5 * sectionWidth
      const offsetX = 0.5 * Math.random()

      const offsetY = radius * 1.3
      const offsetZ = Math.random() * options.length

      aOffset.push(sectionX - carWidth / 2 + offsetX)
      aOffset.push(offsetY)
      aOffset.push(-offsetZ)

      aOffset.push(sectionX + carWidth / 2 + offsetX)
      aOffset.push(offsetY)
      aOffset.push(-offsetZ)

      aMetrics.push(radius)
      aMetrics.push(length)

      aMetrics.push(radius)
      aMetrics.push(length)
    }

    return {
      index: tube.index,
      attributes: {
        aOffset: new InstancedBufferAttribute(new Float32Array(aOffset), 3, false),
        aMetrics: new InstancedBufferAttribute(new Float32Array(aMetrics), 2, false),
        ...tube.attributes,
      },
    }
  }, [])

  return (
    <mesh ref={meshRef} frustumCulled={false} {...meshProps}>
      <instancedBufferGeometry instanceCount={options.nPairs * 2} {...objData} />

      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={Object.assign(
          {
            uColor: new Uniform(new Color(color)),
            uTravelLength: new Uniform(options.length),
            uTime: new Uniform(0),
            uSpeed: new Uniform(speed),
          },
          options.distortion.uniforms
        )}
      />
    </mesh>
  )
})
