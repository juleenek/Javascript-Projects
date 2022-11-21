import { binBtns, tracksContainer, display} from '../main.js';

export let tracksDocument = [];

export function createTrackDOM(trackIndex) {
  const track = document.createElement('div');
  track.classList.add('track');
  track.classList.add(`track-${trackIndex}`);

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
  binImg.classList.add(`bin-${trackIndex}`);
  binBtns.push(binImg);

  trackButtons.appendChild(playBtn);
  trackButtons.appendChild(pauseBtn);
  trackButtons.appendChild(recordBtn);

  actionsButtons.appendChild(loopImg);
  actionsButtons.appendChild(binImg);

  track.appendChild(trackButtons);
  track.appendChild(trackName);
  track.appendChild(actionsButtons);

  tracksDocument.push(track);
}

export function removeTrack(trackIndex) {
  console.log(trackIndex);
  tracksDocument.splice(trackIndex, 1);
  document.querySelector('.tracks_container').innerHTML = '';
  display();
}
