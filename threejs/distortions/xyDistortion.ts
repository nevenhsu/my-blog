import { Uniform, Vector2 } from 'three'

const xyUniforms = {
  uFreq: new Uniform(new Vector2(5, 2)),
  uAmp: new Uniform(new Vector2(25, 15)),
}

const vertex = `
#define PI 3.14159265358979

uniform vec2 uFreq;
uniform vec2 uAmp;
	
vec3 getDistortion(float progress){
  float movementProgressFix = 0.02;

  return vec3( 
    cos(progress * PI * uFreq.x + uTime) * uAmp.x - cos(movementProgressFix * PI * uFreq.x + uTime) * uAmp.x,
    sin(progress * PI * uFreq.y + PI/2. + uTime) * uAmp.y - sin(movementProgressFix * PI * uFreq.y + PI/2. + uTime) * uAmp.y,
    0.
  );
}
`

export const xyDistortion = {
  uniforms: xyUniforms,
  getDistortion: vertex,
}
