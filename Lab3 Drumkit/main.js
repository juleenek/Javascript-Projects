'use strict';

const START_RECORDING_KEY = '1';
const STOP_RECORDING_KEY = '2';

const tracksContainer = document.querySelector('.tracks_container');
const addTrackBtn = document.querySelector('.add_track_btn');
let binBtns = [];

document.addEventListener('keypress', startRecording);
document.addEventListener('keypress', onKeyPress);

// Track: klawisz, czas pomiędzy naciśnięciem poprzedniego i obecnego
let tracks = [];

function createTrackDOM(trackIndex) {
  const track = document.createElement('div');
  track.classList.add('track');

  const trackButtons = document.createElement('div');
  trackButtons.classList.add('tracks_buttons_container');

  const playBtn = document.createElement('i');
  const pauseBtn = document.createElement('i');
  const recordBtn = document.createElement('i');
  playBtn.classList.add('play-button');
  pauseBtn.classList.add('pause-button');
  recordBtn.classList.add('record-button');

  const trackName = document.createElement('div');
  trackName.classList.add('track_name');
  trackName.textContent = `track ${trackIndex + 1}`;

  const actionsButtons = document.createElement('div');
  actionsButtons.classList.add('actions_buttons_container');

  const loopImg = document.createElement('img');
  const binImg = document.createElement('img');
  loopImg['src'] = 'assets/loop.png';
  binImg['src'] = 'assets/bin.png';
  binImg.classList.add(`bin_btn`);
  binImg.classList.add(`${trackIndex}`);
  binBtns.push(binImg);

  trackButtons.appendChild(playBtn);
  trackButtons.appendChild(pauseBtn);
  trackButtons.appendChild(recordBtn);

  actionsButtons.appendChild(loopImg);
  actionsButtons.appendChild(binImg);

  track.appendChild(trackButtons);
  track.appendChild(trackName);
  track.appendChild(actionsButtons);

  tracksContainer.appendChild(track);
}

function removeTrack(trackIndex) {
  tracksContainer.removeChild(tracksContainer.childNodes[trackIndex]);
}
function binEvent() {
  binBtns.forEach((binBtn) => {
    binBtn.addEventListener('click', () => {
      const classes = binBtn.className.split(' ');
      console.log(classes[1]);
      removeTrack(parseInt(classes[1]));
    });
  });
}

function createTruck() {
  binEvent();

  const track = {
    isRecording: false,
    track: [],
  };
  tracks.push(track);
  createTrackDOM(tracks.indexOf(track));
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
  if (tracks.length < 20) {
    createTruck();
  }
});
