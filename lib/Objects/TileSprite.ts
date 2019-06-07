import { IAnimManager, ICoords, ITexture, ITileSprite } from "../Interfaces";
import Sprite from "./Sprite";
import AnimManager from './Anim';

class TileSprite extends Sprite implements ITileSprite {
  tileW: number;
  tileH: number;
  frame: ICoords;
  anims: IAnimManager;

  constructor(texture: ITexture, w: number, h: number) {
    super(texture);
    this.tileW = w;
    this.tileH = h;
    this.frame = {
      x: 0,
      y: 0
    };
    this.anims = new AnimManager(this);
  }
}

export default TileSprite;
