const random = (min, max) => {
  let num = Math.floor(Math.random() * (max - min + 1)) + min;
  if (num === 0) return random(min, max);
  if (num !== 0) return num;
};

const Direction = {
  ToUp: 'Up',
  ToDown: 'Down',
  ToLeft: 'Left',
  ToRight: 'Right',
};

export { random, Direction };
