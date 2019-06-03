import lib from "../lib/index";
import shipImg from "../res/images/ship.png";
import bgImg from "../res/images/bg.png";
import bulletImg from "../res/images/bullet.png";
import enemyImg from "../res/images/baddie.png";

const {
  KeyControls,
  MouseControls,
  Container,
  CanvasRenderer,
  TextNode,
  Texture,
  Sprite
} = lib;

// game setup code
const w = 640;
const h = 300;
const renderer = new CanvasRenderer(w, h);
const board = document.getElementById("board");
board && board.appendChild(renderer.view);

// game objects
const scene = new Container();
const textures = {
  ship: new Texture(shipImg),
  bg: new Texture(bgImg),
  bullet: new Texture(bulletImg),
  enemy: new Texture(enemyImg)
};
const controls = new KeyControls();
const SPEED = 200;

// Ship
const ship = new Sprite(textures.ship);
ship.pos.x = 120;
ship.pos.y = h / 2 - 16;
ship.update = function(dt) {
  const { pos } = this;
  pos.x += controls.x * dt * SPEED;
  pos.y += controls.y * dt * SPEED;

  if (pos.x < 0) pos.x = 0;
  if (pos.x > w) pos.x = w;
  if (pos.y < 0) pos.y = 0;
  if (pos.y > h) pos.y = h;
};

// Bullets
const bullets = new Container();
function fireBullet(x, y) {
  const bullet = new Sprite(textures.bullet);
  bullet.pos.x = x;
  bullet.pos.y = y;
  bullet.update = function(dt) {
    this.pos.x += 400 * dt;
  };

  bullets.add(bullet);

  // Destroy bullets when they go out of the screen
  bullets.children.forEach(bullet => {
    if (bullet.pos.x >= w + 20) {
      bullet.dead = true;
    }
  });
}

// Bad guys
const enemies = new Container();
function spawnEnemy(x, y, speed) {
  debugger;
  const enemy = new Sprite(textures.enemy);
  enemy.pos.x = x;
  enemy.pos.y = y;
  enemy.update = function(dt) {
    this.pos.x += speed * dt;
  };
  enemies.add(enemy);
}

// Add the score game object
const score = new TextNode("score:", {
  font: "20px sans-serif",
  fill: "#8B8994",
  align: "center"
});
score.pos.x = w / 2;
score.pos.y = h - 30;

// Game state variables
let lastShot = 0;
let lastEnemy = 0;
let enemySpeed = 1.0;
let scoreAmount = 0;
let gameOver = false;

// game over
function doGameOver() {
  const gameOverMessage = new TextNode("Game Over", {
    font: "30pt sans-serif",
    fill: "#8B8994",
    align: "center"
  });
  gameOverMessage.pos.x = w / 2;
  gameOverMessage.pos.y = 120;

  scene.add(gameOverMessage);
  scene.remove(ship);
  gameOver = true;
}

// Add everything to scene container
scene.add(new Sprite(textures.bg));
scene.add(ship);
scene.add(bullets);
scene.add(enemies);
scene.add(score);

// LOOPY
let dt = 0;
let last = 0;

function loopy(ms: number) {
  requestAnimationFrame(loopy);

  const t = ms / 1000;
  dt = t - last;
  last = t;

  // game logic code
  if (!gameOver && controls.action && t - lastShot > 0.15) {
    lastShot = t;
    fireBullet(ship.pos.x + 24, ship.pos.y + 10);
  }
  ship.pos.x += Math.sin(t * 10); // "bob" the player
  score.text = "score: " + scoreAmount; // update score

  // Check for collisions, or out of screen
  enemies.children.forEach(enemy => {
    bullets.children.forEach(bullet => {
      // Check distance between baddie and bullet
      const dx = enemy.pos.x + 16 - (bullet.pos.x + 8);
      const dy = enemy.pos.y + 16 - (bullet.pos.y + 8);
      if (Math.sqrt(dx * dx + dy * dy) < 24) {
        // A hit!
        bullet.dead = true;
        enemy.dead = true;
        scoreAmount += Math.floor(t);
      }
      // Bullet out of the screen?
      if (bullet.pos.x >= w + 20) {
        bullet.dead = true;
      }
    });

    // Check if baddie reached the city
    if (enemy.pos.x < -32) {
      if (!gameOver) {
        doGameOver();
      }
      enemy.dead = true;
    }
  });

  // Spawn bad guys
  if (t - lastEnemy > enemySpeed) {
    lastEnemy = t;
    const speed = -50 - Math.random() * Math.random() * 100;
    const position = Math.random() * (h - 24);
    spawnEnemy(w, position, speed);

    // Accelerating for the next spawn
    enemySpeed = enemySpeed < 0.05 ? 0.6 : enemySpeed * 0.97 + 0.001;
  }

  scene.update(dt, t);
  renderer.render(scene);
}

requestAnimationFrame(loopy);
