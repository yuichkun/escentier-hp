import * as THREE from "three";

function loadTexture(dataURL: string) {
  const loader = new THREE.TextureLoader();
  const texture = loader.load(dataURL);
  return texture;
}

type CreateSceneOptions = {
  width: number;
  height: number;
};
export function createScene({ width, height }: CreateSceneOptions) {
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  const canvas = renderer.domElement;

  const camera = new THREE.OrthographicCamera(
    canvas.width / -2, // left
    canvas.width / 2, // right
    canvas.height / 2, // top
    canvas.height / -2, // bottom
    1, // near
    1000 // far
  );
  // Set the camera position so it's looking at the scene from directly above
  camera.position.z = 1;
  camera.updateProjectionMatrix();

  const geometry = new THREE.PlaneGeometry(
    window.innerWidth / 2,
    window.innerHeight - 1
  );

  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  // const material = new THREE.MeshBasicMaterial({ map: texture });
  const plane = new THREE.Mesh(geometry, material);
  scene.add(plane);

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  return {
    animate,
    renderer,
    scene,
    canvas: renderer.domElement,
  };
}
