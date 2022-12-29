'use strict';

const canvas = document.querySelector('#canvas');

canvas.height = window.innerHeight - 1;
canvas.width = window.innerWidth - 1;

const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

const ctx = canvas.getContext('2d');

const colors = ['#c7c7c7', '#ffffff', '#7a7a7a', '#505050', '#a6a6a6', '#c8c8c8', '#393939'];

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

const dot = {
  x: 0,
  y: 0,
  size: 0,
  speed: speedNum,
  color: '#ffffff',
};

function drawDot(dot) {
  dot.x = getRandomDotXPosition(dot.size);
  dot.y = getRandomDotYPosition(dot.size);

  ctx.beginPath();
  ctx.arc(dot.x, dot.y, dot.size, 0, 2 * Math.PI);
  ctx.shadowColor = `${dot.color}`;
  ctx.shadowBlur = 5;
  ctx.fillStyle = `${dot.color}`;
  ctx.fill();
}

function getRandomDotSize() {
  return Math.random() * (17 - 7) + 7;
}

function getRandomDotXPosition(size) {
  return Math.random() * (CANVAS_WIDTH - size) + size;
}

function getRandomDotYPosition(size) {
  return Math.random() * (CANVAS_HEIGHT - size) + size;
}

dotsNumInput.addEventListener('change', () => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  for (let index = 0; index < dotsNum; index++) {
    drawDot({ size: getRandomDotSize(), speed: 1, color: `${colors[Math.floor(Math.random()*colors.length)]}` });
  }
});

