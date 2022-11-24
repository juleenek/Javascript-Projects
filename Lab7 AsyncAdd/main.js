'use strict';

const asyncAdd = async (a, b) => {
  if (typeof a !== 'number' || typeof b !== 'number') {
    return Promise.reject('Argumenty muszą mieć typ number!');
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 100);
  });
};

const addNumbers = async (numbers) => {
  let sum = 0;
  for (let index = 0; index < numbers.length; index++) {
    sum = await asyncAdd(sum, numbers[index]);
  }
  return sum;
};

const measureTime = async () => {
  performance.mark('start');
  await addNumbers([10, 10, 10, 10]);
  performance.mark('end');
  console.log(performance.measure('measure time', 'start', 'end'));
};

measureTime();