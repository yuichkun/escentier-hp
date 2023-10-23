import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import vertexShader from "../shaders/sphere.vert";
import fragmentShader from "../shaders/sphere.frag";
import { gsap } from "gsap";
import gui, {
  autoRotateController,
  axisController,
  heightNoiseAmpController,
  heightNoiseGrainController,
  store,
} from "./gui";
import { getScrollPosition } from "./useScroll";

export function loadVideoTexture(src: string) {
  // Create a video element, set its source, and start playing
  const video = document.createElement("video");
  video.src = src;
  video.crossOrigin = "anonymous";
  video.autoplay = true;
  video.playsInline = true;
  video.loop = true; // Optional: make video loop
  video.muted = true; // Optional: mute video
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  if (isSafari) {
    window.addEventListener("click", () => {
      video.play();
    });
  } else {
    video.play();
  }

  // Create a texture from the video element
  const videoTexture = new THREE.VideoTexture(video);
  return videoTexture;
}
export function loadTexture(dataURL: string) {
  const loader = new THREE.TextureLoader();
  const texture = loader.load(dataURL);
  return texture;
}

type CreateSceneOptions = {
  width: number;
  height: number;
  debug?: boolean;
};
export function createScene({
  width,
  height,
  debug = false,
}: CreateSceneOptions) {
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  const canvas = renderer.domElement;

  window.addEventListener(
    "resize",
    () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    },
    false,
  );

  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000000,
  );
  camera.position.z = 5;

  camera.updateProjectionMatrix();

  let controls: OrbitControls | null = null;
  controls = new OrbitControls(camera, canvas);
  controls.autoRotate = store.autoRotate;
  controls.autoRotateSpeed = 2;
  controls.update();
  if (debug) {
    const axesHelper = new THREE.AxesHelper(5); // The argument defines the size of the helper
    scene.add(axesHelper);
    autoRotateController.onChange((value: boolean) => {
      controls!.autoRotate = value;
    });

    axisController.onChange((hide: boolean) => {
      axesHelper.visible = !hide;
    });

    gui.show();
  }

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    if (controls) {
      controls.update();
    }
  }
  return {
    animate,
    renderer,
    scene,
    canvas: renderer.domElement,
    camera,
  };
}

export function createObj(scene: THREE.Scene, texture: THREE.Texture) {
  const radius = 1;
  const widthSegments = 32;
  const heightSegments = 32;
  const geometry = new THREE.SphereGeometry(
    radius,
    widthSegments,
    heightSegments,
  );

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTexture: { value: texture },
      uTime: { value: 0 },
      uScrollPos: { value: getScrollPosition() },
      uHeightNoiseAmp: {
        value: store.heightNoiseAmp,
      },
      uHeightNoiseGrain: {
        value: store.heightNoiseGrain,
      },
      resolution: { value: new THREE.Vector2() },
    },
    vertexShader,
    fragmentShader,
  });

  window.addEventListener("scroll", () => {
    const position = getScrollPosition();
    const easedPosition = gsap.parseEase("circ.out")(position);

    material.uniforms.uScrollPos.value = easedPosition;

    const scale = easedPosition * 2 + 1;
    mesh.scale.set(scale, scale, scale);
  });

  heightNoiseAmpController.onChange((v: number) => {
    material.uniforms.uHeightNoiseAmp.value = v;
  });
  heightNoiseGrainController.onChange((v: number) => {
    material.uniforms.uHeightNoiseGrain.value = v;
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  function animate() {
    requestAnimationFrame(animate);
    material.uniforms.uTime.value++;
  }
  animate();

  return mesh;
}
