import { showNotes } from './helpers/enum.js';
import { getAllNotes } from './note.js';

let showNotesPage = showNotes.All;

const getDoneNotesEvent = () => {
  showNotesPage = showNotes.Done;
  getAllNotes();
};

const getAllNotesEvent = () => {
  showNotesPage = showNotes.All;
  getAllNotes();
};

export { getDoneNotesEvent, getAllNotesEvent, showNotesPage };
