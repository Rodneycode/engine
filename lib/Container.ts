export interface IContainer {
  pos: {
    x: number;
    y: number;
  };
  children: Array<any>;

  add(child: any): any;

  remove(child: any): any;

  update(dt: number, t: number): void;
}

class Container implements IContainer {
  pos: {
    x: number;
    y: number;
  };
  children: Array<any>;

  constructor() {
    this.pos = {
      x: 0,
      y: 0
    };

    this.children = [];
  }

  // methods
  add = (child: any): any => {
    this.children.push(child);
    return child;
  };

  remove = (child: any): any => {
    this.children = this.children.filter((item: any) => child !== item);
    return child;
  };

  update(dt: number, t: number): void {
    this.children.forEach((child: any) => {
      if (child.update) {
        child.update(dt, t);
      }
    });
  }
}

export default Container;
