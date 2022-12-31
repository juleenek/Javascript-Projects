'use strict';

import { Dot } from './dot.js';
import { isEveryInputNotEmpty } from './helpers.js';

const canvas = document.querySelector('#canvas');

canvas.height = window.innerHeight - 1;
canvas.width = window.innerWidth - 1;

export const ctx = canvas.getContext('2d');

const dotsNumInput = document.querySelector('.dots-number');
const speedNumInput = document.querySelector('.speed');
const distanceNumInput = document.querySelector('.distance');

const startBtn = document.querySelector('.start-btn');
const resetBtn = document.querySelector('.reset-btn');

let dotsNum, speedNum;
let dots = [];
let isRunning = false;

ctx.rect(0, 0, canvas.width, canvas.height);
ctx.stroke();

startBtn.addEventListener('click', () => {
  if (!isRunning) {
    addInputsEvents();
    animate();
    isRunning = true;
  }
});

resetBtn.addEventListener('click', () => {
  speedNumInput.value = '';
  dotsNumInput.value = '';
  distanceNumInput.value = '';
  addInputsEvents();
  removeInputsEvents();
  reset();
});

function addInputsEvents() {
  speedNum = parseFloat(speedNumInput.value);
  if (isNaN(speedNum)) speedNum = 0;

  dotsNum = parseInt(dotsNumInput.value);
  if (isNaN(dotsNum)) dotsNum = 0;

  for (let index = 0; index < dotsNum; index++) {
    const dot = new Dot(speedNum);
    dots.push(dot);
  }
}

function reset() {
  removeInputsEvents();
  dots = [];
  isRunning = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  cancelAnimationFrame(animate);
}

function removeInputsEvents() {
  speedNum = 0;
  dotsNum = 0;
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dots.forEach((dot) => {
    dot.move();
    dot.draw();
  });
  requestAnimationFrame(animate);
}

addInputsEvents();
