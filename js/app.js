// Enemies our player must avoid
// const CELL_WIDTH = 100;
// const CELL_HEIGHT = 70;

// const QUANTITY_OF_COLUMNS = 5;
// const QUANTITY_OF_ROWS = 5;
// const QUANTITY_OF_ROWS_WITH_BUGS = 3;

// const GAME_FIELD_WIDTH = CELL_WIDTH * QUANTITY_OF_COLUMNS;
// const GAME_FIELD_HEIGHT = CELL_HEIGHT * QUANTITY_OF_ROWS;

// const PLAYER_START_POSITION = {
// 	x: CELL_WIDTH *
// 	y:
// }

const START_POINT = 0;
const END_POINT = 400;
const WATER = 0;

const ENEMY_START = -70;
const ENEMY_END = 500;
const ENEMY_SPEED_MIN = 100;
const ENEMY_SPEED_MAX = 300;
const ENEMY_ROW_1 = 63;
const ENEMY_ROW_2 = 145;
const ENEMY_ROW_3 = 230;

const X_STEP = 100;
const Y_STEP = 80;

const PLAYER_X_START = 200;
const PLAYER_Y_START = 320;
const PLAYER_HEIGHT = 60;

let winScope = 0;
let loseScope = 0;

let Enemy = function (x, y, speed, player) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.sprite = "images/enemy-bug.png";
  this.player = player;
};

const Player = function (x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.player = "images/char-boy.png";
};

Enemy.prototype.checkCollisions = function () {
  if (
    this.player.x < this.x + this.player.width &&
    this.player.x + this.player.width > this.x &&
    this.player.y < this.y + this.player.height &&
    this.player.height + this.player.y > this.y
  ) {
    this.player.x = PLAYER_X_START;
    this.player.y = PLAYER_Y_START;
    loseScope++;
  }
};

Enemy.prototype.update = function (dt) {
  this.checkCollisions();
  this.x += this.speed * dt;
  if (this.x > ENEMY_END) {
    this.x = ENEMY_START;
    this.speed = ENEMY_SPEED_MIN + Math.floor(Math.random() * ENEMY_SPEED_MAX);
  }
};

Player.prototype.update = function () {};

Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

Player.prototype.handleInput = function (keyPress) {
  switch (keyPress) {
    case "left":
      if (this.x !== START_POINT) {
        this.x -= X_STEP;
      }
      break;
    case "right":
      if (this.x !== END_POINT) {
        this.x += X_STEP;
      }
      break;
    case "up":
      if (this.y !== Y_STEP) {
        this.y -= Y_STEP;
      } else {
        alert(`Win: ${++winScope}  Lose: ${loseScope}`);
        this.x = PLAYER_X_START;
        this.y = PLAYER_Y_START;
      }
      break;
    case "down":
      if (this.y !== END_POINT) {
        this.y += Y_STEP;
      }
      break;
    default:
      this.x = PLAYER_X_START;
      this.y = PLAYER_Y_START;
  }
};

const player = new Player(
  PLAYER_X_START,
  PLAYER_Y_START,
  Y_STEP,
  PLAYER_HEIGHT
);

const allEnemies = [];
const enemyLocation = [ENEMY_ROW_1, ENEMY_ROW_2, ENEMY_ROW_3];

enemyLocation.forEach((y) => {
  let enemy = new Enemy(0, y, ENEMY_SPEED_MIN, player);
  allEnemies.push(enemy);
});

document.addEventListener("keyup", function (e) {
  let allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
