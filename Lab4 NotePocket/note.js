import {
  pinEvent,
  binEvent,
  doneEvent,
  editEvent,
  tagEvent,
} from './noteEvents.js';
import { showNotes } from './helpers/enum.js';
import { showNotesPage } from './panel.js';

let id = 1;
const noteTemplate = document.querySelector('.note');
const container = document.querySelector('.container');
let notesArray = [];

class Note {
  constructor(title, content, tagsString, color) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.color = color;
    this.pin = false;
    this.isDone = false;
    this.tags = tagsString.split(' ');
    this.date = Date.now();
    this.showNotes = showNotes.All;
  }

  save() {
    localStorage.setItem(id, JSON.stringify(this));
    id++;
  }
}

export const clearNotes = () => {
  const notesDOM = document.querySelectorAll('.note');
  for (const noteDOM of notesDOM) {
    container.removeChild(noteDOM);
  }
};

export const createNoteDOM = (note) => {
  const today = new Date(note.date);
  const noteDOM = noteTemplate.cloneNode(true);
  noteDOM.classList.remove('invisible');

  const noteTopDOM = noteDOM.querySelector('.note-top');
  const noteBottomDOM = noteDOM.querySelector('.note-bottom');
  const imgBoxBottomDOM = noteDOM.querySelector('.img-box-bottom');
  const tagsBoxDOM = noteDOM.querySelector('.tags-box');

  const noteTitleDOM = noteTopDOM.querySelector('.title-note');
  const noteContentDOM = noteDOM.querySelector('.note-content');
  const noteDateDOM = noteDOM.querySelector('.note-date');

  noteTitleDOM.textContent = `${note.title}`;
  noteContentDOM.innerHTML = `${note.content}`;
  noteDateDOM.innerHTML = `${today
    .toString()
    .slice(0, today.toUTCString().length - 4)}`;
  noteDOM.style.backgroundColor = `${note.color}`;

  addTagsToNote(note, tagsBoxDOM);

  const pin = noteTopDOM.querySelector('.pin');
  const checkedPin = noteTopDOM.querySelector('.checked-pin');
  const bin = imgBoxBottomDOM.querySelector('.bin-icon');
  const editIcon = imgBoxBottomDOM.querySelector('.edit-icon');
  const doneLabel = noteBottomDOM.querySelector('.done-label');
  const doneCheckbox = doneLabel.querySelector('.done-input');

  pinEvent(note, pin, checkedPin);
  binEvent(note, bin);
  doneEvent(note, doneCheckbox);
  editEvent(note, noteDOM, editIcon);

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

const addTagsToNote = (note, tagsBoxDOM) => {
  if (note.tags == undefined) return;
  for (const tag of note.tags) {
    if (tag !== '') {
      const tagDiv = document.createElement('div');
      tagDiv.classList.add('tag');
      tagDiv.textContent = `${tag}`;
      tagDiv.addEventListener('click', () => tagEvent(tagDiv));
      tagsBoxDOM.appendChild(tagDiv);
    }
  }
};

export { Note, getAllNotes, updateNote };
