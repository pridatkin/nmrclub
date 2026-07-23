class Position {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

class Atom {
  constructor(element, x = 0, y = 0, z = 0) {
    this.element = element;
    this.position = new Position(x, y, z);
  }
}

class Molecule {
  constructor(name = "", atoms = []) {
    this.name = name;
    this.atoms = atoms;
  }

  loadFromXYZData(xyzData) {
    this.atoms = [];
    let lines = xyzData.trim().split("\n");

    //let n = Number(shift(lines));
    lines.shift(); // Отбрасываем число атомов
    lines.shift(); // Отбрасываем строку описания

    let atom = null;

    for (let line of lines) {
      console.log(line);
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
}

function test() {
  let test = new Molecule("pyridine");
  xyzData = `11

C       -0.180226841      0.360945118     -1.120304970
C       -0.180226841      1.559292118     -0.407860970
C       -0.180226841      1.503191118      0.986935030
N       -0.180226841      0.360945118      1.29018350
C       -0.180226841     -0.781300882      0.986935030
C       -0.180226841     -0.837401882     -0.407860970
H       -0.180226841      0.360945118     -2.206546970
H       -0.180226841      2.517950118     -0.917077970
H       -0.180226841      2.421289118      1.572099030
H       -0.180226841     -1.699398882      1.572099030
H       -0.180226841     -1.796059882     -0.917077970`;

  test.loadFromXYZData(xyzData);
  console.log(test);
}

test();
