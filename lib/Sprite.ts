import { ICoords, ISprite, ITexture } from "./Interfaces";

class Sprite implements ISprite {
  texture: ITexture;
  pos: ICoords;
  visible: boolean;
  dead: boolean;

  constructor(texture: ITexture) {
    this.texture = texture;
    this.pos = {
      x: 0,
      y: 0
    };
    this.visible = true;
    this.dead = false;
  }

  update = (dt?: number, t?: number): void => {};
}

export default Sprite;
