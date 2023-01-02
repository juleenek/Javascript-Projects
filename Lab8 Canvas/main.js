'use strict';

import { Dot } from './dot.js';
import { canvasOnClick, dotsOnMouseMove } from './eventFunc.js';

const sliderSpeed = document.getElementById('slider-speed');
const sliderDistance = document.getElementById('slide-distance');

const valueSpeed = document.querySelector('.range-value-speed');
const valueDistance = document.querySelector('.range-value-distance');

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
  valueSpeed.textContent = (Math.round(sliderSpeed.value * 100) / 100).toFixed(
    2
  );
  valueDistance.textContent = (
    Math.round(sliderDistance.value * 100) / 100
  ).toFixed(0);
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
    startBtn.classList.add('locked-start');
    isRunning = true;
  }
});

resetBtn.addEventListener('click', () => {
  addInputsVariables();
  emptyInputsVariables();
  reset();
  startBtn.classList.remove('locked-start');
});

clearBtn.addEventListener('click', () => {
  dotsNumInput.value = '';
  sliderSpeed.value = 0;
  sliderDistance.value = 0;
});

canvas.addEventListener('click', canvasOnClick);
canvas.addEventListener('mousemove', dotsOnMouseMove);

addInputsVariables();

sliderSpeed.addEventListener('input', (event) => {
  valueSpeed.textContent = (Math.round(event.target.value * 100) / 100).toFixed(
    2
  );
});
sliderDistance.addEventListener('input', (event) => {
  valueDistance.textContent = (
    Math.round(event.target.value * 100) / 100
  ).toFixed(0);
});

valueSpeed.textContent = (Math.round(sliderSpeed.value * 100) / 100).toFixed(2);
valueDistance.textContent = (
  Math.round(sliderDistance.value * 100) / 100
).toFixed(0);
