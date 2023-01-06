import { getAllNotes, updateNote, clearNotes, createNoteDOM } from './note.js';
import { createBtn, clearForm } from './main.js';
import { noteColor } from './helpers/colors.js';

const editBtn = document.querySelector('.edit-btn');
const titleInput = document.querySelector('.title-input');
const tagsInput = document.querySelector('.tags-input');
const contentArea = document.querySelector('.content-textarea');
const noteForm = document.querySelector('.main-note');
let notesArray = [];

const pinEvent = (note, pin, checkedPin) => {
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

const binEvent = (note, bin) => {
  bin.addEventListener('click', () => {
    localStorage.removeItem(note.id);
    getAllNotes();
  });
};

const doneEvent = (note, checkbox) => {
  checkbox.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
      note.isDone = true;
    } else {
      note.isDone = false;
    }
    updateNote(note);
  });
};

const tagEvent = (tagDiv) => {
  notesArray = [];
  clearNotes();
  for (let i = 0; i < localStorage.length; i++) {
    const note = localStorage.getItem(localStorage.key(i));
    notesArray.push(JSON.parse(note));
  }
  for (const note of notesArray.sort((a, b) => b.id - a.id)) {
    for (const tag of note.tags) {
      if (tag === tagDiv.textContent) {
        createNoteDOM(note);
        noteForm.classList.add('invisible');
      }
    }
  }
};

const editEvent = (note, noteDOM, editIcon) => {
  editIcon.addEventListener('click', () => {
    titleInput.value = note.title;
    contentArea.value = note.content;
    tagsInput.value = note.tags.join(' ');
    noteDOM.classList.add('invisible');
    createBtn.classList.add('invisible');
    editBtn.classList.remove('invisible');

    editBtn.addEventListener('click', () => {
      note.title = titleInput.value;
      console.log(titleInput.value);
      note.content = contentArea.value;
      note.tags = tagsInput.value.split(' ');
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

export { pinEvent, binEvent, doneEvent, editEvent, tagEvent };
