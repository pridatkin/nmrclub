import * as THREE from "three";

const colorsByElement = {
  H: 0xffffff, // white
  O: 0xff0000, // red
  C: 0xc8c8c8, // grey
  N: 0x8f8fff, // blue
};

const radiusByElement = {
  H: 0.3, // white
  O: 0.38, // red
  C: 0.425, // grey
  N: 0.39, // blue
};

Object.freeze(colorsByElement);
Object.freeze(radiusByElement);

export default class Molecule3D {
  constructor(molecule) {
    this.shapes = [];

    let geometry = null;
    let material = null;
    let shape = null;

    for (let atom of molecule.atoms) {
      geometry = new THREE.SphereGeometry(
        radiusByElement[atom.element],
        32,
        32,
      );
      material = new THREE.MeshStandardMaterial({
        color: colorsByElement[atom.element],
        roughness: 0.7,
      });
      shape = new THREE.Mesh(geometry, material);
      shape.position.set(atom.position.x, atom.position.y, atom.position.z);
      this.shapes.push(shape);
    }
  }

  remove() {
    for (let shape of this.shapes) {
      shape.geometry.dispose();
      shape.material.dispose();
    }
  }

  addToScene(scene) {
    for (let shape of this.shapes) {
      scene.add(shape);
    }
  }

  removeFromScene(scene) {
    for (let shape of this.shapes) {
      scene.remove(shape);
    }
  }
}
