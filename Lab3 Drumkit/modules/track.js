import { onKeyPress } from './keys.js';

const trackTemplate = document.querySelector('.track');
const tracksContainer = document.querySelector('.tracks-container');

let tracks = [];
let countId = 1;

export class Track {
  constructor() {
    this.id = countId;
    this.isRecording = false;
    this.firstClick = false;
    this.trackTime = [];
    this.trackKeys = [];
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
    const pauseBtn = trackButtonsContainer.querySelector('.pause-button');
    const recordBtn = trackButtonsContainer.querySelector('.record-button');

    const btns = {
      play: playBtn,
      pause: pauseBtn,
      record: recordBtn,
      bin: binBtn,
      loop: loopBtn,
    };

    addTrackEvents(this, btns);

    this.update();
    countId++;
  }

  play() {}
  pause() {}

  record(button) {
    this.timer1 = null;
    this.timer2 = null;
    let time = null;

    this.timer1 = Date.now();

    if (!this.firstClick) {
      document.addEventListener('keyup', (event) => {
        this.timer2 = Date.now();
        time = this.timer2 - this.timer1;
        if (time !== 0 && time != 1) {
          const key = event.key.toLowerCase();
          this.trackTime.push(time);
          this.trackKeys.push(key);
          onKeyPress(key);
          console.log(time);
          console.log(event.key.toLowerCase());
        }
        this.record(button);
        this.firstClick = true;
      });
    }

    button.addEventListener('click', () => {
      console.log(...this.trackTime);
      console.log(...this.trackKeys);
    });
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
    track.record(btns.record);
  });
};
