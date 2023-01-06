import { showNotes } from './helpers/enum.js';
import { getAllNotes, clearNotes, createNoteDOM } from './note.js';

let showNotesPage = showNotes.All;
const noteForm = document.querySelector('.main-note');
const searchInput = document.querySelector('.search-input');
let notesArray = [];

const getDoneNotesEvent = () => {
  showNotesPage = showNotes.Done;
  getAllNotes();
  noteForm.classList.add('invisible');
};

const getAllNotesEvent = () => {
  showNotesPage = showNotes.All;
  getAllNotes();
  noteForm.classList.remove('invisible');
};

const searchInputEvent = () => {
  if (searchInput.value.length >= 3) {
    notesArray = [];
    let joinedTags;
    clearNotes();
    for (let i = 0; i < localStorage.length; i++) {
      const note = localStorage.getItem(localStorage.key(i));
      notesArray.push(JSON.parse(note));
    }
    for (const note of notesArray.sort((a, b) => b.id - a.id)) {
      if (note.title.includes(searchInput.value)) {
        createNoteDOM(note);
        noteForm.classList.add('invisible');
      } else if (note.content.includes(searchInput.value)) {
        createNoteDOM(note);
        noteForm.classList.add('invisible');
      } else if (note.tags.join('').includes(searchInput.value)) {
        createNoteDOM(note);
        noteForm.classList.add('invisible');
      }
    }
  } else {
    getDoneNotesEvent();
    if (showNotesPage === showNotes.All) noteForm.classList.remove('invisible');
  }
};

export { getDoneNotesEvent, getAllNotesEvent, showNotesPage, searchInputEvent };
