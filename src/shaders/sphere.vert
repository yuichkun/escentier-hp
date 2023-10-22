varying vec2 vUv;
#pragma glslify: noise = require('glsl-noise/simplex/3d');

// uniforms
uniform float uHeightNoiseGrain;
uniform float uHeightNoiseAmp;
uniform float uScrollPos;

float scale(float value, float inMin, float inMax, float outMin, float outMax) {
  return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

void main() {
    vUv = uv;
    vec3 pos = position + normal * noise(vec3(position + normal) * uHeightNoiseGrain) * uHeightNoiseAmp * scale(uScrollPos, 0.0, 1.0, 0.3, 0.7);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}