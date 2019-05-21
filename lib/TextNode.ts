interface ITextNode {
  pos: {
    x: number;
    y: number;
  }
  text: string;
  style: object;
}

class TextNode implements ITextNode {
  pos: {
    x: number;
    y: number;
  };
  text: string;
  style: object;

  constructor(text: string = '', style: object = {}) {
    this.pos = {
      x: 0,
      y: 0
    };
    this.text = text;
    this.style = style;
  }
}

export default TextNode;