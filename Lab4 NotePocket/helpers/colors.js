const colorsBox = document.querySelector('.colors-box');

const colors = [
  '#faebd7',
  '#d7f5fa',
  '#f1d7fa',
  '#fad7d7',
  '#dcfad7',
  '#e2d7fa',
  '#f8fad7',
  '#dee5e6',
];

export const createColorsBtns = () => {
  for (const color of colors) {
    const colorDiv = document.createElement('div');
    colorDiv.classList.add('color');
    colorDiv.style.backgroundColor = `${color}`;
    colorDiv.style.border = `1px solid #bfbfbf`;
    colorsBox.appendChild(colorDiv);
  }
};
