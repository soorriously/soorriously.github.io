// let b;
// let i;
//
//
//
//
// function setup() {
//   createCanvas(windowWidth, windowHeight, P2D);
// }
//
// function draw() {
//   background(0);
// }
//
// function mouseClicked() {
//
// }
//
// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
var cwidth = 800; //canvas width
var cheight = 800; //canvas width
var ycount = 0; //y position used to determine placements
var xcount = 0; //x position used to determine placements

var playerturn = 1; //determines player turn
var gameover = 0; //determine if it's gameover and the winner
var startscreen; //determines to play the title/start screen

var space = []; //Arrays of the tiles/pieces
var selected = false; //determines yellow stroke for selected piece
var VIP; //the VIP piece (selected piece/piece performing an action)



function setup() {
  var cnv = createCanvas(cwidth, cheight);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  spawntiles(1); //Create all pieces and tiles
  startscreen = false;


}

function draw() {
  background(255);

  if (startscreen) titlescreen();
  if (!startscreen) drawtiles(); //Refresh piece positions
  if (gameover != 0) gameoverscreen();

}

//Object class for the tiles and player pieces
function tile(thisx, thisy, color, player) {
  this.x = thisx; //x position
  this.y = thisy; //y position
  this.color = color; //the FILL color of the piece that determines its attributes
  this.player = player; //player that the selected piece belongs to (white is NEUTRAL and cannot be controlled by either players)
  this.width = cwidth / 10 - 4; //width of the piece (with slight adjustments for the stroke)
  this.height = cheight / 10 - 4; //height of the piece (with slight adjustments for the stroke)
  //Use to determine RGB value of the stroke to differentiate Player 1 and Player 2 pieces.
  var redval = 0;
  var blueval = 0;
  var greenval = 0;
  //Stroke Value to highlight enemy/friendly pieces.
  if (this.player == 1) {
    redval = 0;
    greenval = 0;
    blueval = 200;
  } else if (this.player == 2) {
    redval = 200;
    greenval = 0;
    blueval = 0;
  }
  //check if mouse clicked on tile
  this.click = function() {
    if (mouseX > this.x && mouseX < this.x + 80 && mouseY > this.y && mouseY < this.y + 80) return true;
  }
  //Drawing the tiles
  this.draw = function() {
    push();
    stroke(redval, greenval, blueval);
    strokeWeight(4);
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }
  //Give yellow stroke on tile that is selected.
  this.selected = function() {
    redval = 255;
    greenval = 255;
    blueval = 0;
    selected = true;
  }
  //Remove yellow stroke when clicked again
  this.deselected = function() {
    if (this.player == 1) {
      redval = 0;
      greenval = 0;
      blueval = 200;
    } else if (this.player == 2) {
      redval = 200;
      greenval = 0;
      blueval = 0;
    } else {
      redval = 0;
      greenval = 0;
      blueval = 0;
    }
  }
}

