import { ICoords, ISprite, ITexture } from "../Interfaces";

class Sprite implements ISprite {
  texture: ITexture;
  pos: ICoords;
  visible: boolean;
  dead: boolean;
  scale: ICoords;
  anchor: ICoords;
  pivot: ICoords;
  rotation: number;

  constructor(texture: ITexture) {
    this.texture = texture;
    this.pos = {
      x: 0,
      y: 0
    };
    this.visible = true;
    this.dead = false;
    this.scale = {
      x: 1,
      y: 1
    };
    this.anchor = {
      x: 0,
      y: 0
    };
    this.pivot = {
      x: 0,
      y: 0
    };
    this.rotation = 0;
  }

  update = (dt: number, t: number): void => {};
}

export default Sprite;
