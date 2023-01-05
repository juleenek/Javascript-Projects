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

export let noteColor;

export const createColorsBtns = () => {
  for (const color of colors) {
    const colorDiv = document.createElement('div');
    colorDiv.classList.add('color');
    colorDiv.style.backgroundColor = `${color}`;
    colorDiv.style.border = `1px solid #455a8c7c`;
    colorsBox.appendChild(colorDiv);

    colorDiv.addEventListener('click', () => {
      for (const colorDiv of document.querySelectorAll('.color')) {
        colorDiv.style.border = `1px solid #455a8c7c`;
      }
      colorDiv.style.border = `1px solid #364a79`;
      noteColor = color;
    });
  }
};

export const resetColorsBorder = () => {
  for (const colorDiv of document.querySelectorAll('.color')) {
    colorDiv.style.border = `1px solid #455a8c7c`;
  }
};
