function make2DArray(rows, cols) {
  if (rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows);
    }
    return arr;
  }
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(cols);
  }
  return arr;
}

function city(x, y, wh) {
  // rectMode(CENTER);
  // rect(x, y, wh, wh);
  imageMode(CENTER);
  image(house, x, y, wh, wh);
}
