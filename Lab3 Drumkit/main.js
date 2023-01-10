'use strict';

import { Track } from './modules/track.js';
import { onKeyPress } from './modules/keys.js';

export let tracks = [];
export const tracksContainer = document.querySelector('.tracks-container');
export let binBtns = [];

const addTrackBtn = document.querySelector('.add-track-btn');

const createTrack = () => {
  const track = new Track();
  track.create();
};

addTrackBtn.addEventListener('click', createTrack);
