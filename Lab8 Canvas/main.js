'use strict';

import { Dot } from './dot.js';

const canvas = document.querySelector('#canvas');

canvas.height = window.innerHeight - 1;
canvas.width = window.innerWidth - 1;

export const CANVAS_WIDTH = canvas.width;
export const CANVAS_HEIGHT = canvas.height;
export const ctx = canvas.getContext('2d');

const dotsNumInput = document.querySelector('.dots-number');
const speedNumInput = document.querySelector('.speed');

let dotsNum, speedNum;

ctx.rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
ctx.stroke();

dotsNumInput.addEventListener('change', () => {
  dotsNum = parseInt(document.querySelector('.dots-number').value);
  if (isNaN(dotsNum)) dotsNum = 0;
});

speedNumInput.addEventListener('change', () => {
  speedNum = parseInt(document.querySelector('.speed').value);
  if (isNaN(speedNum)) speedNum = 0;
});

dotsNumInput.addEventListener('change', () => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  for (let index = 0; index < dotsNum; index++) {
    const dot = new Dot(1);
    dot.draw();
    console.log(dot);
  }
});
