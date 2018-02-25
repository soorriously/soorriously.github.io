class Point {
  constructor(x, y, size, map) {
    this.pos = createVector(x, y);
    this.SIZE = size;
    this.map = map;
    this.settled = true;
  }

  show(x, y) {
    this.pos.set(x, y);
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    ellipseMode(CENTER);
    rectMode(CENTER);
    fill(255);
    if (this.hit()) {
      fill(0, 0, 255);
      tint(0, 0, 255);
    }
    if (!this.settled) {
      ellipse(0, 0, this.SIZE, this.SIZE);
    } else {
      city(0, 0, this.SIZE);
    }
    pop();
  }

  hit() {
    if (dist(mouseX, mouseY, this.pos.x, this.pos.y) < this.SIZE / 2) {
      return true;
    }
    return false;
  }

  setOwner(player) {
    //this.owner = player;
    this.settled = true;
  }

}
