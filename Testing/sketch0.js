// Map variable
let m;
let mouseStates = [false,true];

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(120);
  m = new Map(5, 125);
}

function draw() {
  background(0);
  m.show();
  m.update();
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
  m.selectedTile = null;
  m.selectedUnit = null;
}

function mouseReleased() {

}

function mouseClicked() {
  m.checkFocus();
}
