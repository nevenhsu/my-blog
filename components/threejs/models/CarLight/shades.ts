import { options } from '@/components/threejs/config'

export const fragmentShader = `
varying vec3 vColor1;
varying vec3 vColor2;
varying vec2 vUv;

uniform vec2 uFade;
uniform float uTime;
uniform float uTransitionSpeed;

void main() {
  float fadeStart = 0.4;
  float maxFade = 0.;
  float alpha = 1.;
  
  alpha = smoothstep(uFade.x, uFade.y, vUv.x);

  // Calculate gradient
  float transition = sin(uTransitionSpeed * uTime);
  transition = smoothstep(0.0, 1.0, transition);
  vec3 blendedColor = mix(vColor1, vColor2, transition);

  gl_FragColor = vec4(blendedColor, alpha);
  if (gl_FragColor.a < 0.0001) discard;
}
`

export const vertexShader = `
attribute vec3 aOffset;
attribute vec3 aMetrics;
attribute vec3 aColor1;
attribute vec3 aColor2;

uniform float uTravelLength;
uniform float uTime;

varying vec2 vUv;
varying vec3 vColor1;
varying vec3 vColor2;

${options.distortion.getDistortion}

void main() {
  vec3 transformed = position.xyz;
  float radius = aMetrics.r;
  float myLength = aMetrics.g;
  float speed = aMetrics.b;

  transformed.xy *= radius ;
  transformed.z *= myLength;

  float zOffset = uTime * speed + aOffset.z;
  zOffset = myLength - mod(zOffset, uTravelLength);

  // Add my length to make sure it loops after the lights hits the end
  transformed.z += zOffset;
  transformed.xy += aOffset.xy;

  float progress = abs(transformed.z / uTravelLength);
  transformed.xyz += getDistortion(progress);

  vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);
  gl_Position = projectionMatrix * mvPosition;
  vUv = uv;
  vColor1 = aColor1;
  vColor2 = aColor2;
}
`
