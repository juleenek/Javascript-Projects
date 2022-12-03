import {
  MAX_POSITION_X,
  MAX_POSITION_Y,
  takenPointsPositionX,
  takenPointsPositionY,
} from '../main.js';

export function getRandomX() {
  const random = Math.random() * MAX_POSITION_X;
  for (let index = 0; index < takenPointsPositionX.length; index++) {
    if (
      random > takenPointsPositionX[index] - 20 &&
      random < takenPointsPositionX[index] + 20
    ) {
      return getRandomX();
    }
  }
  return (random > 145 && random < 195) ||
    random < 10 ||
    random > MAX_POSITION_X - 10
    ? getRandomX()
    : random;
}

export function getRandomY() {
  const random = Math.random() * MAX_POSITION_Y;
  for (let index = 0; index < takenPointsPositionY.length; index++) {
    if (
      random > takenPointsPositionY[index] - 22 &&
      random < takenPointsPositionY[index] + 22
    ) {
      return getRandomY();
    }
  }
  return (random > 400 && random < 490) ||
    (random > 10 && random < 80) ||
    random < 20 ||
    random > MAX_POSITION_Y - 20
    ? getRandomY()
    : random;
}
