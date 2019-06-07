import lib from "../lib/index";
import shipImg from "../res/images/ship.png";
import bgImg from "../res/images/bg.png";
import bulletImg from "../res/images/bullet.png";
import enemyImg from "../res/images/baddie.png";
import buildingImg from "../res/images/building.png";
import crosshairPng from "../res/images/crosshair.png";
import playerWalkingImg from "../res/images/player-walk.png";
import * as math from "../lib/utils/Math";
import Squizz from "./Entities/Squizz";
import {IContainer} from "../lib/Interfaces";
const {
  KeyControls,
  MouseControls,
  Container,
  CanvasRenderer,
  TextNode,
  Texture,
  Sprite,
  Game,
  TileSprite
} = lib;

const game = new Game(640, 300);
const { scene, w, h } = game;

// game objects
const textures = {
  ship: new Texture(shipImg),
  bg: new Texture(bgImg),
  bullet: new Texture(bulletImg),
  enemy: new Texture(enemyImg),
  building: new Texture(buildingImg),
  crosshair: new Texture(crosshairPng),
  walking: new Texture(playerWalkingImg)
};

const mouse = new MouseControls(game.renderer.view);

const balls = scene.add(new Container());
for (let i = 0; i < 20; i++) {
  const squizz = balls.add(new Squizz(mouse));
  squizz.pos = {
    x: math.rand(w - 100),
    y: math.rand(h - 50)
  };
}

// RUN GAME
game.run((dt, t) => {
  // game logic code
  const { pressed, pos } = mouse;

  balls.map(b => {
    if (b.pos.x > w) {
      b.pos.x = -32;
      b.speed *= 1.1;
    }

    // Check for collision
    if (pressed && math.distance(pos, b.pos) < 16) {
      if(b.speed > 0) {
        b.speed = 0;
      } else {
        b.dead = true;
      }
    }
  });

  mouse.update();
});
