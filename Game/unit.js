class Unit {
  constructor(map, tile, type) {
    this.reset(map, tile, type);
  }

  reset(map, tile, type) {
    // this.player = player;
    this.map = map;
    this.hasFocus = false;
    this.type = type;
    this.info = unitTypes[type]
    this.tile = tile;
    this.mapX = this.tile.mapX;
    this.mapY = this.tile.mapY;
    this.tile.setUnit(this);
  }

  show() {
    if (this.hasFocus) {
      fill(0);
      this.showMovement();
    } else {
      fill(255);
    }
    if (this.type === 'horseman') {
      this.info.show(this.tile.SIZE)
    } else {
      this.info.show(this.tile.SIZE / 1.5);
    }
  }

  attack(unit) {

  }

  showInfo() {

  }

  move(tile) {
    this.tile.unit = null
    this.tile = tile;
    tile.unit = this;
    this.mapX = this.tile.mapX;
    this.mapY = this.tile.mapY;
    this.hasFocus = false;
  }

  showMovement() {
    if (this.hasFocus) {
      for (let i = -this.info.movement; i <= this.info.movement; i++) {
        for (let j = -this.info.movement; j <= this.info.movement; j++) {
          if (!(i == 0 && j == 0)) {
            try {
              let tile = this.map.tiles[this.mapY-j][this.mapX-i];
              tile.highlight(color('green'));
              if (tile.hit() && mouseIsPressed) {
                this.move(tile);
              }
            } catch(err) {
              // DO NOTHING
            }
          }
        }
      }
    }
  }

  setFocussed(bool) {
    this.hasFocus = bool;
  }

  resetPos(map, tile) {

  }

}

let unitTypes = {
  "warrior": {
    attack: 2,
    defense: 2,
    health: 10,
    movement: 2,
    abilities: ['none'],
    show(wh, col) {
      imageMode(CENTER);
      rectMode(CENTER);
      if (col) fill(col);
      rect(0, 0, wh, wh);
      image(img.warrior, 0, 0, wh, wh);
    },
  },
  "horseman": {
    attack: 2,
    defense: 1,
    health: 10,
    movement: 2,
    abilities: ['none', 'none2', '\nnone'],
    show(wh) {
      village(0, 0, wh);
    }
  },
  "potato": {
    attack:999,
    defense:999,
    health:999,
    movement:10,
    abilities: ['potato'],
    show(wh) {
      polygon(0,0,wh/2,3);
      fill(255,0,0);
      ellipse(0,0, wh - 10, wh - 10);
    }
  }
}
