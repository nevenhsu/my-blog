'use client'

import { useRef } from 'react'
import { Box } from '@mantine/core'

import MyCanvas, { type MyCanvasRef } from '@/threejs/MyCanvas'

export default function Dev() {
  const canvasRef = useRef<MyCanvasRef>(null)

  return (
    <Box
      w="100vw"
      h="100vh"
      onMouseDown={() => canvasRef.current?.speedUp()}
      onMouseUp={() => canvasRef.current?.speedDown()}
      onTouchStart={() => canvasRef.current?.speedUp()}
      onTouchEnd={() => canvasRef.current?.speedDown()}
    >
      <MyCanvas ref={canvasRef} />
    </Box>
  )
}
