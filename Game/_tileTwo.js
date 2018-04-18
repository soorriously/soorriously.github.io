class TileTwo {
  constructor(map, mapX, mapY) {
    this.map = map;
    this.mapX = mapX;
    this.mapY = mapY;

    this.SIZE = map.TILE_SIZE;

    this.pos = createVector(0,0);

    this.col = randomCol();
    
  }
}
