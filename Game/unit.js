class Unit {
  constructor(map, tile, type) {
    // this.player = player;
    this.map = map;
    this.hasFocus = false;
    this.type = type;
    this.info = unitTypes[type]
    this.tile = tile;
    this.mapX = this.tile.mapX;
    this.mapY = this.tile.mapY;
    print(this.mapX);
    print(this.mapY);

    this.tile.setUnit(this);
    // player.units.push(this);
  }

  show() {
    if (this.hasFocus) {
      fill(0);
      this.showMovement();
    } else {
      fill(255);
    }
    this.info.show(this.tile.SIZE / 4);
  }

  attack(unit) {

  }

  showInfo() {

  }

  showMovement() {
    if (this.hasFocus) {
      for (let i = -this.info.movement; i <= this.info.movement; i++) {
        for (let j = -this.info.movement; j <= this.info.movement; j++) {
          if (!(i == 0 && j == 0)) {
            try {
              let tile = this.map.tiles[this.mapY-j][this.mapX-i];
              this.map.tiles[this.mapY-j][this.mapX-i].highlight();
            } catch(err) {
              // DO NOTHING
            }
          }
        }
      }
    }
  }

  setFocus(bool) {
    this.hasFocus = bool;
  }

}

const unitTypes = {
  "warrior": {
    attack: 2,
    defense: 2,
    health: 10,
    movement: 2,
    abilities: [],
    show(wh) {
      rect(0, 0, wh, wh, 5);
    },
  }
}
