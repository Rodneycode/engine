import {IContainer} from "../Container";

interface ICanvasRenderer {
  w: number;
  h: number;
  view: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  render(container: IContainer): void;
}

class CanvasRenderer implements ICanvasRenderer {
  w: number;
  h: number;
  view: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(w: number, h: number) {
    const canvas = <HTMLCanvasElement>document.createElement('canvas');
    this.w = canvas.width = w;
    this.h = canvas.height = h;
    this.view = canvas;
    this.ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
  }

  render = (container: IContainer): void => {
    const {ctx} = this;

    // Render the container children
    function renderRec(container: IContainer): void {
      container.children.forEach((child: any) => {
        // Draw the leaf node

        if (child.pos) {
          ctx.translate(Math.round(child.pos.x), Math.round(child.pos.y));
        }

        // Handle the child types

        if (child.children) {
          renderRec(child);
        }
        ctx.restore();
      })
    }

    ctx.clearRect(0, 0, this.w, this.h);
    renderRec(container);
  }
}

export default CanvasRenderer;