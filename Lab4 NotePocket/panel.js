import { showNotes } from './helpers/enum.js';
import { getAllNotes } from './note.js';

let showNotesPage = showNotes.All;
const noteForm = document.querySelector('.main-note');

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

export { getDoneNotesEvent, getAllNotesEvent, showNotesPage };
