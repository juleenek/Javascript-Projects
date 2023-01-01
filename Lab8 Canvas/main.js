'use strict';

import { Dot } from './dot.js';
import { Direction } from './helpers.js';

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
  addInputsEvents();
  removeInputsEvents();
  reset();
});

clearBtn.addEventListener('click', () => {
  speedNumInput.value = '';
  dotsNumInput.value = '';
  distanceNumInput.value = '';
});

const addInputsEvents = () => {
  speedNum = parseFloat(speedNumInput.value);
  if (isNaN(speedNum)) speedNum = 0;

  dotsNum = parseInt(dotsNumInput.value);
  if (isNaN(dotsNum)) dotsNum = 0;

  for (let index = 0; index < dotsNum; index++) {
    const dot = new Dot(speedNum);
    dots.push(dot);
  }
}

const reset = () => {
  removeInputsEvents();
  dots = [];
  isRunning = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  cancelAnimationFrame(animate);
}

const removeInputsEvents = () => {
  speedNum = 0;
  dotsNum = 0;
}

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dots.forEach((dot) => {
    dot.move();
    dot.drawLine(distanceNumInput.value);
    dot.draw();
  });
  requestAnimationFrame(animate);
}

const dotOnClick = () => {
  for (let i = 0; i < 2; i++) {
    const dot = new Dot(speedNum);
    dots.push(dot);
  }
}

const dotsOnMouseMove = (e) => {
  for (const dot of dots) {
    if (
      e.clientX > dot.x &&
      e.clientX < dot.x + 20 &&
      e.clientY > dot.y &&
      e.clientY < dot.y + 20
    ) {
      dot.move(Direction.ToLeft, Direction.ToDown, 1);
    }
    if (
      e.clientX > dot.x &&
      e.clientX < dot.x + 20 &&
      e.clientY < dot.y &&
      e.clientY > dot.y - 20
    ) {
      dot.move(Direction.ToLeft, Direction.ToUp, 1);
    }
    if (
      e.clientX < dot.x &&
      e.clientX > dot.x - 20 &&
      e.clientY > dot.y &&
      e.clientY < dot.y + 20
    ) {
      dot.move(Direction.ToRight, Direction.ToDown, 1);
    }
    if (
      e.clientX < dot.x &&
      e.clientX > dot.x - 20 &&
      e.clientY < dot.y &&
      e.clientY > dot.y - 20
    ) {
      dot.move(Direction.ToRight, Direction.ToUp, 1);
    }
  }
};

canvas.addEventListener('click', dotOnClick);
canvas.addEventListener('mousemove', dotsOnMouseMove);
addInputsEvents();