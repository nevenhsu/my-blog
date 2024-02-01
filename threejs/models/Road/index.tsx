import { fragmentShader, vertexShader, uniforms } from './shades'
import { options } from '@/threejs/config'

export default function Road() {
  return (
    <mesh position={[0, 0, -options.length / 2]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[options.width, options.length, 20, 200]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={Object.assign(uniforms, options.distortion.uniforms)}
      />
    </mesh>
  )
}
