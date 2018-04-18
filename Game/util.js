function make2DArray(rows, cols = rows) {
  return new Array(rows).fill().map(e => new Array(cols));
}

function city(x, y, wh) {
  // rectMode(CENTER);
  // rect(x, y, wh, wh);
  ellipseMode(CENTER);
  ellipse(x, y, wh, wh);
  // imageMode(CENTER);
  // image(house, x, y, wh, wh);
}

function randomCol() {
  return color(random(255), random(255), random(255));
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

function polygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function averageColour() {
  try {
    let r, g, b, a;
    for (let col of arguments) {
      r += red(col);
      g += green(col);
      b += blue(col);
      a = alpha(col);
    }
    p5
    r /= arguments.length;
    g /= arguments.length;
    b /= arguments.length;
    a /= arguments.length;
    return color(r,g,b,a);
  } catch (err) {
    throw new Error("This function should be passed p5.js color objects only.")
  }
}
