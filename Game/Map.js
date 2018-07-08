class Map {
  constructor(SIZE, TILE_SIZE) {
    this.reset(SIZE, TILE_SIZE);
  }

  show() {
    if (this.showTiles) {
      // OLD CODE
      // for (let i = 0; i < this.SIZE; i++) {
      //   for (let j = 0; j < this.SIZE; j++) {
      //     this.tiles[i][j].show(j * this.TILE_SIZE + this.offset.x, i * this.TILE_SIZE + this.offset.y);
      //     // this.tiles[i][j].show(this.offset.x, this.offset.y);
      //
      //     // let f = max(0, noise(0.1 * i, 0.1 * j) - 0.5);
      //     // let c = this.tiles[i][j].col;
      //     // fill(c);
      //     // noStroke();
      //     // this.tiles[i][j].show(i * this.TILE_SIZE + this.offset.x + this.initOffset.x, j * this.TILE_SIZE - 200 * f + this.offset.y + this.initOffset.y, this.TILE_SIZE);
      //     // fill(red(c) / 2, green(c) / 2, blue(c) / 2);
      //     // rect(i * this.TILE_SIZE, (j + 1) * this.TILE_SIZE - 200 * f, this.TILE_SIZE, this.TILE_SIZE + 200 * f);
      //   }
      // }
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
    // if (this.selectedTile) this.selectedTile.highlight("focus");
  }

  pan() {
    this.offset.x = mouseX - this.mouse.x + this.pOffset.x
    //this.offset.x = constrain(this.offset.x, - width / 2, width / 2);
    this.offset.y = mouseY - this.mouse.y + this.pOffset.y
    //this.offset.y = constrain(this.offset.y, -height / 2, height / 2);
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

    // this.initOffset = createVector(0, 0);
    // this.initOffset.set(this.offset);

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
  }

  toggleTiles(bool) {
    // Legacy Code
    // if (typeof bool === "boolean") return this.showTiles = bool;
    // return this.showTiles = !this.showTiles;
    this.showTiles = (typeof bool === "boolean") ? bool : !this.showTiles;
  }

  centreOn() {
    let mx, my;
    if (typeof arguments[0] === "number" && typeof arguments[1] ==="number") {
      mx = arguments[0];
      my = arguments[1];
    } else if (typeof arguments[0] === "string") {
      if ((arguments[0].toLowerCase() === CENTER) || (arguments[0].toLowerCase() === 'centre')) {
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
            console.log(1);
            this.selectedTile = t;
            t.setFocussed(true);
            console.log(m.selectedTile);
            if (t.unit) this.selectedUnit = t.unit;
          }
        }
      }
    }
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
