import { options } from '@/threejs/config'

export const fragmentShader = `
varying vec3 vColor;

void main(){
  vec3 color = vec3(vColor);
  gl_FragColor = vec4(color,1.);
}
`

export const vertexShader = `

attribute float aOffset;
attribute vec3 aColor;
attribute vec2 aMetrics;

uniform float uTravelLength;
uniform float uTime;

varying vec3 vColor;

mat4 rotationY( in float angle ) {
	return mat4(	cos(angle),   0,		      sin(angle),   0,
			 				  0,		        1.0,			  0,	          0,
					      -sin(angle),	0,		      cos(angle),   0,
							  0, 		        0,				  0,	          1);
}

${options.distortion.getDistortion}

void main(){
  vec3 transformed = position.xyz;
  float width = aMetrics.x;
  float height = aMetrics.y;

  transformed.xy *= vec2(width, height);
  float time = mod(uTime  * 60. * 2. + aOffset , uTravelLength);

  transformed = (rotationY(3.14 / 2.) * vec4(transformed, 1.)).xyz;

  transformed.z += -uTravelLength + time;

  float progress = abs(transformed.z / uTravelLength);
  transformed.xyz += getDistortion(progress);

  transformed.y += height /2.;
  transformed.x += -width/2.;
  vec4 mvPosition = modelViewMatrix * vec4(transformed,1.);
  gl_Position = projectionMatrix * mvPosition;
  vColor = aColor;
}
`
