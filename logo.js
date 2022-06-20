var canvas = document.getElementById("logo");
var c = canvas.getContext("2d");

c.strokeStyle = "Black";
c.lineWidth = 2;
c.lineCap = "round";

function easeInOutQuint(x) {
  return x < 0.5 ? 16 * x * x * x * x * x : 1 - pow(-2 * x + 2, 5) / 2;
}

class Pos {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Line {
  constructor(startPos, endPos, toPos) {
    this.pos = { ...startPos };
    this.startPos = startPos;
    this.endPos = endPos;
    this.toPos = toPos;
  }

  draw(phase) {
    // phase: 0 to 1
    this.pos = new Pos(
      this.startPos.x * (1 - phase) + this.endPos.x * phase,
      this.startPos.y * (1 - phase) + this.endPos.y * phase
    );
    c.beginPath();
    c.moveTo(this.pos.x, this.pos.y);
    c.lineTo(this.pos.x + this.toPos.x, this.pos.y + this.toPos.y);
    c.stroke();
    c.closePath();
  }
}

class Letter {
  constructor(lines) {
    this.lines = lines;
  }

  draw(phase) {
    this.lines.forEach((l) => {
      l.draw(phase);
    });
  }
}

Y = new Letter([
  new Line(new Pos(75, -250), new Pos(75, 75), new Pos(0, 25)),
  new Line(new Pos(300, -200), new Pos(100, 75), new Pos(-25, 50)),
]);
O1 = new Letter([
  new Line(new Pos(125, 275), new Pos(125, 75), new Pos(0, 25)),
  new Line(new Pos(-100, 75), new Pos(125, 75), new Pos(25, 0)),
  new Line(new Pos(150, -350), new Pos(150, 75), new Pos(0, 25)),
  new Line(new Pos(700, 100), new Pos(125, 100), new Pos(25, 0)),
]);
O2 = new Letter([
  new Line(new Pos(175, 750), new Pos(175, 75), new Pos(0, 25)),
  new Line(new Pos(750, 75), new Pos(175, 75), new Pos(25, 0)),
  new Line(new Pos(200, -125), new Pos(200, 75), new Pos(0, 25)),
  new Line(new Pos(-100, 100), new Pos(175, 100), new Pos(25, 0)),
]);
N1 = new Letter([
  new Line(new Pos(225, -500), new Pos(225, 75), new Pos(0, 25)),
  new Line(new Pos(375, 225), new Pos(225, 75), new Pos(25, 25)),
  new Line(new Pos(250, 250), new Pos(250, 75), new Pos(0, 25)),
]);
G = new Letter([
  new Line(new Pos(275, -250), new Pos(275, 75), new Pos(0, 25)),
  new Line(new Pos(100, 400), new Pos(300, 75), new Pos(-25, 50)),
  new Line(new Pos(-500, 75), new Pos(275, 75), new Pos(25, 0)),
]);
U = new Letter([
  new Line(new Pos(325, -100), new Pos(325, 75), new Pos(0, 25)),
  new Line(new Pos(1000, 100), new Pos(325, 100), new Pos(25, 0)),
  new Line(new Pos(350, 325), new Pos(350, 75), new Pos(0, 25)),
]);
N2 = new Letter([
  new Line(new Pos(375, -50), new Pos(375, 75), new Pos(0, 25)),
  new Line(new Pos(250, -50), new Pos(375, 75), new Pos(25, 25)),
  new Line(new Pos(400, 225), new Pos(400, 75), new Pos(0, 25)),
]);
Dot = new Letter([
  new Line(new Pos(-800, 100), new Pos(425, 100), new Pos(25, 0)),
]);
K = new Letter([
  new Line(new Pos(475, 300), new Pos(475, 50), new Pos(0, 50)),
  new Line(new Pos(0, 575), new Pos(500, 75), new Pos(-25, 25)),
  new Line(new Pos(1500, 100), new Pos(475, 100), new Pos(25, 0)),
]);
R = new Letter([
  new Line(new Pos(-100, 75), new Pos(525, 75), new Pos(25, 0)),
  new Line(new Pos(525, -50), new Pos(525, 75), new Pos(0, 25)),
]);

letters = [Y, O1, O2, N1, G, U, N2, Dot, K, R];

let time = new Date();
let start = time.getTime();

function loop() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  let time = new Date();
  var now = time.getTime();

  // phase = (Math.cos(((now - start) / 3000) * Math.PI) + 1) / 2;
  // phase /= 0.85;
  // phase = Math.min(phase, 1);

  phase = (Math.tanh(((now - start) / 1500) * Math.PI - Math.PI) + 1) / 2;

  for (var i = 0; i < letters.length; i++) {
    letters[letters.length - i - 1].draw(Math.min(phase + i / 80, 1));
  }

  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
