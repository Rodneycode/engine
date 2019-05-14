interface IKeyControls {
  keys: {
    [key: number]: boolean
  }

  x: number;
  y: number;
}

enum keys {
  LEFT = 37,
  UP = 38,
  RIGHT = 39,

}

class KeyControls implements IKeyControls {
  keys: {
    [key: number]: boolean
  };

  constructor() {
    this.keys = {};

    // Bind event handlers
    document.addEventListener('keydown', ({which}: KeyboardEvent) => {
      if ([37, 38, 39, 40].indexOf(which) >= 0) {
        this.keys[which] = true;
      }
    }, false);
    document.addEventListener('keyup', ({which}: KeyboardEvent) => {
      if ([37, 38, 39, 40].indexOf(which) >= 0) {
        this.keys[which] = false;
      }
    }, false);
  }

  // Handle key actions
  get x(): number {
    // left arrow or A key
    if (this.keys[37 || this.keys[65]]) {
      return -1;
    }

    // right arrow or D key
    if (this.keys[39] || this.keys[68]) {
      return 1;
    }

    return 0;
  }

  get y() {
    // up arrow or W key
    if (this.keys[38] || this.keys[87]) {
      return -1;
    }
    // down arrow or S key
    if (this.keys[40] || this.keys[83]) {
      return 1;
    }
    return 0;
  }
}

export default KeyControls;