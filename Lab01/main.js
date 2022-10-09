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

function addButtons(inputElement) {
  const addButton = document.createElement('button');
  addButton.classList.add('addButton');
  addButton.textContent = `+`;

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('deleteButton');
  deleteButton.textContent = `-`;

  inputElement.appendChild(addButton);
  inputElement.appendChild(deleteButton);
}

for (let index = 0; index < 3; index++) {
  createInput(index + 1);
}

for (let index = 0; index < inputArray.length; index++) {
  if (index + 1 == inputArray.length) {
    addButtons(inputArray[index]);
  }
  container.appendChild(inputArray[index]);
}
