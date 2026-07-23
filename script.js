// Три, так называемых, кита Three.js включают в себя:
// Scene — своеобразная платформа, где размещаются все объекты, которые мы создаем;
// Camera — по сути — это “глаз”, который будет направлен на сцену. Камера снимает и отображает объекты, которые расположены на сцене;
// Renderer — визуализатор, который позволяет показывать сцену, снятую камерой.

// Ambient Light — фоновое освещение, которое используется для освещения всех объектов сцены одинаково; не может быть использован для создания теней, так как не имеет направления.
// Directional Light — свет, который излучается в определенном направлении. Этот свет будет вести себя так, как если бы он был бесконечно далеко, а лучи, излучаемые из него, были параллельны; данное освещение может отбрасывать тени, так как направлено оно на конкретный объект.
// Point Light — свет, который излучается из одной точки во всех направлениях. Обычный случай использования такого освещения это повторение освещения от простой лампочки (без светильника).
// Spot Light — данный свет излучается из одной точки в одном направлении, вдоль конуса, расширяемого по мере удаления от источника света.

import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const field = document.querySelector(".sceneField"); //поле для сцены
const fieldWidth = field.clientWidth;
const fieldHeight = field.clientHeight;

// Добавляем сцену
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

// Добавляем камеру - Perspective Camera (Перспективная камера предназначена для имитации того, что видит человеческий глаз. Камера воспринимает все объекты в перспективной проекции, то есть: чем дальше находится объект от нас, тем он кажется меньше.)
const fov = 75; //Field Of View (поле/угол зрения) — определяет угол, который вы можете видеть вокруг центра камеры
const aspectRatio = fieldWidth / fieldHeight; // Пропорция, или, соотношение ширины к высоте экрана. При больших значениях поля зрения видимый размер объектов быстро уменьшается на удалении. При маленьких значениях, наоборот, видимый размер объектов слабо зависит от расстояния.
const near = 0.1; // Минимальное  и
const far = 1000; // максимальное расстояние от камеры, которое попадает в рендеринг.
const camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);
// Двигаем камеру по оси z (по умолчанию (0, 0, 0))
camera.position.set(0, 0, 50);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(fieldWidth, fieldHeight);
field.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

// Mesh — это класс, представляющий объекты на основе треугольной полигональной сетки.
// Этот класс принимает 2 аргумента:
// Geometry — описывает форму (положения вершин, грани, радиус и т.д)
// Material — описывает внешний вид объектов (цвет, текстура, прозрачность и т.д.)

// Создаем куб 10x10x10
const cubeGeometry = new THREE.BoxGeometry(10, 10, 10); //ширина, высота, глубина
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Материал для придания однородного цвета
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.x = 35;
cube.position.y = -25;
scene.add(cube);

//Создаем сферу с радиусом 10
const sphereGeometry = new THREE.SphereGeometry(9, 8, 8); //радиус, количество горизонтальных и вертикальных сегментов
const sphereMaterial = new THREE.MeshNormalMaterial(); // Многоцветный материал
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.x = -35;
sphere.position.y = -25;
scene.add(sphere);

// Освещение сцены
// Ambient Light — фоновое освещение, которое используется для освещения всех объектов сцены одинаково; не может быть использован для создания теней, так как не имеет направления.
// Directional Light — свет, который излучается в определенном направлении. Этот свет будет вести себя так, как если бы он был бесконечно далеко, а лучи, излучаемые из него, были параллельны; данное освещение может отбрасывать тени, так как направлено оно на конкретный объект.
// Point Light — свет, который излучается из одной точки во всех направлениях. Обычный случай использования такого освещения это повторение освещения от простой лампочки (без светильника).
// Spot Light — данный свет излучается из одной точки в одном направлении, вдоль конуса, расширяемого по мере удаления от источника света.
// Добавим свет, нужен для некоторых материалов

const spotLight = new THREE.SpotLight(0xffffff, 10000);
spotLight.target.position.set(0, 0, 0); //Направление куда светит свет
scene.add(spotLight.target);
spotLight.position.set(50, 50, 50); // Позиция источника
scene.add(spotLight);

// const ambientLight = new THREE.AmbientLight(0x404040);
// scene.add(ambientLight);

//Создаем тор
const torusGeometry = new THREE.TorusGeometry(10, 3, 16, 100); //Радиус, диаметр трубы, количество сегментов треугольников и граней
const torusMaterial = new THREE.MeshPhongMaterial({
  color: 0xdaa520,
  specular: 0xbcbcbc, // блеск материала
}); // Материал для блестящих поверхностей
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.position.x = 0;
torus.position.y = 0;
scene.add(torus);

function render() {
  requestAnimationFrame(render);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;

  renderer.render(scene, camera);
}

render();
