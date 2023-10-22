import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

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
  // Set the camera position so it's looking at the scene from directly above
  camera.position.z = 1;
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
  };
}

export function createObj(scene: THREE.Scene) {
  const geometry = new THREE.PlaneGeometry(
    window.innerWidth / 5000,
    window.innerHeight / 5000
  );

  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const plane = new THREE.Mesh(geometry, material);
  scene.add(plane);
}
