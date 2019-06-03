interface IKeyControls {
  keys: {
    [key: number]: boolean
  }

  x: number;
  y: number;

  reset(): void;
  key(key: number, value: boolean): boolean;
}

enum keys {
  LEFT = 37,
  UP = 38,
  RIGHT = 39,
  DOWN = 40,
  A = 65,
  D = 68,
  S = 83,
  W = 87,
  SPACE = 32
}

class KeyControls implements IKeyControls {
  keys: {
    [key: number]: boolean
  };

  constructor() {
    this.keys = {};

    // Bind event handlers
    document.addEventListener('keydown', ({which}: KeyboardEvent) => {
      if ([32, 37, 38, 39, 40, 65, 68, 83, 87].indexOf(which) >= 0) {
        this.keys[which] = true;
        console.log(this.keys[which])
      }
    }, false);
    document.addEventListener('keyup', ({which}: KeyboardEvent) => {
      if ([32, 37, 38, 39, 40, 65, 68, 83, 87].indexOf(which) >= 0) {
        this.keys[which] = false;
      }
    }, false);
  }

  key(key: number, value: boolean): boolean {
    if(value !== undefined) {
      this.keys[key] = value;
    }
    return this.keys[key];
  }

  reset(): void {
    for (let key in this.keys) {
      this.keys[key] = false;
    }
  }

  // Handle key actions
  get action(): boolean {
    return this.keys[32];
  }

  get x(): number {
    // left arrow or A key
    if (this.keys[keys.LEFT] || this.keys[keys.A]) {
      return -1;
    }

    // right arrow or D key
    if (this.keys[keys.RIGHT] || this.keys[keys.D]) {
      return 1;
    }

    return 0;
  }

  get y(): number {
    // up arrow or W key
    if (this.keys[keys.UP] || this.keys[keys.W]) {
      return -1;
    }
    // down arrow or S key
    if (this.keys[keys.DOWN] || this.keys[keys.S]) {
      return 1;
    }
    return 0;
  }
}

export default KeyControls;