'use client'

import { useRef } from 'react'
import { Box } from '@mantine/core'
import { Canvas } from '@react-three/fiber'
import Background, { type BackgroundRef } from '@/components/Home/Background'
import { options } from '@/threejs/config'

export default function Dev() {
  const bgRef = useRef<BackgroundRef>(null)

  return (
    <Box
      w="100vw"
      h="100vh"
      onMouseDown={() => bgRef.current?.speedUp()}
      onMouseUp={() => bgRef.current?.speedDown()}
    >
      <Canvas camera={{ position: [0, 8, -4], rotation: [0, 0, 0], fov: options.fov }}>
        <Background ref={bgRef} data={{}} />
      </Canvas>
    </Box>
  )
}
