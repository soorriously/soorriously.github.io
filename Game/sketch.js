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
  m = new Map(10, 100);
  m.createUnit(3,3,"warrior");
  for (let type in unitTypes) {
    unitInfo[type] = objToInfo(unitTypes[type], type);
  }
  screens.current = 'MainMenu';
  m.createUnit(1, 1, 'horseman')
  m.createUnit(1, 8, 'horseman')
  m.createUnit(8, 8, 'horseman')
  m.createUnit(8, 1, 'horseman')
  m.tiles[1][1].col = color('blue');
  m.tiles[1][8].col = color('red');
  m.tiles[1][8].col = color('green');
  m.tiles[8][8].col = color('yellow');
  m.tiles[8][1].col = color('orange');

}

function draw() {
  background(0);
  // m.show();
  screens.showCurrent();
  // crosshair();

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
  screens.onClick();
  if (!dragging) {
    m.checkFocus();
  }
}

function keyPressed() {
  if (keyCode === ESCAPE) noLoop();
  if (keyCode === ENTER) loop();
}

function doubleClicked() {
  m.centerOn(CENTER)
}
