let inputArray = [];
let inputValuesArray = [];

const sum = document.querySelector('.sum');
const average = document.querySelector('.average');
const min = document.querySelector('.min');
const max = document.querySelector('.max');

const arrayLimit = 20;

const fields = document.querySelector('.fields');
const outputContainer = document.querySelector('.outputContainer');

const addButton = document.createElement('button');
const deleteButton = document.createElement('button');

function createInput(elementIndex) {
  const field = document.createElement('div');
  field.classList.add('field');

  const inputLabel = document.createElement('label');
  inputLabel.textContent = `${elementIndex}`;

  const inputElement = document.createElement('input');

  field.appendChild(inputLabel);
  field.appendChild(inputElement);

  inputArray.push(field);
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
  if (inputArray.length > arrayLimit) return;
  if (inputArray.length == 1) deleteButton.classList.add('invisibleElement');
  for (let index = 0; index < inputArray.length; index++) {
    if (index + 1 == inputArray.length) createButtons(inputArray[index]);
    fields.appendChild(inputArray[index]);
  }
}

display();

function createInputByButton() {
  if (inputArray.length >= arrayLimit) return;
  createInput(inputArray.length + 1);
  deleteButton.classList.remove('invisibleElement');
  display();
}

function deleteInputByButton() {
  if (inputArray.length != 1) {
    const popInput = inputArray.pop();
    fields.removeChild(popInput);
    display();
  }
}

addButton.addEventListener('click', function () {
  createInputByButton();
  getResults();
  inputArray.forEach((element) => {
    element.children[1].addEventListener('change', function () {
      getResults();
      display();
    });
  });
});

deleteButton.addEventListener('click', function () {
  deleteInputByButton();
  getResults();
  inputArray.forEach((element) => {
    element.children[1].addEventListener('change', function () {
      getResults();
      display();
    });
  });
});

// Results

function addValuesToArray() {
  for (let index = 0; index < inputArray.length; index++) {
    const parentValue = inputArray[index];
    const childValue = parentValue.children[1];
    const value = childValue.value;

    if (parseInt(value)) {
      inputValuesArray.push(value);
    } else {
      
    }
  }
}

function getResults() {
  addValuesToArray();
  let sumValue = 0;
  for (let index = 0; index < inputValuesArray.length; index++) {
    sumValue += parseInt(inputValuesArray[index]);
  }
  // Jeśli input to string to nie licz sumy!
  // Dodać klase podświetlającą gdzie jest źle
  let averageValue = sumValue / inputValuesArray.length || 0;

  let minValue = Math.min(...inputValuesArray);
  if (minValue == Number.POSITIVE_INFINITY || !minValue) minValue = 0;
  let maxValue = Math.max(...inputValuesArray);
  if (maxValue == Number.NEGATIVE_INFINITY || !maxValue) maxValue = 0;

  sum.textContent = `Sum: ${sumValue}`;
  average.textContent = `Average: ${averageValue}`;
  min.textContent = `Min: ${minValue}`;
  max.textContent = `Max: ${maxValue}`;

  inputValuesArray = [];
}
getResults();
inputArray.forEach((element) => {
  element.children[1].addEventListener('change', function () {
    getResults();
    display();
  });
});
