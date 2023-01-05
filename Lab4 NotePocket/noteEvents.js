import { getAllNotes, updateNote } from './note.js';
import { createBtn, clearForm } from './main.js';
import { noteColor } from './helpers/colors.js';

const editBtn = document.querySelector('.edit-btn');
const titleInput = document.querySelector('.title-input');
const contentArea = document.querySelector('.content-textarea');

const pinEvents = (note, pin, checkedPin) => {
  if (!note.pin) {
    checkedPin.classList.add('invisible');
  } else {
    pin.classList.add('invisible');
  }

  pin.addEventListener('click', () => {
    pin.classList.toggle('invisible');
    checkedPin.classList.toggle('invisible');
    note.pin = true;
    updateNote(note);
  });
  checkedPin.addEventListener('click', () => {
    pin.classList.toggle('invisible');
    checkedPin.classList.toggle('invisible');
    note.pin = false;
    updateNote(note);
  });
};

const binEvents = (note, bin) => {
  bin.addEventListener('click', () => {
    localStorage.removeItem(note.id);
    getAllNotes();
  });
};

const doneEvents = (note, checkbox) => {
  checkbox.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
      note.isDone = true;
    } else {
      note.isDone = false;
    }
    updateNote(note);
  });
};

const editEvents = (note, noteDOM, editIcon) => {
  editIcon.addEventListener('click', () => {
    titleInput.value = note.title;
    contentArea.value = note.content;
    noteDOM.classList.add('invisible');
    createBtn.classList.add('invisible');
    editBtn.classList.remove('invisible');

    editBtn.addEventListener('click', () => {
      note.title = titleInput.value;
      console.log(titleInput.value);
      note.content = contentArea.value;
      note.color = noteColor;
      updateNote(note);
      noteDOM.classList.remove('invisible');
      createBtn.classList.remove('invisible');
      editBtn.classList.add('invisible');
      setTimeout(function () {
        clearForm();
      }, 100);
    });
  });
};

export { pinEvents, binEvents, doneEvents, editEvents };
