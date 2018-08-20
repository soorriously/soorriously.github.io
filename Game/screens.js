let screens = {
  currentScreen: null,
  set current(scrn) {
    if (this.currentScreen) this.currentScreen.clear();
    this.currentScreen = this[scrn];
    this.currentScreen.init();
  },
  showCurrent() {
    this.currentScreen.show();
  },
  onClick() {
    for (let id in this.currentScreen.buttons) {
      if (this.currentScreen.buttons[id]) this.currentScreen.buttons[id].clicked();
    }
  },
  MainMenu: {
    buttons: {
      start: null,
      help: null,
      settings: null
    },
    clear() {
      for (let id in this.buttons) {
        this.buttons[id] = null;
      }
    },
    init() {
      this.buttons.start = new RectButton({
        position: {
          x: width / 2,
          y: 9 * height / 16
        },
        w: textWider('MAIN MENU', fonts.aquatico.regular, (width + height) / 30, width / 4),
        h: textTaller('MAIN MENU', fonts.aquatico.regular, (width + height) / 30, height / 10),
        sizeMode: 'fixed',
        fillColour: color('blue'),
        hitColour: color('orange'),
        stroke: false,
        text: "START",
        textColour: color('white'),
        textSize: (width + height) / 40,
        font: fonts.aquatico.regular,
        onClick: [
          function() {
            screens.current = 'GameSetup';
          }
        ],
        activated: true
      });
      this.buttons.help = new RectButton({
        position: {
          x: width / 2,
          y: 11 * height / 16
        },
        w: textWider('MAIN MENU', fonts.aquatico.regular, (width + height) / 30, width / 4),
        h: textTaller('MAIN MENU', fonts.aquatico.regular, (width + height) / 30, height / 10),
        sizeMode: 'fixed',
        fillColour: color('blue'),
        hitColour: color('orange'),
        stroke: false,
        text: "HELP",
        textColour: color('white'),
        textSize: (width + height) / 40,
        font: fonts.aquatico.regular,
        onClick: [
          function() {
            screens.current = 'Help';
          }
        ],
        activated: true
      });
      this.buttons.settings = new RectButton({
        position: {
          x: width / 2,
          y: 13 * height / 16
        },
        w: textWider('MAIN MENU', fonts.aquatico.regular, (width + height) / 30, width / 4),
        h: textTaller('MAIN MENU', fonts.aquatico.regular, (width + height) / 30, height / 10),
        sizeMode: 'fixed',
        fillColour: color('blue'),
        hitColour: color('orange'),
        stroke: false,
        text: "SETTINGS",
        textColour: color('white'),
        textSize: (width + height) / 40,
        font: fonts.aquatico.regular,
        onClick: [
          function() {
            screens.current = 'Settings';
          }
        ],
        activated: true
      });
    },
    show() {
      background(255);
      imageMode(CENTER);
      image(bg, width / 2, height / 2, width, height);
      let logow = width / 1.5 + 50 * sin(frameCount / 30);
      let logoh = logow * logo.height / logo.width;
      image(logo, width / 2, height / 4, logow, logoh);
      for (let id in this.buttons) {
        this.buttons[id].show();
      }
    },
    resizeElt() {
      this.buttons.start.config({
        position: {
          x: width / 2,
          y: 9 * height / 16
        },
        w: textWider('MAIN MENU', fonts.aquatico.regular, (width + height) / 30, width / 4),
        h: textTaller('MAIN MENU', fonts.aquatico.regular, (width + height) / 30, height / 10),
        textSize: (width + height) / 40
      });
      this.buttons.help.config({
        position: {
          x: width / 2,
          y: 11 * height / 16
        },
        w: textWider('MAIN MENU', fonts.aquatico.regular, (width + height) / 30, width / 4),
        h: textTaller('MAIN MENU', fonts.aquatico.regular, (width + height) / 30, height / 10),
        textSize: (width + height) / 40
      });
      this.buttons.settings.config({
        position: {
          x: width / 2,
          y: 13 * height / 16
        },
        w: textWider('MAIN MENU', fonts.aquatico.regular, (width + height) / 30, width / 4),
        h: textTaller('MAIN MENU', fonts.aquatico.regular, (width + height) / 30, height / 10),
        textSize: (width + height) / 40
      });
    }
  },
  GameSetup: {
    buttons: {
      start: null,
      mainmenu: null,
      playerSelect: null
    },
    clear() {
      for (let id in this.buttons) {
        this.buttons[id] = null;
      }
    },
    init() {
      this.buttons.start = new RectButton({
        position: {
          x: width / 2,
          y: 12 * height / 16
        },
        w: textWider('MAIN MENU', fonts.aquatico.regular, (width + height) / 30, width / 4),
        h: textTaller('MAIN MENU', fonts.aquatico.regular, (width + height) / 30, height / 10),
        sizeMode: 'fixed',
        fillColour: color('blue'),
        hitColour: color('orange'),
        stroke: false,
        text: "START",
        textColour: color('white'),
        textSize: (width + height) / 40,
        font: fonts.aquatico.regular,
        onClick: [
          function() {
            // screens.current = 'Game';
          }
        ],
        activated: true
      });
      this.buttons.mainmenu = new RectButton({
        position: {
          x: width / 2,
          y: 14 * height / 16
        },
        w: textWider('MAIN MENU', fonts.aquatico.regular, (width + height) / 30, width / 4),
        h: textTaller('MAIN MENU', fonts.aquatico.regular, (width + height) / 30, height / 10),
        sizeMode: 'fixed',
        fillColour: color('blue'),
        hitColour: color('orange'),
        stroke: false,
        text: "MAIN MENU",
        textColour: color('white'),
        textSize: (width + height ) / 40,
        font: fonts.aquatico.regular,
        onClick: [
          function() {
            screens.current = 'MainMenu';
          }
        ],
        activated: true
      });
      this.buttons.playerSelect = {
        opt2: new RectButton({
          sizeMode: 'fixed',
          fillColour: color('blue'),
          hitColour: color('orange'),
          selectedColour: color('darkorange'),
          w: width / 10,
          h: width / 10,
          position: {
            x: width / 2 - width / 10 * 1.1,
            y: height / 2
          },
          stroke: false,
          text: '2',
          textSize: width / 20,
          textColour: color('white'),
          font: fonts.aquatico.regular,
          onClick: [
            function() {
              screens.currentScreen.buttons.playerSelect.opt2.selected = true;
              screens.currentScreen.buttons.playerSelect.opt3.selected = false;
              screens.currentScreen.buttons.playerSelect.opt4.selected = false;
            }
          ]
        }),
        opt3: new RectButton({
          position: {
            x: width / 2,
            y: height / 2
          },
          sizeMode: 'fixed',
          fillColour: color('blue'),
          hitColour: color('orange'),
          selectedColour: color('darkorange'),
          w: width / 10,
          h: width / 10,
          stroke: false,
          text: '3',
          textSize: width / 20,
          textColour: color('white'),
          font: fonts.aquatico.regular,
          onClick: [
            function() {
              screens.currentScreen.buttons.playerSelect.opt2.selected = false;
              screens.currentScreen.buttons.playerSelect.opt3.selected = true;
              screens.currentScreen.buttons.playerSelect.opt4.selected = false;
            }
          ]
        }),
        opt4: new RectButton({
          sizeMode: 'fixed',
          fillColour: color('blue'),
          hitColour: color('orange'),
          selectedColour: color('darkorange'),
          w: width / 10,
          h: width / 10,
          position: {
            x: width / 2 + width / 10 * 1.1,
            y: height / 2
          },
          stroke: false,
          text: '4',
          textSize: width / 20,
          textColour: color('white'),
          font: fonts.aquatico.regular,
          onClick: [
            function() {
              screens.currentScreen.buttons.playerSelect.opt2.selected = false;
              screens.currentScreen.buttons.playerSelect.opt3.selected = false;
              screens.currentScreen.buttons.playerSelect.opt4.selected = true;
            }
          ]
        }),
        clicked() {
          screens.currentScreen.buttons.start.toggle(true);
          this.opt2.clicked();
          this.opt3.clicked();
          this.opt4.clicked();
        },
        show() {
          for (let btn in this) {
            if (this[btn].show) this[btn].show();
          }
        },
        value() {
          for (let btn in this) {
            if (this[btn].selected) {
              return int(btn[btn.length - 1]);
            }
          }
          return 0;
        },
        config(options) {
          for (let btn in options) {
            this[btn].config(options[btn]);
          }
        }
      }
    },
    show() {
      if (!this.buttons.playerSelect.value()) {
        this.buttons.start.toggle(false);
      }
      background(255);
      imageMode(CENTER);
      image(bg, width / 2, height / 2, width, height);
      textFont(fonts.aquatico.regular);
      textSize((width + height) / 25);
      textAlign(CENTER, CENTER);
      fill(0);
      text("GAME SETUP", width / 2, height / 14);
      textSize((width + height) / 40);
      text("Number of Players", width / 2, height / 3);
      for (let id in this.buttons) {
        this.buttons[id].show();
      }
    },
    resizeElt() {
      this.buttons.mainmenu.config({
        position: {
          x: width / 2,
          y: 14 * height / 16
        },
        w: textWider('MAIN MENU', fonts.aquatico.regular, (width + height) / 30, width / 4),
        h: textTaller('MAIN MENU', fonts.aquatico.regular, (width + height) / 30, height / 10),
        textSize: (width + height) / 40
      });
      this.buttons.start.config({
        position: {
          x: width / 2,
          y: 12 * height / 16
        },
        w: textWider('MAIN MENU', fonts.aquatico.regular, (width + height) / 30, width / 4),
        h: textTaller('MAIN MENU', fonts.aquatico.regular, (width + height) / 30, height / 10),
        textSize: (width + height) / 40
      });
      this.buttons.playerSelect.config({
        opt2: {
          w: width / 10,
          h: width / 10,
          position: {
            x: width / 2 - width / 10 * 1.1,
            y: height / 2
          },
          textSize: width / 20
        },
        opt3: {
          position: {
            x: width / 2,
            y: height / 2
          },
          w: width / 10,
          h: width / 10,
          textSize: width / 20
        },
        opt4: {
          w: width / 10,
          h: width / 10,
          position: {
            x: width / 2 + width / 10 * 1.1,
            y: height / 2
          },
          textSize: width / 20
        },
      });
    }
  },
  Help: {
    buttons: {
      mainmenu: null
    },
    clear() {
      for (let id in this.buttons) {
        this.buttons[id] = null;
      }
    },
    init() {
      this.buttons.mainmenu = new RectButton({
        position: {
          x: width / 2,
          y: 14 * height / 16
        },
        w: textWider('MAIN MENU', fonts.aquatico.regular, (width + height) / 30, width / 4),
        h: textTaller('MAIN MENU', fonts.aquatico.regular, (width + height) / 30, height / 10),
        sizeMode: 'fixed',
        fillColour: color('blue'),
        hitColour: color('orange'),
        stroke: false,
        text: "MAIN MENU",
        textColour: color('white'),
        textSize: (width + height ) / 40,
        font: fonts.aquatico.regular,
        onClick: [
          function() {
            screens.current = 'MainMenu';
          }
        ],
        activated: true
      });
    },
    show() {
      background(255);
      imageMode(CENTER);
      image(bg, width / 2, height / 2, width, height);
      textFont(fonts.aquatico.regular);
      textSize((width + height) / 25);
      textAlign(CENTER, CENTER);
      fill(0);
      text("HELP", width / 2, height / 14);
      text("YOU'RE FECKED", width / 2 , height / 2);
      for (let id in this.buttons) {
        this.buttons[id].show();
      }
    },
    resizeElt() {
      this.buttons.start.config({
        position: {
          x: width / 2,
          y: 8 * height / 16
        },
        w: textWider('START', fonts.aquatico.regular, (width + height) / 30, width / 4),
        h: height / 10,
        textSize: (width + height) / 30
      });
      this.buttons.help.config({
        position: {
          x: width / 2,
          y: 10 * height / 16
        },
        w: textWider('START', fonts.aquatico.regular, (width + height) / 30, width / 4),
        h: height / 10,
        textSize: width / 20
      });
    }
  },
  Game: {
    buttons: {
      menu: null
    },
    clear() {

    },
    init() {
      this.menu = new imgButton({
        position: {
          x: width / 40,
          y: width / 40
        },
        w: width / 20,
        h: width / 20,
        img: img.menuBtn,
        label: "MENU",
        labelFont: fonts.aquatico.regular,
        labelFontSize: width / 70
      });
    },
    show() {
      m.show();
      this.menu.show();
    },
    resizeElt() {

    }
  },
  Settings: {

  }
}
