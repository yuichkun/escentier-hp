import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import vertexShader from "../shaders/sphere.vert";
import fragmentShader from "../shaders/sphere.frag";
import gui, { autoRotateController, axisController } from "./gui";

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

  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.z = 5;

  camera.updateProjectionMatrix();

  let controls: OrbitControls | null = null;
  if (debug) {
    controls = new OrbitControls(camera, canvas);
    controls.update();
    autoRotateController.onChange((value: boolean) => {
      controls!.autoRotate = value;
    });

    const axesHelper = new THREE.AxesHelper(5); // The argument defines the size of the helper
    scene.add(axesHelper);

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
    heightSegments
  );

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTexture: { value: texture },
      uTime: { value: 0 },
      resolution: { value: new THREE.Vector2() },
    },
    vertexShader,
    fragmentShader,
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
