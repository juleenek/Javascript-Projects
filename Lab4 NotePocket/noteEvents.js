import { getAllNotes, updateNote } from './note.js';

const pinEvents = (note, pin, checkedPin) => {
  if (!note.pin) {
    checkedPin.classList.add('unvisible');
  } else {
    pin.classList.add('unvisible');
  }

  pin.addEventListener('click', () => {
    pin.classList.toggle('unvisible');
    checkedPin.classList.toggle('unvisible');
    note.pin = true;
    updateNote(note);
  });
  checkedPin.addEventListener('click', () => {
    pin.classList.toggle('unvisible');
    checkedPin.classList.toggle('unvisible');
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

export { pinEvents, binEvents, doneEvents };
