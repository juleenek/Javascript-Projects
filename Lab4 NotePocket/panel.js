import { showNotes } from './helpers/enum.js';
import { getAllNotes, clearNotes, createNoteDOM } from './note.js';

let showNotesPage = showNotes.All;
const noteForm = document.querySelector('.main-note');
const searchInput = document.querySelector('.search-input');
const editIcons = document.querySelectorAll('.edit-icon');
let notesArraySearch = [];

const getDoneNotesEvent = () => {
  invisibleEditIcons();
  showNotesPage = showNotes.Done;
  getAllNotes();
  noteForm.classList.add('invisible');
};

const getAllNotesEvent = () => {
  visibleEditIcons();
  showNotesPage = showNotes.All;
  getAllNotes();
  noteForm.classList.remove('invisible');
};

const searchInputEvent = () => {
  if (searchInput.value.length >= 3) {
    notesArraySearch = [];
    clearNotes();

    for (let i = 0; i < localStorage.length; i++) {
      const note = localStorage.getItem(localStorage.key(i));
      notesArraySearch.push(JSON.parse(note));
    }
    for (const note of notesArraySearch) {
      if (
        note.title.includes(searchInput.value) ||
        note.content.includes(searchInput.value) ||
        note.tags.join('').includes(searchInput.value)
      ) {
        invisibleEditIcons();
        createNoteDOM(note);
        noteForm.classList.add('invisible');
      }
    }
  } else {
    getAllNotesEvent();
    console.log('omg');
  }
};

export const invisibleEditIcons = () => {
  editIcons.forEach((icon) => {
    icon.classList.add('invisible');
  });
};

const visibleEditIcons = () => {
  editIcons.forEach((icon) => {
    icon.classList.remove('invisible');
  });
};

export { getDoneNotesEvent, getAllNotesEvent, showNotesPage, searchInputEvent };
