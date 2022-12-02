'use strict';

const SENSORS_LIMIT = 25;
const MAX_POSITION_X = 328;
const MAX_POSITION_Y = 580;
const SPEED_BALL = 10;

const ball = document.querySelector('.ball');
const boardBox = document.querySelector('.board-box');

let x, y;
let ball_X = 0;
let ball_Y = 0;
let moveX = 0;
let moveY = 0;
let ballPositionX = 165;
let ballPositionY= 450;

function handleOrientation(event) {
  x = event.gamma;
  if (x > SENSORS_LIMIT) x = SENSORS_LIMIT;
  if (x < -SENSORS_LIMIT) x = -SENSORS_LIMIT;

  y = event.beta;
  if (y > SENSORS_LIMIT) y = SENSORS_LIMIT;
  if (y < -SENSORS_LIMIT) y = -SENSORS_LIMIT;

  moveX = x / SPEED_BALL;
  moveY = y / SPEED_BALL;
}

window.addEventListener('deviceorientation', handleOrientation);

function animate() {
  if (
    ballPositionX + moveX < MAX_POSITION_X &&
    ballPositionX + moveX > 0 &&
    ballPositionY + moveY < MAX_POSITION_Y &&
    ballPositionY + moveY > 0
  ) {
    ballPositionX += moveX;
    ball.style.left = `${ballPositionX}px`;
    ballPositionY += moveY;
    ball.style.top = `${ballPositionY}px`;
  }
  console.log(ballPositionX);
  window.requestAnimationFrame(animate);
}

window.requestAnimationFrame(animate);
