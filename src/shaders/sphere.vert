varying vec2 vUv;
#pragma glslify: noise = require('glsl-noise/simplex/3d');
void main() {
    vUv = uv;
    vec3 pos = position + normal * noise(vec3(position + normal));
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}