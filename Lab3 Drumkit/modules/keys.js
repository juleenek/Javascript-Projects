const STOP_RECORDING_KEY = '2';

const sounds = {
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

export const onKeyPress = (key) => {
  const sound = sounds[key.toLowerCase()];
  playSound(sound);
};

export const playSound = (sound) => {
  const audioTag = document.querySelector(`#${sound}`);
  const audio = new Audio(audioTag.src);
  audio.play();
};
