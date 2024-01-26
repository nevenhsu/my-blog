import * as THREE from 'three'

export const fragmentShader = `
uniform vec3 uColor;
void main(){
  gl_FragColor = vec4(uColor,1.);
}
`
export const vertexShader = `
void main() {
  vec3 transformed = position.xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed.xyz, 1.);
}
`

export const uniforms = { uColor: new THREE.Uniform(new THREE.Color(0x101012)) }