//MOUSE CLICKED
function mouseClicked() {

  //change stroke on mouse click
  if (!selected && gameover == 0) {
    for (var i = 0; i < space.length - 1; i++) {
      if (space[i].click()) {
        space[i].selected();
        VIP = i;
        console.log(space[i].x + " " + space[i].y + " VIP " + VIP + " COLOR " + space[i].color + " PLAYER " + space[i].player);
      }
    }
  } else if (selected && gameover == 0) {

    //THE GUTS OF THE GAME MECHANICS: Checks the piece's next move and performs the outcome based on the game rules
    var tmpx;
    var tmpy;

    if (space[VIP].player == 1 && playerturn == 1) { //if selected piece is player 1 AND it's player 1's turn
      for (var i = 0; i < space.length - 1; i++) {
        if (mouseX > space[VIP].x + 80 && mouseX < space[VIP].x + 160 && mouseY > space[VIP].y + 80 && mouseY < space[VIP].y + 160) { //checks if box is clicked
          for (var i = 0; i < space.length - 1; i++) { //checks the space array if there is a piece with the exact same coordinates
            if (space[VIP].x + 80 == space[i].x && space[VIP].y + 80 == space[i].y) {
              if (space[i].player == 2 || space[i].player == 0) {
                rgbcheck(i);
                i = space.length;
                if (space[VIP].x == 720) gameover = 1; //if pieces lands on enemy's board end, player wins
              }
            }
          }
        }
        if (mouseX > space[VIP].x + 80 && mouseX < space[VIP].x + 160 && mouseY > space[VIP].y && mouseY < space[VIP].y + 80) {
          for (var i = 0; i < space.length - 1; i++) {
            if (space[VIP].x + 80 == space[i].x && space[VIP].y == space[i].y) {
              if (space[i].player == 2 || space[i].player == 0) {
                rgbcheck(i);
                i = space.length;
                if (space[VIP].x == 720) gameover = 1; //if pieces lands on enemy's board end, player wins
              }
            }
          }
        }
        if (mouseX > space[VIP].x + 80 && mouseX < space[VIP].x + 160 && mouseY > space[VIP].y - 80 && mouseY < space[VIP].y) {
          for (var i = 0; i < space.length - 1; i++) {
            if (space[VIP].x + 80 == space[i].x && space[VIP].y - 80 == space[i].y) {
              if (space[i].player == 2 || space[i].player == 0) {
                rgbcheck(i);
                i = space.length;
                if (space[VIP].x == 720) gameover = 1; //if pieces lands on enemy's board end, player wins
              }
            }
          }
        }
      }

    }

    if (space[VIP].player == 2 && playerturn == 2) { //if selected piece is player 1 AND it's player 1's turn
      for (var i = 0; i < space.length - 1; i++) {
        if (mouseX > space[VIP].x - 80 && mouseX < space[VIP].x && mouseY > space[VIP].y + 80 && mouseY < space[VIP].y + 160) {
          for (var i = 0; i < space.length - 1; i++) {
            if (space[VIP].x - 80 == space[i].x && space[VIP].y + 80 == space[i].y) {
              if (space[i].player == 1 || space[i].player == 0) {
                rgbcheck(i);
                i = space.length;
                if (space[VIP].x == 0) gameover = 2; //if pieces lands on enemy's board end, player wins
              }
            }
          }
        }
        if (mouseX > space[VIP].x - 80 && mouseX < space[VIP].x && mouseY > space[VIP].y && mouseY < space[VIP].y + 80) {
          for (var i = 0; i < space.length - 1; i++) {
            if (space[VIP].x - 80 == space[i].x && space[VIP].y == space[i].y) {
              if (space[i].player == 1 || space[i].player == 0) {
                rgbcheck(i);
                i = space.length;
                if (space[VIP].x == 0) gameover = 2; //if pieces lands on enemy's board end, player wins
              }
            }
          }
        }
        if (mouseX > space[VIP].x - 80 && mouseX < space[VIP].x && mouseY > space[VIP].y - 80 && mouseY < space[VIP].y) {
          for (var i = 0; i < space.length - 1; i++) {
            if (space[VIP].x - 80 == space[i].x && space[VIP].y - 80 == space[i].y) {
              if (space[i].player == 1 || space[i].player == 0) {
                rgbcheck(i);
                i = space.length;
                if (space[VIP].x == 0) gameover = 2; //if pieces lands on enemy's board end, player wins
              }
            }
          }
        }
      }

    }
    space[VIP].deselected();
    selected = false;
  }

}

function spawntiles(player) {
  //spawn tiles based on X Y positioning
  var playerid = player;
  var colorval;
  var colorname;
  if (playerid == 1) {
    colorval = 1;
    while (xcount <= 800 && ycount <= 800) {
      if (ycount == 800) {
        xcount += 80;
        ycount = 0;
      }
      //SPAWN PLAYER 1 PIECES
      if (xcount == 0) {
        if (colorval == 1) colorname = 'red';
        if (colorval == 2) colorname = 'green';
        if (colorval == 3) {
          colorname = 'blue';
          colorval = 0;
        }
        space.push(new tile(xcount, ycount, colorname, 1));
        colorval++;
      } else if (xcount == 160) {
        if (colorval == 1) colorname = 'red';
        if (colorval == 2) colorname = 'green';
        if (colorval == 3) {
          colorname = 'blue';
          colorval = 0;
        }
        console.log("drawing " + colorname + " at " + xcount + " " + ycount);
        space.push(new tile(xcount, ycount, colorname, 1));
        colorval++;
      }
      //SPAWN PLAYER 2 PIECES
      else if (xcount == 560) {
        if (xcount == 560 && ycount == 0) colorval = 2;

        if (colorval == 1) colorname = 'red';
        if (colorval == 2) colorname = 'green';
        if (colorval == 3) {
          colorname = 'blue';
          colorval = 0;
        }
        console.log("drawing " + colorname + " at " + xcount + " " + ycount);
        space.push(new tile(xcount, ycount, colorname, 2));
        colorval++;
      } else if (xcount == 720) {
        if (xcount == 720 && ycount == 0) colorval = 1;
        if (colorval == 1) colorname = 'red';
        if (colorval == 2) colorname = 'green';
        if (colorval == 3) {
          colorname = 'blue';
          colorval = 0;
        }
        console.log("drawing " + colorname + " at " + xcount + " " + ycount);
        space.push(new tile(xcount, ycount, colorname, 2));
        colorval++;
      } else { //SPAWN ALL THE WHITE TILES (neutral pieces)
        space.push(new tile(xcount, ycount, 'white', 0));
      }
      ycount += 80;
    }
  }
}

