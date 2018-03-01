// Map variable
let m;
let house;
let u;
// function preload() {
//   house = loadImage("/Images/house.png", function() {
//     console.log("Done loading after " + floor(millis()) + "ms");
//   });
// }

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  m = new Map(7, 75);
  u = new Unit(m, m.tiles[3][3], "warrior");
}

function draw() {
  background(0);
  m.show();
  stroke(255);
  strokeWeight(1);
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
  m.pan();
}

function imageLoaded() {
  // No Use currently
}

function mouseClicked() {
  for (let arr of m.tiles) {
    for (let t of arr) {
      t.setFocus(t.hit());
    }
  }
}
