'use strict';

const ball = document.querySelector('.ball');
const boardBox = document.querySelector('.board-box');

const maxX = boardBox.clientWidth - ball.clientWidth;
const maxY = boardBox.clientHeight - ball.clientHeight;

function handleOrientation(event) {
  let x = event.gamma;
  let y = event.beta;

  if (x > 30) x = 30;
  if (x < -30) x = -30;
  if (y > 30) y = 30;
  if (y < -30) y = -30;

  x += 30;
  y += 30;

  ball.style.left = `${(maxX * x) / 60}px`;
  ball.style.top = `${(maxY * y) / 60}px`;
}

window.addEventListener('deviceorientation', handleOrientation);

function animate() {}

requestAnimationFrame(() => animate());
