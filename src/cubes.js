import * as THREE from "three";

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("canvas"),
  antialias: true
});
renderer.setClearColor(0xffffff);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(400, 400);

const camera = new THREE.PerspectiveCamera(45, 1, 1, 3000);

const scene = new THREE.Scene();

const light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);
const pointLight = new THREE.PointLight(0xffffff, 0.5);
scene.add(pointLight);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshLambertMaterial({ color: 0x000000 });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 0, -3);

scene.add(mesh);

requestAnimationFrame(render);
function render() {
  mesh.rotation.x += 0.005;
  mesh.rotation.y -= 0.008;
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
