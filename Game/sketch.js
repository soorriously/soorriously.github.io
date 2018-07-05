// Map variable
let m;
let house;
let u;
let pMousePressed;
let MousePressed = false;
let unitInfo = {};
let temp = true;
let objective = {
  regular: null,
  light: null
}
let exit = new RectButton();

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

  for (let type in unitTypes) {
    unitInfo[type] = objToInfo(unitTypes[type], type);
  }
}

function draw() {
  background(127);
  m.show();
  // crosshair();
  if ((frameCount % 60 === 0) && keyIsDown(' ')) {
    console.log(m.tiles[0][0].hit());
    console.log(m.selectedTile);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  m.mouse = createVector(mouseX, mouseY);
  m.pOffset.set(m.offset);
}

function mouseDragged() {
  m.pan();
}

function mouseReleased() {
  for (let arr of m.tiles) {
    for (let t of arr) {
      // t.hasFocus = false;
    }
  }
}

function mouseClicked() {
  m.checkFocus();
  console.log(4);
}

function keyPressed() {
  if (keyCode===ESCAPE) noLoop();
  if (keyCode===ENTER) loop();
}
