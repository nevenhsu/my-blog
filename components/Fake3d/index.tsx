'use client'

import { useRef, useEffect, useLayoutEffect } from 'react'
import { useMouse } from '@mantine/hooks'
import { useScroll } from 'framer-motion'
import MyCanvas, { type MyCanvasRef } from './MyCanvas'
import Uniform from './lib/webgl/uniform'
import Rect from './lib/webgl/rect'
import { fragmentShader, vertexShader } from './shades'
import { loadImages } from './lib/helper'

type Point = {
  x: number
  y: number
}

type Fake3dProps = {
  uid: string
  imageUrl: string
  depthUrl: string
  horizontalThreshold?: number
  verticalThreshold?: number
}

export default function Fake3d(props: Fake3dProps) {
  const { uid, imageUrl, depthUrl, horizontalThreshold = 35, verticalThreshold = 15 } = props

  const ref = useRef(null)
  const mountRef = useRef<boolean>(false)
  const canvasRef = useRef<MyCanvasRef>(null)
  const programRef = useRef<WebGLProgram | null>(null)
  const uniformsRef = useRef<{ [key: string]: Uniform }>({})
  const texturesRef = useRef<WebGLTexture[]>([])
  const imageAspectRef = useRef<number>(0.56)
  const billboardRef = useRef<Rect | null>(null)
  const pointRef = useRef<Point>({ x: 0, y: 0 })
  const pointTargetRef = useRef<Point>({ x: 0, y: 0 })
  const startTimeRef = useRef<number>(new Date().getTime())

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['center end', 'center start'],
  })

  const getSize = () => {
    const size = canvasRef.current?.getSize()
    if (!size) {
      throw new Error('Unable to get canvas size')
    }
    return { width: size.width || 0, height: size.height || 0 }
  }

  const updatePoint = (p: Point) => {
    if (!p.x || !p.y) return

    const { width, height } = getSize()

    let halfX = width / 2
    let halfY = height / 2

    pointTargetRef.current.x = (halfX - p.x) / halfX
    pointTargetRef.current.y = (halfY - p.y) / halfY
  }

  const addShader = (gl: WebGLRenderingContext, source: string, type: number) => {
    const program = programRef.current
    if (!program) {
      throw new Error('Unable to create program')
    }

    const shader = gl.createShader(type)
    if (!shader) {
      throw new Error('Unable to create shader')
    }

    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    const isCompiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
    if (!isCompiled) {
      throw new Error('Shader compile error: ' + gl.getShaderInfoLog(shader))
    }

    gl.attachShader(program, shader)
  }

  const createScene = (gl: WebGLRenderingContext) => {
    const program = (programRef.current = gl.createProgram())
    if (!program) {
      throw new Error('Unable to create program')
    }

    addShader(gl, vertexShader, gl.VERTEX_SHADER)
    addShader(gl, fragmentShader, gl.FRAGMENT_SHADER)

    gl.linkProgram(program)
    gl.useProgram(program)

    uniformsRef.current.uResolution = new Uniform('resolution', '4f', program, gl)
    uniformsRef.current.uMouse = new Uniform('mouse', '2f', program, gl)
    uniformsRef.current.uTime = new Uniform('time', '1f', program, gl)
    uniformsRef.current.uRatio = new Uniform('pixelRatio', '1f', program, gl)
    uniformsRef.current.uThreshold = new Uniform('threshold', '2f', program, gl)

    billboardRef.current = new Rect(gl)
    const positionLocation = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)
  }

  const addTexture = () => {
    loadImages([imageUrl, depthUrl], start)
  }

  const start = (images: HTMLImageElement[]) => {
    const gl = canvasRef.current?.getContext()
    if (!gl) {
      throw new Error('Unable to get WebGL context')
    }

    const program = programRef.current
    if (!program) {
      throw new Error('Unable to get program')
    }

    imageAspectRef.current = images[0].naturalHeight / images[0].naturalWidth

    for (var i = 0; i < images.length; i++) {
      const texture = gl.createTexture()
      if (!texture) {
        throw new Error('Unable to create texture')
      }

      gl.bindTexture(gl.TEXTURE_2D, texture)

      // Set the parameters so we can render any size image.
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

      // Upload the image into the texture.
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, images[i])
      texturesRef.current[i] = texture
    }

    // lookup the sampler locations.
    const u_image0Location = gl.getUniformLocation(program, 'image0')
    const u_image1Location = gl.getUniformLocation(program, 'image1')

    // set which texture units to render with.
    gl.uniform1i(u_image0Location, 0) // texture unit 0
    gl.uniform1i(u_image1Location, 1) // texture unit 1

    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, texturesRef.current[0])
    gl.activeTexture(gl.TEXTURE1)
    gl.bindTexture(gl.TEXTURE_2D, texturesRef.current[1])

    animate()
  }

  const animate = () => {
    const gl = canvasRef.current?.getContext()
    if (!gl) {
      throw new Error('Unable to get WebGL context')
    }

    const timelapse = (new Date().getTime() - startTimeRef.current) / 1000
    uniformsRef.current.uTime?.set(timelapse)

    // inertia
    pointRef.current.x += (pointTargetRef.current.x - pointRef.current.x) * 0.05
    pointRef.current.y += (pointTargetRef.current.y - pointRef.current.y) * 0.05
    uniformsRef.current.uMouse?.set(pointRef.current.x, pointRef.current.y)

    billboardRef.current?.render(gl)
    requestAnimationFrame(animate)
  }

  const mouse = useMouse()

  useLayoutEffect(() => {
    if (mountRef.current) return

    mountRef.current = true
    const gl = canvasRef.current?.getContext()
    if (!gl) {
      throw new Error('Unable to get WebGL context')
    }

    createScene(gl)
  }, [])

  useEffect(() => {
    updatePoint({ x: mouse.x, y: mouse.y })
  }, [mouse])

  useEffect(() => {
    scrollYProgress.on('change', (v: number) => {
      const { width, height } = getSize()

      const x = width * (1 - v) * 1.5
      const y = height * v * 1.5

      updatePoint({ x, y })
    })
    return () => {
      scrollYProgress.clearListeners()
    }
  }, [scrollYProgress])

  useEffect(() => {
    addTexture()
  }, [imageUrl])

  return (
    <div ref={ref} style={{ width: '100%', height: '100%' }}>
      <MyCanvas
        ref={canvasRef}
        uid={uid}
        onResize={size => {
          const { width, height } = size
          if (!width || !height) return

          const imageAspect = imageAspectRef.current

          let a1, a2
          if (height / width < imageAspect) {
            a1 = 1
            a2 = height / width / imageAspect
          } else {
            a1 = (width / height) * imageAspect
            a2 = 1
          }

          uniformsRef.current.uResolution?.set(width, height, a1, a2)
          uniformsRef.current.uRatio?.set(1 / window.devicePixelRatio)
          uniformsRef.current.uThreshold?.set(horizontalThreshold, verticalThreshold)
        }}
      />
    </div>
  )
}
