class Tile {
  constructor(map, mapX, mapY) {
    this.reset(map, mapX, mapY);
  }

  // displays the Tile in the canvas
  show() {
    push();
    translate(this.pos.x, this.pos.y);
    rectMode(CENTER);
    noStroke();
    strokeWeight(1);
    fill(this.col);
    rect(0, 0, this.SIZE, this.SIZE);
    if (this.hit()) {
      this.highlight(this.hitCol);
    } else if (this.hasFocus) {
      this.highlight(darken(this.hitCol));
    }
    if (this.unit) this.unit.show();
    if (this.city) this.city.show();
    pop();
  }

  update(x, y) {
    this.pos.set(x, y);
  }

  // Checks whether the mouse is within the Tile
  hit() {
    return (mouseX > this.pos.x - this.SIZE / 2 &&
            mouseX < this.pos.x + this.SIZE / 2 &&
            mouseY > this.pos.y - this.SIZE / 2 &&
            mouseY < this.pos.y + this.SIZE / 2);
  }

  highlight(highlightColor) {
    push();
    emptySquare(this.pos.x, this.pos.y,
                this.SIZE, this.SIZE * 0.75,
                highlightColor);
    pop();
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
    if (this.unit) {
      this.unit.setFocussed(true);
    }
  }

}
