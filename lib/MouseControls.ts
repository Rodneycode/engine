interface IMouseControls {
  el: HTMLElement;
  pos: {
    x: number;
    y: number;
  }
  isDown: boolean;
  pressed: boolean;
  released: boolean;

  move(e: MouseEvent): void;
}

class MouseControls implements IMouseControls {
  el: HTMLElement;
  pos: {
    x: number;
    y: number;
  };
  isDown: boolean;
  pressed: boolean;
  released: boolean;

  constructor(container: HTMLElement) {
    this.el = container || document.body;

    // state
    this.pos = {
      x: 0,
      y: 0
    };
    this.isDown = false;
    this.pressed = false;
    this.released = false;

    // handlers
    document.addEventListener('mousemove', this.move, false);
    document.addEventListener('mousedown', this.down, false);
    document.addEventListener('mouseup', this.up, false);
  }

  mousePosFromEvent({ clientX, clientY }: MouseEvent) {
    const { el, pos } = this;
    const rect = el.getBoundingClientRect();
    const xr = el.width / el.clientWidth;
    const yr = el.height / el.clientHeight;
    pos.x = (clientX - rect.left) * xr;
    pos.y = (clientY - rect.top) * yr;
  }

  move(e: MouseEvent): void {
    this.mousePosFromEvent(e);
  }

}

export default MouseControls;