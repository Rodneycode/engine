// Interfaces
export interface IStyle {
  font?: string;
  fill?: string;
  align?: string;
}

export interface ITextNode {
  pos: {
    x: number;
    y: number;
  }
  text: string;
  style: IStyle;
}


// class implementation. TextNode
class TextNode implements ITextNode {
  pos: {
    x: number;
    y: number;
  };
  text: string;
  style: IStyle;

  constructor(text: string = '', style: IStyle = {}) {
    this.pos = {
      x: 0,
      y: 0
    };
    this.text = text;
    this.style = style;
  }
}

export default TextNode;