// Map variable
let m;
let house;
let u;
let pMousePressed;
let MousePressed = false;
let unitInfo = {};
let objective = {
  regular: null,
  light: null
}

function preload() {
  objective.light = loadFont("/Fonts/Objective-Light.otf");
  objective.regular = loadFont("/Fonts/Objective-Regular.otf");
}

// function preload() {
//   house = loadImage("/Images/house.png", function() {
//     console.log("Done loading after " + floor(millis()) + "ms");
//   });
// }

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  m = new Map(9, 50);
  u = new Unit(m, m.tiles[3][3], "warrior");
  // mouseClicked(m.checkFocus());
  for (let type in unitTypes) {
    unitInfo[type] = objToInfo(unitTypes[type], type);
  }
}

function draw() {
  pMousePressed = MousePressed;
  MousePressed = mouseIsPressed;
  background(0);
  m.show();
  // stroke(255);
  // strokeWeight(1);
  // line(width / 2 - 20, height / 2, width / 2 + 20, height / 2);
  // line(width / 2, height / 2 - 20, width / 2, height / 2 + 20);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  m.mouse = createVector(mouseX, mouseY);
  m.pOffset.set(m.offset);
}

function mouseDragged() {
  // m.pan();
}

function mouseReleased() {
  for (let arr of m.tiles) {
    for (t of arr) {
      t.setFocus(false);
    }
  }
}

function imageLoaded() {
  // No Use currently
}

function mouseClicked() {
  m.checkFocus();
}
