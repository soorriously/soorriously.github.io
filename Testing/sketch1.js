let ui = new UI();


function setup() {
  createCanvas(windowWidth, windowHeight);
  img = createGraphics(400,400);

}

function draw() {
  background(0);
  img.background(255);
  image(img, 0, 0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
