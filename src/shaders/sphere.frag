varying vec2 vUv;
#pragma glslify: snoise2 = require(glsl-noise/simplex/2d);
#pragma glslify: noise2 = require(glsl-noise/simplex/2d);

void main() {
    vec2 uv = vUv;
    // gl_FragColor = vec4(uv, 0.0, 1.0);  // Red color
    float n = noise2(vUv * 100.);
     gl_FragColor = vec4(n,n, 1.0, 1.0);
}
