class Unit {
  constructor(player, map, mapPos, type) {
    this.player = player;
    this.map = map;
    this.hasFocus = false;
    this.type = type;
    this.stats = unitTypes[type]
    // player.units.push(this);
  }

  attack(unit) {

  }

  showMovement() {
    if (this.hasFocus) {

    }
  }

}

const unitTypes = {
  "warrior": {
    attack: 2
    defense: 2
  }
}
