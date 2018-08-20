// Map variable
let m;
// let u;
let dragging = false;
let unitInfo = {};
let fonts = {
  objective: {
    regular: null,
    light: null
  },
  aquatico: {
    regular: null,
  }
};
let img = {
  logo: null,
  bg: null,
  menuBtn: null,
  warrior: null,
  horseman: null,
  village: null
}
let logo;
let bg;

function preload() {
  for (let font in fonts) {
    for (let style in fonts[font]) {
      fonts[font][style] = loadFont(`/Fonts/${font}-${style}.otf`)
    }
  }
  for (let image in img) {
    img[image] = loadImage(`Images/${image}.png`);
  }
  logo = loadImage("Images/logo.png");
  bg = loadImage("Images/bg.png");
  // house = loadImage("/Images/house.png", function() {
  //   console.log("Done loading after " + floor(millis()) + "ms");
  // });
}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  frameRate(60);
  m = new Map(11, 100);
  m.createUnit(0, 0, "horseman", 'poop');
  m.createUnit(4, 4, "warrior", 'popo');
  for (let type in unitTypes) {
    unitInfo[type] = objToInfo(unitTypes[type], type);
  }
  screens.current = 'Game';

}

function draw() {
  background(0);
  screens.showCurrent();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  screens.currentScreen.resizeElt();
}

function mousePressed() {
  m.mouse = createVector(mouseX, mouseY);
  m.pOffset.set(m.offset);
}

function mouseDragged() {
  dragging = true;
  m.pan();
}

function mouseClicked() {
  screens.onClick();
  if (!dragging) {
    m.checkFocus();
  }
  dragging = false;
}

// FOR DEBUGGING PURPOSES
function keyPressed() {
  if (keyCode === ESCAPE) noLoop();
  if (keyCode === ENTER) loop();
}
