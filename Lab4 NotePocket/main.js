'use strict';

import { createColorsBtns } from './helpers/colors.js';
import { Note, getAllNotes } from './note.js';
import { noteColor, resetColorsBorder } from './helpers/colors.js';
import { getAllNotesEvent, getDoneNotesEvent } from './panel.js';

const createBtn = document.querySelector('.create-btn');
const titleInput = document.querySelector('.title-input');
const contentArea = document.querySelector('.content-textarea');

const getDoneNotesBtn = document.querySelector('.done-notes-btn');
const getAllNotesBtn = document.querySelector('.all-notes-btn');

const createButtonEvent = () => {
  const note = new Note(titleInput.value, contentArea.value, noteColor);
  note.save();

  getAllNotes();
  clearForm();
};

const clearForm = () => {
  titleInput.value = '';
  contentArea.value = '';
  resetColorsBorder();
};

createBtn.addEventListener('click', createButtonEvent);
getAllNotesBtn.addEventListener('click', getAllNotesEvent);
getDoneNotesBtn.addEventListener('click', getDoneNotesEvent);

createColorsBtns();
getAllNotes();

export { createBtn, titleInput, contentArea, clearForm };
