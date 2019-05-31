import lib from '../lib/index';

const {KeyControls, MouseControls, Container, CanvasRenderer, TextNode} = lib;

// game setup code
const w = 640;
const h = 480;
const renderer = new CanvasRenderer(w, h);
document.getElementById('board').appendChild(renderer.view);

// game objects
const scene = new Container();
const message = new TextNode('Hello world canvas', {
  font: '40pt sans-serif',
  fill: 'darkred',
  align: 'center'
});
message.pos.x = w / 2;
message.pos.y = h / 2 -20;

scene.add(message);

renderer.render(scene)

let dt = 0;
let last = 0;

const speed = 64;
let p1 = 0;
let p2 = 0;


function loopy(ms: number) {
  requestAnimationFrame(loopy);

  const t = ms / 1000;
  dt = t - last;
  last = t;

  // game logic code

}

//requestAnimationFrame(loopy);
