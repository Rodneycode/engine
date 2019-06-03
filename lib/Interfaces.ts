export interface ICoords {
  x: number;
  y: number;
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
  update?(dt?: number, t?: number): void;
}

export interface ITexture {
  img: HTMLImageElement;
}

export interface ISprite {
  texture: ITexture;
  pos: ICoords;
  update(dt?: number, t?: number): void;
  visible: boolean;
  dead: boolean;
}