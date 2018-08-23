class Map {
  constructor(SIZE, TILE_SIZE, players) {
    this.reset(SIZE, TILE_SIZE, players);
  }

  show() {

    if (this.showTiles) {
      this.tiles.forEach(arr => {
        arr.forEach(tile => {
          tile.update(tile.mapX * tile.SIZE + this.offset.x,
                      tile.mapY * tile.SIZE + this.offset.y)
          tile.show();
        })
      });
      this.units.forEach(unit => unit.show());
      if (this.selectedUnit) {
        if (!this.selectedUnit.moved) {
          this.selectedUnit.showMoves();
        }
      }
    }

    this.turnIndicator();
  }

  pan() {
    let x = constrain(mouseX - this.mouse.x + this.pOffset.x,
                      - this.TILE_SIZE * 19 / 2,
                      width - this.TILE_SIZE / 2);
    let y = constrain(mouseY - this.mouse.y + this.pOffset.y,
                      - this.TILE_SIZE * 19 / 2,
                      height - this.TILE_SIZE / 2);
    this.offset.x = x
    this.offset.y = y
  }

  reset(SIZE, TILE_SIZE, players) {
    this.SIZE = int(SIZE);
    this.TILE_SIZE = int(TILE_SIZE);
    // Array of tiles that makes up the map
    this.tiles = make2DArray(this.SIZE);
    // FOR PANNING THROUGH THE MAP:
    // Current offset
    this.offset = createVector(0 + TILE_SIZE / 2, 0 + TILE_SIZE / 2);

    // Previous offset
    this.pOffset = createVector(0, 0);

    // Vector to store mouse position for panning
    this.mouse = createVector(mouseX, mouseY);

    // Whether or not to show the Tiles/Point
    this.showTiles = true;

    // Variables to store references to currntly the focussed
    // tile and unit
    this.selectedTile = null;
    this.selectedUnit = null;

    // Initialise the 2D array of tiles
    for (let i = 0; i < this.SIZE; i++) {
      for (let j = 0; j < this.SIZE; j++) {
        this.tiles[i][j] = new Tile(this, j, i);
        // this.tiles[i][j].col = color(126);
        this.tiles[i][j].col = color(127 / this.SIZE * j + 128,
          127 / this.SIZE * i + 128,
          127 / this.SIZE * (i + j) / 2 + 128);
      }
    }

    // Centre the map on Player 1's Village at (2, 2)
    this.centreOn(2, 2);

    // Array to contain all units in the map
    this.units = [];

    // Array containing all the players in the game
    this.players = players;
    // Set the current playeer to Player 1.
    this.playerTurn = 0;
    // Stores the current player for convenience
    this.cp = this.players[this.playerTurn];

    // The number of turns
    this.turnCount = 1;

    // Array containing all the villages on the map
    this.villages = []

    if (numPlayers >= 2) {
      this.players[0].colour = color('red');
      this.players[0].id = 0;
      this.createVillage(2, 2, this.players[0]);
      this.players[1].colour = color('magenta');
      this.players[1].id = 1;
      this.createVillage(8, 8, this.players[1]);
    }
    if (numPlayers >= 3) {
      this.players[2].colour = color('blue');
      this.players[2].id = 2;
      this.createVillage(2, 8, this.players[2]);
    }
    if (numPlayers === 4) {
      this.players[3].colour = color('green');
      this.players[3].id = 3;
      this.createVillage(8, 2, this.players[3]);
    }

  }

  toggleTiles(bool) {
    this.showTiles = (typeof bool === "boolean") ? bool : !this.showTiles;
  }

  centreOn() {
    let mx, my;
    if (typeof arguments[0] === "number" && typeof arguments[1] === "number") {
      mx = constrain(arguments[0], 0, this.SIZE - 1);
      my = constrain(arguments[1], 0, this.SIZE - 1);;
    } else if (typeof arguments[0] === "string") {
      if ((arguments[0].toLowerCase() === 'center') || (arguments[0].toLowerCase() === 'centre')) {
        mx = (this.SIZE - 1) / 2;
        my = (this.SIZE - 1) / 2;
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
    this.selectedTile = null;
    for (let arr of this.tiles) {
      for (let t of arr) {
        t.setFocussed(t.hit())
        if (t.hit()) {
          this.selectedTile = t;
          // Is a unit selected
          if (this.selectedUnit) {
            if (this.selectedUnit.canMove(t)) {
              // If the unit can move, move it
              this.selectedUnit.move(t);
              this.selectedUnit = null;
            } else if (this.selectedUnit !== t.unit && t.unit) {
              // if the unit exists and it is not the currently selected unit
              if (t.unit.player !== this.cp) {
                // if the unit's player
                if (this.selectedUnit.canHit(t.unit)) {
                  this.selectedUnit.attack(t.unit);
                }
                this.selectedUnit = null;
              } else {
                if (this.selectedUnit !== t.unit) {
                  this.selectedUnit = t.unit;
                } else {
                  this.selectedUnit = null;
                }
              }
            } else {
              this.selectedUnit = null;
            }
          } else if (t.unit) {
            if (t.unit.player === this.cp) this.selectedUnit = t.unit;
          }
        }
      }
    }

  }

  createUnit(mapX, mapY, unitType, player) {
    let u = new Unit(this, this.tiles[mapY][mapX], unitType, player)
    this.units.push(u);
    player.units.push(u);
  }

  removeUnit(unit) {
    this.units = this.units.filter(u => u !== unit);
    unit.tile.unit = null;
    unit.player.units.filter(u => u !== unit);
    unit = null;
  }

  createVillage(mx, my, player) {
    let village = {
      owner: player,
      mapPos: {
        x: mx,
        y: my
      }
    }
    this.villages.push(village);
    this.tiles[my][mx].village = village;
    player.village = village;
    // Create the player's units around their village
    this.createUnit(mx-1, my, "warrior", player);
    this.createUnit(mx+1, my, "warrior", player)
    this.createUnit(mx, my-1, "warrior", player);
    this.createUnit(mx, my+1, "warrior", player);
    this.createUnit(mx-1, my-1, "horseman", player);
    this.createUnit(mx+1, my+1, "horseman", player)
    this.createUnit(mx+1, my-1, "horseman", player);
    this.createUnit(mx-1, my+1, "horseman", player);
  }

  // Increments the playerTurn variable and if it exceeds the number of players,
  // calls nextTurn()
  nextPlayer() {
    this.playerTurn++;
    if (this.playerTurn > this.players.length - 1) [
      this.nextTurn()
    ]
    this.cp = this.players[this.playerTurn];
    let mx = this.cp.village.mapPos.x;
    let my = this.cp.village.mapPos.y;

    for (let village of this.villages) {
      if (this.cp === village.attackedBy) {
        if (this.turnCount - village.enemyStartTurn >= 1) {
          this.removePlayer(village.owner);
        }
      }
    }

  }

  // Sets up the map for the next turn and incremenst the turn counter
  nextTurn() {
    this.turnCount++;
    this.playerTurn = 0;
    this.cp = this.players[this.playerTurn]
    for (let player of this.players) {
      player.moved = false;
    }
    for (let unit of this.units) {
      unit.attacked = false;
    }
  }

  turnIndicator() {
    let txt = `Player ${this.cp.id + 1}'s turn`;
    rectMode(CORNER);
    fill(0, 50);
    noStroke();
    rect(0, 0, width, width / 20);
    textAlign(RIGHT, BOTTOM);
    textSize((width + height) / 40);
    textFont(fonts.aquatico.regular);
    fill(this.cp.colour);
    text(txt, width * 0.99, width / 20);
  }

  removePlayer(player) {
    player.units.forEach(u => this.removeUnit(u));
    let mx = player.village.mapPos.x;
    let my = player.village.mapPos.y;
    this.tiles[my][mx].village = null;
    this.villages = this.villages.filter(village => village !== player.village);
    player.village = null;
    this.players = this.players.filter(plyr => plyr !== player);
    player = null;
    if (this.players.length === 1) {
      winner = this.players[0];
      screens.current = 'gameFinished';
    }
  }
}
class RectButton {
  constructor(options) {
    this.position = {
      x: 0,
      y: 0
    }
    this.fillColour = color('white');
    this.hitColour = color('gray');
    this.stroke = true;
    this.strokeColour = color('black');
    this.strokeWeight = 1;
    this.text = 'NO TEXT';
    this.textColour = color('black');
    this.textSize = 24;
    this.onClick = [];
    this.sizeMode = "auto";
    this.sizeMultiplyer = 1;
    this.w = 50;
    this.h = 50;
    this.activated = true;
    this.selected = false;
    this.selectedColour = color('blue');
    for (let option in options) {
      this[option] = options[option];
    }
  }

  config(options) {
    for (let option in options) {
      this[option] = options[option];
    }
  }

  toggle(bool) {
    this.activated = (typeof bool === 'boolean') ? bool : !this.activated;
  }

  show() {
    push();
    translate(this.position.x, this.position.y)
    textAlign(CENTER, CENTER);
    textSize(this.textSize);
    if (this.font) textFont(this.font);
    if (this.sizeMode === "auto") {
      this.w = (textWidth(this.text) + this.textSize/2) * this.sizeMultiplyer;
      this.h = (textAscent(this.text) + textDescent(this.text) + this.textSize/4) * this.sizeMultiplyer;
    }
    if (this.stroke) {
      stroke(this.strokeColour);
      strokeWeight(this.strokeWeight);
    } else {
      noStroke();
    }
    if (!this.activated) {
      fill(darken(this.fillColour));
    } else if (this.hit()) {
      fill(255,127,0);
      scale(1.05);
    } else if (this.selected) {
      fill(this.selectedColour);
    } else {
      if (this.fillColour) fill(this.fillColour);
      else fill(0)
    }
    rectMode(CENTER);
    rect(0, 0, this.w, this.h, 5);
    if (!this.activated) fill(darken(this.textColour));
    else fill(this.textColour);
    noStroke();
    text(this.text, 0, -1 * this.textSize / 10);
    pop();
  }

  hit() {
    if (this.activated) {
      return mouseX > this.position.x - this.w / 2 &&
             mouseX < this.position.x + this.w / 2 &&
             mouseY > this.position.y - this.h / 2 &&
             mouseY < this.position.y + this.h / 2;
    }
    return false;
  }

  clicked() {
    if (this.hit() && this.activated) {
      for (let func of this.onClick) {
        if (typeof func === "function") func();
      }
    }

  }

}

class imgButton {
  constructor(options) {
    this.w = 50;
    this.h = 50;
    this.position = {
      x: 0,
      y: 0
    };
    this.img = createImage(this.w,this.h);
    this.imgBaseTint = 'white';
    this.imgHitTint = 'grey';
    this.sizeMode = 'fixed';
    this.label = null;
    this.labelFont = null;
    this.labelFontSize = 24;
    this.labelFontColour = color('white');
    this.activated = true;
    this.selected = false;
    this.onClick = [];

    for (let id in options) {
      this[id] = options[id];
    }
  }

  config(options) {
    for (let id in options) {
      this[id] = options[id];
    }
  }

  show() {
    push();
    translate(this.position.x, this.position.y);
    if (this.activated) {
      if (this.hit()) {
        tint('orange');
      } else {
        tint('blue');
      }
    } else {
      tint(darken(this.imgBaseTint));
    }
    imageMode(CENTER);
    image(this.img, 0, 0, this.w, this.h);
    if (this.label) {
      if (this.labelFont) {
        textFont(this.labelFont);
      }
      textSize(this.labelFontSize);
      textAlign(CENTER, TOP);
      fill(this.labelFontColour);
      text(this.label, 0, this.h / 2)
    }
    pop();
  }

  toggle(bool) {
    this.activated = (typeof bool === 'boolean') ? bool : !this.activated;
  }

  hit() {
    if (this.activated) {
      return mouseX > this.position.x - this.w / 2 &&
             mouseX < this.position.x + this.w / 2 &&
             mouseY > this.position.y - this.h / 2 &&
             mouseY < this.position.y + this.h / 2;
    }
    return false;
  }

  clicked() {
    if (this.hit() && this.activated) {
      for (let func of this.onClick) {
        if (typeof func === "function") func();
      }
    }
  }

}
class Player {
  constructor(id) {
    this.id = id
    this.units = []
    this.colour = null;
    this.moved = false;
    this.lost = false;
    this.village = null;
  }

  setVillage(village) {
    this.village = village;
  }
}
class Tile {
  constructor(map, mapX, mapY) {
    this.reset(map, mapX, mapY);
  }

  // Display the Tile in the canvas
  show() {
    push();
    translate(this.pos.x, this.pos.y);
    rectMode(CENTER);
    imageMode(CENTER);
    noStroke();
    strokeWeight(1);
    fill(this.col);
    rect(0, 0, this.SIZE, this.SIZE);
    if (this.village) {
      tint(this.village.owner.colour);
      image(img.village, 0, 0, this.SIZE, this.SIZE)
    };
    pop();
    if (this.hit()) {
      this.highlight(this.hitCol);
    } else if (this.hasFocus) {
      this.highlight(darken(this.hitCol));
    }
  }

  // Update the position of the Tile
  update(x, y) {
    this.pos.set(x, y);
    if (this.unit) this.unit.update();
  }

  // Checks whether the mouse is within the Tile
  hit() {
    return (mouseX > this.pos.x - this.SIZE / 2 &&
            mouseX < this.pos.x + this.SIZE / 2 &&
            mouseY > this.pos.y - this.SIZE / 2 &&
            mouseY < this.pos.y + this.SIZE / 2);
  }

  // Highlight the Tile with a certain colour
  highlight(highlightColor, iw) {
    emptySquare(this.pos.x, this.pos.y,
                this.SIZE, iw || this.SIZE * 0.75,
                highlightColor);
  }

  // Reset the Tile
  reset(map, mapX, mapY) {
    this.pos = createVector(0, 0);
    this.map = map;
    this.SIZE = this.map.TILE_SIZE;
    this.hasFocus = false;
    this.col = null;
    this.hitCol = color(0, 0, 255);
    this.unit = null;
    this.mapX = mapX;
    this.mapY = mapY;
    this.village = null;
  }

  // Set the Unit in this Tile
  setUnit(unit) {
    this.unit = unit;
  }

  // Set the focus of the Tile
  setFocussed(bool) {
    this.hasFocus = bool;
    if (this.unit) {
      this.unit.setFocussed(true);
    }
  }

}
class Unit {
  constructor(map, tile, type, player) {
    this.reset(map, tile, type, player);
  }

  reset(map, tile, type, player) {
    this.map = map;
    this.hasFocus = false;
    this.type = type;
    this.info = unitTypes[type];
    this.maxHp = this.info.health;
    this.hp = this.info.health;
    this.atk = this.info.attack;
    this.def = this.info.defence;
    this.tile = tile;
    this.mapX = this.tile.mapX;
    this.mapY = this.tile.mapY;
    this.pos = this.tile.pos;
    this.tile.setUnit(this);
    this.player = player;
    this.moved = false;
    this.attacked = false;
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    if (this === this.map.selectedUnit) tint(127, 127, 127);
    this.info.show(this.tile.SIZE / 1.5);
    fill(this.player.colour);
    textSize(this.tile.SIZE / 4);
    textAlign(LEFT, BOTTOM);
    textFont(fonts.objective.regular);
    text(`${this.hp}/${this.maxHp}`, -this.tile.SIZE * 5 / 12, +this.tile.SIZE * 5 / 12);
    pop();
  }

  update() {
    this.pos = this.tile.pos;
  }

  attack(unit) {
    let atk = this.atk * this.hp / this.maxHp;
    let def = unit.def * unit.hp / this.maxHp;
    let total = atk + def;
    let dmg = round(atk / total * this.atk * 4.5);
    unit.damage(dmg);
    this.attacked = true;
  }

  damage(dmg) {
    this.hp -= (floor(dmg)) ? floor(dmg) : 1;
    if (this.hp <= 0) {
      m.removeUnit(this);
    }
  }

  showInfo() {

  }

  move(tile) {
    if (this.player === this.map.cp) {
      if (!this.player.moved) {
        this.tile.unit = null
        this.tile = tile;
        tile.unit = this;
        this.mapX = tile.mapX;
        this.mapY = tile.mapY;
        this.hasFocus = false;
        this.pos = tile.pos;
        this.player.moved = true;
        if (tile.village) {
          if (tile.village.owner !== this.player) {
            console.log(this.map.turnCount, "s");
            tile.village.enemyStartTurn = this.map.turnCount;
            tile.village.attackedBy = this.player;
          } else {
            tile.village.enemyStartTurn = null;
            tile.village.attackedBy = null;
          }
        }
      }
    }
  }

  canMove(tile) {
    if (abs(tile.mapX - this.mapX) <= this.info.movement &&
        abs(tile.mapY - this.mapY) <= this.info.movement) {
      if (tile.unit) {
        return false;
      }
      return true;
    }
    return false;
  }

  canHit(unit) {
    if (abs(unit.mapX - this.mapX) <= this.info.range &&
        abs(unit.mapY - this.mapY) <= this.info.movement) {
      if (unit.player !== this.player) {
        return true;
      }
      return false
    }
    return false;
  }

  showMoves() {
    if (this.map.cp === this.player) {
      for (let i = this.mapX - this.info.movement;
           i <= this.mapX + this.info.movement; i++) {
        if (i >= 0 && i < this.map.SIZE) {
          for (let j = this.mapY - this.info.movement;
               j <= this.mapY + this.info.movement; j++) {
            if (j >= 0 && j < this.map.SIZE) {
              if (!(j === this.mapY && i === this.mapX)) {
                let tile = this.map.tiles[j][i];
                if (tile.unit) {
                  if (this.canHit(tile.unit) && !this.attacked) {
                    tile.highlight(color('red'), tile.SIZE * 0.9375);
                  }
                } else if (!this.player.moved) {
                  tile.highlight(color('green'), tile.SIZE * 0.9375);
                }
              }
            }
          }
        }
      }
    }
  }

  setFocussed(bool) {
    this.hasFocus = bool;
  }
}

let unitTypes = {
  "warrior": {
    attack: 2,
    defence: 2,
    health: 15,
    movement: 1,
    range: 1,
    show(wh) {
      imageMode(CENTER);
      image(img.warrior, 0, 0, wh, wh);
    },
  },
  "horseman": {
    attack: 2,
    defence: 1,
    health: 10,
    movement: 2,
    range: 1,
    show(wh) {
      imageMode(CENTER);
      image(img.horseman, 0, 0, wh, wh);
    }
  }
}
// Creates a new array of length rows then returns a new array
// where each item is an array of length cols
function make2DArray(rows, cols = rows) {
  return new Array(rows).fill().map(e => new Array(cols));
}

// Draws the outline of a square to the canvas with a given inner width and
// outer width
function emptySquare(x, y, outsideWidth, insideWidth, color) {
  push();
  w = (outsideWidth + insideWidth) / 2;
  noFill();
  stroke(color);
  rectMode(CENTER);
  strokeWeight((outsideWidth - insideWidth) / 2);
  rect(x, y, w, w);
  pop();
}


// Checks whether text is wider than a specified width
// and returns either the height of the text or the
// given width
function textWider(text, font, fontSize, w) {
  let rtn;
  push();
  textFont(font);
  textSize(fontSize);
  if (w < textWidth(text) + fontSize / 2) {
    rtn = textWidth(text) + fontSize / 2;
  } else {
    rtn = w;
  }
  pop();
  return rtn;
}

// Checks whether text is taller than a specified height
// and returns either the height of the text or the
// given height
function textTaller(text, font, fontSize, h) {
  let rtn;
  push();
  textFont(font);
  textSize(fontSize);
  let textHeight = textAscent(text) + textDescent(text)
  if (h < textHeight) {
    rtn = textHeight;
  } else {
    rtn = h;
  }
  pop();
  return rtn;
}

// Accepts a p5.Color object and return a new p5.Color
// with halved red, green and blue values
function darken(col) {
  col = color(col);
  return color(red(col) / 2, green(col) / 2, blue(col) / 2);
}


// Map variable
let m;

// variable is true when the mouse is being dragged
let dragging = false;

// JavaScript object containing all fonts, images and sounds used
let fonts = {
  aquatico: {
    regular: null,
  }
};
let img = {
  logo: null,
  bg: null,
  menuBtn: null,
  warrior: null,
  horseman: null,
  village: null
}
let sounds = {
  bgMusic: null
}

// The number of players in the game
let numPlayers = 4;

// the winner of the game
let winner = null;

// Called once before the canvas loads
function preload() {
  // loads all assets
  for (let font in fonts) {
    for (let style in fonts[font]) {
      fonts[font][style] = loadFont(`/Fonts/${font}-${style}.otf`)
    }
  }
  for (let image in img) {
    img[image] = loadImage(`Images/${image}.png`);
  }
  for (let sound in sounds) {
    sounds[sound] = loadSound(`sounds/${sound}.mp3`);
  }
}

// Called once after the page is loaded
function setup() {
  // Create the canvas to fill the window
  cnv = createCanvas(windowWidth, windowHeight);
  // Set maximum framerate to 120 fps
  frameRate(120);
  // Set the current screen to the main menu
  screens.current = 'MainMenu';

  // Start playing the background music
  sounds.bgMusic.loop();
}

// Continous loop
function draw() {
  background(0);
  screens.showCurrent();
}

// Function called when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  screens.currentScreen.resizeElt();
}

// Function called when the mouse is pressed
function mousePressed() {
  // Only pan the map if it exists
  if (m) {
    m.mouse = createVector(mouseX, mouseY);
    m.pOffset.set(m.offset);
  }
}

// Function called if the mouse is pressed and is moving
function mouseDragged() {
  dragging = true;
  if (m) m.pan();
}

// Function called if the mouse is released after being pressed
function mouseClicked() {
  screens.onClick();
  if (!dragging) {
    if (m) m.checkFocus();
  }
  dragging = false;
}

// FOR DEBUGGING PURPOSES
function keyPressed() {
  if (keyCode === ESCAPE) noLoop();
  if (keyCode === ENTER) loop();
}
