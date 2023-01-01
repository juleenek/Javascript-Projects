import { Direction } from './helpers.js';
import { dots, speedNum } from './main.js';
import { Dot } from './dot.js';

const canvasOnClick = () => {
  for (let i = 0; i < 2; i++) {
    const dot = new Dot(speedNum);
    dots.push(dot);
  }
};

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

export { canvasOnClick, dotsOnMouseMove };
