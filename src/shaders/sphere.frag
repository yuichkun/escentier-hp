#pragma glslify: noise3 = require('glsl-noise/simplex/3d');

varying vec2 vUv;
uniform sampler2D uTexture;
uniform float uScrollPos;
uniform float uTime;

const vec3 blue = vec3(0.3137254902, 0.01960784314, 0.9490196078); // #5005F2
const vec3 black = vec3(0.09411764706, 0.1803921569, 0.3490196078); // #182E59
const vec3 purple1 = vec3(0.8235294118, 0.7333333333, 0.9490196078); // #D2BBF2
const vec3 purple2 = vec3(0.6156862745, 0.5215686275, 0.9490196078); // #9D85F2
const vec3 purple3 = vec3(0.4941176471, 0.368627451, 0.9490196078); // #7E5EF2

float scale(float value, float inMin, float inMax, float outMin, float outMax) {
  return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

void main() {
    vec4 texColor = texture2D(uTexture, vUv);

    float wave = sin(uTime * 0.1) * 0.5 + 0.5;
    vec2 amp = vec2(0.3, 0.77);
    float n = noise3(vec3(vUv * amp * 10000.0, wave));

    // blend tex with base color
    gl_FragColor = mix(vec4(black, 1.0), texColor, scale(uScrollPos, 0.0, 1.0, 0.3, 0.7));
    // add noise
    gl_FragColor += n * 0.1;


    // debug noise
    // gl_FragColor =vec4(n, 0., 0.,1.0);

}