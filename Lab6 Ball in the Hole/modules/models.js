export const SENSORS_LIMIT = 25;

const currentGame = {
  positivePoints: 3,
  negativePoints: 3,
  points: 0,
  isPlaying: false
};

const positivePoint = {
  x: 0,
  y: 0,
};

const negativePoint = {
  x: 0,
  y: 0,
};

const easyDifficulty = {
  speed: SENSORS_LIMIT / 2,
  positivePoints: 3,
  negativePoints: 3,
};

const mediumDifficulty = {
  speed: SENSORS_LIMIT / 3,
  positivePoints: 3,
  negativePoints: 4,
};

const hardDifficulty = {
  speed: SENSORS_LIMIT / 4,
  positivePoints: 5,
  negativePoints: 5,
};

export {
  currentGame,
  positivePoint,
  negativePoint,
  easyDifficulty,
  mediumDifficulty,
  hardDifficulty,
};
