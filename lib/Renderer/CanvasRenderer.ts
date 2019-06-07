import { ICanvasRenderer, IContainer, ISprite, ITextNode } from "../Interfaces";

class CanvasRenderer implements ICanvasRenderer {
  w: number;
  h: number;
  view: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(w: number, h: number) {
    const canvas = <HTMLCanvasElement>document.createElement("canvas");
    this.w = canvas.width = w;
    this.h = canvas.height = h;
    this.view = canvas;
    this.ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
  }

  render = (container: IContainer, clear = true): void => {
    if (!container.visible) return;
    const { ctx } = this;

    // Render the container children
    function renderRec(container: IContainer): void {
      container.children.forEach((child: any) => {
        // TODO: typing for child
        // check if child is vissible and skip it if so
        if (!child.visible) return;

        ctx.save();

        // Draw the leaf node
        if (child.pos) {
          ctx.translate(Math.round(child.pos.x), Math.round(child.pos.y));
        }

        // revert image
        if (child.anchor) {
          ctx.translate(child.anchor.x, child.anchor.y);
        }

        // rotation
        if (child.rotation) {
          const px = child.pivot ? child.pivot.x : 0;
          const py = child.pivot ? child.pivot.y : 0;
          ctx.translate(px, py);
          ctx.rotate(child.rotation);
          ctx.translate(-px, -py);
        }

        // Scale
        if (child.scale) {
          ctx.scale(child.scale.x, child.scale.y);
        }

        // Draw text node
        if (child.text) {
          const { font, fill, align } = child.style;
          if (font) ctx.font = font;
          if (fill) ctx.fillStyle = fill;
          if (align) ctx.textAlign = align;

          ctx.fillText(child.text, 0, 0);
        } else if (child.texture) {
          const img = child.texture.img;

          if (child.tileW) {
            ctx.drawImage(
              img,
              child.frame.x * child.tileW, // source x
              child.frame.y * child.tileH, // source y
              child.tileW,
              child.tileH, // width & height
              0,
              0, // destination x & y
              child.tileW,
              child.tileH // destination width & height
            );
          } else {
            // Draw texture node
            ctx.drawImage(img, 0, 0);
          }
        }

        // Handle the child types
        if (child.children) {
          renderRec(child);
        }
        ctx.restore();
      });
    }

    clear && ctx.clearRect(0, 0, this.w, this.h);
    renderRec(container);
  };
}

export default CanvasRenderer;