function drawtiles() {
  for (var i = 0; i < space.length - 1; i++) {
    space[i].draw(false);
  }
}

function rgbcheck(i) {

  var tmp1;
  var tmp2;
  var endturn = false; //placeholder variable that prevents the last 'IF' statement to trigger
  //Checks what the next tile is. If it is an enemy piece, perform outcome as necessary
  if (space[VIP].color == 'red') {
    if (space[i].color == 'green') {
      tmp1 = space[VIP].x;
      tmp2 = space[VIP].y;

      space[VIP].x = space[i].x;
      space[VIP].y = space[i].y;

      console.log("X " + space[VIP].x + " Y " + space[VIP].y);
      space[i].x = tmp1;
      space[i].y = tmp2;
      space[i].player = 0;
      space[i].color = 'white';
      if (playerturn == 1) playerturn = 2;
      else playerturn = 1;
      endturn = true;

      console.log("X " + space[VIP].x + " Y " + space[VIP].y);
    }

    if (space[i].color == 'blue') {
      space[VIP].color = 'white';
      space[VIP].player = 0;
      if (playerturn == 1) playerturn = 2;
      else playerturn = 1;
      endturn = true;

    }
  }
  if (space[VIP].color == 'green') {
    if (space[i].color == 'blue') {
      tmp1 = space[VIP].x;
      tmp2 = space[VIP].y;
      space[VIP].x = space[i].x;
      space[VIP].y = space[i].y;
      space[i].x = tmp1;
      space[i].y = tmp2;
      space[i].player = 0;
      space[i].color = 'white';
      if (playerturn == 1) playerturn = 2;
      else playerturn = 1;
      endturn = true;

    }

    if (space[i].color == 'red') {
      space[VIP].color = 'white';
      space[VIP].player = 0;
      if (playerturn == 1) playerturn = 2;
      else playerturn = 1;
      endturn = true;

    }
  }
  if (space[VIP].color == 'blue') {
    if (space[i].color == 'red') {
      tmp1 = space[VIP].x;
      tmp2 = space[VIP].y;
      space[VIP].x = space[i].x;
      space[VIP].y = space[i].y;
      space[i].x = tmp1;
      space[i].y = tmp2;
      space[i].player = 0;
      space[i].color = 'white';
      if (playerturn == 1) playerturn = 2;
      else playerturn = 1;
      endturn = true;

    }

    if (space[i].color == 'green') {
      space[VIP].color = 'white';
      space[VIP].player = 0;
      if (playerturn == 1) playerturn = 2;
      else playerturn = 1;
      endturn = true;

    }
  }

  if (space[i].color == 'white' && endturn == false) {
    tmp1 = space[VIP].x;
    tmp2 = space[VIP].y;
    space[VIP].x = space[i].x;
    space[VIP].y = space[i].y;
    space[i].x = tmp1;
    space[i].y = tmp2;
    space[i].player = 0;
    space[i].color = 'white';
    if (playerturn == 1) playerturn = 2;
    else playerturn = 1;

  }

}

//displays the winner of the game in the center of the screen
function gameoverscreen() {

  push();
  fill(0);
  stroke(255, 255, 0);
  strokeWeight(6);
  textAlign(CENTER, CENTER);
  textSize(60);
  text("Player " + gameover + " Wins!", width / 2, height / 2);

  textSize(32);
  text("Press Any Key to Return to title", width / 2, height - 30);
  pop();


}

//draw the title screen
function titlescreen() {
  var num = int(random(1, 3));
  var strokecolor;

  if (num == 1) strokecolor = 'red';
  if (num == 2) strokecolor = 'green';
  if (num == 3) strokecolor = 'blue';

  background(0);
  push();
  textAlign(CENTER, CENTER);
  textSize(60);
  fill(255);
  strokeWeight(4);
  stroke(strokecolor);
  text("RGB CHESS!", width / 2, height / 2);

  textSize(32);
  text("Press Any Key to Start", width / 2, height - 50);
  pop();

}

function keyPressed() {

  if (gameover != 0) {
    gameover = 0;
    startscreen = true;
  } else if (startscreen) {
    startscreen = false;
  }
}
