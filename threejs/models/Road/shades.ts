import { options } from '@/threejs/config'

export const fragmentShader = `
uniform vec3 uColor;
uniform float uTime;
varying vec2 vUv; 

void main(){
  vec2 uv = vUv;
  vec3 color = vec3(uColor);

  uv.y = mod(uv.y + uTime * 0.1,1.);

  gl_FragColor = vec4(color,1.);
}
`

export const vertexShader = `
uniform float uTravelLength;
uniform float uTime;
varying vec2 vUv; 

${options.distortion.getDistortion}

void main() {
  vec3 transformed = position.xyz;

  float progress = (transformed.y + uTravelLength / 2.) / uTravelLength;
  vec3 distortion  = getDistortion(progress);

  transformed.x += distortion.x;
  transformed.z += distortion.y;
  transformed.y += -1. * distortion.z; 

  vec4 mvPosition = modelViewMatrix * vec4(transformed,1.);
  gl_Position = projectionMatrix * mvPosition;
  vUv = uv;
}
`
