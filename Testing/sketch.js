let b;
let i;
let objective = {
  regular: null,
  light: null
}

function preload() {
  objective.light = loadFont("/Fonts/Objective-Light.otf");
  objective.regular = loadFont("/Fonts/Objective-Regular.otf");
}

function setup() {
  createCanvas(windowWidth, windowHeight, P2D);
  b = new RectButton();
  i = new infoCard(unitInfo.warrior);
  b.setPosition(width/2, height/2);
  b.setText('OK');
  b.setSize("auto");
  b.setFill(color(0, 0, 255));
  b.setFont(objective.light);
}

function draw() {
  background(127);
  i.show();
  // if (i.button.hit()) {
  //   if (mouseIsPressed) {
  //     print('HIT!');
  //   }
  // }
}

function mouseClicked() {
  i.checkButtonHit();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}







let unitTypes = {
  "warrior": {
    attack: 2,
    defense: 2,
    health: 10,
    movement: 1,
    abilities: ['none'],
    show(wh) {
      rect(0, 0, wh, wh, 5);
    },
  },
  "horseman": {
    attack: 2,
    defense: 1,
    health: 10,
    movement: 2,
    abilities: ['none', 'none2', '\nnone'],
    show(wh) {
      ellipse(0, 0, wh, wh);
    }
  }
}

let unitInfo = {};

for (let type in unitTypes) {
  unitInfo[type] = objToInfo(unitTypes[type], type);
}
