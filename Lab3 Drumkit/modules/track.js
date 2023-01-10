const trackTemplate = document.querySelector('.track');
const tracksContainer = document.querySelector('.tracks-container');
let tracks = [];
let countId = 1;

export class Track {
  constructor() {
    this.id = countId;
    this.isRecording = false;
    this.musicTrack = [];
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
    const binBtn = actionContainer.querySelector('.bin-btn');
    binBtn.addEventListener('click', () => {
      this.remove();
      this.update();
    });
    this.update();
    countId++;
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
