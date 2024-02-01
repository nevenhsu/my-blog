import { options } from '@/threejs/config'

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
uniform float uTime;
uniform float uSpeed;
uniform float uTravelLength;

${options.distortion.getDistortion}

void main() {
  vec3 transformed = position.xyz;
  
  float radius = aMetrics.r;
  float len = aMetrics.g; // GLSL reserves length name

  transformed.xy *= radius; 
  transformed.z *= len;

  float zOffset = uTime * uSpeed + aOffset.z;
  zOffset = len - mod(zOffset, uTravelLength);

	// Keep them separated to make the next step easier!
	transformed.z = transformed.z + zOffset;
  transformed.xy += aOffset.xy;

  float progress = abs(transformed.z / uTravelLength);
  transformed.xyz += getDistortion(progress);
	
  vec4 mvPosition = modelViewMatrix * vec4(transformed,1.);
  gl_Position = projectionMatrix * mvPosition;
}
`
