export interface ICoords {
  x: number;
  y: number;
}

export interface ICallBack {
  (): void;
}

export interface IStyle {
  font?: string;
  fill?: string;
  align?: string;
}

export interface ITextNode {
  pos: ICoords;
  text: string;
  style: IStyle;
  visible?: boolean;
  dead?: boolean;

  update?(dt?: number, t?: number): void;
}

export interface ITexture {
  img: HTMLImageElement;
}

export interface ISprite {
  texture: ITexture;
  pos: ICoords;
  visible: boolean;
  dead: boolean;
  scale: ICoords;
  anchor: ICoords;
  pivot: ICoords;
  rotation: number;

  update(dt: number, t: number): void;
}

export interface ITileSprite extends ISprite {
  tileW: number;
  tileH: number;
  frame: ICoords;
  anims: IAnimManager;
}

export interface IContainer {
  pos: ICoords;
  children: Array<any>; // todo: typing
  visible?: boolean;
  dead?: boolean;

  add(child: any): any;
  remove(child: any): any;
  update(dt: number, t: number): void;
  map(f: any): Array<any>;
}

export interface ICanvasRenderer {
  w: number;
  h: number;
  view: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  render(container: IContainer): void;
}

export interface IGame {
  w: number;
  h: number;
  renderer: ICanvasRenderer;
  scene: IContainer;

  run(): void;
}

export interface IAnim {
  frames: Array<ICoords>;
  rate: number;
  frame: ICoords;
  curFrame: number;
  curTime: number;
  reset(): void;
  update(dt: number): void;
}

export interface IAnimManager {
  running: boolean;
  frameSource: ICoords;
  current: string | null;
  anims: any;
  add(name: string, frames: Array<ICoords>, speed: number): IAnim;
  update(dt: number): void;
  play(anim: string): void;
  stop(): void;
}
