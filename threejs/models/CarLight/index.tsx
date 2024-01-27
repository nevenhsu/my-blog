import { useMemo } from 'react'
import { TubeGeometry, LineCurve3, Vector3, InstancedBufferAttribute } from 'three'
import { fragmentShader, vertexShader, uniforms } from './shades'
import { options } from '@/threejs/config'

export default function Road() {
  // Builds instanced data for the packing
  const objData = useMemo(() => {
    const curve = new LineCurve3(new Vector3(0, 0, 0), new Vector3(0, 0, -1))
    const tube = new TubeGeometry(curve, 25, 1, 8, false)

    const aOffset = []

    const sectionWidth = options.roadWidth / options.roadSections

    for (let i = 0; i < options.nPairs; i++) {
      const radius = 1
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
    }

    return {
      index: tube.index,
      attributes: {
        aOffset: new InstancedBufferAttribute(new Float32Array(aOffset), 3, false),
        ...tube.attributes,
      },
    }
  }, [])

  return (
    <mesh frustumCulled={false}>
      <instancedBufferGeometry instanceCount={options.nPairs * 2} {...objData} />

      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}
