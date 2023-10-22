import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { purple1 } from "../constants/colors";

function loadTexture(dataURL: string) {
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

export function createObj(scene: THREE.Scene) {
  const radius = 1;
  const widthSegments = 32;
  const heightSegments = 32;
  const geometry = new THREE.SphereGeometry(
    radius,
    widthSegments,
    heightSegments
  );

  const material = new THREE.MeshBasicMaterial({ color: purple1 });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  return mesh;
}
