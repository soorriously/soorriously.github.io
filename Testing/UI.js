class UI {
  constructor() {
    this.screens = {}
  }

  addScreen(id) {
    this.screens[id] = (new Screen(width, height));
  }

}
