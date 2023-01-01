'use strict';

import { Dot } from './dot.js';
import { canvasOnClick, dotsOnMouseMove } from './eventFunc.js';

const sliderSpeed = document.getElementById('slider-speed');
const sliderDistance = document.getElementById('slide-distance');

const canvas = document.querySelector('#canvas');

canvas.height = window.innerHeight - 1;
canvas.width = window.innerWidth - 1;

export const ctx = canvas.getContext('2d');
export let dots = [];
export let dotsNum, speedNum, distanceNum;
let isRunning = false;

const dotsNumInput = document.querySelector('.dots-number');

const startBtn = document.querySelector('.start-btn');
const resetBtn = document.querySelector('.reset-btn');
const clearBtn = document.querySelector('.clear-btn');

ctx.rect(0, 0, canvas.width, canvas.height);
ctx.stroke();

const addInputsVariables = () => {
  speedNum = sliderSpeed.value;
  if (isNaN(speedNum)) speedNum = 0;

  dotsNum = parseInt(dotsNumInput.value);
  if (isNaN(dotsNum)) dotsNum = 0;

  distanceNum = sliderDistance.value;
  if (isNaN(distanceNum)) distanceNum = 0;

  for (let index = 0; index < dotsNum; index++) {
    const dot = new Dot(speedNum);
    dots.push(dot);
  }
};

const reset = () => {
  emptyInputsVariables();
  dots = [];
  isRunning = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  cancelAnimationFrame(animate);
};

const emptyInputsVariables = () => {
  sliderSpeed.value = 0;
  sliderDistance.value = 0;
  dotsNum = 0;
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dots.forEach((dot) => {
    dot.move();
    dot.drawLine(distanceNum);
    dot.draw();
  });
  requestAnimationFrame(animate);
};

startBtn.addEventListener('click', () => {
  if (!isRunning) {
    addInputsVariables();
    animate();
    isRunning = true;
  }
});

resetBtn.addEventListener('click', () => {
  addInputsVariables();
  emptyInputsVariables();
  reset();
});

clearBtn.addEventListener('click', () => {
  dotsNumInput.value = '';
  sliderSpeed.value = 0;
  sliderDistance.value = 0;
});

canvas.addEventListener('click', canvasOnClick);
canvas.addEventListener('mousemove', dotsOnMouseMove);

addInputsVariables();
