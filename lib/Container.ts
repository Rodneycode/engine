import { ICoords } from "./Interfaces";

export interface IContainer {
  pos: ICoords;
  children: Array<any>;
  visible?: boolean;

  add(child: any): any;

  remove(child: any): any;

  update(dt: number, t: number): void;
}

class Container implements IContainer {
  pos: ICoords;
  children: Array<any>;
  visible?: boolean;

  constructor() {
    this.pos = {
      x: 0,
      y: 0
    };

    this.children = [];
    this.visible = true;
  }

  // methods
  add = (child: any): any => { // todo: typing child
    this.children.push(child);
    return child;
  };

  remove = (child: any): any => { // todo: typing child
    this.children = this.children.filter((item: any) => child !== item);
    return child;
  };

  update(dt: number, t: number): void {
    this.children = this.children.filter((child: any) => { // todo: typing child
      if (child.update) {
        child.update(dt, t);
      }

      return !child.dead;
    });
  }
}

export default Container;
