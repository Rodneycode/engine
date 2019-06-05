import {ICallBack, IContainer, ICoords, ISprite, ITextNode} from "../Interfaces";

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

  map(f: any): Array<any> { // todo: typing
    return this.children.map(f);
  }
}

export default Container;
