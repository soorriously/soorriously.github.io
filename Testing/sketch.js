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
  i = new infoWindow(unitInfo.warrior);
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

class infoWindow {
  constructor(infoObject) {
    this.button = new RectButton();
    this.setInfo(infoObject);
    this.button.setPosition(width/2, height/2 + 200 - 75);
    this.button.setText('OK');
    this.button.setTextSize(36);
    // this.button.setSize("auto");
    this.button.setSize("auto", 2);
    this.button.setFill(color(0, 0, 255));
    this.button.setFont(objective.light);
    this.toShow = true;
  }

  show() {
    if (this.toShow) {
      push();
      translate(width/2, height/2);
      rectMode(CENTER);
      textAlign(CENTER, TOP);
      fill(0);
      rect(0,0, 300, 400, 10);
      fill(255);
      textSize(48);
      textFont(objective.regular);
      text(this.title, 0, -200 + 48/4);
      textSize(24);
      textAlign(LEFT, TOP);
      textFont(objective.light);
      for (let i = 0; i<this.content.labels.length;i++) {
        text(this.content.labels[i], -150 + 24/2, -125 + 24/3 + i * (24 * 5 / 4));
      }
      textAlign(RIGHT, TOP);
      for (let i = 0; i<this.content.data.length;i++) {

        text(this.content.data[i], 150 - 24/2, -125 + 24/3 + i * (24 * 5 / 4));
      }
      pop();
      this.button.show();
    }
  }

  setInfo(infoObject) {
    this.info = infoObject;
    this.title = this.info["title"];
    this.content = this.info["content"];
  }

  checkButtonHit() {
    if (this.button.hit()) {
      this.toggleWindow(false);
      this.button.toggle(false);
    }
  }

  toggleWindow(bool) {
    this.toShow = (typeof bool === 'boolean') ? bool : !this.toShow;
  }

}

let objToInfo = (obj, _title) => {
  let keys = Object.keys(obj);
  let info = {
    title: _title.toUpperCase(),
    content: {
      labels: keys.map(e => {
        if ((typeof obj[e] !== 'undefined') || (typeof obj[e] !== 'function')) {
          return e;
        }
      }).slice(0, keys.length - 1),
      data: keys.map(e => {
        if ((typeof obj[e] !== 'undefined') || (typeof obj[e] !== 'function')) {
          return obj[e];
        }
      }).slice(0, keys.length - 1)
    }
  }
  return info;
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
