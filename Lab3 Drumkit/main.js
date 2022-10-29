const START_RECORDING_KEY = '1';
const STOP_RECORDING_KEY = '2';

document.addEventListener('keypress', startRecording);
document.addEventListener('keypress', onKeyPress);

// Track: klawisz, czas pomiędzy naciśnięciem poprzedniego i obecnego
let tracks = [];

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

    document.addEventListener('keydown', event => {
      const currentTime = Date.now();

      tracks.push({
        isRecording: true,
        track: []
      });
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
