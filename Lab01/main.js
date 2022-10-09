let inputArray = [];

const container = document.querySelector('.container');
const addButton = document.createElement('button');
const deleteButton = document.createElement('button');

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

function createButtons(inputElement) {
  addButton.classList.add('addButton');
  addButton.textContent = `+`;

  deleteButton.classList.add('deleteButton');
  deleteButton.textContent = `-`;

  inputElement.appendChild(addButton);
  inputElement.appendChild(deleteButton);
}

for (let index = 0; index < 3; index++) {
  createInput(index + 1);
}

function display() {
  console.log(inputArray);
  for (let index = 0; index < inputArray.length; index++) {
    if (index + 1 == inputArray.length) createButtons(inputArray[index]);
    container.appendChild(inputArray[index]);
  }
}

display();

addButton.addEventListener('click', function () {
  createInput(inputArray.length + 1);
  display();
});

deleteButton.addEventListener('click', function () {
  const popInput = inputArray.pop();
  container.removeChild(popInput);
  display();
});
