import { useRef, forwardRef } from 'react'
import { Uniform, Color } from 'three'
import { useMeshHandle, type HandleRef } from '@/threejs/hooks/useMeshHandle'
import { fragmentShader, vertexShader } from './shades'
import { options } from '@/threejs/config'
import type { Mesh, PlaneGeometry, ShaderMaterial } from 'three'

type UniformsKeys = 'uTime'

export type RoadRef = HandleRef<UniformsKeys>

export default forwardRef<HandleRef<UniformsKeys>, {}>(function Road({}, ref) {
  const meshRef = useRef<Mesh<PlaneGeometry, ShaderMaterial>>(null)

  useMeshHandle(ref, meshRef)

  return (
    <mesh ref={meshRef} position={[0, 0, -options.length / 2]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[options.width, options.length, 20, 100]} />
      <shaderMaterial
        side={2}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={Object.assign(
          {
            uColor: new Uniform(new Color(0x404044)),
            uTravelLength: new Uniform(options.length),
            uTime: new Uniform(0),
          },
          options.distortion.uniforms
        )}
      />
    </mesh>
  )
})
