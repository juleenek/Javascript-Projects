'use strict';

import {
  createTrackDOM,
  tracksDocument,
  removeTrack
} from './modules/document_operatons.js';

const START_RECORDING_KEY = '1';
const STOP_RECORDING_KEY = '2';

// Track: klawisz, czas pomiędzy naciśnięciem poprzedniego i obecnego
export let tracks = [];
export const tracksContainer = document.querySelector('.tracks_container');
export let binBtns = [];

const addTrackBtn = document.querySelector('.add_track_btn');

document.addEventListener('keypress', startRecording);
document.addEventListener('keypress', onKeyPress);

function createTruck() {
  const track = {
    isRecording: false,
    track: [],
  };
  tracks.push(track);
  createTrackDOM(tracks.indexOf(track));
  
  const trackBtns = tracksDocument[tracks.indexOf(track)].querySelector(
    '.actions_buttons_container'
  );
  const bin = trackBtns.querySelector('.bin_btn');
  bin.addEventListener('click', () => {
    removeTrack(tracks.indexOf(track));
  });
}

for (let index = 0; index < 4; index++) {
  createTruck();
}

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

function startRecording(event) {
  if (event.key === START_RECORDING_KEY) {
    let lastKeyTime = Date.now();

    document.addEventListener('keydown', (event) => {
      const currentTime = Date.now();
    });
  }
}

function onKeyPress(event) {
  const sound = KeyToSound[event.key.toLowerCase()];
  playSound(sound);
}

function playSound(sound) {
  const audioTag = document.querySelector(`#${sound}`);
  audioTag.currentTime = 0;
  audioTag.play();
}

addTrackBtn.addEventListener('click', () => {
  if (tracksDocument.length < 20) {
    createTruck();
    display();
  }
});

export function display() {
  console.log(' ');
  for (let index = 0; index < tracksDocument.length; index++) {
    tracksContainer.appendChild(tracksDocument[index]);
  }
  console.log(tracksDocument);
}

display();
