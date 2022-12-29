import { CANVAS_WIDTH, CANVAS_HEIGHT, ctx } from './main.js';

const colors = [
  '#c7c7c7',
  '#ffffff',
  '#7a7a7a',
  '#505050',
  '#a6a6a6',
  '#c8c8c8',
  '#393939',
];

export class Dot {
  constructor(speed) {
    this.size = this.getRandomSize();
    this.x = this.getRandomXPosition();
    this.y = this.getRandomYPosition();
    this.speed = speed;
    this.color = `${colors[Math.floor(Math.random() * colors.length)]}`;
  }

  getRandomSize() {
    return Math.random() * (17 - 7) + 7;
  }

  getRandomXPosition() {
    return Math.random() * (CANVAS_WIDTH - this.size) + this.size;
  }

  getRandomYPosition() {
    return Math.random() * (CANVAS_HEIGHT - this.size) + this.size;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.shadowColor = `${this.color}`;
    ctx.shadowBlur = 5;
    ctx.fillStyle = `${this.color}`;
    ctx.fill();
  }
}
