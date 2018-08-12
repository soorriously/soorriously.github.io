class Map {
  constructor(SIZE, TILE_SIZE) {
    this.reset(SIZE, TILE_SIZE);
  }

  show() {
    if (this.showTiles) {
      for (let arr of this.tiles) {
        for (let tile of arr) {
          tile.update(tile.mapX * tile.SIZE + this.offset.x,
                      tile.mapY * tile.SIZE + this.offset.y)
          tile.show();
        }
      }
    }
  }

  update() {

  }

  pan() {
    this.offset.x = mouseX - this.mouse.x + this.pOffset.x
    this.offset.y = mouseY - this.mouse.y + this.pOffset.y
  }

  reset(SIZE, TILE_SIZE) {
    this.SIZE = int(SIZE);
    this.TILE_SIZE = int(TILE_SIZE);
    // Array of tiles that makes up the map
    this.tiles = make2DArray(this.SIZE);
    //Array of points that are placed at the corner of each Tile
    this.points = make2DArray(this.SIZE + 1);
    // FOR PANNING THROUGH THE MAP:
    // Current offset
    this.offset = createVector(0 + TILE_SIZE / 2, 0 + TILE_SIZE / 2);

    // Previous offset
    this.pOffset = createVector(0, 0);


    // vector to store mouse position for panning
    this.mouse = createVector(mouseX, mouseY);

    // Whether or not to show the Tiles/Point
    this.showTiles = true;
    // this.showPoints = true;

    this.selectedTile = null;
    this.selectedUnit = null;

    for (let i = 0; i < this.SIZE; i++) {
      for (let j = 0; j < this.SIZE; j++) {
        this.tiles[i][j] = new Tile(this, j, i);
        // this.tiles[i][j].col = color(126);
        this.tiles[i][j].col = color(127 / this.SIZE * j + 128,
                                     127 / this.SIZE * i + 128,
                                     127 / this.SIZE * (i + j) / 2 + 128);
      }
    }
    this.centreOn(CENTER);
    this.units = [];
  }

  toggleTiles(bool) {
    this.showTiles = (typeof bool === "boolean") ? bool : !this.showTiles;
  }

  centreOn() {
    let mx, my;
    if (typeof arguments[0] === "number" && typeof arguments[1] ==="number") {
      mx = constrain(arguments[0], 0, this.SIZE - 1);
      my = constrain(arguments[1], 0, this.SIZE - 1);;
    } else if (typeof arguments[0] === "string") {
      if ((arguments[0].toLowerCase() === 'center') || (arguments[0].toLowerCase() === 'centre')) {
        mx = (this.SIZE-1) / 2;
        my = (this.SIZE-1) / 2;
      }
    } else {
      throw new Error("Unexpected Input");
    }
    let x, y;
    x = width / 2 - this.TILE_SIZE * constrain(mx, 0, this.SIZE - 1);
    y = height / 2 - this.TILE_SIZE * constrain(my, 0, this.SIZE - 1);
    this.offset.set(createVector(x, y));
  }

  showOffsets() {
    console.log("offset: " + this.offset);
  }

  checkFocus() {
    for (let arr of this.tiles) {
      for (let t of arr) {
        if (!dragging) {
          t.setFocussed(false);
          if (t.hit()) {
            this.selectedTile = t;
            t.setFocussed(true);
            if (t.unit) {
              this.selectedUnit = t.unit;
              t.unit.setFocussed(true);
            }
          }
        }
      }
    }
  }

  createUnit(mapX, mapY, unitType, player) {
    this.units.push(new Unit(this, this.tiles[mapY][mapX], unitType));
  }
}

/* HELPFUL STUFF
To cycle through each tile
for (let i = 0; i < this.rows; i++) {
  for (let j = 0; j < this.cols; j++) {

  }
}

Using enhanced For loop
for (let arr of this.tiles) {
  for (let t of arr) {

  }
}
*/
