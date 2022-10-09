let inputArray = [];

const container = document.querySelector('.container');

function createInput(elementIndex) {
  const inputContainer = document.createElement('div');
  inputContainer.classList.add('inputContainer');

  const inputLabel = document.createElement('label');
  inputLabel.textContent = `${elementIndex}`;

  const inputElement = document.createElement('input');
  // Dodać placeholder

  inputContainer.appendChild(inputLabel);
  inputContainer.appendChild(inputElement);

  inputArray.push(inputContainer);
}

for (let index = 0; index < 3; index++) {
  createInput(index + 1);
}

for (let index = 0; index < inputArray.length; index++) {
  container.appendChild(inputArray[index]);
}
