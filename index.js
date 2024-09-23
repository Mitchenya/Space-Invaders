import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";

const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

const background = new Image();
background.src = "images/4k-space.jpeg";

const playerBulletController = new BulletController(canvas, 10, "red", true);
const enemyBulletController = new BulletController(canvas, 4, "white", false);
const enemyController = new EnemyController(
  canvas,
  enemyBulletController,
  playerBulletController
);
const player = new Player(canvas, 3, playerBulletController);

let isGameOver = false;
let didWin = false;
let gameStarted = false;

function game() {
  checkGameOver();
  context.drawImage(background, 0, 0, canvas.width, canvas.height);
  displayGameOver();
  if (!isGameOver) {
    enemyController.draw(context);
    player.draw(context);
    playerBulletController.draw(context);
    enemyBulletController.draw(context);
  }
}

function displayGameOver() {
  if (isGameOver) {
    let firstLine = didWin ? "You Win!" : "Your Space Has Been Invaded!";
    let secondLine = "Press Space to Try Again.";

    let fontSize = canvas.width / 18;
    context.fillStyle = "white";
    context.font = `${fontSize}px Arial`;

    let textWidth1 = context.measureText(firstLine).width;
    let textWidth2 = context.measureText(secondLine).width;

    context.fillText(
      firstLine,
      (canvas.width - textWidth1) / 2,
      canvas.height / 2
    );
    context.fillText(
      secondLine,
      (canvas.width - textWidth2) / 2,
      canvas.height / 2 + fontSize + 5
    );
  }
}

function checkGameOver() {
  if (isGameOver) {
    return;
  }
  if (enemyBulletController.collideWith(player)) {
    isGameOver = true;
    didWin = false;
    endGame();
  }

  if (enemyController.collideWith(player)) {
    isGameOver = true;
    didWin = false;
    endGame();
  }

  if (enemyController.enemyRows.length === 0) {
    didWin = true;
    isGameOver = true;
    endGame();
  }
}

function endGame() {
  gameStarted = false;
}

function resetGame() {
  isGameOver = false;
  didWin = false;

  player.resetPosition();

  playerBulletController.clearBullets();
  enemyBulletController.clearBullets();

  enemyController.createEnemies();

  gameStarted = true;
}

document.addEventListener("keydown", function (event) {
  if (event.key === " " || event.key === "Spacebar") {
    if (!gameStarted) {
      resetGame();
    }
  }
});

setInterval(game, 1000 / 60);
