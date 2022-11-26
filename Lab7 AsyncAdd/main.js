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

const optimalizeAddNumbers = async (numbers) => {
  let list = [];
  for (let index = 0; index < numbers.length - 1; index++) {
    
  }
};

const measureTime = async (callback) => {
  performance.mark('start');
  await callback;
  performance.mark('end');
  const measure = performance.measure('measure time', 'start', 'end');
  console.log(callback);
  console.log(measure);
};

measureTime(addNumbers([10, 1, 9]));

// Promiseall, dowhile
