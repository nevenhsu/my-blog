import { Uniform, Color } from 'three'

export const fragmentShader = `
uniform vec3 uColor;
void main() {
  vec3 color = vec3(uColor);
  gl_FragColor = vec4(color,1.);
}
`

export const vertexShader = `
attribute vec3 aOffset;
void main() {
  vec3 transformed = position.xyz;
    


	// Keep them separated to make the next step easier!
	transformed.z = transformed.z + aOffset.z;
  transformed.xy += aOffset.xy;
	
  vec4 mvPosition = modelViewMatrix * vec4(transformed,1.);
  gl_Position = projectionMatrix * mvPosition;
}
`

export const uniforms = { uColor: new Uniform(new Color(0xfafafa)) }
