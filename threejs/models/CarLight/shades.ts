import { Uniform, Color, type ColorRepresentation } from 'three'

export const fragmentShader = `
uniform vec3 uColor;

void main() {
  vec3 color = vec3(uColor);
  gl_FragColor = vec4(color,1.);
}
`

export const vertexShader = `
attribute vec3 aOffset;
attribute vec2 aMetrics;

void main() {
  vec3 transformed = position.xyz;
  
  float radius = aMetrics.r;
  // GLSL reserves length name
  float len = aMetrics.g;

  transformed.xy *= radius; 
  transformed.z *= len;

	// Keep them separated to make the next step easier!
	transformed.z = transformed.z + aOffset.z;
  transformed.xy += aOffset.xy;
	
  vec4 mvPosition = modelViewMatrix * vec4(transformed,1.);
  gl_Position = projectionMatrix * mvPosition;
}
`

export const uniforms = (color: ColorRepresentation) => ({ uColor: new Uniform(new Color(color)) })
