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

  update(dt?: number, t?: number): void;
}

export interface IContainer {
  pos: ICoords;
  children: Array<any>; // todo: typing
  visible?: boolean;
  dead?: boolean;

  add(child: any): any;
  remove(child: any): any;
  update(dt: number, t: number): void;
  map(f: any): Array<any>
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