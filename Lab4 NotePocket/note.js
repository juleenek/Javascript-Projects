import { pinEvents, binEvents, doneEvents, editEvents } from './noteEvents.js';
import { showNotes } from './helpers/enum.js';
import { showNotesPage } from './panel.js';

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
    this.showNotes = showNotes.All;
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
  noteDOM.style.backgroundColor = `${note.color}`;

  const pin = noteTopDOM.querySelector('.pin');
  const checkedPin = noteTopDOM.querySelector('.checked-pin');
  const bin = imgBoxBottomDOM.querySelector('.bin-icon');
  const editIcon = imgBoxBottomDOM.querySelector('.edit-icon');
  const doneLabel = noteBottomDOM.querySelector('.done-label');
  const doneCheckbox = doneLabel.querySelector('.done-input');

  pinEvents(note, pin, checkedPin);
  binEvents(note, bin);
  doneEvents(note, doneCheckbox);
  editEvents(note, noteDOM, editIcon);

  if (note.isDone) doneCheckbox.checked = true;
  if (!note.isDone) doneCheckbox.checked = false;

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
    if (showNotesPage === showNotes.All) {
      if (note.pin && !note.isDone) createNoteDOM(note);
    }
    if (showNotesPage === showNotes.Done) {
      if (note.pin && note.isDone) createNoteDOM(note);
    }
  }
  for (const note of notesArray.sort((a, b) => b.id - a.id)) {
    if (showNotesPage === showNotes.All) {
      if (!note.pin && !note.isDone) createNoteDOM(note);
    }
    if (showNotesPage === showNotes.Done) {
      if (!note.pin && note.isDone) createNoteDOM(note);
    }
  }
};

const updateNote = (note) => {
  localStorage.setItem(note.id, JSON.stringify(note));
  getAllNotes();
};

export { Note, getAllNotes, updateNote };
