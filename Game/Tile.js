class Tile {
  constructor(size, map) {
    this.reset(size, map);
  }

  // displays the Tile in the canvas
  show(x, y) {
    this.pos.set(x, y);
    push();
    translate(this.pos.x, this.pos.y);
    rectMode(CENTER);
    noStroke();
    fill(this.col);
    if (this.hit()) {
      fill(255, 0, 0);
    }
    rect(0, 0, this.SIZE, this.SIZE);
    if (this.hit()) {
      fill(0, 50);
      rect(0, 0, this.SIZE, this.SIZE);
      fill(this.col);
      rect(0, 0, this.SIZE * 0.75, this.SIZE * 0.75);
    }
    pop();
  }

  // Checks whether the mouse is within the Tile
  hit() {
    if (mouseX > this.pos.x - this.SIZE / 2 && mouseX < this.pos.x + this.SIZE / 2) {
      if (mouseY > this.pos.y - this.SIZE / 2 && mouseY < this.pos.y + this.SIZE / 2) {
        return true;
      }
      return false;
    }
    return false;
  }

  setCol() {
    if (arguments.length <= 4) this.col = color(c);
    else throw new Error("The input for setCol() must be a colour, or an array of length 1-4");
  }

  reset(size, map) {
    this.pos = createVector(0, 0);
    this.map = map;
    this.SIZE = size;
    this.hasFocus = false;
    this.col;
    // this.col = color(random(0, 255), random(0, 255), random(0, 255));
  }

}
