'use strict';

import { Track } from './modules/track.js';

export let tracks = [];
export const tracksContainer = document.querySelector('.tracks-container');
export let binBtns = [];

const addTrackBtn = document.querySelector('.add-track-btn');

const START_RECORDING_KEY = '1';
const STOP_RECORDING_KEY = '2';

const KeyToSound = {
  w: 'boom',
  a: 'clap',
  e: 'hihat',
  s: 'kick',
  r: 'openhat',
  d: 'ride',
  t: 'snare',
  f: 'tink',
  g: 'tom',
};

const createTrack = () => {
  const track = new Track();
  track.create();
};

addTrackBtn.addEventListener('click', createTrack);
