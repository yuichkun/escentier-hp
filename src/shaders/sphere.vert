varying vec2 vUv;
#pragma glslify: noise = require('glsl-noise/simplex/3d');

// uniforms
uniform float uHeightNoiseGrain;
uniform float uHeightNoiseAmp;
uniform float uScrollPos;

void main() {
    vUv = uv;
    vec3 pos = position + normal * noise(vec3(position + normal) * uHeightNoiseGrain) * uHeightNoiseAmp * uScrollPos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}