'use strict';

const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

const MIN_DOT_POSITION = 21;
const MAX_DOT_POSITION = 21;
const CANVAS_SIZE = 700;

const dotsNumInput = document.querySelector('.dots-number');
const speedNumInput = document.querySelector('.speed');
let dotsNum;
let speedNum;

ctx.rect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.stroke();

function onChangeParseInt(input, inputValue) {
  input.addEventListener('change', () => {
    inputValue = parseInt(document.querySelector('.dots-number').value);
    if (isNaN(inputValue)) inputValue = 0;
  });
}

onChangeParseInt(dotsNumInput, dotsNum);
onChangeParseInt(speedNumInput, speedNum);

const dot = {
  x: 0,
  y: 0,
  size: 0,
  speed: speedNum,
  color: '#ffffff',
};

function drawDot(dot) {
  ctx.beginPath();
  ctx.arc(dot.x, dot.y, dot.size, 0, 2 * Math.PI);
  ctx.shadowColor = `${dot.color}`;
  ctx.shadowBlur = 15;
  ctx.fillStyle = `${dot.color}`;
  ctx.fill();
}

function getRandomDotSize() {
  return Math.random() * (17 - 7) + 7;
}

function getRandomDotPosition(dot) {
  return Math.random() * (MAX_DOT_POSITION - dot.size) + dot.size;
}

drawDot({ x: 21, y: CANVAS_SIZE , size: getRandomDotSize(), speed: 1, color: '#f098ff' });
