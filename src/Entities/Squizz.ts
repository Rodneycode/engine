import lib from "../../lib/index";
import image from "../../res/images/player-walk.png";
import { ICoords, ITileSprite } from "../../lib/Interfaces";
import * as math from "../../lib/utils/Math";

const { TileSprite, Texture } = lib;
const texture = new Texture(image);

interface ISquizz extends ITileSprite {
  rate: number;
  curTime: number;
  curFrame: number;
  frames: Array<ICoords>;
  speed: number;
  anchor: ICoords;
  frame: ICoords;
}

class Squizz extends TileSprite implements ISquizz {
  rate: number;
  curTime: number;
  curFrame: number;
  frames: Array<ICoords>;
  speed: number;
  anchor: ICoords;
  frame: ICoords;

  constructor() {
    super(texture, 32, 32);
    this.rate = 0.1;
    this.curFrame = 0;
    this.curTime = 0;
    this.frames = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 }
    ];
    this.frame = this.frames[this.curFrame];
    this.speed = math.rand(20, 100);
    this.anchor = {
      x: -16,
      y: -16
    };

    const { anims } = this;
    anims.add("walk", [0, 1, 2, 3].map(x => ({ x, y: 0 })), 0.07 * this.speed);
    anims.add(
      "idle",
      [{ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 4, y: 1 }, { x: 4, y: 0 }],
      0.15 * this.speed
    );

    // Play one of them!
    anims.play("walk");
  }

  update = (dt: number, t: number): void => {
    const { rate, frames, pos, speed } = this;

    pos.x += speed * dt;
    this.curTime += dt;
    if (this.curTime > rate) {
      this.frame = frames[this.curFrame++ % frames.length];
      this.curTime -= rate;
    }
  };
}

export default Squizz;
