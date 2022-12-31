'use strict';

import { Dot } from './dot.js';

const canvas = document.querySelector('#canvas');

canvas.height = window.innerHeight - 1;
canvas.width = window.innerWidth - 1;

export const ctx = canvas.getContext('2d');
export let dots = [];

const dotsNumInput = document.querySelector('.dots-number');
const speedNumInput = document.querySelector('.speed');
const distanceNumInput = document.querySelector('.distance');

const startBtn = document.querySelector('.start-btn');
const resetBtn = document.querySelector('.reset-btn');
const clearBtn = document.querySelector('.clear-btn');

let dotsNum, speedNum;
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
  // speedNumInput.value = '';
  // dotsNumInput.value = '';
  // distanceNumInput.value = '';
  addInputsEvents();
  removeInputsEvents();
  reset();
});

clearBtn.addEventListener('click', () => {
  speedNumInput.value = '';
  dotsNumInput.value = '';
  distanceNumInput.value = '';
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
    dot.drawLine(distanceNumInput.value);
    dot.draw();
  });
  requestAnimationFrame(animate);
}

addInputsEvents();
