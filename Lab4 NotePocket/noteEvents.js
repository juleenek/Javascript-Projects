import { getAllNotes } from './note.js';

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
    localStorage.setItem(note.id, JSON.stringify(note));
    getAllNotes();
  });
  checkedPin.addEventListener('click', () => {
    pin.classList.toggle('unvisible');
    checkedPin.classList.toggle('unvisible');
    note.pin = false;
    localStorage.setItem(note.id, JSON.stringify(note));
    getAllNotes();
  });
};

const binEvents = (note, bin) => {
  bin.addEventListener('click', () => {
    localStorage.removeItem(note.id);
    getAllNotes();
  });
};

export { pinEvents, binEvents };
