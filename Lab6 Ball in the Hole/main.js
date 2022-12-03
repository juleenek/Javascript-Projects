'use strict';

import {
  currentGame,
  positivePoint,
  negativePoint,
  SENSORS_LIMIT,
} from './modules/models.js';

import { getRandomX, getRandomY } from './modules/random.js';

export const MAX_POSITION_X = 328;
export const MAX_POSITION_Y = 580;
const SPEED_BALL = SENSORS_LIMIT / 2;

const ball = document.querySelector('.ball');
const boardBox = document.querySelector('.board-box');
const pointsDOM = document.querySelector('.points');

let x, y;
let moveX = 0;
let moveY = 0;
let ballPositionX = 165;
let ballPositionY = 450;
let pointSum = 0;

export const takenPointsPositionX = [];
export const takenPointsPositionY = [];
const positivePoints = [];
const negativePoints = [];
const positivePointsDOM = [];
const negativePointsDOM = [];

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

function checkNearPositivePoints() {
  for (let index = 0; index < positivePoints.length; index++) {
    if (
      ballPositionX > positivePoints[index].x - 15 &&
      ballPositionX < positivePoints[index].x + 15 &&
      ballPositionY > positivePoints[index].y - 15 &&
      ballPositionY < positivePoints[index].y + 15
    ) {
      const pointDOM = positivePointsDOM[index];
      pointSum += 1;
      boardBox.removeChild(pointDOM);
      positivePoints.splice(index, 1);
      positivePointsDOM.splice(index, 1);
      pointsDOM.textContent = `Points: ${pointSum}`
      console.log(positivePoints);
      console.log(positivePointsDOM);
    }
  }
}

// function checkNearNegativePoints() {
//   for (let index = 0; index < negativePoints.length; index++) {
//     if (
//       ballPositionX > negativePoints[index].x - 15 &&
//       ballPositionX < negativePoints[index].x + 15 &&
//       ballPositionY > negativePoints[index].y - 15 &&
//       ballPositionY < negativePoints[index].y + 15
//     ) {
//       const pointDOM = negativePointsDOM[index];
//       boardBox.removeChild(pointDOM);
//       negativePoints.splice(index);
//       negativePointsDOM.splice(index);
//     }
//   }
// }

function animate() {
  changePosition();

  checkNearPositivePoints();
  window.requestAnimationFrame(animate);
}

window.requestAnimationFrame(animate);

function generatePositivePoint() {
  const randomX = getRandomX();
  const randomY = getRandomY();
  const point = document.createElement('div');

  point.classList.add('positive-point');
  point.style.left = `${randomX}px`;
  point.style.top = `${randomY}px`;

  takenPointsPositionX.push(randomX);
  takenPointsPositionY.push(randomY);
  positivePoints.push({ x: randomX, y: randomY });
  positivePointsDOM.push(point);

  boardBox.appendChild(point);
}
function generateNegativePoint() {
  const randomX = getRandomX();
  const randomY = getRandomY();
  const point = document.createElement('div');

  point.classList.add('negative-point');
  point.style.left = `${randomX}px`;
  point.style.top = `${randomY}px`;

  takenPointsPositionX.push(randomX);
  takenPointsPositionY.push(randomY);
  negativePoints.push({ x: randomX, y: randomY });
  negativePointsDOM.push(point);

  boardBox.appendChild(point);
}

for (let index = 0; index < currentGame.negativePoints; index++) {
  generateNegativePoint();
}
for (let index = 0; index < currentGame.positivePoints; index++) {
  generatePositivePoint();
}
