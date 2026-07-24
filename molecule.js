class Atom {
  constructor(element, x = 0, y = 0, z = 0) {
    this.element = element;
    this.position = {
      x: x,
      y: y,
      z: z,
    };
  }
}

export default class Molecule {
  constructor(name = "") {
    this.name = name;
    this.atoms = [];
    this.bonds = [];
  }

  loadFromXYZData(xyzData) {
    this.atoms = [];
    let lines = xyzData.trim().split("\n");

    //let n = Number(shift(lines));
    lines.shift(); // Отбрасываем число атомов
    lines.shift(); // Отбрасываем строку описания

    let atom = null;

    for (let line of lines) {
      //console.log(line);
      let data = line.split(/\s+/);
      atom = new Atom(
        data[0],
        Number(data[1]),
        Number(data[2]),
        Number(data[3]),
      );
      this.atoms.push(atom);
    }
  }

  findBonds() {}
}
//bonds
