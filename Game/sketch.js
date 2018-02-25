// Map variable
let map;
let house;

function preload() {
  house = loadImage("./Images/house.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  map = new Map(4, 150);
  console.log("Done loading!");
}

function draw() {
  background(0);
  map.show();
  stroke(255);
  strokeWeight(1);
  line(width / 2 - 20, height / 2, width / 2 + 20, height / 2);
  line(width / 2, height / 2 - 20, width / 2, height / 2 + 20)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  map.mouse = createVector(mouseX, mouseY);
  map.pOffset.set(map.offset);
}

function mouseDragged() {
  map.pan();
}

function imageLoaded() {
  // No Use currently
}
