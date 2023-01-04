'use strict';

import { createColorsBtns } from './helpers/colors.js';
import { Note, getAllNotes } from './note.js';

const createBtn = document.querySelector('.create-btn');
const titleInput = document.querySelector('.title-input');
const contentArea = document.querySelector('.content-textarea');
const tagsInput = document.querySelector('.tags-input');

const createButtonEvent = () => {
  const note = new Note(titleInput.value, contentArea.value, tagsInput.value);
  console.log(note);
  note.save();
  getAllNotes();
};

createBtn.addEventListener('click', createButtonEvent);

createColorsBtns();
getAllNotes();
