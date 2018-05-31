class Tile {
  constructor(map, mapX, mapY) {
    this.reset(map, mapX, mapY);
  }

  // displays the Tile in the canvas
  show() {
    // this.pos.set(x, y);
    push();
    // OLD CRAPPY CODE
    // translate(this.pos.x, this.pos.y);
    // rectMode(CENTER);
    // // noStroke();
    // stroke(0);
    // strokeWeight(1);
    // fill(this.col);
    // if (this.hasFocus) {
    //   fill(175, 0, 0);
    //   rect(0, 0, this.SIZE, this.SIZE);
    // }
    // if (this.highlightTile) {
    //   fill(0, 255, 0)
    // }
    // if (this.hit()) {
    //   fill(255, 0, 0);
    // }
    // if (this.hit() && this.highlightTile) {
    //   fill(255, 0, 0);
    // }
    // rect(0, 0, this.SIZE, this.SIZE);
    // if (this.hit() || this.hasFocus || this.highlightTile) {
    //   // fill(0, 50);
    //   rect(0, 0, this.SIZE, this.SIZE);
    //   fill(this.col);
    //   rect(0, 0, this.SIZE * 0.75, this.SIZE * 0.75);
    // }
    translate(this.pos.x, this.pos.y);
    rectMode(CENTER);
    stroke(0);
    strokeWeight(1);
    fill(this.col);
    rect(0, 0, this.SIZE, this.SIZE);
    if (this.hit()) {
      push();
      emptySquare(this.pos.x, this.pos.y,
        this.SIZE, this.SIZE * 0.75,
        color(255, 0, 0));
      pop();
      // noLoop();
    }
    if (this.unit) this.unit.show();
    pop();
  }

  update(x, y) {
    this.pos.set(x, y);
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

  highlight() {
    // push();
    // translate(this.pos.x, this.pos.y);
    // fill(0,255,0);
    // rect(0,0, this.SIZE, this.SIZE);
    // fill(this.col);
    // rect(0, 0, this.SIZE * 0.75, this.SIZE * 0.75);
    // pop();

    // this.highlightTile = true;


  }

  reset(map, mapX, mapY) {
    this.pos = createVector(0, 0);
    this.map = map;
    this.SIZE = this.map.TILE_SIZE;
    this.hasFocus = false;
    this.col = randomCol();
    this.unit = null;
    this.mapX = mapX;
    this.mapY = mapY;
  }

  setUnit(unit) {
    this.unit = unit;
  }

  moveUnit(tile) {
    tile.unit = this.unit;
    this.unit = null;
  }

  set hasFocus(bool) {
    if (this.unit) {
      this.unit.hasFocus = bool;
    }
  }

}
