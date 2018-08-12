// Creates a new array of length rows then returns a new array
// where each item is an array of length cols
function make2DArray(rows, cols = rows) {
  return new Array(rows).fill().map(e => new Array(cols));
}

// Draws a regular polygon to the canvas
function polygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    vertex(x + cos(a) * radius, y + sin(a) * radius);
  }
  endShape(CLOSE);
}

// Returns the colour produced by averaging the red, green and blue values
function avgColour() {
  try {
    let r, g, b, a;
    for (let col of arguments) {
      r += red(col);
      g += green(col);
      b += blue(col);
      a += alpha(col);
    }
    r /= arguments.length;
    g /= arguments.length;
    b /= arguments.length;
    a /= arguments.length;
    return color(r,g,b,a);
  } catch (err) {
    throw new Error("This function should be passed p5.js color objects only.")
  }
}

// Returns a new p5.Color object with random red, green and blue values
function randomCol() {
  return color(random(255), random(255), random(255));
}

function village(x, y, wh) {
  // rectMode(CENTER);
  // // rect(x, y, wh, wh);
  // ellipseMode(CENTER);
  // ellipse(x, y, wh, wh);
  imageMode(CENTER);
  image(img.village, x, y, wh, wh);
}

function objToInfo(obj, _title) {
  let keys = Object.keys(obj);
  let info = {
    title: _title.toUpperCase(),
    content: {
      labels: keys.map(e => {
        if ((typeof obj[e] !== 'undefined') || (typeof obj[e] !== 'function')) {
          return e;
        }
      }).slice(0, keys.length - 1),
      data: keys.map(e => {
        if ((typeof obj[e] !== 'undefined') || (typeof obj[e] !== 'function')) {
          return obj[e];
        }
      }).slice(0, keys.length - 1)
    }
  }
  return info;
}

function emptySquare(x, y, outsideWidth, insideWidth, color) {
  w = (outsideWidth + insideWidth) / 2;
  noFill();
  stroke(color);
  rectMode(CENTER);
  strokeWeight((outsideWidth - insideWidth) / 2);
  rect(0, 0, w, w);
}

function crosshair() {
  stroke(255);
  strokeWeight(1);
  line(width / 2 - 20, height / 2, width / 2 + 20, height / 2);
  line(width / 2, height / 2 - 20, width / 2, height / 2 + 20);
}

function avg() {
  let sum = 0;
  for (let num of arguments) {
    sum += num;
  }
  return sum / arguments.length;
}

function loadingAnimation() {

}

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
