import lib from '../lib/index';

const {KeyControls, MouseControls, Container} = lib;

const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
const { width: w, height: h } = canvas;

// game setup code
ctx.fillStyle = "#000";
ctx.globalAlpha = 0.02;

let dt = 0;
let last = 0;

const speed = 64;
let p1 = 0;
let p2 = 0;

const controls = new KeyControls();
const mouse = new MouseControls(canvas);
const scene = new Container();


function loopy(ms: number) {
  requestAnimationFrame(loopy);

  const t = ms / 1000;

  dt = t - last;
  last = t;

  // game logic code
  ctx.save();
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#fff";
  ctx.globalAlpha = 1;

  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeText(`Frame length: ${(dt * 1000).toFixed(2)} ms`, 70, 50);
  ctx.strokeText(`Total time: ${t.toFixed(2)}`, 70, 90);

  p1 += speed * dt;
  p2 += speed * (1 / 60);
  if (p1 > w) p1 -= w + 50;
  if (p2 > w) p2 -= w + 50;

  ctx.fillStyle = "#f00";
  ctx.fillRect(p1, 120, 50, 50);
  ctx.fillRect(p2, 190, 50, 50);

  // Random circle
  const x = Math.random() * w;
  const y = Math.random() * h;
  const radius = Math.random() * 20;

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

requestAnimationFrame(loopy);
