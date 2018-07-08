class Tile {
  constructor(map, mapX, mapY) {
    this.reset(map, mapX, mapY);
  }

  // displays the Tile in the canvas
  show() {
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
    // stroke(0);
    noStroke();
    strokeWeight(1);
    fill(this.col);
    rect(0, 0, this.SIZE, this.SIZE);
    if (this.hit()) {
      push();
      emptySquare(this.pos.x, this.pos.y,
                  this.SIZE, this.SIZE * 0.75,
                  this.hitCol);
      pop();
    }
    if (this.unit) this.unit.show();
    if (this.hasFocus) {
      fill(0);
      ellipse(0,0,50,50);
    }
    pop();
  }

  update(x, y) {
    this.pos.set(x, y);
  }

  // Checks whether the mouse is within the Tile
  hit() {
    // OLD CODE
    // if (mouseX > this.pos.x - this.SIZE / 2 &&
    //     mouseX < this.pos.x + this.SIZE / 2 &&
    //     mouseY > this.pos.y - this.SIZE / 2 &&
    //     mouseY < this.pos.y + this.SIZE / 2) {
    //   return true;
    // }
    // return false;
    return (mouseX > this.pos.x - this.SIZE / 2 &&
            mouseX < this.pos.x + this.SIZE / 2 &&
            mouseY > this.pos.y - this.SIZE / 2 &&
            mouseY < this.pos.y + this.SIZE / 2) ? !0 : !1;
  }

  highlight() {

  }

  reset(map, mapX, mapY) {
    this.pos = createVector(0, 0);
    this.map = map;
    this.SIZE = this.map.TILE_SIZE;
    this.hasFocus = false;
    this.col = randomCol();
    this.hitCol = color(0, 0, 255);
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

  setFocussed(bool) {
    this.hasFocus = bool;
  }

}
