import _ from 'lodash'
import type { Camera } from '@react-three/fiber'
import type { PerspectiveCamera } from 'three'

export function isPerspectiveCamera(camera: Camera): camera is PerspectiveCamera {
  return _.get(camera, 'isPerspectiveCamera', false)
}
