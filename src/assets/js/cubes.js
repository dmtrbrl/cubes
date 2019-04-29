const CUBE_SPACE_SIZE = 70;
const CUBE_SIZE = 20;
const ROWS = 5;
const COLS = 5;

const CANVAS_BACKGROUND = 0x3f72af;
const CUBE_BORDER_COLOR = 0xf9f7f7;

const cubes = [];
const animations = [];

const randomBoolean = () => Math.random() >= 0.5;

const randomRotation = () => {
  const randX = THREE.Math.randFloat(1, 3) * (randomBoolean ? 1 : -1);
  const randY = THREE.Math.randFloat(1, 3) * (randomBoolean ? 1 : -1);
  return { x: randX, y: randY };
};

const randomRotationStep = () => {
  const randX = THREE.Math.randFloat(0.003, 0.005) * (randomBoolean ? 1 : -1);
  const randY = THREE.Math.randFloat(0.003, 0.005) * (randomBoolean ? 1 : -1);
  return { x: randX, y: randY };
};

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("cubes"),
  antialias: true
});
renderer.setClearColor(CANVAS_BACKGROUND);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(COLS * CUBE_SPACE_SIZE, ROWS * CUBE_SPACE_SIZE);

const camera = new THREE.OrthographicCamera(
  0,
  COLS * CUBE_SPACE_SIZE,
  0,
  ROWS * CUBE_SPACE_SIZE,
  1,
  ROWS * CUBE_SPACE_SIZE
);

const scene = new THREE.Scene();

// Populate Cubes
for (let j = 0; j < ROWS; j++) {
  for (let k = 0; k < COLS; k++) {
    const geometry = new THREE.BoxBufferGeometry(
      CUBE_SIZE,
      CUBE_SIZE,
      CUBE_SIZE
    );
    const edges = new THREE.EdgesGeometry(geometry);
    const material = new THREE.LineBasicMaterial({
      color: CUBE_BORDER_COLOR
    });
    const cube = new THREE.LineSegments(edges, material);
    const { x, y } = randomRotation();
    cube.rotation.x = x;
    cube.rotation.y = y;
    cube.position.set(
      CUBE_SPACE_SIZE / 2 + CUBE_SPACE_SIZE * k,
      CUBE_SPACE_SIZE / 2 + CUBE_SPACE_SIZE * j,
      -CUBE_SIZE
    );

    cubes.push(cube);
    scene.add(cube);
  }
}

// Create random rotation animations
cubes.forEach(cube => {
  const { x, y } = randomRotationStep();
  const animation = () => {
    cube.rotation.x += x;
    cube.rotation.y += y;
  };
  animations.push(animation);
});

requestAnimationFrame(render);
function render() {
  animations.forEach(animation => animation());
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
