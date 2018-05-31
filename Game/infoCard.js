class infoCard {
  constructor(infoObject) {
    this.button = new RectButton();
    this.setInfo(infoObject);
    this.button.setPosition(width/2, height/2 + 200 - 75);
    this.button.setText('OK');
    this.button.setTextSize(36);
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
    }
  }

  toggleWindow(bool) {
    this.toShow = (typeof bool === 'boolean') ? bool : !this.toShow;
    this.button.toggle(bool);
  }
}

p5 = {
  
}
