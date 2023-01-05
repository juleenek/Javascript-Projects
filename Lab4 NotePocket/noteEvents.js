import { getAllNotes, updateNote } from './note.js';
import { createBtn, titleInput, contentArea, clearForm } from './main.js';
import { noteColor } from './helpers/colors.js';

const editBtn = document.querySelector('.edit-btn');

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
    createBtn.classList.toggle('invisible');
    editBtn.classList.toggle('invisible');
    noteDOM.classList.toggle('invisible');
    titleInput.value = note.title;
    contentArea.value = note.content;

    editBtn.addEventListener('click', () => {
      note.title = titleInput.value;
      note.content = contentArea.value;
      note.color = noteColor;
      noteDOM.classList.toggle('invisible');
      createBtn.classList.toggle('invisible');
      editBtn.classList.toggle('invisible');
      updateNote(note);
      clearForm();
    });
  });
};

export { pinEvents, binEvents, doneEvents, editEvents };
