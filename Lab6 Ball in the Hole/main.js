'use strict';

const SENSORS_LIMIT = 25;

const ball = document.querySelector('.ball');
const boardBox = document.querySelector('.board-box');

let x, y;
let ball_X = 0;
let ball_Y = 0;
let ballPositionHorizontal;
let ballPositionVertical;

const maxX = boardBox.clientWidth - ball.clientWidth;
const maxY = boardBox.clientHeight - ball.clientHeight;

const game = {
  isWin: false,
  isBallNextToWallX: false,
  isBallNextToWallY: false,
};

function isBallNextToWall(ballPositionHorizontal, ballPositionVertical) {
  if (ballPositionHorizontal === 0 || ballPositionHorizontal === 328) {
    game.isBallNextToWallX = true;
  }  
  
  if(ballPositionHorizontal !== 0 && ballPositionHorizontal !== 328) {
    game.isBallNextToWallX = false;
  }

  if (ballPositionVertical === 0 || ballPositionVertical === 580) {
    game.isBallNextToWallY = true;
  } 

  if (ballPositionVertical !== 0 && ballPositionVertical !== 580) {
    game.isBallNextToWallY = false;
  } 

}

function handleOrientation(event) {
 
    x = event.gamma; 
    if (x > SENSORS_LIMIT) x = SENSORS_LIMIT;
    if (x < -SENSORS_LIMIT) x = -SENSORS_LIMIT;
    x += SENSORS_LIMIT;
  

    y = event.beta;
    if (y > SENSORS_LIMIT) y = SENSORS_LIMIT;
    if (y < -SENSORS_LIMIT) y = -SENSORS_LIMIT;
    y += SENSORS_LIMIT;
  
}

window.addEventListener('deviceorientation', handleOrientation);

function animate() {
  ballPositionHorizontal = (maxX * x) / (SENSORS_LIMIT * 2) + ball_X;
  ballPositionVertical = (maxY * y) / (SENSORS_LIMIT * 2) + ball_Y;
  ball.style.left = `${ballPositionHorizontal}px`;
  ball.style.top = `${ballPositionVertical}px`;

  moveX();
  moveY();
  isBallNextToWall(ballPositionHorizontal, ballPositionVertical);

  document.querySelector('.result').textContent = `  x = ${Math.floor(x)}   y = ${Math.floor(y)} 
  Vertical = ${Math.floor(ballPositionVertical)}   Horizotal = ${Math.floor(ballPositionHorizontal)}
  IsXWall: ${game.isBallNextToWallX}   IsYWall: ${game.isBallNextToWallY}`;

  if (game.isWin === false) {
    window.requestAnimationFrame(animate);
  }
}

window.requestAnimationFrame(animate);

function moveX() {
  if (!(ballPositionHorizontal <= 0 || ballPositionHorizontal >= 328)) {
    if (x > 0 && x - SENSORS_LIMIT < 0) {
      if (game.isBallNextToWallX === false) ball_X -= x / (SENSORS_LIMIT - 5);
    }
    if (x - SENSORS_LIMIT > 0 && x - SENSORS_LIMIT <= SENSORS_LIMIT) {
      if (game.isBallNextToWallX === false)
        ball_X += (x - SENSORS_LIMIT) / (SENSORS_LIMIT - 5);
    } 
  }
  if (ballPositionHorizontal <= 0) {
    ballPositionHorizontal = 0;
  }
  if (ballPositionHorizontal >= 328){
    ballPositionHorizontal = 328;
  } 
}

function moveY() {
  if (!(ballPositionVertical <= 0 || ballPositionVertical >= 580)) {
    if (y > 0 && y - SENSORS_LIMIT < 0) {
      if (game.isBallNextToWallY === false) ball_Y -= y / (SENSORS_LIMIT - 5);
    }
    if (y - SENSORS_LIMIT > 0 && y - SENSORS_LIMIT <= SENSORS_LIMIT) {
      if (game.isBallNextToWallY === false)
        ball_Y += (y - SENSORS_LIMIT) / (SENSORS_LIMIT - 5);
    }
  }
  if (ballPositionVertical <= 0) ballPositionVertical = 0;
  if (ballPositionVertical >= 580) ballPositionVertical = 580;
}
