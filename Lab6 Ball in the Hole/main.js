'use strict';

const ball = document.querySelector('.ball');
const boardBox = document.querySelector('.board-box');

let x, y;
let rollBall = 0;

const maxX = boardBox.clientWidth - ball.clientWidth;
const maxY = boardBox.clientHeight - ball.clientHeight;

let ballPositionHorizontal;
let ballPositionVertical;

const game = {
  isWin: false,
  isBallNextToWall: false,
};

function handleOrientation(event) {
  x = event.gamma;
  y = event.beta;

  if (x > 30) x = 30;
  if (x < -30) x = -30;
  if (y > 30) y = 30;
  if (y < -30) y = -30;

  ball.style.left = `${(maxX * x) / 60}px`;
  ball.style.top = `${(maxY * y) / 60}px`;

  x += 30;
  y += 30;
}

window.addEventListener('deviceorientation', handleOrientation);

function animate() {
  ballPositionHorizontal = (maxX * x) / 60 + rollBall;

  if (ballPositionHorizontal <= 330 && ballPositionHorizontal >= 0) {
    ball.style.left = `${ballPositionHorizontal}px`;
  }

  if (x > 0 && game.isBallNextToWall === false) rollBall += 1;
  if (x < 0 && game.isBallNextToWall === false) rollBall -= 1;

  console.log(ballPositionHorizontal);
  console.log(game.isBallNextToWall);

  if (ballPositionHorizontal > 330) {
    ballPositionHorizontal = 330;
    game.isBallNextToWall = true;
  }
  if (ballPositionHorizontal < 0) {
    ballPositionHorizontal = 0;
    game.isBallNextToWall = true;
  }
  if (ballPositionHorizontal < 330 && ballPositionHorizontal > 0)
    game.isBallNextToWall = false;

  if (game.isWin === false) {
    window.requestAnimationFrame(animate);
  }
}

window.requestAnimationFrame(animate);
