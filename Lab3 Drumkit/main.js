'use strict';

import { Track } from './modules/track.js';
import { playAllTracks } from './modules/track.js';
import { getSoundsInstruction } from './modules/keys.js';

export let tracks = [];
export const tracksContainer = document.querySelector('.tracks-container');
export let binBtns = [];

const addTrackBtn = document.querySelector('.add-track-btn');
const playAllTracksBtn = document.querySelector('.play-all');

const createTrack = () => {
  const track = new Track();
  track.create();
};

addTrackBtn.addEventListener('click', createTrack);
playAllTracksBtn.addEventListener('click', playAllTracks);
getSoundsInstruction();
