'use strict';

export const SENSORS_LIMIT = 25;
const MAX_POSITION_X = 328;
const MAX_POSITION_Y = 580;
const SPEED_BALL = SENSORS_LIMIT / 4;

const ball = document.querySelector('.ball');
const boardBox = document.querySelector('.board-box');

let x, y;
let moveX = 0;
let moveY = 0;
let ballPositionX = 165;
let ballPositionY = 450;

const currentGame = {
  positivePoints: 5,
  negativePoints: 3,
  points: 0,
};

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

function changePosition() {
  if (ballPositionX + moveX < MAX_POSITION_X && ballPositionX + moveX > 0) {
    ballPositionX += moveX;
    ball.style.left = `${ballPositionX}px`;
  }
  if (ballPositionY + moveY < MAX_POSITION_Y && ballPositionY + moveY > 0) {
    ballPositionY += moveY;
    ball.style.top = `${ballPositionY}px`;
  }
}

function animate() {
  changePosition();
  window.requestAnimationFrame(animate);
}

window.requestAnimationFrame(animate);

function getRandomX() {
  const random = Math.random() * MAX_POSITION_X;
  return (random > 140 && random < 200) ||
    random < 20 ||
    random > MAX_POSITION_X - 20
    ? getRandomX()
    : random;
}

function getRandomY() {
  const random = Math.random() * MAX_POSITION_Y;
  return (random > 420 && random < 470) ||
    (random > 20 && random < 70) ||
    random < 20 ||
    random > MAX_POSITION_Y - 20
    ? getRandomX()
    : random;
}

function generatePositivePoint() {
  const point = document.createElement('div');
  point.classList.add('positive-point');
  point.style.left = `${getRandomX()}px`;
  point.style.top = `${getRandomY()}px`;
  boardBox.appendChild(point);
}
function generateNegativePoint() {
  const point = document.createElement('div');
  point.classList.add('negative-point');
  point.style.left = `${getRandomX()}px`;
  point.style.top = `${getRandomY()}px`;
  boardBox.appendChild(point);
}

for (let index = 0; index < currentGame.negativePoints; index++) {
  generateNegativePoint();
}
for (let index = 0; index < currentGame.positivePoints; index++) {
  generatePositivePoint();
}
