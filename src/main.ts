import lib from "../lib/index";

const { KeyControls, MouseControls, Container, CanvasRenderer, TextNode } = lib;

// game setup code
const w = 640;
const h = 480;
const renderer = new CanvasRenderer(w, h);
document.getElementById("board").appendChild(renderer.view);

// game objects
const scene = new Container();
const message = new TextNode("Hello world canvas", {
  font: "40pt sans-serif",
  fill: "red",
  align: "center"
});
message.pos.x = w / 2;
message.pos.y = h / 2 - 20;
message.visible = true;
scene.visible = true;
message.update = function(dt) {
  if (this.pos.x <= -420) {
    this.pos.x += 100 * dt;
  } else if(this.pos.x ) {
    this.pos.x -= 100 * dt;
  }
  console.log(dt * 100)
};

scene.add(message);

let dt = 0;
let last = 0;

function loopy(ms: number) {
  requestAnimationFrame(loopy);

  const t = ms / 1000;
  dt = t - last;
  last = t;

  // game logic code
  scene.update(dt, t);
  renderer.render(scene);
}

requestAnimationFrame(loopy);
