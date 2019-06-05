import Container from './Container';
import CanvasRenderer from '../Renderer/CanvasRenderer';
import {ICanvasRenderer, IContainer, IGame} from "../Interfaces";

const STEP = 1 / 60;
const MAX_FRAME = STEP * 5;

class Game implements IGame {
  w: number;
  h: number;
  renderer: ICanvasRenderer;
  scene: IContainer;

  constructor(w: number, h: number, parent: string = 'board') {
    this.w = w;
    this.h = h;
    this.renderer = new CanvasRenderer(w, h);
    this.scene = new Container();

    document.getElementById(parent)!.appendChild(this.renderer.view);
  }

  run(gameUpdate = (dt: number, t: number): void => {}) {
    let dt = 0;
    let last = 0;

    const loopy = (ms: number) => {
      requestAnimationFrame(loopy);

      const t = ms / 1000;
      dt = Math.min(t - last, MAX_FRAME);
      last = t;

      this.scene.update(dt, t);
      gameUpdate(dt, t);
      this.renderer.render(this.scene);
    };

    requestAnimationFrame(loopy);
  }
}

export default Game;