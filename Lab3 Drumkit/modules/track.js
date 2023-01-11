import { onKeyPress } from './keys.js';
import { delay } from './helpers.js';

const trackTemplate = document.querySelector('.track');
const tracksContainer = document.querySelector('.tracks-container');

let tracks = [];
let countId = 1;

export class Track {
  constructor() {
    this.id = countId;
    this.isRecording = false;
    this.trackTime = [];
    this.trackKeys = [];
    this.timeoutPlay = null;
    this.timer1 = null;
    this.timer2 = null;
    this.elementDOM = trackTemplate.cloneNode(true);
  }

  create() {
    if (tracks.length === 10) return;
    tracks.push(this);
    this.elementDOM.classList.remove('invisible');
    this.elementDOM.querySelector(
      '.track-name'
    ).textContent = `track ${this.id}`;

    const actionContainer = this.elementDOM.querySelector(
      '.actions-buttons-container'
    );
    const trackButtonsContainer = this.elementDOM.querySelector(
      '.tracks-buttons-container'
    );

    const binBtn = actionContainer.querySelector('.bin-btn');
    const loopBtn = actionContainer.querySelector('.loop-btn');
    const playBtn = trackButtonsContainer.querySelector('.play-button');
    const recordBtn = trackButtonsContainer.querySelector('.record-button');
    const stoprecordBtn =
      trackButtonsContainer.querySelector('.stoprecord-button');
    const nowPlayingBtn = trackButtonsContainer.querySelector('.now-playing');

    const btns = {
      play: playBtn,
      nowPlaying: nowPlayingBtn,
      record: recordBtn,
      stoprecord: stoprecordBtn,
      bin: binBtn,
      loop: loopBtn,
    };

    addTrackEvents(this, btns);

    this.update();
    countId++;
  }

  async play(button, nowPlaying) {
    nowPlaying.classList.remove('invisible');
    button.classList.add('invisible');
    for (let i = 0; i < this.trackTime.length; i++) {
      await delay(this.trackTime[i]);
      const key = this.trackKeys[i];
      onKeyPress(key);
    }
    button.classList.remove('invisible');
    nowPlaying.classList.add('invisible');
  }

  record(button, stopButton) {
    button.classList.add('invisible');
    stopButton.classList.remove('invisible');
    this.isRecording = true;
    this.timer1 = null;
    this.timer2 = null;
    let time = null;

    this.timer1 = Date.now();

    document.addEventListener('keyup', (event) => {
      if (this.isRecording) {
        this.timer2 = Date.now();
        time = this.timer2 - this.timer1;
        if (time !== 0 && time != 1) {
          const key = event.key.toLowerCase();
          this.trackTime.push(time);
          this.trackKeys.push(key);
          onKeyPress(key);
        }
        this.record(button, stopButton);
      }
    });
  }

  stopRecord(button, stopButton) {
    button.classList.remove('invisible');
    stopButton.classList.add('invisible');
    this.isRecording = false;
    console.log(...this.trackKeys);
    console.log(...this.trackTime);
  }

  remove() {
    const index = tracks.indexOf(this);
    if (index !== -1) {
      tracks.splice(index, 1);
    }
  }

  update() {
    tracksContainer.innerHTML = '';
    for (const trackDOM of tracks) {
      tracksContainer.appendChild(trackDOM.elementDOM);
    }
  }
}

const addTrackEvents = (track, btns) => {
  btns.bin.addEventListener('click', () => {
    track.remove();
    track.update();
  });
  btns.record.addEventListener('click', () => {
    track.record(btns.record, btns.stoprecord);
  });
  btns.stoprecord.addEventListener('click', () => {
    track.stopRecord(btns.record, btns.stoprecord);
  });
  btns.play.addEventListener('click', () => {
    track.play(btns.play, btns.nowPlaying);
  });
};
