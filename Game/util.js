let make2DArray = (a,b = a) => {
  let arr = new Array(a).fill().map(e => new Array(b));
  return arr;
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
