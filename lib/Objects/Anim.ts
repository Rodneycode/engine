import { IAnim, IAnimManager, ICoords, ITileSprite } from "../Interfaces";

class Anim implements IAnim {
  frames: Array<ICoords>;
  rate: number;
  curFrame: number;
  curTime: number;
  frame: ICoords;

  constructor(frames: Array<ICoords>, rate: number) {
    this.frames = frames;
    this.rate = rate;
    this.reset();
    this.curFrame = 0;
    this.curTime = 0;
    this.frame = {
      x: 0,
      y: 0
    };
  }

  reset() {
    this.frame = this.frames[0];
    this.curFrame = 0;
    this.curTime = 0;
  }

  update(dt: number) {
    const { rate, frames } = this;
    if ((this.curTime += dt) > rate) {
      this.curFrame++;
      this.frame = frames[this.curFrame % frames.length];
      this.curTime -= rate;
    }
  }
}

class AnimManager implements IAnimManager {
  running: boolean;
  frameSource: ICoords;
  current: string | null;
  anims: any;

  constructor(e: ITileSprite) {
    this.anims = {};
    this.running = false;
    this.frameSource = e.frame || e;
    this.current = null;
  }

  add(name: string, frames: Array<ICoords>, speed: number): IAnim {
    this.anims[name] = new Anim(frames, speed);
    return this.anims[name];
  }

  update(dt: number) {
    const { current, anims, frameSource } = this;
    if (!current) return;

    const anim = anims[current];
    anim.update(dt);

    // Sync the TileSprite frame
    frameSource.x = anim.frame.x;
    frameSource.y = anim.frame.y;
  }

  play(anim: string): void {
    const { anims, current } = this;
    if (anim === current) return;

    this.current = anim;
    anims[anim].reset();
  }

  stop() {
    this.current = null;
  }
}

export default AnimManager;
