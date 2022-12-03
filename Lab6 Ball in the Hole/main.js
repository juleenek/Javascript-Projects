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
let SPEED_BALL = 0;

const ball = document.querySelector('.ball');
const pointsBox = document.querySelector('.points-box');
const pointsTitle = document.querySelector('.points');

const easyBtn = document.querySelector('.easy');
const mediumBtn = document.querySelector('.medium');
const hardBtn = document.querySelector('.hard');
const startPanel = document.querySelector('.start-panel');

let isLevelChoosen = false;
let x, y;
let isGameStopped;
let moveX;
let moveY;
let ballPositionX;
let ballPositionY;
let pointSum;

export let takenPointsPositionX;
export let takenPointsPositionY;
let positivePoints;
let negativePoints;
let positivePointsDOM;
let negativePointsDOM;

function chooseLevel() {
  startPanel.classList.remove('invisible');

  easyBtn.addEventListener('click', () => {
    currentGame.positivePoints = 3;
    currentGame.negativePoints = 3;
    SPEED_BALL = SENSORS_LIMIT / 2;
    isLevelChoosen = true;
    startPanel.classList.add('invisible');
  });
  mediumBtn.addEventListener('click', () => {
    currentGame.positivePoints = 4;
    currentGame.negativePoints = 4;
    SPEED_BALL = SENSORS_LIMIT / 3;
    isLevelChoosen = true;
    startPanel.classList.add('invisible');
  });
  hardBtn.addEventListener('click', () => {
    currentGame.positivePoints = 5;
    currentGame.negativePoints = 5;
    SPEED_BALL = SENSORS_LIMIT / 4;
    isLevelChoosen = true;
    startPanel.classList.add('invisible');
  });
}

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
      ballPositionX > positivePoints[index].x - 20 &&
      ballPositionX < positivePoints[index].x + 20 &&
      ballPositionY > positivePoints[index].y - 20 &&
      ballPositionY < positivePoints[index].y + 20
    ) {
      const pointDOM = positivePointsDOM[index];
      pointSum += 1;
      pointsBox.removeChild(pointDOM);
      positivePoints.splice(index, 1);
      positivePointsDOM.splice(index, 1);
      pointsTitle.textContent = `Points: ${pointSum}`;
      console.log(positivePoints);
      console.log(positivePointsDOM);
    }
  }
}

function checkNearNegativePoints() {
  for (let index = 0; index < negativePoints.length; index++) {
    if (
      ballPositionX > negativePoints[index].x - 20 &&
      ballPositionX < negativePoints[index].x + 20 &&
      ballPositionY > negativePoints[index].y - 20 &&
      ballPositionY < negativePoints[index].y + 20
    ) {
      newGame();
    }
  }
}

function animate() {
  if (isGameStopped === false) {
    changePosition();
    checkNearPositivePoints();
    checkNearNegativePoints();
    window.requestAnimationFrame(animate);
  }
}

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

  pointsBox.appendChild(point);
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

  pointsBox.appendChild(point);
}

function newGame() {
  moveX = 0;
  moveY = 0;
  isGameStopped = false;
  ballPositionX = 165;
  ballPositionY = 450;
  pointSum = 0;
  pointsTitle.textContent = `Points: ${pointSum}`;

  takenPointsPositionX = [];
  takenPointsPositionY = [];
  positivePoints = [];
  negativePoints = [];
  positivePointsDOM = [];
  negativePointsDOM = [];

  pointsBox.replaceChildren();

  window.addEventListener('deviceorientation', handleOrientation);
  window.requestAnimationFrame(animate);

  for (let index = 0; index < currentGame.negativePoints; index++) {
    generateNegativePoint();
  }
  for (let index = 0; index < currentGame.positivePoints; index++) {
    generatePositivePoint();
  }
}

chooseLevel();

setReadyListener();

function setReadyListener() {
  const readyListener = () => {
    if (isLevelChoosen) {
      return newGame();
    }
    return setTimeout(readyListener, 250);
  };
  readyListener();
}

