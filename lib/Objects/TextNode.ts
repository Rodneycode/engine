// Interfaces
import { ICoords, IStyle, ITextNode } from "../Interfaces";

// class implementation. TextNode
class TextNode implements ITextNode {
  pos: ICoords;
  text: string;
  style: IStyle;
  visible?: boolean;
  update?(dt?: number, t?: number): void;

  constructor(text: string = "", style: IStyle = {}) {
    this.pos = {
      x: 0,
      y: 0
    };
    this.text = text;
    this.style = style;
    this.visible = true;
  }
}

export default TextNode;
