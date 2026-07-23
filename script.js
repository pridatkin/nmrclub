import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const colorsByElement = {
  H: 0xffffff, // white
  O: 0xff0000, // red
  C: 0xc8c8c8, // grey
  N: 0x8f8fff, // blue
};

Object.freeze(colorsByElement);

const drawBtn = document.querySelector("#drawBtn");
const xyzInput = document.querySelector("#xyzInput");
const sceneFields = document.querySelector("#sceneFields");

drawBtn.addEventListener("click", drawMolecule);

// Добавляем камеру - Perspective Camera (Перспективная камера предназначена для имитации того, что видит человеческий глаз. Камера воспринимает все объекты в перспективной проекции, то есть: чем дальше находится объект от нас, тем он кажется меньше.)
const fov = 75; //Field Of View (поле/угол зрения) — определяет угол, который вы можете видеть вокруг центра камеры
const aspectRatio = 1.5; // Пропорция, или, соотношение ширины к высоте экрана. При больших значениях поля зрения видимый размер объектов быстро уменьшается на удалении. При маленьких значениях, наоборот, видимый размер объектов слабо зависит от расстояния.
const near = 0.01; // Минимальное  и
const far = 100; // максимальное расстояние от камеры, которое попадает в рендеринг.

function drawMolecule() {
  let molecule = new Molecule();
  const xyzData = xyzInput.value;
  molecule.loadFromXYZData(xyzData);

  const sceneField = document.createElement("div");
  sceneField.classList.add("sceneField");
  sceneFields.append(sceneField);

  const fieldWidth = sceneField.clientWidth;
  const fieldHeight = sceneField.clientHeight;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("black");

  const camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);
  // Двигаем камеру по оси z (по умолчанию (0, 0, 0))
  camera.position.set(0, 0, 5);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(fieldWidth, fieldHeight);
  sceneField.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);

  function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
  render(renderer, scene, camera);

  for (let atom of molecule.atoms) {
    drawSphere(scene, 0.3, atom.position, colorsByElement[atom.element]);
  }
}

function drawSphere(scene, radius, position, color) {
  const sphereGeometry = new THREE.SphereGeometry(radius, 10, 10);
  const sphereMaterial = new THREE.MeshBasicMaterial({ color: color });

  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.set(position.x, position.y, position.z);
  scene.add(sphere);
}
