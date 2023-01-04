import { pinEvents, binEvents } from './noteEvents.js';

let id = 1;
const noteTemplate = document.querySelector('.note');
const container = document.querySelector('.container');
let notesArray = [];

class Note {
  constructor(title, content, color) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.color = color;
    this.pin = false;
    this.isDone = false;
    this.date = Date.now();
  }

  save() {
    localStorage.setItem(id, JSON.stringify(this));
    id++;
  }
}

const clearNotes = () => {
  const notesDOM = document.querySelectorAll('.note');
  for (const noteDOM of notesDOM) {
    container.removeChild(noteDOM);
  }
};

const createNoteDOM = (note) => {
  const today = new Date(note.date);
  const noteDOM = noteTemplate.cloneNode(true);

  const noteTopDOM = noteDOM.querySelector('.note-top');
  const noteBottomDOM = noteDOM.querySelector('.note-bottom');
  const imgBoxBottomDOM = noteDOM.querySelector('.img-box-bottom');

  const noteTitleDOM = noteTopDOM.querySelector('.title-note');
  const noteContentDOM = noteDOM.querySelector('.note-content');
  const noteDateDOM = noteBottomDOM.querySelector('.note-date');

  noteTitleDOM.textContent = `${note.title}`;
  noteContentDOM.innerHTML = `${note.content}`;
  noteDateDOM.innerHTML = `${today.toDateString()}`;
  noteDOM.style.backgroundColor = `${note.color}`

  const pin = noteTopDOM.querySelector('.pin');
  const checkedPin = noteTopDOM.querySelector('.checked-pin');
  const bin = imgBoxBottomDOM.querySelector('.bin-icon');

  pinEvents(note, pin, checkedPin);
  binEvents(note, bin);

  container.appendChild(noteDOM);
};

const getAllNotes = () => {
  notesArray = [];
  clearNotes();
  for (let i = 0; i < localStorage.length; i++) {
    const note = localStorage.getItem(localStorage.key(i));
    notesArray.push(JSON.parse(note));
  }
  for (const note of notesArray.sort((a, b) => b.id - a.id)) {
    if (note.pin === true) createNoteDOM(note);
  }
  for (const note of notesArray.sort((a, b) => b.id - a.id)) {
    if (note.pin !== true) createNoteDOM(note);
  }
};

export { Note, getAllNotes };
