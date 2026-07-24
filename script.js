import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { TrackballControls } from "three/addons/controls/TrackballControls.js";

import Molecule from "./molecule.js";
import Molecule3D from "./molecule3D.js";

const drawBtn = document.querySelector("#drawBtn");
const xyzInput = document.querySelector("#xyzInput");

xyzInput.value = `24
Caffeine
H      -3.3804130    -1.1272367     0.5733036
N       0.9668296    -1.0737425    -0.8198227
C       0.0567293     0.8527195     0.3923156
N      -1.3751742    -1.0212243    -0.0570552
C      -1.2615018     0.2590713     0.5234135
C      -0.3068337    -1.6836331    -0.7169344
C       1.1394235     0.1874122    -0.2700900
N       0.5602627     2.0839095     0.8251589
O      -0.4926797    -2.8180554    -1.2094732
C      -2.6328073    -1.7303959    -0.0060953
O      -2.2301338     0.7988624     1.0899730
H       2.5496990     2.9734977     0.6229590
C       2.0527432    -1.7360887    -1.4931279
H      -2.4807715    -2.7269528     0.4882631
H      -3.0089039    -1.9025254    -1.0498023
H       2.9176101    -1.8481516    -0.7857866
H       2.3787863    -1.1211917    -2.3743655
H       1.7189877    -2.7489920    -1.8439205
C      -0.1518450     3.0970046     1.5348347
C       1.8934096     2.1181245     0.4193193
N       2.2861252     0.9968439    -0.2440298
H      -0.1687028     4.0436553     0.9301094
H       0.3535322     3.2979060     2.5177747
H      -1.2074498     2.7537592     1.7203047`;

const sceneField = document.querySelector("#sceneField");
const fieldWidth = sceneField.clientWidth;
const fieldHeight = sceneField.clientHeight;

const scene = new THREE.Scene();
scene.background = new THREE.Color("black");

// Добавляем камеру - Perspective Camera (Перспективная камера предназначена для имитации того, что видит человеческий глаз. Камера воспринимает все объекты в перспективной проекции, то есть: чем дальше находится объект от нас, тем он кажется меньше.)
const fov = 75; //Field Of View (поле/угол зрения) — определяет угол, который вы можете видеть вокруг центра камеры
const aspectRatio = fieldWidth / fieldHeight; // Пропорция, или, соотношение ширины к высоте экрана. При больших значениях поля зрения видимый размер объектов быстро уменьшается на удалении. При маленьких значениях, наоборот, видимый размер объектов слабо зависит от расстояния.
const near = 0.01; // Минимальное  и
const far = 100; // максимальное расстояние от камеры, которое попадает в рендеринг.
const camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);
// Двигаем камеру по оси z (по умолчанию (0, 0, 0))
camera.position.set(0, 0, 5);
camera.lookAt(0, 0, 0);

const light = new THREE.DirectionalLight(0xffffff, 3);
light.position.set(-7, 5, 20);
camera.add(light);
scene.add(camera);

const light2 = new THREE.AmbientLight(0xffffff, 0);
scene.add(light2);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(fieldWidth, fieldHeight);
sceneField.appendChild(renderer.domElement);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const controls = new TrackballControls(camera, renderer.domElement);
controls.rotateSpeed = 8.0;

function render() {
  requestAnimationFrame(render);
  controls.update();
  renderer.render(scene, camera);
}
render();

drawBtn.addEventListener("click", drawMolecule);
let shape = null;

function drawMolecule() {
  let molecule = new Molecule();
  const xyzData = xyzInput.value;
  molecule.loadFromXYZData(xyzData);

  if (shape) {
    shape.removeFromScene(scene);
    shape.remove();
  }

  shape = new Molecule3D(molecule);
  shape.addToScene(scene);
}
