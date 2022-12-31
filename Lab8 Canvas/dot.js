import { ctx } from './main.js';
import { random } from './helpers.js';

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
  constructor(velocity = 0.15, minSize = 5, maxSize = 20) {
    this.minSize = minSize;
    this.maxSize = maxSize;
    this.size = random(minSize, maxSize);
    this.x = random(1, Math.round(canvas.width) - this.size);
    this.y = random(1, Math.round(canvas.height) - this.size);
    this.velocity = velocity;
    this.color = `${colors[Math.floor(Math.random() * colors.length)]}`;
    this.moveX = random(-this.maxSize * this.velocity, this.maxSize * this.velocity);
    this.moveY = random(-this.maxSize * this.velocity, this.maxSize * this.velocity);
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.shadowColor = `${this.color}`;
    ctx.shadowBlur = 5;
    ctx.fillStyle = `${this.color}`;
    ctx.fill();
  }

  move() {
    if (this.x + this.size >= canvas.width) {
      this.moveX = -this.maxSize * this.velocity ;
    }
    if (this.x - this.size <= 0) {
      this.moveX = this.maxSize * this.velocity ;
    }
    if (this.y + this.size >= canvas.height) {
      this.moveY = -this.maxSize * this.velocity ;
    }
    if (this.y - this.size <= 0) {
      this.moveY = this.maxSize * this.velocity ;
    }
    this.x += this.moveX;
    this.y += this.moveY;
  }
}
