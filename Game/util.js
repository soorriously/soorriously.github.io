function make2DArray(rows, cols) {
  if (cols) {
    let arr = new Array(rows);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(cols);
    }
    return arr;
  }
  let arr = new Array(rows);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function city(x, y, wh) {
  rectMode(CENTER);
  rect(x, y, wh, wh);
  // imageMode(CENTER);
  // image(house, x, y, wh, wh);
}

function randomCol() {
  return color(random(255), random(255), random(255));
}
