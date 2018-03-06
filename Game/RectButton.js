class RectButton {
  constructor() {
    this.textSize = 24;
    this.activate = true;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  setFill(c) {
    this.fillCol = color(c);
  }

  setFont(font) {
    this.font = font;
  }

  setStroke(c, w) {
    this.strokeCol = color(c);
    this.strokeWeight = w;
  }

  setText(txt) {
    this.text = str(txt);
  }

  setTextCol(c) {
    this.txtCol = c;
  }

  setTextSize(s) {
    this.txtSize = s;
  }

  toggle(bool) {
    this.activated = (typeof bool === 'boolean') ? bool : !this.activated;
  }

  setSize() {
    // if (arguments.length === 1) {
    //   if (typeof arguments[0] === "number") {
    //     this.w, this.h = arguments[0];
    //   } else if (typeof arguments[0] === "string") {
    //     if (arguments[0] === "auto") {
    //       this.sizeMode = "auto";
    //     }
    //   }
    // } else if (arguments.length === 2) {
    //   this.w = arguments[0];
    //   this.h = arguments[1];
    // }
    if (typeof arguments[0] === 'number' && typeof arguments[1] === 'number') {
      this.w = arguments[0];
      this.h = arguments[1];
    } else if (typeof arguments[0] === 'string' && typeof arguments[1] === 'number') {
      this.sizeMode = "auto";
      this.sizeMultiplyer = arguments[1];
    }
  }

  show() {
    if (this.activated) {
      push();
      textAlign(CENTER, CENTER);
      textSize(this.textSize);
      if (this.font) {
        textFont(this.font);
      }
      if (this.sizeMode === "auto") {
        this.w = textWidth(this.text + this.textSize/2);
        this.h = textAscent(this.text) + textDescent(this.text) + this.textSize/4;
        this.w *= this.sizeMultiplyer;
        this.h *= this.sizeMultiplyer;
      }
      if (this.stroke) {
        stroke(this.strokeCol);
      }
      if (this.strokeWeight) {
        strokeWeight(this.strokeWeight);
      }
      if (this.hit()) {
        fill(255,127,0);
      } else {
        if (this.fillCol) {
          fill(this.fillCol);
        } else {
          fill(0);
        }
      }
      rectMode(CENTER);
      rect(this.x, this.y, this.w, this.h, 5);
      if (this.txtCol) {
        fill(this.txtCol)
      } else {
        fill(255);
      }

      text(this.text, this.x, this.y)
      pop();
    }
  }

  hit() {
    if (mouseX > this.x - this.w / 2 && mouseX < this.x + this.w / 2) {
      if (mouseY > this.y - this.h / 2 && mouseY < this.y + this.h / 2) {
        return true;
      }
      return false;
    }
    return false;
  }

  onclick(func) {
    func();
  }

}
