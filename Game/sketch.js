// Map variable
let m;
let house;
let u;
let dragging = false;
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
  canvas = createCanvas(windowWidth, windowHeight);
  frameRate(60);
  m = new Map(10, 50);
  u = new Unit(m, m.tiles[3][3], "warrior");
  for (let type in unitTypes) {
    unitInfo[type] = objToInfo(unitTypes[type], type);
  }
  for (let x in p5) {
    console.log(p5[x]);
  }
}

function draw() {
  background(127);
  m.show();
  // crosshair();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  m.mouse = createVector(mouseX, mouseY);
  m.pOffset.set(m.offset);
}

function mouseDragged() {
  dragging = true;
  m.pan();
}

function mouseReleased() {
  if (dragging) {
    dragging = false;
    for (let arr of m.tiles) {
      for (let t of arr) {
        t.hasFocus = false;
      }
    }
  }
}

function mouseClicked() {
  if (!dragging) {
    m.checkFocus();
  }
}

function keyPressed() {
  if (keyCode===ESCAPE) noLoop();
  if (keyCode===ENTER) loop();
}


function loadingAnimation() {

}
