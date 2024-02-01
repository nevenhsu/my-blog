import { Uniform, Color } from 'three'
import { options } from '@/threejs/config'

export const fragmentShader = `
uniform vec3 uColor;
void main(){
  gl_FragColor = vec4(uColor,1.);
}
`

export const vertexShader = `
uniform float uTravelLength;

${options.distortion.getDistortion}

void main() {
  vec3 transformed = position.xyz;

  float progress = (transformed.y + uTravelLength / 2.) / uTravelLength;
  vec3 distortion  = getDistortion(progress);
  transformed.x += distortion.x;
  transformed.z += distortion.y;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed.xyz, 1.);
}
`

export const uniforms = {
  uColor: new Uniform(new Color(0x404044)),
  uTravelLength: new Uniform(options.length),
}
